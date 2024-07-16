const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { fetchRandomImage } = require('../utils/fetchImage');
const { broadcast } = require('../websocket/websocketServer');

const MAX_RETRIES = 3;
const FILE_PATH = path.join(__dirname, '../jobs.json');

const _getRandomDelay = () => {
    const minDelay = 5 * 1000;
    const maxDelay = 5 * 60 * 1000;
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};
  
const _readJobsFromFile = () => {
    if (!fs.existsSync(FILE_PATH)) {
        return [];
    }
    
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
};

const _writeJobsToFile = (jobs) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(jobs, null, 2));
};

const _addJob = (id: string, job) => {
    const jobs = _readJobsFromFile();
    const index = jobs.findIndex((_job) => _job.id === id);
    if (index > -1) {
        jobs[index] = { id, ...job };
    } else {
        jobs.push({ id, ...job });
    }
    
    _writeJobsToFile(jobs);
};

const _retryJob = async (id: string, attempt: number) => {
    const TIME_LIMIT = _getRandomDelay();
    
    if (attempt >= MAX_RETRIES) {
        console.error(`Max retries reached for job: ${id}`);
        _addJob(id, { status: 'failed', result: null });
        broadcast({ id, status: 'failed', result: null });
        return;
    }
    
    console.log(`Retrying job ${id} after ${TIME_LIMIT}ms`);
    
    setTimeout(async () => {
        try {
            const result = await fetchRandomImage();
            _addJob(id, { status: 'resolved', result });
            broadcast({ id, status: 'resolved', result });
        } catch (error) {
            console.error('Failed to fetch image for job:', id, error);
            _retryJob(id, attempt + 1);
        }
    }, TIME_LIMIT);
};

export const createJob = () => {
    const id = uuidv4();
    const TIME_LIMIT = _getRandomDelay();
    _addJob(id, { status: 'pending', result: null });
  
    console.log(`Job created ${id} with ${TIME_LIMIT}ms`);
    
    setTimeout(async () => {
        try {
            const result = await fetchRandomImage();
            _addJob(id, { status: 'resolved', result });
            broadcast({ id, status: 'resolved', result });
        } catch (error) {
            console.error('Failed to fetch image for job:', id, error);
            _retryJob(id, 0);
        }
    }, TIME_LIMIT);
    return { id, status: 'pending', result: null };
};

export const getAllJobs = () =>  _readJobsFromFile();

export const getJobById = (id: string) => {
    const jobs = _readJobsFromFile();
    return jobs.find((_job) => _job.id === id);
};