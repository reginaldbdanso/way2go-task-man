"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const supabase_1 = require("../db/supabase");
const router = (0, express_1.Router)();
exports.taskRoutes = router;
// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase_1.supabase
            .from('tasks')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});
// GET /api/tasks/:id - Get task by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data, error } = await supabase_1.supabase
            .from('tasks')
            .select(`
        *,
        milestones (*)
      `)
            .eq('id', id)
            .single();
        if (error) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: 'Failed to fetch task' });
    }
});
// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
    try {
        const { title, description, priority = 'medium' } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const { data, error } = await supabase_1.supabase
            .from('tasks')
            .insert({
            title,
            description,
            priority,
            status: 'pending'
        })
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(201).json(data);
    }
    catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Failed to create task' });
    }
});
// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority } = req.body;
        const updateData = {};
        if (title !== undefined)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        if (status !== undefined)
            updateData.status = status;
        if (priority !== undefined)
            updateData.priority = priority;
        const { data, error } = await supabase_1.supabase
            .from('tasks')
            .update(updateData)
            .eq('id', id)
            .select()
            .single();
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        if (!data) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(data);
    }
    catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Failed to update task' });
    }
});
// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // First delete all milestones for this task
        await supabase_1.supabase
            .from('milestones')
            .delete()
            .eq('task_id', id);
        // Then delete the task
        const { error } = await supabase_1.supabase
            .from('tasks')
            .delete()
            .eq('id', id);
        if (error) {
            return res.status(400).json({ error: error.message });
        }
        res.status(204).send();
    }
    catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Failed to delete task' });
    }
});
//# sourceMappingURL=tasks.js.map