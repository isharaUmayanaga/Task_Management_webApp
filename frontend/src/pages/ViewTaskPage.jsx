import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { getTaskById } from '../utils/api';

const ViewTaskPage = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        setTask(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load task.');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">Loading task...</div>
      </Layout>
    );
  }

  if (error || !task) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto rounded-lg bg-red-50 p-6 text-red-700 shadow-sm">
          {error || 'Task not found.'}
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
              <p className="text-sm text-gray-500">Assigned to: {task.assignedTo}</p>
            </div>
            <div className="space-x-2">
              <Link
                to="/tasks"
                className="inline-flex items-center rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
              >
                Back
              </Link>
              <Link
                to={`/tasks/edit/${task._id}`}
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Edit
              </Link>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-gray-800">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">Description</h2>
              <p className="mt-2 whitespace-pre-line">{task.description}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-500">Status</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{task.status}</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-sm font-semibold text-gray-500">Deadline</p>
                <p className="mt-1 text-lg font-medium text-gray-900">{new Date(task.deadline).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewTaskPage;
