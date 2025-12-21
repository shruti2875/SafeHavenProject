
import React, { useState } from 'react';
import type { EmergencyContact } from '../types';

const mockContacts: EmergencyContact[] = [
  { id: '1', name: 'Sarah', phone: '555-123-4567', relationship: 'Sister' },
  { id: '2', name: 'Local Shelter', phone: '555-987-6543', relationship: 'Support Service' },
  { id: '3', name: 'Dr. Emily Carter', phone: '555-555-5555', relationship: 'Therapist' },
];

const ContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>(mockContacts);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (newContact.name && newContact.phone && newContact.relationship) {
      const newId = (contacts.length + 1).toString();
      setContacts([...contacts, { id: newId, ...newContact }]);
      setNewContact({ name: '', phone: '', relationship: '' });
      setIsAdding(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Emergency Contacts</h1>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700">Add Contact</button>
        )}
      </div>
      <p className="mb-8 text-slate-600">These people will be notified if you send an SOS alert. Keep this list updated.</p>

      {isAdding && (
        <form onSubmit={handleAddContact} className="mb-8 p-6 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
          <h2 className="text-xl font-semibold text-slate-700">Add New Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="name" value={newContact.name} onChange={handleInputChange} placeholder="Name" required className="p-2 border rounded-md" />
            <input name="phone" value={newContact.phone} onChange={handleInputChange} placeholder="Phone Number" type="tel" required className="p-2 border rounded-md" />
            <input name="relationship" value={newContact.relationship} onChange={handleInputChange} placeholder="Relationship" required className="p-2 border rounded-md" />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Save</button>
            <button type="button" onClick={() => setIsAdding(false)} className="bg-slate-200 text-slate-800 py-2 px-4 rounded-md hover:bg-slate-300">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {contacts.map(contact => (
          <div key={contact.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white rounded-lg border border-slate-200 shadow-sm">
            <div>
              <p className="font-bold text-slate-800">{contact.name}</p>
              <p className="text-slate-600">{contact.phone}</p>
              <p className="text-sm text-slate-500 italic">{contact.relationship}</p>
            </div>
            <button onClick={() => handleDeleteContact(contact.id)} className="mt-2 md:mt-0 bg-red-100 text-red-700 text-sm py-1 px-3 rounded-full hover:bg-red-200">Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPage;
