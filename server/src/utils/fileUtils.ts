const fs = require('fs');
const path = require('path');

const jobsFilePath = path.join(__dirname, '../jobs.json');

export const readJobsFromFile = () => {
  if (fs.existsSync(jobsFilePath)) {
    const data = fs.readFileSync(jobsFilePath);
    return JSON.parse(data);
  }
  return [];
};

export const writeJobsToFile = (jobs) => {
  fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2));
};




