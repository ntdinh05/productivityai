import Ionicons from '@expo/vector-icons/Ionicons';
import { Checkbox } from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const dummyTasks = [
  {
    id: 1,
    title: 'Homework 331',
    time: '18:00',
    checked: true,
  },
  {
    id: 2,
    title: 'Homework',
    time: '18:00',
    checked: false,
  },
  {
    id: 3,
    title: 'Homework',
    time: '18:00',
    checked: false,
  },
  {
    id: 4,
    title: 'Homework',
    time: '18:00',
    checked: false,
  },
];

function tasklist() {
  const [tasks, setTasks] = useState(dummyTasks);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    ));
  };

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={styles.card}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Today</Text>
          <Text style={styles.summaryPercent}>20%</Text>
        </View>
        {tasks.map(task => (
          <View style={styles.taskRow} key={task.id}>
            <View style={styles.leftSection}>
              <Checkbox
                value={task.checked}
                onValueChange={() => toggleTask(task.id)}
                color={task.checked ? '#2E5D3B' : '#B0B0B0'}
                style={styles.checkbox}
              />
              <Text style={[styles.taskTitle, task.checked && styles.taskTitleChecked]}>{task.title}</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={styles.time}>{task.time}</Text>
              <Ionicons name="alarm" size={18} color="#222" style={{ marginLeft: 6 }} />
            </View>
          </View>
        ))}
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
  },
  taskTitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  taskTitleChecked: {
    fontWeight: '700',
    color: '#2E5D3B',
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
    backgroundColor: '#fff',
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

});

export default tasklist;
