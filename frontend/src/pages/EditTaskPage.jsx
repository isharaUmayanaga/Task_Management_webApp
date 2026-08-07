import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { getTaskById, updateTask } from '../utils/api';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTask = async () => {
      try {
        setLoading(true);
        const data = await getTaskById(id);
        setTaskData(data);
      } catch (err) {
        console.error(err);
        setError('Unable to load task.');
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await updateTask(id, data);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      alert('Unable to update task.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">Loading task...</div>
      </Layout>
    );
  }

  if (error || !taskData) {
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
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6">Update task details</h1>
        <TaskForm initialData={taskData} onSubmit={handleSubmit} buttonText="Update" />
      </div>
    </Layout>
  );
};

export default EditTaskPage;
