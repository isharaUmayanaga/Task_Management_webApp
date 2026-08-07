import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';
import { createTask } from '../utils/api';

const AddTaskPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createTask(data);
      navigate('/tasks');
    } catch (error) {
      console.error(error);
      alert('Unable to create task.');
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900 mb-6">Create a new task</h1>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AddTaskPage;
