import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SubTask, useTask } from '../(context)/TaskContext';

const EditTaskModal = () => {
  const { selectedTask, editModalVisible, closeEditModal, updateTask, deleteTask } = useTask();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [progress, setProgress] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskDescription, setNewSubtaskDescription] = useState('');
  const [newSubtaskDate, setNewSubtaskDate] = useState('');
  const [newSubtaskTime, setNewSubtaskTime] = useState('');
  const [newSubtaskProgress, setNewSubtaskProgress] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [expandedSubtasks, setExpandedSubtasks] = useState<Set<number>>(new Set());

  const progressOptions = ['Not Started', 'In Progress', 'Completed'];

  // Load task data when modal opens
  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDescription(selectedTask.description || '');
      setDate(selectedTask.date);
      setTime(selectedTask.time);
      setProgress(selectedTask.progress);
      setSubtasks(selectedTask.subtasks || []);
      setNewSubtaskDate(selectedTask.date); // Default to parent task date
      setNewSubtaskTime(selectedTask.time); // Default to parent task time
      setNewSubtaskProgress('Not Started'); // Default progress
    }
  }, [selectedTask]);

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a task title');
      return;
    }

    const updatedTask = {
      ...selectedTask!,
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      progress,
      subtasks,
    };

    updateTask(updatedTask);
    closeEditModal();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteTask(selectedTask!.id);
            closeEditModal();
          }
        }
      ]
    );
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) {
      Alert.alert('Error', 'Please enter a subtask title');
      return;
    }

    const newSubtask: SubTask = {
      id: Date.now(),
      title: newSubtaskTitle.trim(),
      description: newSubtaskDescription.trim(),
      date: newSubtaskDate || date,
      time: newSubtaskTime || time,
      progress: newSubtaskProgress,
    };

    setSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
    setNewSubtaskDescription('');
    setNewSubtaskDate(date);
    setNewSubtaskTime(time);
    setNewSubtaskProgress('Not Started');
  };

  const handleDeleteSubtask = (subtaskId: number) => {
    Alert.alert(
      'Delete Subtask',
      'Are you sure you want to delete this subtask?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            setSubtasks(subtasks.filter(subtask => subtask.id !== subtaskId));
            setExpandedSubtasks(prev => {
              const newSet = new Set(prev);
              newSet.delete(subtaskId);
              return newSet;
            });
          }
        }
      ]
    );
  };

  const handleUpdateSubtask = (subtaskId: number, field: keyof SubTask, value: string) => {
    setSubtasks(subtasks.map(subtask =>
      subtask.id === subtaskId ? { ...subtask, [field]: value } : subtask
    ));
  };

  const toggleSubtaskExpanded = (subtaskId: number) => {
    setExpandedSubtasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subtaskId)) {
        newSet.delete(subtaskId);
      } else {
        newSet.add(subtaskId);
      }
      return newSet;
    });
  };

  const handleCancel = () => {
    closeEditModal();
  };

  return (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.modalTitle}>Edit Task</Text>
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

              {/* Subtasks Section */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Subtasks</Text>
                
                {/* Add New Subtask Form */}
                <View style={styles.addSubtaskForm}>
                  <TextInput
                    style={styles.input}
                    placeholder="Subtask title"
                    value={newSubtaskTitle}
                    onChangeText={setNewSubtaskTitle}
                  />
                  <TextInput
                    style={[styles.input, styles.descriptionInput]}
                    placeholder="Subtask description (optional)"
                    value={newSubtaskDescription}
                    onChangeText={setNewSubtaskDescription}
                    multiline
                    numberOfLines={2}
                  />
                  <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Date (YYYY-MM-DD)"
                        value={newSubtaskDate}
                        onChangeText={setNewSubtaskDate}
                      />
                    </View>
                    <View style={[styles.inputGroup, styles.halfWidth]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Time (HH:MM)"
                        value={newSubtaskTime}
                        onChangeText={setNewSubtaskTime}
                      />
                    </View>
                  </View>
                  
                  {/* Progress Selection for New Subtask */}
                  <View style={styles.newSubtaskProgressGroup}>
                    <Text style={styles.newSubtaskLabel}>Status</Text>
                    <View style={styles.newSubtaskProgressContainer}>
                      {progressOptions.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.newSubtaskProgressButton,
                            newSubtaskProgress === option && styles.newSubtaskProgressButtonActive,
                          ]}
                          onPress={() => setNewSubtaskProgress(option as any)}
                        >
                          <Text
                            style={[
                              styles.newSubtaskProgressText,
                              newSubtaskProgress === option && styles.newSubtaskProgressTextActive,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.addButton} onPress={handleAddSubtask}>
                    <Text style={styles.addButtonText}>Add Subtask</Text>
                  </TouchableOpacity>
                </View>

                {/* Existing Subtasks */}
                <ScrollView style={styles.subtasksScrollView} nestedScrollEnabled>
                  {subtasks.map((subtask, index) => (
                    <View key={subtask.id} style={styles.subtaskItem}>
                      <View style={styles.subtaskHeader}>
                        <Text style={styles.subtaskNumber}>{index + 1}.</Text>
                        <TouchableOpacity
                          style={styles.subtaskHeaderContent}
                          onPress={() => toggleSubtaskExpanded(subtask.id)}
                        >
                          <Text style={styles.subtaskHeaderTitle}>{subtask.title}</Text>
                          <Ionicons
                            name={expandedSubtasks.has(subtask.id) ? "chevron-up" : "chevron-down"}
                            size={20}
                            color="#666"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.deleteSubtaskButton}
                          onPress={() => handleDeleteSubtask(subtask.id)}
                        >
                          <Ionicons name="trash" size={18} color="#FF6B6B" />
                        </TouchableOpacity>
                      </View>

                      {/* Expanded Subtask Content */}
                      {expandedSubtasks.has(subtask.id) && (
                        <View style={styles.subtaskContent}>
                          {/* Title */}
                          <View style={styles.subtaskInputGroup}>
                            <Text style={styles.subtaskLabel}>Title</Text>
                            <TextInput
                              style={styles.subtaskInput}
                              value={subtask.title}
                              onChangeText={(text) => handleUpdateSubtask(subtask.id, 'title', text)}
                              placeholder="Subtask title"
                            />
                          </View>

                          {/* Description */}
                          <View style={styles.subtaskInputGroup}>
                            <Text style={styles.subtaskLabel}>Description</Text>
                            <TextInput
                              style={[styles.subtaskInput, styles.subtaskDescriptionInput]}
                              value={subtask.description || ''}
                              onChangeText={(text) => handleUpdateSubtask(subtask.id, 'description', text)}
                              placeholder="Subtask description"
                              multiline
                              numberOfLines={2}
                            />
                          </View>

                          {/* Date and Time */}
                          <View style={styles.row}>
                            <View style={[styles.subtaskInputGroup, styles.halfWidth]}>
                              <Text style={styles.subtaskLabel}>Date</Text>
                              <TextInput
                                style={styles.subtaskInput}
                                value={subtask.date}
                                onChangeText={(text) => handleUpdateSubtask(subtask.id, 'date', text)}
                                placeholder="YYYY-MM-DD"
                              />
                            </View>
                            <View style={[styles.subtaskInputGroup, styles.halfWidth]}>
                              <Text style={styles.subtaskLabel}>Time</Text>
                              <TextInput
                                style={styles.subtaskInput}
                                value={subtask.time}
                                onChangeText={(text) => handleUpdateSubtask(subtask.id, 'time', text)}
                                placeholder="HH:MM"
                              />
                            </View>
                          </View>

                          {/* Progress */}
                          <View style={styles.subtaskInputGroup}>
                            <Text style={styles.subtaskLabel}>Status</Text>
                            <View style={styles.subtaskProgressContainer}>
                              {progressOptions.map((option) => (
                                <TouchableOpacity
                                  key={option}
                                  style={[
                                    styles.subtaskProgressButton,
                                    subtask.progress === option && styles.subtaskProgressButtonActive,
                                  ]}
                                  onPress={() => handleUpdateSubtask(subtask.id, 'progress', option)}
                                >
                                  <Text
                                    style={[
                                      styles.subtaskProgressText,
                                      subtask.progress === option && styles.subtaskProgressTextActive,
                                    ]}
                                  >
                                    {option}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Task</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: '95%',
    maxHeight: hp(90),
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
  addSubtaskForm: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  addButton: {
    backgroundColor: '#E9762B',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  subtasksScrollView: {
    maxHeight: 300,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
  },
  subtaskItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E9762B',
  },
  subtaskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  subtaskNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E9762B',
    marginRight: 8,
    minWidth: 20,
  },
  subtaskHeaderContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subtaskHeaderTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  deleteSubtaskButton: {
    padding: 8,
    marginLeft: 8,
  },
  subtaskContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  subtaskInputGroup: {
    marginBottom: 12,
  },
  subtaskLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
    marginBottom: 4,
  },
  subtaskInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  subtaskDescriptionInput: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  subtaskProgressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  subtaskProgressButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  subtaskProgressButtonActive: {
    backgroundColor: '#E9762B',
    borderColor: '#E9762B',
  },
  subtaskProgressText: {
    fontSize: 10,
    color: '#666',
  },
  subtaskProgressTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 4,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
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
    marginLeft: 4,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  newSubtaskProgressGroup: {
    marginTop: 12,
    marginBottom: 8,
  },
  newSubtaskLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  newSubtaskProgressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  newSubtaskProgressButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  newSubtaskProgressButtonActive: {
    backgroundColor: '#E9762B',
    borderColor: '#E9762B',
  },
  newSubtaskProgressText: {
    fontSize: 12,
    color: '#666',
  },
  newSubtaskProgressTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default EditTaskModal;