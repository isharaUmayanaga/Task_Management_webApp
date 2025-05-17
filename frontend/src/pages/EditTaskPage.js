
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { getTaskById, updateTask } from '../utils/api';

const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  

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

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError('');
      await updateTask(id, formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading task data...</div>
      </Layout>
    );
  }

  if (!task && !loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">Task not found or you don't have permission to edit it.</div>
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

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Edit Task
        </h1>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <TaskForm 
              initialData={task} 
              onSubmit={handleSubmit} 
              buttonText={submitting ? 'Saving...' : 'Save Changes'} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditTaskPage;
