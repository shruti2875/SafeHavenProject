
import React, { useState, useContext, createContext, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, Outlet, Navigate, useLocation } from 'react-router-dom';
import type { User } from './types';
import QuickExitButton from './components/QuickExitButton';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import SafetyPlanPage from './pages/SafetyPlanPage';
import ContactsPage from './pages/ContactsPage';
import ReportIncidentPage from './pages/ReportIncidentPage';
import ResourcesPage from './pages/ResourcesPage';
import { ArrowRightOnRectangleIcon, ShieldCheckIcon } from './components/Icons';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ProtectedRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

const Header: React.FC = () => {
    const { logout } = useAuth();
    const navItems = [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/safety-plan', label: 'Safety Plan' },
        { path: '/contacts', label: 'Contacts' },
        { path: '/report', label: 'Report Incident' },
        { path: '/resources', label: 'Resources' },
    ];

    return (
        <header className="bg-white shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/dashboard" className="flex-shrink-0 flex items-center space-x-2 text-slate-700">
                            <ShieldCheckIcon className="h-8 w-8 text-sky-600" />
                            <span className="font-bold text-xl">Safe Haven</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    className="text-slate-500 hover:bg-slate-100 hover:text-slate-900 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <button onClick={logout} className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
                            <span className="sr-only">Logout</span>
                            <ArrowRightOnRectangleIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};


const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main>
        <div className="py-6 sm:px-6 lg:px-8 container mx-auto">
          <Outlet />
        </div>
      </main>
      <QuickExitButton />
    </div>
  );
};


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/safety-plan" element={<SafetyPlanPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/report" element={<ReportIncidentPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
