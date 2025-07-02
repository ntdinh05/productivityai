import React, { createContext, useContext, useState } from 'react';

export interface Task {
  id: number;
  title: string;
  time: string;
  progress: 'Not Started' | 'In Progress' | 'Completed';
  description?: string;
}

interface TaskContextType {
  tasks: Task[];
  selectedTask: Task | null;
  modalVisible: boolean;
  setTasks: (tasks: Task[]) => void;
  openTaskModal: (task: Task) => void;
  closeTaskModal: () => void;
  openTaskInMyTasks: (task: Task, navigation: any) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Productivity AI Project',
      time: '18:00',
      progress: 'In Progress',
      description: 'Complete the main features of the productivity AI application'
    },
    {
      id: 2,
      title: 'Apply responsive design for the App',
      time: '10:00',
      progress: 'Not Started',
      description: 'Make the app responsive across different screen sizes'
    },
    {
      id: 3,
      title: 'Implement dark mode',
      time: '14:00',
      progress: 'Not Started',
      description: 'Add dark mode theme support to the application'
    },
    {
      id: 4,
      title: 'Fix bugs',
      time: '16:00',
      progress: 'In Progress',
      description: 'Fix critical bugs reported in the issue tracker'
    },
  ]);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openTaskModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const closeTaskModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const openTaskInMyTasks = (task: Task, navigation: any) => {
    setSelectedTask(task);
    setModalVisible(true);
    // Navigate to MyTasks tab
    navigation.navigate('mytasks');
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      selectedTask,
      modalVisible,
      setTasks,
      openTaskModal,
      closeTaskModal,
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