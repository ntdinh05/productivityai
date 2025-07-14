import { Task } from '@/app/(context)/TaskContext';
import { supabase } from './supabase';

export const taskService = {
  // Fetch all tasks for the current user
  async getTasks(): Promise<Task[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('tasks')
        .select()
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  // Create a new task
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...task,
            user_id: user.id,
          }
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // If there are subtasks, create them separately
      if (task.subtasks && task.subtasks.length > 0) {
        const subtasksWithTaskId = task.subtasks.map(subtask => ({
          ...subtask,
          task_id: data.id,
          user_id: user.id,
        }));

        const { error: subtaskError } = await supabase
          .from('subtasks')
          .insert(subtasksWithTaskId);

        if (subtaskError) {
          throw subtaskError;
        }
      }

      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Update a task
  async updateTask(task: Task): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: task.title,
          description: task.description,
          date: task.date,
          time: task.time,
          progress: task.progress,
        })
        .eq('id', task.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update subtasks if they exist
      if (task.subtasks) {
        for (const subtask of task.subtasks) {
          if (subtask.id) {
            await supabase
              .from('subtasks')
              .update({
                title: subtask.title,
                description: subtask.description,
                date: subtask.date,
                time: subtask.time,
                progress: subtask.progress,
              })
              .eq('id', subtask.id);
          }
        }
      }

      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  async deleteTask(taskId: number): Promise<void> {
    try {
      // Delete subtasks first (due to foreign key constraint)
      await supabase
        .from('subtasks')
        .delete()
        .eq('task_id', taskId);

      // Then delete the main task
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};