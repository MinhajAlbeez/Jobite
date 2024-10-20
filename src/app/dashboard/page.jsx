"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Briefcase, Eye, X } from 'lucide-react';

// Mock data
const recruiters = [
  { id: 1, name: 'Tech Recruiters Inc.', vacancies: 3, applicants: 15 },
  { id: 2, name: 'HR Solutions', vacancies: 2, applicants: 8 },
  { id: 3, name: 'Job Finders Co.', vacancies: 5, applicants: 25 },
];

const vacancies = [
  { id: 1, title: 'Frontend Developer', company: 'Tech Recruiters Inc.', applicants: 7 },
  { id: 2, title: 'UX Designer', company: 'HR Solutions', applicants: 4 },
  { id: 3, title: 'Data Scientist', company: 'Job Finders Co.', applicants: 9 },
];

const applicants = [
  { id: 1, name: 'John Doe', position: 'Frontend Developer', company: 'Tech Recruiters Inc.', email: 'john.doe@email.com', phone: '123-456-7890', resumeUrl: '/resumes/john_doe_resume.pdf' },
  { id: 2, name: 'Jane Smith', position: 'UX Designer', company: 'HR Solutions', email: 'jane.smith@email.com', phone: '098-765-4321', resumeUrl: '/resumes/jane_smith_resume.pdf' },
  { id: 3, name: 'Bob Johnson', position: 'Data Scientist', company: 'Job Finders Co.', email: 'bob.johnson@email.com', phone: '555-123-4567', resumeUrl: '/resumes/bob_johnson_resume.pdf' },
];

const Table = ({ data, columns, onSort, sortColumn, sortOrder, onViewDetails }) => (
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
            onClick={() => column.sortable && onSort(column.key)}
          >
            {column.label}
            {column.sortable && sortColumn === column.key && (
              sortOrder === 'asc' ? <ChevronUp className="inline ml-1" size={14} /> : <ChevronDown className="inline ml-1" size={14} />
            )}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={column.key} className="px-6 py-4 whitespace-nowrap">
              {column.key === 'actions' ? (
                <button
                  onClick={() => onViewDetails(item)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  <Eye size={18} />
                </button>
              ) : (
                item[column.key]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Applicant Details</h3>
          <button onClick={onClose} className="text-black close-modal">
            <X size={24} />
          </button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('applicants');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const handleSort = (column) => {
    setSortedColumn(column);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortData = (data, column) => {
    return [...data].sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleViewDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setIsModalOpen(true);
  };

  const tabContent = {
    recruiters: {
      title: 'Recruiters Overview',
      icon: <Users className="mr-2" />,
      columns: [
        { key: 'name', label: 'Company Name', sortable: true },
        { key: 'vacancies', label: 'Vacancies', sortable: true },
        { key: 'applicants', label: 'Total Applicants', sortable: true },
      ],
      data: recruiters,
    },
    vacancies: {
      title: 'Vacancies Overview',
      icon: <Briefcase className="mr-2" />,
      columns: [
        { key: 'title', label: 'Job Title', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'applicants', label: 'Applicants', sortable: true },
      ],
      data: vacancies,
    },
    applicants: {
      title: 'Applicants Overview',
      icon: <Users className="mr-2" />,
      columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'position', label: 'Position', sortable: true },
        { key: 'company', label: 'Company', sortable: true },
        { key: 'actions', label: 'View Details', sortable: false },
      ],
      data: applicants,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="mb-4">
        {Object.keys(tabContent).map((tab) => (
          <button
            key={tab}
            className={`mr-2 px-4 py-2 rounded ${activeTab === tab ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          {tabContent[activeTab].icon}
          {tabContent[activeTab].title}
        </h2>
        <Table
          data={sortData(tabContent[activeTab].data, sortedColumn)}
          columns={tabContent[activeTab].columns}
          onSort={handleSort}
          sortColumn={sortedColumn}
          sortOrder={sortOrder}
          onViewDetails={handleViewDetails}
        />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedApplicant && (
          <div>
            <p><strong>Name:</strong> {selectedApplicant.name}</p>
            <p><strong>Position:</strong> {selectedApplicant.position}</p>
            <p><strong>Company:</strong> {selectedApplicant.company}</p>
            <p><strong>Email:</strong> {selectedApplicant.email}</p>
            <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
            <p><strong>Resume:</strong> <a href={selectedApplicant.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Resume</a></p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;