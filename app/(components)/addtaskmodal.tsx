import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SubTask, useTask } from '../(context)/TaskContext';
import DisplaySubTaskComponent from './displaysubstackcomponent';
interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose }) => {
  const { addTask, addSubTask, loading } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [showSubTaskForm, setShowSubTaskForm] = useState(false);
  const [subTaskTitle, setSubTaskTitle] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState('');
  const [subTaskDate, setSubTaskDate] = useState('');
  const [subTaskTime, setSubTaskTime] = useState('');
  const [progress, setProgress] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
 
  const progressOptions = ['Not Started', 'In Progress', 'Completed'];

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (!date || !time) {
      alert('Please enter both date and time');
      return;
    }

    try {
      console.log('🎯 [AddTaskModal] Starting save process...');
      console.log('📋 [AddTaskModal] Task data:', { title, description, date, time });
      console.log('📝 [AddTaskModal] Subtasks to create:', subTasks);
      
      // Create the main task first
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        due_date: date,
        time: time,
        is_completed: false,
      };
      
      console.log('🚀 [AddTaskModal] Creating main task...');
      const createdTask = await addTask(newTask);
      console.log('✅ [AddTaskModal] Main task created:', createdTask);
      
      // If task creation was successful and we have subtasks, create them
      if (createdTask && createdTask.id && subTasks.length > 0) {
        console.log('🔄 [AddTaskModal] Creating subtasks for parent ID:', createdTask.id);
        for (const subTask of subTasks) {
          console.log('🚀 [AddTaskModal] Creating subtask:', subTask);
          await addSubTask({
            title: subTask.title,
            description: subTask.description || '',
            due_date: subTask.due_date,
            time: subTask.time,
            is_completed: false,
            parent: createdTask.id
          });
          console.log('✅ [AddTaskModal] Subtask created successfully');
        }
        console.log('🎉 [AddTaskModal] All subtasks created successfully!');
      } else {
        console.log('ℹ️ [AddTaskModal] No subtasks to create or task creation failed');
      }
      
      // Reset form and close modal
      handleCancel();
    } catch (error) {
      console.error('❌ [AddTaskModal] Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setProgress('Not Started');
    setSubTasks([]);
    
    // Reset subtask form
    setShowSubTaskForm(false);
    setSubTaskTitle('');
    setSubTaskDescription('');
    setSubTaskDate('');
    setSubTaskTime('');
    
    onClose();
  };

  const handleDeleteSubTask = (subTaskId: string) => {
    setSubTasks(prevSubTasks => prevSubTasks.filter(subTask => subTask.id !== subTaskId));
  };

  const addSubTasks = (subTask: SubTask) => {
    setSubTasks(prev => [...prev, subTask]);
  };

  const handleAddSubTaskForm = () => {
    if (!subTaskTitle.trim()) {
      alert('Please enter a subtask title');
      return;
    }

    const newSubTask: SubTask = {
      id: Date.now().toString(), // Temporary ID for local display
      title: subTaskTitle.trim(),
      description: subTaskDescription.trim(),
      due_date: subTaskDate || date || new Date().toISOString().split('T')[0],
      time: subTaskTime || time || '09:00',
      is_completed: false,
      parent: '' // Will be set when task is created
    };
    
    addSubTasks(newSubTask);
    
    // Clear form and hide it
    setSubTaskTitle('');
    setSubTaskDescription('');
    setSubTaskDate('');
    setSubTaskTime('');
    setShowSubTaskForm(false);
  };

  const handleCancelSubTask = () => {
    setSubTaskTitle('');
    setSubTaskDescription('');
    setSubTaskDate('');
    setSubTaskTime('');
    setShowSubTaskForm(false);
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

            {/* Add Subtask Button */}
            {!showSubTaskForm && (
              <View style={styles.inputGroup}>
                <TouchableOpacity 
                  style={styles.addSubtaskButton}
                  onPress={() => setShowSubTaskForm(true)}
                >
                  <Ionicons name="add-circle" size={24} color="#E9762B" />
                  <Text style={styles.addSubtaskText}>Add Subtask</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Subtask Form */}
            {showSubTaskForm && (
              <View style={styles.subTaskFormContainer}>
                <Text style={styles.subTaskFormTitle}>New Subtask</Text>
                
                {/* Subtask Title */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Subtask Title *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter subtask title"
                    value={subTaskTitle}
                    onChangeText={setSubTaskTitle}
                    multiline
                    numberOfLines={2}
                  />
                </View>

                {/* Subtask Description */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Enter subtask description"
                    value={subTaskDescription}
                    onChangeText={setSubTaskDescription}
                    multiline
                    numberOfLines={2}
                  />
                </View>

                {/* Subtask Date and Time */}
                <View style={styles.row}>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Date</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={date || "YYYY-MM-DD"}
                      value={subTaskDate}
                      onChangeText={setSubTaskDate}
                    />
                  </View>
                  <View style={[styles.inputGroup, styles.halfWidth]}>
                    <Text style={styles.label}>Time</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={time || "HH:MM"}
                      value={subTaskTime}
                      onChangeText={setSubTaskTime}
                    />
                  </View>
                </View>

                {/* Subtask Form Buttons */}
                <View style={styles.subTaskButtonContainer}>
                  <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSubTask}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.saveButton} onPress={handleAddSubTaskForm}>
                    <Text style={styles.saveButtonText}>Add Subtask</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
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
                <Text style={styles.noSubtasksText}>No Subtasks Available</Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.saveButton, loading && { opacity: 0.7 }]} 
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Creating...' : 'Save Task'}
                </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9762B',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addSubtaskText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#E9762B',
    fontWeight: '600',
  },
  noSubtasksText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  subTaskFormContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  subTaskFormTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subTaskButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
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