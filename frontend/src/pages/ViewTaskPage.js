
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getTaskById } from '../utils/api';

const ViewTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Error fetching task:', error);
        setError('Failed to load task. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading task details...</div>
      </Layout>
    );
  }

  if (!task && !loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">Task not found or you don't have permission to view it.</div>
          </div>
          <button
            onClick={() => navigate('/tasks')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Back to Tasks
          </button>
        </div>
      </Layout>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            Task Details
          </h1>
          <div className="flex space-x-2">
            <Link
              to={`/tasks/edit/${task._id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Task
            </Link>
            <button
              onClick={() => navigate('/tasks')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {task.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Created on {formatDate(task.createdAt)}
            </p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Assigned To</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {task.assignedTo}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(task.deadline)}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {task.description}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {formatDate(task.updatedAt)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewTaskPage;
