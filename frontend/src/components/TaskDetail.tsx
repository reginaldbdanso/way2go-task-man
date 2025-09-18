import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, CheckCircle, Circle, Clock } from 'lucide-react';
import type { Task, Milestone } from './types';
import { api } from '../hooks/useApi';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const fetchTask = async (taskId: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/tasks/${taskId}`);
      setTask(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (status: Task['status']) => {
    if (!task) return;

    try {
      const response = await api.put(`/tasks/${task.id}`, { status });
      setTask(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  const updateMilestoneStatus = async (milestoneId: string, status: Milestone['status']) => {
    if (!task) return;

    try {
      await api.put(`/milestones/${milestoneId}`, { status });
      // Refresh the task to get updated milestones
      await fetchTask(task.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update milestone');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Circle className="h-4 w-4 text-gray-400" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-gray-600';
      case 'in_progress':
        return 'text-blue-600';
      case 'completed':
        return 'text-green-600 line-through';
      default:
        return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Task not found</h3>
        <p className="text-gray-600 mb-4">{error || 'The task you\'re looking for doesn\'t exist'}</p>
        <button onClick={() => navigate('/')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
            <p className="text-gray-600 text-lg">{task.description}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={task.status}
              onChange={(e) => updateTaskStatus(e.target.value as Task['status'])}
              className="input w-auto"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Milestones Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Milestones</h2>
          <button className="btn-primary flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Milestone</span>
          </button>
        </div>

        {task.milestones && task.milestones.length > 0 ? (
          <div className="space-y-4">
            {task.milestones
              .sort((a, b) => a.order_index - b.order_index)
              .map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <button
                    onClick={() => updateMilestoneStatus(
                      milestone.id, 
                      milestone.status === 'completed' ? 'pending' : 'completed'
                    )}
                    className="flex-shrink-0"
                  >
                    {getStatusIcon(milestone.status)}
                  </button>
                  
                  <div className="flex-1">
                    <h3 className={`font-medium ${getStatusColor(milestone.status)}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {milestone.description}
                    </p>
                  </div>
                  
                  <span className="text-xs text-gray-500">
                    Step {milestone.order_index}
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Circle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
            <p className="text-gray-600 mb-4">Break down your task into smaller, actionable steps</p>
            <button className="btn-primary">
              Add First Milestone
            </button>
          </div>
        )}
      </div>

      {/* Task Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Priority</h3>
          <p className="text-lg font-semibold text-gray-900 capitalize">{task.priority}</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Created</h3>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Last Updated</h3>
          <p className="text-lg font-semibold text-gray-900">
            {new Date(task.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
