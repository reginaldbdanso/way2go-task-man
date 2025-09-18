import { Router } from 'express';
import { supabase, Milestone, CreateMilestoneRequest } from '../db/supabase';

const router = Router();

// GET /api/milestones - Get all milestones for a task
router.get('/', async (req, res) => {
  try {
    const { task_id } = req.query;

    if (!task_id) {
      return res.status(400).json({ error: 'task_id query parameter is required' });
    }

    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('task_id', task_id as string)
      .order('order_index', { ascending: true });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
});

// GET /api/milestones/:id - Get milestone by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching milestone:', error);
    res.status(500).json({ error: 'Failed to fetch milestone' });
  }
});

// POST /api/milestones - Create new milestone
router.post('/', async (req, res) => {
  try {
    const { task_id, title, description, order_index }: CreateMilestoneRequest = req.body;

    if (!task_id || !title || !description || order_index === undefined) {
      return res.status(400).json({ 
        error: 'task_id, title, description, and order_index are required' 
      });
    }

    const { data, error } = await supabase
      .from('milestones')
      .insert({
        task_id,
        title,
        description,
        order_index,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating milestone:', error);
    res.status(500).json({ error: 'Failed to create milestone' });
  }
});

// PUT /api/milestones/:id - Update milestone
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, order_index } = req.body;

    const updateData: Partial<Milestone> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;
    if (order_index !== undefined) updateData.order_index = order_index;

    const { data, error } = await supabase
      .from('milestones')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    if (!data) {
      return res.status(404).json({ error: 'Milestone not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating milestone:', error);
    res.status(500).json({ error: 'Failed to update milestone' });
  }
});

// DELETE /api/milestones/:id - Delete milestone
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('milestones')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting milestone:', error);
    res.status(500).json({ error: 'Failed to delete milestone' });
  }
});

export { router as milestoneRoutes };
