import React, { useState } from 'react';
import axios from 'axios';

const ReportIncidentPage: React.FC = () => {
  const [report, setReport] = useState({
    title: '',
    description: '',
    location: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!report.title || !report.description) {
      alert('Please enter both title and description.');
      return;
    }

    setLoading(true);

    try {
      // 🧠 Replace localhost with your IP if using from phone
      const baseURL = 'http://localhost:4000';
      const token = localStorage.getItem('token');

      const res = await axios.post(
        `${baseURL}/api/incidents`,
        {
          title: report.title,
          description: report.description,
          location: report.location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Report saved:', res.data);
      setIsSubmitted(true);
      setReport({ title: '', description: '', location: '' });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err) {
      console.error('Error submitting incident:', err);
      alert('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800">Report an Incident</h1>
      <p className="mt-2 mb-6 text-slate-600">
        Documenting incidents can be an important step. This information is stored securely and is only accessible by you.
      </p>

      {isSubmitted && (
        <div className="mb-6 p-4 bg-green-100 border border-green-200 text-green-800 rounded-md">
          Your report has been saved successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={report.title}
            onChange={handleChange}
            required
            placeholder="Short summary of the incident"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={report.description}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Describe what happened..."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-slate-700">
            Location (optional)
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={report.location}
            onChange={handleChange}
            placeholder="e.g., Home, Office, Park"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? 'Saving...' : 'Save Report Securely'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportIncidentPage;
