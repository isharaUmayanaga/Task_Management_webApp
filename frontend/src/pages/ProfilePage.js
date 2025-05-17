import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <Layout>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-gray-900">Please log in to view your profile</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                      <img
                      src={user.picture}
                      alt={user.name}
                      className="h-16 w-16 rounded-full mr-2"
                    />
                       
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="border-t border-gray-200 pt-4">
                      <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                      <dl className="mt-4 space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                          <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={logout}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default ProfilePage; 