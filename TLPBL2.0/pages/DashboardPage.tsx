
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../App';
import { ShieldCheckIcon, UsersIcon, DocumentTextIcon, SparklesIcon } from '../components/Icons';

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, link, icon }) => (
  <Link to={link} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 mb-4 group-hover:bg-sky-200 transition-colors">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
  </Link>
);

const SOSModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold text-red-600">Confirm SOS Alert</h2>
                <p className="mt-4 text-slate-700">This will immediately notify your emergency contacts and share your location. Are you sure you want to proceed?</p>
                <div className="mt-8 flex justify-around">
                    <button onClick={onClose} className="py-2 px-6 bg-slate-200 text-slate-800 rounded-md font-semibold hover:bg-slate-300">Cancel</button>
                    <button onClick={onConfirm} className="py-2 px-6 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700">Yes, Send Alert</button>
                </div>
            </div>
        </div>
    );
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertSent, setAlertSent] = useState(false);

  const handleSosConfirm = () => {
    console.log("SOS Alert Sent!"); // Mock action
    setAlertSent(true);
    setIsModalOpen(false);
    setTimeout(() => setAlertSent(false), 5000); // Reset message after 5 seconds
  };
  
  const features = [
    { title: 'My Safety Plan', description: 'Access and update your personalized safety plan.', link: '/safety-plan', icon: <ShieldCheckIcon className="h-6 w-6 text-sky-600" /> },
    { title: 'Emergency Contacts', description: 'Manage the list of people to contact in an emergency.', link: '/contacts', icon: <UsersIcon className="h-6 w-6 text-sky-600" /> },
    { title: 'Report an Incident', description: 'Securely document incidents for your records.', link: '/report', icon: <DocumentTextIcon className="h-6 w-6 text-sky-600" /> },
    { title: 'Find Resources', description: 'Get AI-powered help finding support and information.', link: '/resources', icon: <SparklesIcon className="h-6 w-6 text-sky-600" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name.split(' ')[0]}</h1>
        <p className="mt-2 text-slate-600">You are in a safe space. Access your tools and resources below.</p>
      </div>

      <div className="p-6 bg-red-100 border border-red-200 rounded-lg text-center">
        <h2 className="text-xl font-bold text-red-800">Immediate Danger?</h2>
        <p className="mt-2 text-red-700">If you are in immediate danger, please call 911 or your local emergency number.</p>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-4 w-full md:w-auto inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
            SEND SOS ALERT
        </button>
        {alertSent && <p className="mt-3 text-green-700 font-semibold">Your emergency contacts have been notified.</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map(feature => <DashboardCard key={feature.title} {...feature} />)}
      </div>

      <SOSModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSosConfirm} />
    </div>
  );
};

export default DashboardPage;
