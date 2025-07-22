import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SubTask, useTask } from '../(context)/TaskContext';

interface SubTaskComponentProps {
  parentTaskId: string; // The ID of the parent task
  onSubTaskAdded?: () => void; // Optional callback when subtask is added
}

function addsubtaskcomponent({ parentTaskId, onSubTaskAdded }: SubTaskComponentProps) {
  const { addSubTask, loading, error } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  
  const progressOptions = ['Not Started', 'In Progress', 'Completed'];

  const handleAddSubTask = async () => {
    if (!title.trim()) {
      alert('Please enter a subtask title');
      return;
    }

    if (!date || !time) {
      alert('Please enter both date and time');
      return;
    }

    try {
      const newSubTask: Omit<SubTask, 'id'> = {
        title: title.trim(),
        description: description.trim(),
        due_date: date,
        time: time,
        is_completed: progress === 'Completed',
        parent: parentTaskId,
      };

      await addSubTask(newSubTask);
      
      // Clear form after successful creation
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setProgress('Not Started');
      
      // Call callback if provided
      if (onSubTaskAdded) {
        onSubTaskAdded();
      }
    } catch (err) {
      console.error('Error adding subtask:', err);
      alert('Failed to add subtask. Please try again.');
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setProgress('Not Started');
  };
  return (
    <View style={{ padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
      <View style={styles.formContainer}>
        {/* Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Task Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={title}
            onChangeText={setTitle}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter task description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Date and Time Row */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
            />
          </View>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Time</Text>
            <TextInput
              style={styles.input}
              placeholder="HH:MM"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>

        {/* Progress Status */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.progressContainer}>
            {progressOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.progressButton,
                  progress === option && styles.progressButtonActive,
                ]}
                onPress={() => setProgress(option as any)}
              >
                <Text
                  style={[
                    styles.progressButtonText,
                    progress === option && styles.progressButtonTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
        <TouchableOpacity
          style={[styles.saveButton, loading && { opacity: 0.7 }]}
          onPress={handleAddSubTask}
          disabled={loading}
        >
          <Text style={styles.saveButtonText}>
            {loading ? 'Adding...' : 'Add Subtask'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearForm}>
          <Ionicons name="trash" size={24} color="#666" />
        </TouchableOpacity>
      </View>
      
      {error && (
        <Text style={styles.errorText}>Error: {error}</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  addSubtaskButton: {
    marginLeft: 8,
    padding: 2,
  },
  subTaskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteSubtaskButton: {
    marginLeft: 8,
    padding: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  closeButton: {
    padding: 5,
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  descriptionInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  progressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  progressButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  progressButtonActive: {
    backgroundColor: '#E9762B',
    borderColor: '#E9762B',
  },
  progressButtonText: {
    fontSize: 14,
    color: '#666',
  },
  progressButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#E9762B',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});


export default addsubtaskcomponent;
