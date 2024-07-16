import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import JobStatus from './JobStatus';
import CreateJob from './CreateJob';
import { JobType } from '../hooks/useJobManager';
import { getStatusColor } from '../utils/getStatusColor';


interface JobListProps {
  jobs: JobType[];
  handleJobCreated: (newJob: JobType) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, handleJobCreated }) => {
  const [status, setStatus] = useState<string>('');

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id).then(() => {
      toast.success('Job ID copied to clipboard');
    }).catch((err) => {
      toast.error('Failed to copy Job ID');
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <Toaster />

      <div className="relative flex flex-row gap-6">
        <div className='w-full lg:w-1/3 rounded-lg'>
          <JobStatus onFetchStatus={(status) => setStatus(status)} />
        </div>

        <div className="absolute -bottom-8 -right-4 lg:bottom-0 lg:right-0">
          <CreateJob handleJobCreated={handleJobCreated} />
        </div>
      </div>

      <div className="rounded-lg p-2 shadow-md">
        <h2 className="text-3xl font-bold text-center lg:text-left">Job List</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105">
              <div className="p-2">
                <button
                  onClick={() => copyToClipboard(job.id)}
                  className="w-full bg-gray-500 text-white py-2 rounded hover:bg-orange-500 transition-colors"
                >
                  Copy Job ID
                </button>
                <div className="mt-2 text-gray-500 font-semibold">
                  Status:
                  <span className={`ml-2 font-bold ${getStatusColor(job.status)}`}>{job.status}</span>
                </div>
              </div>
              {job.result ? (
                <img
                  src={job.result}
                  alt={`Job ${job.status}`}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-48 bg-gray-200 border-t border-gray-300">
                  No Image
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
