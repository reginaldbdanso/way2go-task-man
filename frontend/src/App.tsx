import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { TaskDetail } from './components/TaskDetail';
import { CreateTask } from './components/CreateTask';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/create" element={<CreateTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
