// src/App.tsx
import React from 'react';
import JobList from './components/JobList';
import useJobManager from './hooks/useJobManager';

const App: React.FC = () => {
  const { jobs, handleJobCreated } = useJobManager();

  return (
    <JobList jobs={jobs} handleJobCreated={handleJobCreated} />
  );
};

export default App;
