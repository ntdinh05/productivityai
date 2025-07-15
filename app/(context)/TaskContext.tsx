import { taskService } from '@/utils/taskservice';
import React, { createContext, useContext, useEffect, useState } from 'react';

export interface Task {
  id: string;
  title: string;
  due_date: string;
  time: string;
  is_completed: boolean;
  description?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  subtasks?: SubTask[];
}
export interface SubTask {
  id: string;
  title: string;
  due_date: string;
  time: string;
  is_completed: boolean;
  description?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
  parent: string;
}

interface TaskContextType {
  tasks: Task[];
  selectedTask: Task | null;
  modalVisible: boolean;
  editModalVisible: boolean;
  loading: boolean;
  error: string | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  refreshTasks: () => Promise<void>;
  refreshSubTasks: () => Promise<void>;
  setSubTasks: (subtasks: SubTask[]) => void;
  subtasks: SubTask[];
  openTaskModal: (task: Task) => void;
  closeTaskModal: () => void;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  openTaskInMyTasks: (task: Task, navigation: any) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subtasks, setSubTasks] = useState<SubTask[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from Supabase when component mounts
  useEffect(() => {
    refreshTasks();
    refreshSubTasks();
  }, []);

  const refreshTasks = async () => {
    try {
      setError(null);
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };
  const refreshSubTasks = async () => {
    try {
      setError(null);
      const fetchedSubTasks = await taskService.getSubTasks();
      console.log('Fetched subtasks:', tasks);
      setSubTasks(fetchedSubTasks);
      groupSubtasksWithTasks(fetchedSubTasks);
    } catch (err) {
      console.error('Error fetching subtasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subtasks');
    } finally {
      setLoading(false);
    }
  };
  const groupSubtasksWithTasks = (fetchedSubtasks: SubTask[]) => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({
        ...task,
        subtasks: fetchedSubtasks.filter(subtask => subtask.parent === task.id)
      }))
    );
  };

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Adding task to Supabase:', task);
      const newTask = await taskService.createTask(task);
      console.log('Task added successfully:', newTask);
      setTasks(prevTasks => [...prevTasks, newTask]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err instanceof Error ? err.message : 'Failed to add task');
      
      // Fallback to local state if database fails
      const localTask = {
        ...task,
        id: Date.now().toString(),
      };
      setTasks(prevTasks => [...prevTasks, localTask]);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating task in Supabase:', updatedTask);
      await taskService.updateTask(updatedTask);
      console.log('Task updated successfully');
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
      
      // Fallback to local state if database fails
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Deleting task from Supabase:', taskId);
      await taskService.deleteTask(taskId);
      console.log('Task deleted successfully');
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      
      // Fallback to local state if database fails
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } finally {
      setLoading(false);
    }
  };

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeTaskModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const openEditModal = (task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  const openTaskInMyTasks = (task: Task, navigation: any) => {
    setSelectedTask(task);
    setModalVisible(true);
    navigation.navigate('mytasks');
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      selectedTask,
      modalVisible,
      editModalVisible,
      loading,
      error,
      setTasks,
      addTask,
      updateTask,
      deleteTask,
      refreshTasks,
      refreshSubTasks,
      setSubTasks,
      subtasks,
      openTaskModal,
      closeTaskModal,
      openEditModal,
      closeEditModal,
      openTaskInMyTasks
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;