// src/hooks/useJobManager.ts
import { useEffect, useState } from 'react';
import useFetchWrapper from './useFetchWrapper';

export type JobType = {
  id: string;
  status: 'pending' | 'resolved' | 'failed';
  result?: string;
};

const { REACT_APP_SERVER_URL, REACT_APP_SOCKET_URL } = process.env;
const useJobManager = () => {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const { get:getJobs } = useFetchWrapper();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs: JobType[] = await getJobs(`${REACT_APP_SERVER_URL}`);
        setJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();

    const ws = new WebSocket(`${REACT_APP_SOCKET_URL}`);
    ws.onmessage = (event) => {
      const updatedJob = JSON.parse(event.data);
      setJobs((prevJobs) => {
        const existingJob = prevJobs.find((job) => job.id === updatedJob.id);
        if (existingJob) {
          return prevJobs.map((job) =>
            job.id === updatedJob.id ? updatedJob : job
          );
        }
        return [...prevJobs, updatedJob];
      });
    };

  },[]);

  const handleJobCreated = (newJob: JobType) => {
    setJobs((prevJobs) => [...prevJobs, newJob]);
  };

  return { jobs, handleJobCreated };
};

export default useJobManager;
