import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SubTask, useTask } from '../(context)/TaskContext';
import AddSubTasks from './addsubtaskcomponent';
import DisplaySubTaskComponent from './displaysubstackcomponent';
interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose }) => {
  const { addTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [subTasks, setSubTasks] = useState<SubTask[]>([]); // State for sub-tasks
  const [progress, setProgress] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
 
  const progressOptions = ['Not Started', 'In Progress', 'Completed'];

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      due_date: date || new Date().toISOString().split('T')[0], // Default to today
      time: time || '09:00',
      // subtasks: subTasks, // Include sub-tasks
      is_completed: false,
    };
    addTask(newTask)

    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setProgress('Not Started');
    setSubTasks([]); // Clear sub-tasks
    
    onClose();
  };

  const handleCancel = () => {
    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setProgress('Not Started');
    setSubTasks([]); // Clear sub-tasks
    
    onClose();
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    setSubTasks(prevSubTasks => prevSubTasks.filter(subTask => subTask.id !== subTaskId));
  };

  const addSubTasks = (subTask: SubTask) => {
    setSubTasks(prev => [...prev, subTask]);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Add New Task</Text>
              <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Form Fields */}
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

            {/* Add subtask section */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Add sub-tasks</Text>
            </View>

            {/* Section to create subtasks */}
         
            <View style={styles.subTaskRow}>
              <AddSubTasks
                subTasks={subTasks}
                addSubTasks={addSubTasks}
              />
            </View>
            {subTasks.length > 0 ? (
              <View>
                {subTasks.map((subTask) => (
                  <View key={subTask.id} style={styles.subTaskRow}>
                    <DisplaySubTaskComponent
                      subTask={subTask}
                    />
                    <TouchableOpacity
                      onPress={() => handleDeleteSubTask(subTask.id)}
                      style={styles.deleteSubtaskButton}
                    >
                      <Ionicons name="trash" size={24} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text>No Subtasks Available</Text>
              </View>
            )}
              {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Task</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

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
  // Remove or comment out maxHeight: '80%',
  maxHeight: '80%',
  flex: 1, // Add this
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
});

export default AddTaskModal;