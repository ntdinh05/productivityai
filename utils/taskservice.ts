import { Task, SubTask } from '../app/(context)/TaskContext';
import { supabase } from './supabase';

export const taskService = {
  // Fetch all tasks for the current user
  async getTasks(): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')

      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async getSubTasks(): Promise<SubTask[]> {
    try {
      const { data, error } = await supabase
        .from('subtasks')
        .select('*')

      if (error) {
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
};