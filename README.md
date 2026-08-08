# Task Management Web App

A full-stack task management application with Google authentication, task CRUD, profile management, and admin controls.

## Features

- Google OAuth login
- Task create, read, update, delete
- Profile update and delete
- Admin access to manage all tasks
- Responsive modern UI
- Backend API for frontend integration

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT
- CORS
- Cookie-based auth

### Frontend
- React
- Vite
- Tailwind CSS
- Axios

---

## Project Structure

```text
backend/
  config/
  controllers/
  middlewares/
  models/
  routes/
  server.js

frontend/
  src/
  public/
  package.json
  vite.config.js
```

---

## Local Development

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd Task_Management_webApp
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
BACKEND_URL=http://localhost:5000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Run the backend:

```bash
node server.js
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:

```bash
npm run dev
```

The app will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## Production Deployment

### Backend on Render

The backend API is currently deployed at:

```text
https://task-management-webapp-jicr.onrender.com
```

#### Required environment variables

```env
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://task-management-webapp.ish04838.workers.dev/
BACKEND_URL=https://task-management-webapp-jicr.onrender.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://task-management-webapp-jicr.onrender.com/api/auth/google/callback
```

The backend route used by Passport is:

```text
GET /api/auth/google
GET /api/auth/google/callback
GET /api/auth/me
```

#### Render deployment steps

1. Create a new Render web service
2. Connect your GitHub repository
3. Select the backend folder as the app root
4. Set build command:
   ```bash
   npm install
   ```
5. Set start command:
   ```bash
   npm start
   ```
6. Add the environment variables above
7. Deploy

### Frontend on Cloudflare Worker / Pages

The frontend is currently published to the Cloudflare worker domain:

```text
https://task-management-webapp.ish04838.workers.dev/
```

#### Required environment variable

```env
VITE_API_URL=https://task-management-webapp-jicr.onrender.com/api
```

#### Cloudflare deployment steps

1. Create a Cloudflare Worker or Pages project
2. Connect the GitHub repository
3. Select the frontend folder as the build source
4. Set build command:
   ```bash
   npm install && npm run build
   ```
5. Set build output directory:
   ```bash
   dist
   ```
6. Add the `VITE_API_URL` environment variable
7. Deploy with the generated `dist` files as assets

Because the frontend uses client-side routes, the deployment must also serve the app shell for non-root browser paths such as `/dashboard` instead of letting Cloudflare return a static 404 page.

---

## Google OAuth Setup

1. Go to Google Cloud Console
2. Create an OAuth client ID
3. Set the OAuth application type to Web application
4. Add the authorized JavaScript origins:
   ```text
   http://localhost:5173
   http://localhost:5000
   https://task-management-webapp.ish04838.workers.dev/
   https://task-management-webapp-jicr.onrender.com
   ```
5. Add the authorized redirect URI:
   ```text
   http://localhost:5000/api/auth/google/callback
   ```
   For production:
   ```text
   https://task-management-webapp-jicr.onrender.com/api/auth/google/callback
   ```

The deployed backend sets a JWT cookie after successful Google login. Because the frontend and API live on different origins (`workers.dev` and `render.com`), the cookie must be configured for cross-site delivery:

```js
sameSite: 'none'
secure: true
```

When `NODE_ENV=production`, the backend controller writes that cookie shape to support the Cloudflare-to-Render deployment model.

---

## Notes

- Admin users can manage all tasks.
- Regular users can manage only their own tasks.
- Deleting a profile also removes the user’s tasks.

---

## Scripts

### Backend

```bash
cd backend
node server.js
```

### Frontend

```bash
cd frontend
npm run dev
npm run build
```
