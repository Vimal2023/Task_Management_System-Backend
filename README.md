# Task Management System


![____ __________ ______ About_Built with Express js, MongoDB, and TypeScript, featuring user authentication, task CRUD operations, and automated task status updates](https://github.com/user-attachments/assets/8533babd-8c81-4e28-a623-aed4b010d5ef)


Built with Express.js, MongoDB, and TypeScript, featuring user authentication, task CRUD operations, and automated task status updates. Includes JWT-based security, Swagger documentation, and Jest unit tests for robust backend functionality.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Scheduled Job](#scheduled-job)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and login with JWT-based authentication
- Task CRUD operations (create, read, update, delete)
- Edge case handling:
  - Prevents duplicate task titles for the same user
  - Validates user existence before task creation
  - Stores `completedAt` timestamp for completed tasks
- Automated task status updates using `node-cron` (marks `in-progress` tasks as `done` after 2 hours)
- Swagger/OpenAPI documentation for API exploration
- Unit tests with Jest for the `POST /tasks` endpoint
- TypeScript for type safety and maintainable code

## Tech Stack
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Authentication**: JWT (jsonwebtoken), bcrypt for password hashing
- **Scheduled Tasks**: node-cron
- **API Documentation**: Swagger UI
- **Testing**: Jest, Supertest
- **Environment**: dotenv for configuration

## Project Structure
```
task-manager/
├── src/
│   ├── controllers/         # API logic (user, task)
│   ├── models/             # Mongoose schemas (User, Task)
│   ├── routes/             # Express routes
│   ├── middleware/         # JWT authentication middleware
│   ├── jobs/               # node-cron job for auto-closing tasks
│   ├── tests/              # Jest unit tests
│   ├── app.ts              # Express app setup
│   ├── server.ts           # Server entry point
│   └── swagger.json        # Swagger API documentation
├── .env                    # Environment variables (not tracked)
├── .gitignore              # Git ignore file
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## Setup
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up MongoDB**:
   - Use a local MongoDB instance or MongoDB Atlas.
   - For local MongoDB, ensure the server is running:
     ```bash
     mongod
     ```

4. **Configure Environment Variables**:
   - Create a `.env` file in the root directory:
     ```plaintext
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/task-manager
     JWT_SECRET=your-secret-key
     ```
   - Replace `MONGO_URI` with your MongoDB connection string (local or Atlas).
   - Set a secure `JWT_SECRET` for JWT authentication.

5. **Compile TypeScript**:
   ```bash
   npx tsc
   ```

## Running the Application
- **Development Mode** (with `ts-node`):
  ```bash
  npm start
  ```
  - Requires `ts-node`:
    ```bash
    npm install -D ts-node
    ```

- **Production Mode**:
  ```bash
  npx tsc
  node dist/server.js
  ```

- **Verify**:
  - Server runs at `http://localhost:3000` (or the `PORT` in `.env`).
  - Check console logs:
    ```
    Connected to MongoDB
    Server running on port 3000
    ```
  - Access Swagger UI at `http://localhost:3000/api-docs`.

## API Endpoints
The API is documented via Swagger at `/api-docs`. Key endpoints:

| Method | Endpoint                   | Description                          | Authentication       |
|--------|----------------------------|--------------------------------------|----------------------|
| POST   | `/users`                  | Register a new user                  | None                 |
| POST   | `/users/login`            | Login and obtain JWT token           | None                 |
| POST   | `/tasks`                  | Create a task                        | JWT (Bearer Token)   |
| GET    | `/tasks?userId=<userId>`  | Get tasks for a user                 | JWT (Bearer Token)   |
| PATCH  | `/tasks/:id/status`       | Update task status                   | JWT (Bearer Token)   |
| DELETE | `/tasks/:id`              | Delete a task                        | JWT (Bearer Token)   |

### Example Requests
- **Register User**:
  ```json
  POST /users
  {
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- **Login**:
  ```json
  POST /users/login
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```

- **Create Task**:
  ```json
  POST /tasks
  Authorization: Bearer <token>
  {
    "title": "My Task",
    "description": "Task description",
    "userId": "<userId>"
  }
  ```

## Testing
### API Testing
- **Swagger UI**:
  - Access `http://localhost:3000/api-docs` to test endpoints interactively.
- **Postman**:
  1. Create a collection for the API.
  2. Set up an environment with `baseUrl=http://localhost:3000` and `token`.
  3. Test endpoints in order:
     - Register user → Save `userId`.
     - Login → Save `token`.
     - Create/Get/Update/Delete tasks using `Bearer {{token}}`.
  4. Test edge cases:
     - Duplicate task titles (should return 400).
     - Invalid user ID (should return 404).
     - Missing/invalid token (should return 401).

### Unit Testing
- Run Jest tests:
  ```bash
  npm test
  ```
- Tests are in `src/tests/task.test.ts` for the `POST /tasks` endpoint.

### Database Verification
- Use MongoDB Compass or the MongoDB shell to inspect data:
  ```javascript
  mongo mongodb://localhost:27017/task-manager
  db.users.find().pretty()
  db.tasks.find().pretty()
  ```

## Scheduled Job
- A `node-cron` job in `src/jobs/autoCloseTasks.ts` runs every 10 minutes.
- Marks `in-progress` tasks older than 2 hours as `done` with a `completedAt` timestamp.
- To test:
  1. Modify `autoCloseTasks.ts` to run every minute and check tasks older than 1 minute:
     ```typescript
     cron.schedule('* * * * *', async () => {
       const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
       // ...
     });
     ```
  2. Create an `in-progress` task and verify status change after 1–2 minutes.
  3. Revert changes after testing.

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License.
