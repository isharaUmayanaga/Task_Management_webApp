import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return <>{children}</>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-bold">
                Task Manager
              </Link>
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/tasks"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === '/tasks' ? 'bg-indigo-700' : 'hover:bg-indigo-500'
                  }`}
                >
                  Tasks
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {user && (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <span className="mr-4">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-500 hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
