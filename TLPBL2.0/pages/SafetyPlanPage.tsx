
import React, { useState } from 'react';
import type { SafetyPlan } from '../types';

const mockSafetyPlan: SafetyPlan = {
  safePeople: ["My sister, Sarah (555-1234)", "My friend, Mark (555-5678)"],
  safePlaces: ["The local library", "The 24-hour grocery store"],
  thingsToTake: ["Identification (ID, passport)", "Keys (house, car)", "Phone and charger", "Medications", "Money, credit cards"],
  safetyAtHome: "If an argument starts, I will move to a room with an exit, avoiding the kitchen or bathroom.",
  safetyOutside: "I will vary my routes to work. I will inform my trusted neighbor if I'm leaving town.",
  emotionalWellbeing: "I will practice deep breathing exercises. I will call my therapist once a week.",
};

const SafetyPlanPage: React.FC = () => {
  const [plan, setPlan] = useState<SafetyPlan>(mockSafetyPlan);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('safePeople') || name.startsWith('safePlaces') || name.startsWith('thingsToTake')) {
      const [field, indexStr] = name.split('-');
      const index = parseInt(indexStr, 10);
      const newArray = [...plan[field as keyof SafetyPlan] as string[]];
      newArray[index] = value;
      setPlan({ ...plan, [field]: newArray });
    } else {
      setPlan({ ...plan, [name]: value });
    }
  };
  
  const handleSave = () => {
    console.log("Saving plan:", plan); // Mock save
    setIsEditing(false);
  };
  
  const renderList = (field: keyof SafetyPlan, title: string) => (
    <div>
      <label className="block text-sm font-medium text-slate-700">{title}</label>
      <ul className="mt-1 space-y-2">
        {(plan[field] as string[]).map((item, index) => (
          <li key={index}>
            {isEditing ? (
              <input
                type="text"
                name={`${field}-${index}`}
                value={item}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
              />
            ) : (
              <p className="text-slate-900 bg-slate-50 p-2 rounded-md">{item}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderTextArea = (field: keyof SafetyPlan, title: string) => (
     <div>
        <label htmlFor={field} className="block text-sm font-medium text-slate-700">{title}</label>
        {isEditing ? (
            <textarea
                id={field}
                name={field}
                rows={4}
                value={plan[field] as string}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
            />
        ) : (
             <p className="mt-1 text-slate-900 bg-slate-50 p-3 rounded-md whitespace-pre-wrap">{plan[field] as string}</p>
        )}
    </div>
  );

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">My Safety Plan</h1>
        {isEditing ? (
          <button onClick={handleSave} className="bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700">Save Plan</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700">Edit Plan</button>
        )}
      </div>
      
      <p className="mb-8 text-slate-600">This is a personal plan to help you stay safe. Review and update it regularly. Only you can see this information.</p>
      
      <form className="space-y-8">
        {renderList('safePeople', 'Safe People to Contact')}
        {renderList('safePlaces', 'Safe Places to Go')}
        {renderList('thingsToTake', 'Important Things to Take')}
        {renderTextArea('safetyAtHome', 'Safety at Home')}
        {renderTextArea('safetyOutside', 'Safety When Out')}
        {renderTextArea('emotionalWellbeing', 'Emotional Health Plan')}
      </form>
    </div>
  );
};

export default SafetyPlanPage;
