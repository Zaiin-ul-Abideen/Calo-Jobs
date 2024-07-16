import React from 'react';
import useCreateJob from '../hooks/useCreateJob';
import { JobType } from '../hooks/useJobManager';

interface CreateJobProps {
  handleJobCreated: (newJob: JobType) => void;
}

const CreateJob = ({ handleJobCreated }: CreateJobProps) => {
  const { createJob, isCreating } = useCreateJob(handleJobCreated);

  const handleCreateJob = () => {
    createJob();
  };

  return (
    <div className='px-4'>
      <button
        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-orange-500"
        onClick={handleCreateJob}
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create Job'}
      </button>
    </div>
  );
};

export default CreateJob;
