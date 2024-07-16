const express = require('express');
import { createJob, getAllJobs, getJobById } from "../controllers/jobController";

const router = express.Router();

router.post('/jobs', (_req, res) => {
  const jobList = createJob();
  res.json(jobList);
})

router.get('/jobs/:jobId', (req, res) => {
  const { jobId } = req.params
  const jobList = getJobById(jobId);
  res.json(jobList);
});

router.get('/jobs', (_req, res) => {
  const jobList = getAllJobs();
  res.json(jobList);
});

module.exports = router;
