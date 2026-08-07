import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { getTasks, deleteTask } from '../utils/api';

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Unable to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) {
      return;
    }

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      alert('Unable to delete task.');
    }
  };

  const stats = tasks.reduce(
    (acc, task) => {
      acc.total += 1;
      acc[task.status] += 1;
      return acc;
    },
    { total: tasks.length, Pending: 0, 'In Progress': 0, Done: 0 }
  );

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-r from-indigo-50 via-white to-slate-50 p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
              <p className="mt-2 text-sm text-slate-600">A polished view of your tasks with quick actions and status details.</p>
            </div>
            <Link
              to="/tasks/add"
              className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              + Add Task
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total tasks</p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pending</p>
              <p className="mt-3 text-3xl font-semibold text-amber-600">{stats.Pending}</p>
            </div>
            <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
              <p className="mt-3 text-3xl font-semibold text-blue-600">{stats['In Progress']}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            Loading tasks...
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-red-50 p-8 text-center text-red-700 shadow-sm ring-1 ring-red-200">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-gray-600">No tasks found. Create one to get started.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Deadline</th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{task.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{task.assignedTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">{task.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    {isAdmin && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                        {task.createdBy?.name || 'Unknown'}
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Link
                        to={`/tasks/view/${task._id}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 transition hover:bg-slate-200"
                      >
                        View
                      </Link>
                      <Link
                        to={`/tasks/edit/${task._id}`}
                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-700 transition hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="rounded-full bg-red-100 px-3 py-1 text-red-700 transition hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TaskListPage;
