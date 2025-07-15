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

  async createTask(task: Omit<Task, 'id'>): Promise<Task[]>{
    try {
      const { data,error } = await supabase
        .from('tasks')
        .insert(task)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      return data ;
    } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
  },

  async updateTask(task: Task): Promise<Task> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title: task.title,
        due_date: task.due_date,
        time: task.time,
        is_completed: task.is_completed,
        description: task.description,
      })
      .eq('id', task.id)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
},

  async deleteTask(taskId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
},


};