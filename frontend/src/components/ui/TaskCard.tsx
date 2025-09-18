import { Link } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle, MoreVertical } from 'lucide-react';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

export function TaskCard({ task }: TaskCardProps) {
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3 mb-4">
            {task.description}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-3">
        {/* Status and Priority */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {getStatusIcon(task.status)}
            <span className="ml-1 capitalize">{task.status.replace('_', ' ')}</span>
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority} priority
          </span>
        </div>

        {/* Milestones count */}
        {task.milestones && task.milestones.length > 0 && (
          <div className="text-sm text-gray-600">
            {task.milestones.filter(m => m.status === 'completed').length} of {task.milestones.length} milestones completed
          </div>
        )}

        {/* Created date */}
        <div className="text-xs text-gray-500">
          Created {formatDate(task.created_at)}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-gray-200">
          <Link 
            to={`/tasks/${task.id}`}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
