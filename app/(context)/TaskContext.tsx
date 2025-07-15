import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '@/utils/taskservice';

export interface Task {
  id: number;
  title: string;
  date: string;
  time: string;
  progress: 'Not Started' | 'In Progress' | 'Completed';
  description?: string;
  subtasks?: SubTask[];
}
export type SubTask = Omit<Task, 'subtasks'>;

interface TaskContextType {
  //Declare the context type
  selectedTask: Task | null;
  modalVisible: boolean;
  editModalVisible: boolean;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: number) => void;
  openTaskModal: (task: Task) => void;
  closeTaskModal: () => void;
  openEditModal: (task: Task) => void;
  closeEditModal: () => void;
  openTaskInMyTasks: (task: Task, navigation: any) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Understand state mechanism
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    taskService.getTasks()
      .then(setTasks)
      .catch(err => console.error('Failed to fetch tasks:', err));
  }, []);

  const addTask = async (task: Omit<Task, 'id'>) => {
    try {
      const newTask = await taskService.createTask(task);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const updateTask = async (updatedTask: Task) => {
    try {
      const newTask = await taskService.updateTask(updatedTask);
      setTasks(prev =>
        prev.map(task => (task.id === newTask.id ? newTask : task))
      );
    } catch (err) {
      console.error('Failed to update task:', err);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
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
      setTasks,
      addTask,
      updateTask,
      deleteTask,
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