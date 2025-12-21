// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';


// --------------------------------------------------------
// 🔐 AUTH MIDDLEWARE
// --------------------------------------------------------
function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(401).json({ error: 'No token provided' });

  const token = header.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}


// --------------------------------------------------------
// 🟢 AUTH ROUTES
// --------------------------------------------------------

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Missing email or password' });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(400).json({ error: 'User already exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, passwordHash, name, phone }
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});


// LOGIN (email OR username)
app.post('/api/auth/login', async (req, res) => {
  const { username, email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email || "" },
        { name: username || "" }
      ]
    }
  });

  if (!user) return res.status(401).json({ error: "Invalid login details" });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});


// FETCH LOGGED-IN USER
app.get('/api/me', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, phone: true }
  });
  res.json(user);
});


// --------------------------------------------------------
// 🟢 CONTACT ROUTES
// --------------------------------------------------------

// Add contact
app.post('/api/contacts', authMiddleware, async (req, res) => {
  const { name, phone, relation } = req.body;

  const contact = await prisma.contact.create({
    data: {
      name,
      phone,
      relation,
      userId: req.userId
    }
  });

  res.json(contact);
});

// Get all contacts
app.get('/api/contacts', authMiddleware, async (req, res) => {
  const contacts = await prisma.contact.findMany({
    where: { userId: req.userId }
  });
  res.json(contacts);
});

// Mark contact as emergency
app.put('/api/contacts/:id/emergency', authMiddleware, async (req, res) => {
  try {
    const updated = await prisma.contact.update({
      where: { id: Number(req.params.id) },
      data: { isEmergency: true }
    });
    res.json(updated);
  } catch (err) {
    console.error("Emergency update error:", err);
    res.status(500).json({ error: "Failed to update emergency contact" });
  }
});

// Get emergency contacts
app.get('/api/emergency-contacts', authMiddleware, async (req, res) => {
  const contacts = await prisma.contact.findMany({
    where: { userId: req.userId, isEmergency: true }
  });
  res.json(contacts);
});


// --------------------------------------------------------
// 🟢 INCIDENT ROUTES (Report + Fetch)
// --------------------------------------------------------
app.post('/api/incidents', authMiddleware, async (req, res) => {
  const { title, description, location, date, time } = req.body;

  if (!title || !description)
    return res.status(400).json({ error: "Title & description required" });

  try {
    const incident = await prisma.incident.create({
      data: {
        title,
        description,
        location,
        date: date ? new Date(date) : null,
        time: time || null,
        userId: req.userId
      }
    });
    res.json(incident);
  } catch (err) {
    console.error("Error creating incident:", err);
    res.status(500).json({ error: "Failed to create incident" });
  }
});

app.get('/api/incidents', authMiddleware, async (req, res) => {
  try {
    const incidents = await prisma.incident.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(incidents);
  } catch (err) {
    console.error("Incident fetch error:", err);
    res.status(500).json({ error: "Failed to fetch incidents" });
  }
});


// --------------------------------------------------------
// 🟢 SAFETY PLAN ROUTES
// --------------------------------------------------------
app.get("/api/safety-plan", authMiddleware, async (req, res) => {
  try {
    const items = await prisma.safetyPlan.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(items);
  } catch (err) {
    console.error("Safety plan fetch error:", err);
    res.status(500).json({ error: "Failed to fetch plan" });
  }
});

app.post("/api/safety-plan", authMiddleware, async (req, res) => {
  const { text, category } = req.body;

  if (!text) return res.status(400).json({ error: "Text required" });

  try {
    const item = await prisma.safetyPlan.create({
      data: {
        userId: req.userId,
        text,
        category: category || "General"
      }
    });
    res.json(item);
  } catch (err) {
    console.error("Safety plan create error:", err);
    res.status(500).json({ error: "Failed to create item" });
  }
});

app.delete("/api/safety-plan/:id", authMiddleware, async (req, res) => {
  try {
    await prisma.safetyPlan.delete({ where: { id: Number(req.params.id) } });
    res.json({ success: true });
  } catch (err) {
    console.error("Safety plan delete error:", err);
    res.status(500).json({ error: "Failed to delete item" });
  }
});
// UPDATE PROFILE
app.put('/api/profile', authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.userId },
      data: { name, email }
    });

    res.json({ user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});


// --------------------------------------------------------
// 🟢 SERVER START
// --------------------------------------------------------
const port = process.env.PORT || 4000;
app.listen(port, "0.0.0.0", () =>
  console.log(`✅ Server running on http://0.0.0.0:${port}`)
);
// --------------------------------------------------------
// 🟢 UPDATE PROFILE ROUTE
// --------------------------------------------------------
app.put('/api/profile', authMiddleware, async (req, res) => {
  const { name, email, phone } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: req.userId },
      data: {
        name: name || undefined,
        email: email || undefined,
        phone: phone || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true
      }
    });

    res.json({ user: updated });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});
