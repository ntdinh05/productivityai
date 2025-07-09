import React, { createContext, useContext, useState } from 'react';

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
  tasks: Task[];
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
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Productivity AI Project',
      time: '18:00',
      date: '2025-07-05',
      progress: 'In Progress',
      description: 'Complete the main features of the productivity AI application'
    },
    {
      id: 2,
      title: 'Apply responsive design for the App',
      time: '10:00',
      date: '2025-07-06',
      progress: 'Not Started',
      description: 'Make the app responsive across different screen sizes'
    },
    {
      id: 3,
      title: 'Implement dark mode',
      time: '14:00',
      date: '2025-07-07',
      progress: 'Not Started',
      description: 'Add dark mode theme support to the application',
      subtasks: [
        {
          id: 1,
          title: 'Design dark mode UI',
          date: '2025-07-07',
          time: '14:00',
          progress: 'Not Started',
        },
        {
          id: 2,
          title: 'Implement dark mode styles',
          date: '2025-07-07',
          time: '15:00',
          progress: 'Not Started',
        },
      ]
    },
    {
      id: 4,
      title: 'Fix bugs',
      time: '16:00',
      date: '2025-07-08',
      progress: 'In Progress',
      description: 'Fix critical bugs reported in the issue tracker',
      subtasks: [
        { id: 1,
          title: 'Investigate login issue',
          date: '2025-07-08',
          time: '16:00',
          progress: 'Not Started',
        },
        {
          id: 2,
          title: 'Fix UI glitches on home screen',
          date: '2025-07-08',
          time: '17:00',
          progress: 'Not Started',
        },
      ]
    },
  ]);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const addTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  const deleteTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
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