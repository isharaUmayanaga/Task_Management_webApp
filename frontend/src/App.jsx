import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TaskListPage from './pages/TaskListPage';
import AddTaskPage from './pages/AddTaskPage';
import EditTaskPage from './pages/EditTaskPage';
import ViewTaskPage from './pages/ViewTaskPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><TaskListPage /></ProtectedRoute>} />
      <Route path="/tasks/add" element={<ProtectedRoute><AddTaskPage /></ProtectedRoute>} />
      <Route path="/tasks/edit/:id" element={<ProtectedRoute><EditTaskPage /></ProtectedRoute>} />
      <Route path="/tasks/view/:id" element={<ProtectedRoute><ViewTaskPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
