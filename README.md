# Simple-App
# Web Application with JWT Authentication

This is a simple web application built with Node.js and React. The app includes JWT-based authentication and allows logged-in users to view a welcome message.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/your-repo/Simple-App.git
cd Simple-App
```

# Setup and Run the Backend (Node.js)
Navigate to the backend folder and install the required dependencies:
```
cd backend
npm install
```
# Environment Variables
Make sure to create a .env file if you need to configure environment variables (e.g., JWT_SECRET). If you use a .env file, you'll need to update the backend code accordingly to load it.

# Start the Backend Server
To start the backend server: `npm start`
The backend server will start on `http://localhost:5000`.

# Setup and Run the Frontend (React)
Now, navigate to the client folder and install the required dependencies:
```
cd ../client
npm install

```
# Start the React Development Server
To start the React app:

```
npm start
```
The React app will start on http://localhost:3001.

## Usage
- Navigate to the React app: Open your browser and go to http://localhost:3001.
- Login: Use the credentials defined in your users.json file to log in.
 - Welcome Page: If the login is successful, you will be redirected to the welcome page.
##  Notes
Ensure both the backend and frontend servers are running simultaneously.
The React app will interact with the backend API using the URL http://localhost:3000. 
If you change the port or domain, make sure to update the API calls in the React app accordingly.
The login credentials are stored in a JSON file (backend/users.json). You can edit this file to add new users.
