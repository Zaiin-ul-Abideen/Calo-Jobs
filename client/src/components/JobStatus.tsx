import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { JobType } from '../hooks/useJobManager';
import { getStatusColor } from '../utils/getStatusColor';

interface JobStatusProps {
  onFetchStatus: (status: JobType['status']) => void;
}

const JobStatus: React.FC<JobStatusProps> = ({ onFetchStatus }) => {
  const [jobId, setJobId] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  
  const handleFetchStatus = async () => {
    const {REACT_APP_SERVER_URL} = process.env;

    if (!jobId) {
      toast.error('Please enter a Job ID');
      return;
    }
    
    try {
        const response = await fetch(`${REACT_APP_SERVER_URL}/${jobId}`);
        const result = await response.json()
      setStatus(result.status);
      onFetchStatus(result.status);
    } catch (error) {
      toast.error('Failed to fetch job status');
    }
  };

  const handleSetjobId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobId(e.target.value)
  }

  return (
    <div className="p-5 bg-gray-100 border border-gray-300 rounded-lg mb-4">
      <h2 className="text-xl font-semibold mb-2">Fetch Job Status</h2>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter Job ID"
          value={jobId}
          onChange={(e) => handleSetjobId(e)}
          className="border border-gray-300 rounded p-2 flex-grow"
        />
        <button
          onClick={handleFetchStatus}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-orange-500"
        >
          Fetch
        </button>
      </div>
      {status && (
        <div className="mt-2 text-gray-500 font-semibold">
        Status:
        <span className={`ml-2 ${getStatusColor(status)}`}>{status}</span>
      </div>
      )}
    </div>
  );
};

export default JobStatus;
