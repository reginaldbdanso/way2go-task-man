# 📝 Way2go AI Task Manager

## 🔖 Project Description
The **Way2go AI Task Manager** is a web-based productivity app designed for students, professionals, and teams who struggle to move from broad goals to actionable steps.  

Instead of just recording tasks, the app uses **LLMs to break down goals into milestones** after asking clarifying questions. Users can create tasks via **text or speech-to-text**, track milestones, and manage progress from a clean, simple dashboard.  

This matters because traditional task apps focus on storage rather than action. By combining **task management + AI-powered planning**, this project empowers users to turn ideas into execution.  

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd way2go-task-manager
   npm run install:all
   ```

2. **Set up environment variables:**
   
   **Backend** (`backend/.env`):
   ```env
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```
   
   **Frontend** (`frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Set up Supabase database:**
   ```sql
   -- Create tasks table
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
     priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     user_id UUID
   );

   -- Create milestones table
   CREATE TABLE milestones (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
     order_index INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
   ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
   ```

4. **Start development servers:**
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

### Backend
- **Node.js** with TypeScript
- **Express.js** for API server
- **Supabase** for database and auth
- **CORS** and **Helmet** for security
- **Morgan** for logging

### Development Tools
- **TypeScript** for type safety
- **Nodemon** for backend hot reload
- **Concurrently** for running both servers
- **Jest** for testing (planned)

## 📁 Project Structure

```
way2go-task-manager/
├── frontend/                    # React frontend
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── ui/             # Reusable UI components
│   │   │   └── types/          # TypeScript type definitions
│   │   ├── hooks/              # Custom React hooks
│   │   └── App.tsx             # Main app component
│   └── package.json
├── backend/                     # Express backend
│   ├── src/
│   │   ├── routes/             # API route handlers
│   │   ├── db/                 # Database configuration
│   │   └── index.ts            # Server entry point
│   └── package.json
├── database/                    # Database schemas and migrations
├── docs/                       # Documentation
│   ├── rules.mdc              # AI collaboration guidelines
│   └── reflection.md          # AI usage reflection
└── package.json               # Root package.json
```

## 🧠 AI Integration Features

### ✅ Implemented
- **Speech-to-Text**: Web Speech API integration for task creation
- **AI-Assisted Scaffolding**: Complete project structure generated with AI
- **Type-Safe API**: Full TypeScript integration across frontend and backend
- **Responsive UI**: Modern, accessible interface with TailwindCSS

### 🚧 Planned
- **AI Milestone Breakdown**: OpenAI integration for automatic task decomposition
- **Smart Suggestions**: AI-powered task recommendations
- **Progress Analytics**: AI insights on productivity patterns

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm run test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend
```

### Test Coverage
- Unit tests for API endpoints
- Component testing with React Testing Library
- Integration tests for database operations

## 🚀 Deployment

### Frontend (Render)
1. Connect GitHub repository
2. Set build command: `cd frontend && npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render)
1. Connect GitHub repository
2. Set build command: `cd backend && npm run build`
3. Set start command: `cd backend && npm start`
4. Add environment variables for Supabase and OpenAI

## 🤖 AI Collaboration

This project was built using AI-assisted development techniques. See `docs/reflection.md` for detailed insights on the AI collaboration process.

### Key AI Tools Used
- **Cursor IDE**: AI-powered code generation and editing
- **Context7 MCP**: File context and code understanding
- **Supabase MCP**: Database schema integration

## 📚 API Documentation

### Tasks Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Milestones Endpoints
- `GET /api/milestones?task_id=:id` - Get milestones for task
- `POST /api/milestones` - Create milestone
- `PUT /api/milestones/:id` - Update milestone
- `DELETE /api/milestones/:id` - Delete milestone

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat(ai): add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## ✅ Project Status

### Phase 1: Foundation ✅
- [x] Project structure and configuration
- [x] Basic React components and routing
- [x] Express API with CRUD operations
- [x] Supabase database integration
- [x] Speech-to-text functionality
- [x] TypeScript type safety
- [x] Responsive UI with TailwindCSS

### Phase 2: AI Features 🚧
- [ ] OpenAI integration for milestone breakdown
- [ ] Smart task suggestions
- [ ] Progress analytics and insights
- [ ] Advanced speech processing

### Phase 3: Advanced Features 📋
- [ ] User authentication
- [ ] Team collaboration
- [ ] Mobile app
- [ ] Advanced AI features  