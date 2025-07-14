import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SubTask, useTask } from '../(context)/TaskContext';

function TodayTask() {
  const { tasks, updateTask } = useTask();
  const [currentSubTasks, setCurrentSubTasks] = useState<SubTask[]>([]);
  
  useEffect(() => {
    const getSubTasks = () => {
      const today = new Date();
      const todayString = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      console.log('Today date:', todayString);
      
      // Filter tasks for today
      const todayTasks = tasks.filter(task => {
        console.log(`Comparing task date: ${task.date} with today: ${todayString}`);
        return task.date === todayString;
      });
      
      console.log('Today\'s Tasks:', todayTasks);

      // Get all subtasks from today's tasks
      const allSubTasks = todayTasks.flatMap(task => {
        if (task.subtasks) {
          // Also filter subtasks by today's date
          return task.subtasks.filter(subtask => subtask.date === todayString);
        }
        return [];
      });
      
      setCurrentSubTasks(allSubTasks);
      console.log('Today\'s SubTasks:', allSubTasks);
    };
    
    getSubTasks();
  }, [tasks]); // Add tasks as dependency so it updates when tasks change

  const toggleTask = (id: string | number) => {
    // Update the subtask progress in the local state
    setCurrentSubTasks(prev =>
      prev.map(subTask =>
        subTask.id === id
          ? {
              ...subTask,
              progress: subTask.progress === 'Completed' ? 'Not Started' : 'Completed',
            }
          : subTask
      )
    );

    // Also update the main tasks context
    const updatedTasks = tasks.map(task => {
      if (task.subtasks) {
        const updatedSubtasks = task.subtasks.map(subtask =>
          subtask.id === id
            ? {
                ...subtask,
                progress: subtask.progress === 'Completed' ? 'Not Started' : 'Completed',
              }
            : subtask
        );
        return { ...task, subtasks: updatedSubtasks };
      }
      return task;
    });

    // Update each task that was modified
    updatedTasks.forEach(task => {
      const originalTask = tasks.find(t => t.id === task.id);
      if (originalTask && JSON.stringify(originalTask.subtasks) !== JSON.stringify(task.subtasks)) {
        updateTask(task);
      }
    });
  };

  // Calculate completion percentage
  const completedCount = currentSubTasks.filter(task => task.progress === 'Completed').length;
  const totalCount = currentSubTasks.length;
  const completionPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={styles.card}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Today</Text>
          <Text style={styles.summaryPercent}>{completionPercent}%</Text>
        </View>
        {currentSubTasks.length > 0 ? (
          <FlatList
            data={currentSubTasks}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.taskRow} key={item.id}>
                <View style={styles.leftSection}>
                  <TouchableOpacity onPress={() => toggleTask(item.id)}>
                    <View style={[
                      styles.checkbox,
                      {
                        backgroundColor: item.progress === 'Completed' ? '#4F704F' : 'transparent',
                        borderColor: '#4F704F',
                        justifyContent: 'center',
                        alignItems: 'center',
                      },
                    ]}>
                      {item.progress === 'Completed' && (
                        <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={[
                    styles.taskTitle,
                    item.progress === 'Completed' && styles.taskTitleChecked,
                  ]}>{item.title}</Text>
                </View>
                <View style={styles.rightSection}>
                  <Text style={styles.time}>{item.time}</Text>
                  <Ionicons name="alarm" size={18} color="#222" style={{ marginLeft: 6 }} />
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View style={styles.noTasksContainer}>
            <Text style={styles.noTasksText}>No subtasks for today</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 16,
    width: '90%',
    marginTop: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 12,
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  taskTitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  taskTitleChecked: {
    fontWeight: '700',
    color: '#2E5D3B',
    textDecorationLine: 'line-through',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  noTasksContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noTasksText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default TodayTask;
