
# Calo Jobs

### Table of Contents
 - Overview
 - Installation
 - Usage
 - Project Structure
 - API Endpoints
 - WebSocket Integration
 - Environment Variables
 - Duration Breakdown

## Overview
### How Jobs are Completed in the Background
The job completion process in this application is designed to handle jobs asynchronously, ensuring that each job progresses through a series of states until it reaches its final status.

#### Job Creation:
 - A unique ID is generated, and the job is marked 'pending' with no result.
 - A random delay (5 seconds to 5 minutes) is set to simulate processing time.
 - After the delay, the job processing begins.

#### Job Processing:
 - The job attempts to fetch a random image.
 - If successful, the job's status is updated to 'resolved', and the result is saved.
 - If the fetch fails, the job enters a retry mechanism.

#### Retry Mechanism:
 - The job retries up to 3 times, each with a new random delay.
 - If all retries fail, the job's status is set to 'failed'.

#### Job Storage and Retrieval:
 - Jobs are stored in jobs.json.
 - Helper functions manage reading from and writing to this file.
 - Jobs can be retrieved by ID or fetched as a list.

#### WebSocket Communication:
 - Job status updates are broadcast to all connected clients in real-time.


## Installation

#### 1. Clone the repository:
```bash
  git clone https://github.com/Zaiin-ul-Abideen/Calo-Jobs.git
```

#### 2. Navigate to the project directory:
```bash
  cd Calo-Jobs
```

#### 3. Create a .env file in both the client and server directories with the following variables:
- Client .env
```bash
  REACT_APP_SERVER_URL=
  REACT_APP_SOCKET_URL=
```
- Server .env
```bash
UNSPLASH_API_URL=
ACCESS_KEY=
```

#### 4. Node Version:
```bash
  nvm use
```

#### 5. Install dependencies for both client and server concurrently:
```bash
  npm install
  npm install --prefix client
  npm install --prefix server
```

#### 6.Start the client and server concurrently: 
```bash
  npm run start
```

## Usage
```bash
1. Open your browser and navigate to http://localhost:3000.
2. Create a new job by clicking the "Create Job" button.
3. View the list of jobs and their statuses in real-time.
```


## Project Structure

```bash
├── client
│   ├── public
│   └── src
│   │    ├── components                         # Contains the React UI components.
│   │    │   ├── JobForm.tsx
│   │    │   ├── JobList.tsx
│   │    │   └── JobStatus.tsx
│   │    │  
│   │    ├── hooks                              # Custom hooks for managing APIs and data.
│   │    │   ├── useFetchWrapper.ts
│   │    │   ├── useCreateJob.ts
│   │    │   └── useJobManager.ts
│   │    │
│   │    │── Utils                              # Utility functions.
│   │    │   └── getStatusColor.ts
│   │    │
│   │    ├── App.tsx
│   │    └── index.tsx                          # Entry point of the React application.
│   │
│   ├── .env
│   
├── server
│   ├── src
│   │   ├── controllers                         # Contains the logic handlers.
│   │   │   └── jobController.ts
│   │   │
│   │   ├── routes                              # Defines API endpoints.
│   │   │   └── jobRoute.ts
│   │   │
│   │   ├── services                            # Contains business logic.
│   │   │   └── jobServices.ts
│   │   │
│   │   ├── utils                               # Utility functions.
│   │   │   ├── fetchImage.ts
│   │   │   └── fileUtils.ts
│   │   │
│   │   ├── websocket                           # WebSocket server setup.
│   │   │   └── websocketServer.ts
│   │   │
│   │   ├── jobs.json                           # Store jobs data.
│   │   └── server.ts                           # Main server file.
│   │
│   ├── nodemon.json                            # Configuration for nodemon.
│   └── .env
│
├── package.json
```

### API Endpoints

- POST /api/jobs
  - Creates a new job.

- GET /api/jobs
  - Fetches all jobs.

- GET /api/jobs/${jobId}
  - Fetch a job by ID.

### WebSocket Integration
 - WebSocket URL: `ws://localhost:${PORT}`
 - Receives real-time updates for job status changes.

### Environment Variables
 - REACT_APP_SERVER_URL: URL for the backend server.
 - REACT_APP_SOCKET_URL: URL for the WebSocket server.
## Screenshots

![App Screenshot](https://utfs.io/f/82c4ab6c-233c-46c3-a447-2be7da2f9ced-btuf2c.png)

![App Screenshot](https://utfs.io/f/995f8788-1485-4577-aa3e-3634959896b6-om0ar0.png)


## Duration Breakdown

### Project Setup:
 - Time: 30 minutes
    - Initialize repo, set up project structure, and install dependencies.

### Backend Development:
 - Time: 1 hour 30 minutes
    - Set up Express server and routes: 15 minutes
    - Implement job logic and status retrieval: 45 minutes
    - Implement WebSocket server: 30 minutes


### Frontend Development:
 - Time: 1 hour 30 minutes
    - Develop components and hooks: 1 hour
    - Implement UI/UX design: 30 minutes

### Integration and Testing:
 - Time: 30 minutes
    - Integrate frontend with backend: 15 minutes
    - Conduct testing to ensure all functionalities work as expected: 15 minutes

### Documentation:
 - Time: 1 hour
    - Write comprehensive documentation, README.md: 1 hour
#### Total Time: 5 hours
