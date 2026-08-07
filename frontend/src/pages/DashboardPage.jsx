import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { getTasks } from '../utils/api';

const DashboardPage = () => {
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, done: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const tasks = await getTasks();
        setStats({
          total: tasks.length,
          pending: tasks.filter((task) => task.status === 'Pending').length,
          inProgress: tasks.filter((task) => task.status === 'In Progress').length,
          done: tasks.filter((task) => task.status === 'Done').length
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-semibold text-slate-900 mb-3">Dashboard</h1>
          <p className="text-slate-600 mb-8">Quick overview of your current task status and progress.</p>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-3xl bg-slate-100 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Total</p>
              <p className="mt-4 text-4xl font-bold text-slate-900">{stats.total}</p>
            </div>
            <div className="rounded-3xl bg-amber-100 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-amber-700">Pending</p>
              <p className="mt-4 text-4xl font-bold text-amber-800">{stats.pending}</p>
            </div>
            <div className="rounded-3xl bg-sky-100 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-sky-700">In Progress</p>
              <p className="mt-4 text-4xl font-bold text-sky-800">{stats.inProgress}</p>
            </div>
            <div className="rounded-3xl bg-emerald-100 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">Done</p>
              <p className="mt-4 text-4xl font-bold text-emerald-800">{stats.done}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
