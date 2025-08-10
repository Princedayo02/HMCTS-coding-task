Clone https://github.com/Princedayo02/HMCTS-coding-task.git

This is DTS Developer Technical Test
This project is a mono repo comprising the frontend and backend code in the same project

### Prerequisites

- npm (Node package manager)

# FRONTEND

## Getting Started

To run the frontend-task code:

1. Navigate the project directory: cd frontend-task
2. Install dependencies: npm install
3. Start project: npm run dev
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# BACKEND

# My Express TypeScript Project

This is a basic Express application built with TypeScript. It serves as a starting point for building web applications using Express and TypeScript.

## Environment Variable Setup

Create a .env file and paste the variables below
PORT = 4000
DB_PORT = 5432
DB_HOST = localhost
DB_USERNAME = postgres
DB_PASSWORD = root
DB_DATABASE = tasks
NODE_ENVIRONMENT = development

Create a postgres database named tasks

1. Navigate the project directory: cd backend
2. Install dependencies: npm install
3. Start project: npm run dev

To run the backend code:

      Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Project Structure

```
Backend
├── src
│   ├── index.ts          # Entry point of the application
│   ├── routes
│   │   └── index.ts      # Route definitions
│   └── controllers
│       └── taskController.ts  # Route handlers
|   |___database
│       └── models
|       └── connection.ts
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
```

Open [API Docs](https://inentory-team-api.postman.co/workspace/Inventory-API~4bb6b008-f6c6-40b9-a121-0b73645905b8/request/42798765-18870d1d-5c71-4545-86e9-1de17874af45?action=share&creator=42798765&ctx=documentation) to access the API docs.
