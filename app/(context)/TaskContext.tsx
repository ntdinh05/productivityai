import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import TaskAPI from '../../backend/api/taskservice';

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

  const refreshTasks = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      console.log('Fetching tasks via TaskAPI');
      const fetchedTasks = await TaskAPI.getAllTasks();
      console.log('Tasks fetched successfully:', fetchedTasks.length, 'tasks');
      setTasks(fetchedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshSubTasks = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      console.log('Fetching subtasks via TaskAPI');
      const fetchedSubTasks = await TaskAPI.getAllSubTasks();
      console.log('Subtasks fetched successfully:', fetchedSubTasks.length, 'subtasks');
      setSubTasks(fetchedSubTasks);
      
      // Group subtasks with tasks after both are loaded
      if (fetchedSubTasks.length > 0) {
        groupSubtasksWithTasks(fetchedSubTasks);
      }
    } catch (err) {
      console.error('Error fetching subtasks:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subtasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const groupSubtasksWithTasks = useCallback((fetchedSubtasks: SubTask[]) => {
    console.log('Grouping subtasks with tasks:', fetchedSubtasks.length, 'subtasks');
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => ({
        ...task,
        subtasks: fetchedSubtasks.filter(subtask => subtask.parent === task.id)
      }));
      console.log('Updated tasks with subtasks:', updatedTasks);
      return updatedTasks;
    });
  }, []);

  const addTask = useCallback(async (task: Omit<Task, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Adding task via TaskAPI');
      const newTask = await TaskAPI.createTask(task);
      console.log('Task created successfully');
      
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError(err instanceof Error ? err.message : 'Failed to add task');
      
      // Fallback to local state if API fails
      const localTask: Task = {
        ...task,
        id: Date.now().toString(),
        is_completed: false,
        subtasks: [],
      };
      setTasks(prevTasks => [localTask, ...prevTasks]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating task via TaskAPI');
      await TaskAPI.updateTask(updatedTask.id, updatedTask);
      await TaskAPI.updateSubTask(updatedTask.subtasks || []);
      console.log('Task updated successfully');
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError(err instanceof Error ? err.message : 'Failed to update task');
      
      // Fallback to local state
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Deleting task via TaskAPI');
      await TaskAPI.deleteTask(taskId);
      console.log('Task deleted successfully');
      
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      
      // Fallback to local state
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } finally {
      setLoading(false);
    }
  }, []);

  const openTaskModal = useCallback((task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  }, []);

  const closeTaskModal = useCallback(() => {
    setModalVisible(false);
    setSelectedTask(null);
  }, []);

  const openEditModal = useCallback((task: Task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalVisible(false);
    setSelectedTask(null);
  }, []);

  const openTaskInMyTasks = useCallback((task: Task, navigation: any) => {
    setSelectedTask(task);
    setModalVisible(true);
    navigation.navigate('mytasks');
  }, []);

  // Update the useEffect to ensure proper sequencing
  useEffect(() => {
    const loadData = async () => {
      await refreshTasks();
      await refreshSubTasks();
    };
    loadData();
  }, [refreshTasks, refreshSubTasks]);

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