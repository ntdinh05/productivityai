import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SubTask, useTask } from '../(context)/TaskContext';

interface DisplaySubTaskComponentProps {
  subTask: SubTask;
  onEdit?: (subTask: SubTask) => void;
}

function DisplaySubTaskComponent({ subTask, onEdit }: DisplaySubTaskComponentProps) {
  const { updateSubTask, deleteSubTask, loading } = useTask();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      const updatedSubTask = {
        ...subTask,
        is_completed: !subTask.is_completed,
      };
      await updateSubTask(updatedSubTask);
    } catch (error) {
      console.error('Error updating subtask:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubTask(subTask.id);
    } catch (error) {
      console.error('Error deleting subtask:', error);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    return timeStr.includes(':') ? timeStr : `${timeStr}:00`;
  };

  return (
    <View style={[styles.container, subTask.is_completed && styles.completedContainer]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={handleToggleComplete}
            disabled={isUpdating || loading}
          >
            <Ionicons
              name={subTask.is_completed ? 'checkmark-circle' : 'ellipse-outline'}
              size={24}
              color={subTask.is_completed ? '#4CAF50' : '#ddd'}
            />
          </TouchableOpacity>
          <Text style={[styles.title, subTask.is_completed && styles.completedText]}>
            {subTask.title}
          </Text>
        </View>
        
        {subTask.description && (
          <Text style={[styles.description, subTask.is_completed && styles.completedText]}>
            {subTask.description}
          </Text>
        )}
        
        <View style={styles.metadata}>
          <Text style={styles.dateTime}>
            📅 {formatDate(subTask.due_date)} ⏰ {formatTime(subTask.time)}
          </Text>
          <Text style={[styles.status, subTask.is_completed && styles.completedStatus]}>
            {subTask.is_completed ? 'Completed' : 'In Progress'}
          </Text>
        </View>
      </View>
      
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onEdit(subTask)}
          >
            <Ionicons name="pencil" size={20} color="#666" />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleDelete}
          disabled={loading}
        >
          <Ionicons name="trash" size={20} color="#ff4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  completedContainer: {
    backgroundColor: '#f0f8f0',
    borderColor: '#d4edda',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  checkbox: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginLeft: 32,
  },
  metadata: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 32,
  },
  dateTime: {
    fontSize: 12,
    color: '#888',
  },
  status: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E9762B',
  },
  completedStatus: {
    color: '#4CAF50',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default DisplaySubTaskComponent;