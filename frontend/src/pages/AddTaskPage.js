
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { createTask } from '../utils/api';

const AddTaskPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError('');
      await createTask(formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Create New Task
        </h1>

        {error && (
          <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4">
            <div className="text-red-700">{error}</div>
          </div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <TaskForm 
              onSubmit={handleSubmit} 
              buttonText={loading ? 'Creating...' : 'Create Task'} 
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddTaskPage;
