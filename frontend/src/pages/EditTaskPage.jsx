import React from 'react';
import Layout from '../components/Layout';
import TaskForm from '../components/TaskForm';

const EditTaskPage = () => {
  const handleSubmit = (data) => {
    // TODO: call API to edit task
    console.log('Edit task', data);
  };

  // TODO: load existing task data by id
  const initialData = {};

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
        <TaskForm initialData={initialData} onSubmit={handleSubmit} buttonText="Update" />
      </div>
    </Layout>
  );
};

export default EditTaskPage;
