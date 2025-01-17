# Backend for Login App

This is the backend server for the Login App. It is built using Express.js and SQLite for handling user registration, login, and user data management. The server supports JWT-based authentication and includes endpoints for user management.

## Features

- **User Registration**: Endpoint for registering a new user.
- **User Login**: Endpoint for user login and generating a JWT.
- **User Data**: Protected route for fetching logged-in user data.
- **User Update**: Protected route to update user information.
- **JWT Authentication**: Middleware to secure routes and ensure only authenticated users can access them.
- **SQLite Database**: Lightweight database for storing user information.

## Frontend

The frontend of the application is located at: [Frontend GitHub Repository](https://github.com/Yeled98/login-app)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Yeled98/backend-login-app.git
   ```

2. Navigate to the project folder:

   ```bash
   cd backend-login-app
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following configuration:

   ```
   PORT=1337
   JWT_SECRET=your_jwt_secret_key_here
   ORIGINS_ALLOWED=http://localhost:8100
   ```

5. Start the server:

   ```bash
   npm start
   ```

The server will be running on `http://localhost:1337`.

## API Endpoints

- **POST** `/api/users`: Register a new user.
- **POST** `/api/users/login`: Log in and receive a JWT token.
- **GET** `/api/users/me`: Get the logged-in user's data (requires authentication).
- **PUT** `/api/users`: Update the logged-in user's information (requires authentication).

## Technologies Used

- **Express.js**: Web framework for Node.js.
- **Sequelize**: ORM for SQLite.
- **SQLite**: Lightweight database for development.
- **JWT**: For user authentication.
- **CORS**: To allow cross-origin requests from the frontend.
