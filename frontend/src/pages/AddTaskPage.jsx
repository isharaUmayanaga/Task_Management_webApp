import React from 'react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';

const AddTaskPage = () => {
  const handleSubmit = (data) => {
    // TODO: call API to add task
    console.log('Create task', data);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add Task</h1>
        <TaskForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default AddTaskPage;
