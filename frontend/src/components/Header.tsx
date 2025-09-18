import { Link } from 'react-router-dom';
import { Plus, CheckSquare } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">Way2go Task Manager</h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
            <Link 
              to="/create" 
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Task</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
