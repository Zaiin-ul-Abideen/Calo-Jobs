// src/hooks/useCreateJob.ts
import { useState } from 'react';
import useFetchWrapper from './useFetchWrapper';
import { JobType } from './useJobManager';

const { REACT_APP_SERVER_URL } = process.env;

const useCreateJob = (handleJobCreated: (newJob: JobType) => void) => {
  const [isCreating, setIsCreating] = useState(false);
  const { post } = useFetchWrapper();

  const createJob = async (payload?: any) => {
    setIsCreating(true);
    try {
      const newJob = await post<JobType>(`${REACT_APP_SERVER_URL}`, payload);
      handleJobCreated(newJob);
    } catch (error) {
      console.error('Error creating job:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return { createJob, isCreating };
};

export default useCreateJob;
