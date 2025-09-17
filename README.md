# 📝 Way2go AI Task Manager

## 🔖 Project Title & Description
The **Way2go AI Task Manager** is a web-based productivity app designed for students, professionals, and teams who struggle to move from broad goals to actionable steps.  

Instead of just recording tasks, the app uses **LLMs to break down goals into milestones** after asking clarifying questions. Users can create tasks via **text or speech-to-text**, track milestones, and manage progress from a clean, simple dashboard.  

This matters because traditional task apps focus on storage rather than action. By combining **task management + AI-powered planning**, this project empowers users to turn ideas into execution.  

---

## 🛠️ Tech Stack
- **Languages:**  
  - Node.js (backend)  
  - JavaScript/TypeScript (frontend)  

- **Frameworks & Libraries:**  
  - Frontend: React + TailwindCSS   
  - Backend: Node.js (Express)  
  - Database: PostgreSQL (Supabase)  
  - Authentication: JWT-based auth (optional MVP feature)  
  - Speech-to-Text: Web Speech API or OpenAI Whisper  

- **Architecture:**  
  - Monolithic architecture  
  - Backend will serve the frontend as static files  

- **Hosting & Deployment:**  
  - Frontend: Render  
  - Backend: Render  
  - Database: Supabase  

- **Tooling:**  
  - Cursor (AI-enhanced IDE)  
  - GitHub Copilot Reviews (AI PR reviews & commit message generation)  

---

## 🧠 AI Integration Strategy

### 🔹 Code Generation
AI will scaffold:  
- React components (task cards, milestone tracker, progress bar)  
- Express routes & models for tasks/milestones  
- CRUD logic for task lifecycle management  

**Example Prompt:**  
> Generate an Express route for creating and retrieving tasks with fields: `title`, `description`, `created_at`, and `milestones[]`. Include Sequelize models.  

---

### 🔹 Testing
AI will support test creation by:  
- Generating **unit tests** for backend routes using **Jest** or **Mocha/Chai**  
- Creating **integration tests** for speech-to-text input and LLM milestone breakdown  
- Suggesting **mock test data** for edge cases  

**Example Prompt:**  
> Generate Jest unit tests for an Express POST `/tasks` endpoint. Cover success, missing fields, and invalid data.  

---

### 🔹 Documentation
AI will help maintain:  
- **JSDoc comments** for Express routes, middleware, and models  
- **Inline comments** in React components  
- **README.md updates** as new features are added  
- **API documentation** auto-generated from Express routes (via Swagger/OpenAPI)  

**Example Prompt:**  
> Add JSDoc comments to this Express controller function explaining parameters, request body schema, and possible responses.  

---

### 🔹 Context-Aware Techniques
AI workflows will be schema- and API-aware by:  
- Feeding the **PostgreSQL schema** into prompts to generate queries and Sequelize models  
- Using the **OpenAPI spec** (via Swagger for Express) to auto-generate frontend API client functions  
- Sharing **file trees and diffs** in prompts for AI-assisted refactoring and PR review  
- Using **commit diffs** as input for AI-generated commit messages and summaries  

**Example Prompt:**  
> Based on this Swagger/OpenAPI spec, generate React hooks for `POST /tasks` and `GET /tasks/:id` using Axios.  

---

## ✅ Deliverable for Part 1
- This detailed **README.md project plan**  
- Initialized repository with structure:  