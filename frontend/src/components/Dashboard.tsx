import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Clock, CheckCircle, AlertCircle, CheckSquare } from 'lucide-react';
import type { Task } from './types';
import { TaskCard } from './ui/TaskCard';
import { api } from '../hooks/useApi';

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusCounts = () => {
    const pending = tasks.filter(task => task.status === 'pending').length;
    const inProgress = tasks.filter(task => task.status === 'in_progress').length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    
    return { pending, inProgress, completed };
  };

  const { pending, inProgress, completed } = getStatusCounts();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading tasks</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={fetchTasks}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600 mt-1">Manage your tasks and track progress</p>
        </div>
        <Link to="/create" className="btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Task</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{pending}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Tasks</h3>
        
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-600 mb-4">Create your first task to get started</p>
            <Link to="/create" className="btn-primary">
              Create Task
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onUpdate={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
