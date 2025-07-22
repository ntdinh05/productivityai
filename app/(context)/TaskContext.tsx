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
  addTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  addSubTask: (subtask: Omit<SubTask, 'id'>) => Promise<void>;
  updateTask: (updatedTask: Task) => Promise<void>;
  updateSubTask: (updatedSubTask: SubTask) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  deleteSubTask: (subTaskId: string) => Promise<void>;
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
      console.log('🚀 [TaskContext] Starting task creation:', task);
      console.log('🌐 [TaskContext] Calling TaskAPI.createTask...');
      
      const newTask = await TaskAPI.createTask(task);
      console.log('✅ [TaskContext] Task created successfully:', newTask);
      
      setTasks(prevTasks => [newTask, ...prevTasks]);
      return newTask; // Return the created task
    } catch (err) {
      console.error('❌ [TaskContext] Error adding task:', err);
      setError(err instanceof Error ? err.message : 'Failed to add task');
      
      // Fallback to local state if API fails
      const localTask: Task = {
        ...task,
        id: Date.now().toString(),
        is_completed: false,
        subtasks: [],
      };
      console.log('🔄 [TaskContext] Using fallback local task:', localTask);
      setTasks(prevTasks => [localTask, ...prevTasks]);
      return localTask; // Return the local task
    } finally {
      setLoading(false);
    }
  }, []);

  const addSubTask = useCallback(async (subtask: Omit<SubTask, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      console.log('🚀 [TaskContext] Starting subtask creation:', subtask);
      console.log('🌐 [TaskContext] Calling TaskAPI.createSubTask...');
      
      const newSubTask = await TaskAPI.createSubTask(subtask);
      console.log('✅ [TaskContext] Subtask created successfully:', newSubTask);
      
      // Add to subtasks array
      setSubTasks(prevSubTasks => [newSubTask, ...prevSubTasks]);
      
      // Update the parent task with the new subtask
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === subtask.parent
            ? { ...task, subtasks: [...(task.subtasks || []), newSubTask] }
            : task
        )
      );
    } catch (err) {
      console.error('❌ [TaskContext] Error adding subtask:', err);
      setError(err instanceof Error ? err.message : 'Failed to add subtask');
      
      // Fallback to local state if API fails
      const localSubTask: SubTask = {
        ...subtask,
        id: Date.now().toString(),
        is_completed: false,
      };
      console.log('🔄 [TaskContext] Using fallback local subtask:', localSubTask);
      setSubTasks(prevSubTasks => [localSubTask, ...prevSubTasks]);
      
      // Update the parent task with the new subtask
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === subtask.parent
            ? { ...task, subtasks: [...(task.subtasks || []), localSubTask] }
            : task
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper function to check if an ID is temporary/local (created by Date.now())
  const isTemporaryId = (id: string): boolean => {
    // Temporary IDs are created using Date.now().toString(), so they will be numeric
    // Real database IDs are typically UUIDs or other non-numeric formats
    return /^\d+$/.test(id);
  };

  const updateTask = useCallback(async (updatedTask: Task) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating task via TaskAPI:', updatedTask);
      
      // Only update the task if it has a real ID (not temporary)
      if (!isTemporaryId(updatedTask.id)) {
        await TaskAPI.updateTask(updatedTask.id, updatedTask);
      } else {
        console.log('Skipping API update for task with temporary ID:', updatedTask.id);
      }
      
      // Update subtasks individually if they exist, but only those with real IDs
      if (updatedTask.subtasks && updatedTask.subtasks.length > 0) {
        console.log('Updating subtasks:', updatedTask.subtasks);
        for (const subtask of updatedTask.subtasks) {
          if (!isTemporaryId(subtask.id)) {
            console.log('Updating subtask:', subtask);
            await TaskAPI.updateSubTask(subtask.id, subtask);
          } else {
            console.log('Skipping API update for subtask with temporary ID:', subtask.id);
          }
        }
      }
      
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

  const updateSubTask = useCallback(async (updatedSubTask: SubTask) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Updating subtask via TaskAPI:', updatedSubTask);
      
      // Only update the subtask if it has a real ID (not temporary)
      if (!isTemporaryId(updatedSubTask.id)) {
        await TaskAPI.updateSubTask(updatedSubTask.id, updatedSubTask);
        console.log('Subtask updated successfully');
      } else {
        console.log('Skipping API update for subtask with temporary ID:', updatedSubTask.id);
      }
      
      // Update subtasks array
      setSubTasks(prevSubTasks =>
        prevSubTasks.map(subtask =>
          subtask.id === updatedSubTask.id ? updatedSubTask : subtask
        )
      );
      
      // Update the parent task's subtasks
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedSubTask.parent
            ? {
                ...task,
                subtasks: task.subtasks?.map(subtask =>
                  subtask.id === updatedSubTask.id ? updatedSubTask : subtask
                )
              }
            : task
        )
      );
    } catch (err) {
      console.error('Error updating subtask:', err);
      setError(err instanceof Error ? err.message : 'Failed to update subtask');
      
      // Fallback to local state
      setSubTasks(prevSubTasks =>
        prevSubTasks.map(subtask =>
          subtask.id === updatedSubTask.id ? updatedSubTask : subtask
        )
      );
      
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === updatedSubTask.parent
            ? {
                ...task,
                subtasks: task.subtasks?.map(subtask =>
                  subtask.id === updatedSubTask.id ? updatedSubTask : subtask
                )
              }
            : task
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
      
      // Only delete the task if it has a real ID (not temporary)
      if (!isTemporaryId(taskId)) {
        await TaskAPI.deleteTask(taskId);
        console.log('Task deleted successfully');
      } else {
        console.log('Skipping API delete for task with temporary ID:', taskId);
      }
      
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

  const deleteSubTask = useCallback(async (subTaskId: string) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Deleting subtask via TaskAPI');
      
      // Only delete the subtask if it has a real ID (not temporary)
      if (!isTemporaryId(subTaskId)) {
        await TaskAPI.deleteSubTask(subTaskId);
        console.log('Subtask deleted successfully');
      } else {
        console.log('Skipping API delete for subtask with temporary ID:', subTaskId);
      }
      
      // Remove from subtasks array
      setSubTasks(prevSubTasks => prevSubTasks.filter(subtask => subtask.id !== subTaskId));
      
      // Remove from parent task's subtasks
      setTasks(prevTasks =>
        prevTasks.map(task => ({
          ...task,
          subtasks: task.subtasks?.filter(subtask => subtask.id !== subTaskId)
        }))
      );
    } catch (err) {
      console.error('Error deleting subtask:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete subtask');
      
      // Fallback to local state
      setSubTasks(prevSubTasks => prevSubTasks.filter(subtask => subtask.id !== subTaskId));
      
      setTasks(prevTasks =>
        prevTasks.map(task => ({
          ...task,
          subtasks: task.subtasks?.filter(subtask => subtask.id !== subTaskId)
        }))
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const openTaskModal = useCallback(async (task: Task) => {
    console.log('🔍 [TaskContext] Opening task modal for task:', task.id);
    setSelectedTask(task);
    setModalVisible(true);
    
    // Refresh subtasks to ensure we have the latest data
    await refreshSubTasks();
  }, [refreshSubTasks]);

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
      addSubTask,
      updateTask,
      updateSubTask,
      deleteTask,
      deleteSubTask,
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