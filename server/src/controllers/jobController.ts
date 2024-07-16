import {
    getAllJobs as serviceGetAllJobs,
    getJobById as serviceGetJobById,
    createJob as serviceCreateJob
} from '../services/jobServices';

export function getAllJobs() {
    return serviceGetAllJobs();
}

export function getJobById(jobId) {
    return serviceGetJobById(jobId);
}

export function createJob() {
    return serviceCreateJob();
}
