import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddTaskModal from '../(components)/addtaskmodal';
import TaskList from '../(components)/tasklist';
import TaskModal from '../(components)/taskmodal';
import TodayTask from '../(components)/todaytask';

enum GOAL {
  daily = "Daily",
  weekly = "Weekly",
  monthly = "Monthly"
}
enum STATUS {
  not_started = "Not started", 
  in_progress = "In progress",
  done = "Done"
}

interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  goal_type: GOAL;
  status: STATUS;
  tags: string[];
  current_state: string;
  desired_state: string;
  created_at: Date;
}

const MyTasks = () => {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // This will ensure the modal shows when navigating to this tab
  useFocusEffect(
    React.useCallback(() => {
      // Modal will automatically show if modalVisible is true from context
    }, [])
  );

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My tasks</Text>
      </View>
      <TodayTask/>
      <TaskList/>
      
      {/* FAB Button */}
      <TouchableOpacity style={styles.fab} onPress={handleAddTask}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      
      {/* Task Detail Modal */}
      <TaskModal />
      
      {/* Add Task Modal */}
      <AddTaskModal 
        visible={showAddTaskModal} 
        onClose={handleCloseAddTaskModal} 
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F1F0E9',
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E9762B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyTasks;