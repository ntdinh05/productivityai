import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskList from '../(components)/tasklist';
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
  const [todos, setTodos] = useState<Task[] | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>My tasks</Text>
      </View>
      {/* Todos list */}
      <TaskList/>
      <TouchableOpacity style={styles.fab} onPress={() => { /* TODO: Add task logic */ }}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default MyTasks;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F5EF',
  },
  headerRow: {
    marginTop: 24,
    marginBottom: 0,
    marginLeft: 18,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222',
    letterSpacing: 0.2,
  },
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 10,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E5D3B',
    flex: 1,
  },
  summaryPercent: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E5D3B',
    textAlign: 'right',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 36,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2E5D3B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  fabText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
    marginTop: -2,
  },
});
