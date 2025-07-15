import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTask } from '../(context)/TaskContext';

const TaskModal = () => {
  const { selectedTask, modalVisible, closeTaskModal, openEditModal, refreshSubTasks } = useTask();

  const handleEdit = () => {
    closeTaskModal();
    openEditModal(selectedTask!);
  };
  // Calculate completion percentage for subtasks
  const getSubtaskProgress = () => {
    if (!selectedTask?.subtasks || selectedTask.subtasks.length === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    
    const completed = selectedTask.subtasks.filter(subtask => subtask.is_completed).length;
    const total = selectedTask.subtasks.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  const subtaskProgress = getSubtaskProgress();
  return (
    <Modal
      visible={modalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={closeTaskModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
            <TouchableOpacity onPress={closeTaskModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Main Task Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.modalText}>Date: {selectedTask?.due_date}</Text>
            <Text style={styles.modalText}>Time: {selectedTask?.time}</Text>
            <Text style={styles.modalText}>
              Status: {selectedTask?.is_completed ? 'Completed' : 'In Progress'}
            </Text>
            {selectedTask?.description && (
              <Text style={styles.modalDescription}>{selectedTask.description}</Text>
            )}
          </View>

          {/* Subtasks */}
          {selectedTask?.subtasks && selectedTask.subtasks.length > 0 ? (
            <View style={styles.subtasksSection}>
              <View style={styles.subtasksHeader}>
                <Text style={styles.subtasksTitle}>
                  Subtasks ({subtaskProgress.completed}/{subtaskProgress.total})
                </Text>
                <Text style={styles.subtasksProgress}>
                  {subtaskProgress.percentage}%
                </Text>
              </View>
              <ScrollView 
                style={styles.subtasksScrollView}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {selectedTask.subtasks.map((subtask, index) => (
                  <View key={subtask.id} style={styles.subtaskItem}>
                    <View style={styles.subtaskHeader}>
                      <View style={styles.subtaskNumberContainer}>
                        <Text style={styles.subtaskNumber}>{index + 1}</Text>
                      </View>
                      <View style={styles.subtaskContent}>
                        <Text style={[
                          styles.subtaskTitle,
                          subtask.is_completed && styles.subtaskTitleCompleted
                        ]}>
                          {subtask.title}
                        </Text>
                        <Text style={styles.subtaskDetails}>
                          {subtask.due_date} • {subtask.time}
                        </Text>
                        {subtask.description && (
                          <Text style={styles.subtaskDescription}>
                            {subtask.description}
                          </Text>
                        )}
                      </View>
                      <View style={[
                        styles.statusIndicator,
                        { backgroundColor: subtask.is_completed ? '#4CAF50' : '#FFA726' }
                      ]}>
                        <Ionicons 
                          name={subtask.is_completed ? "checkmark" : "time"} 
                          size={12} 
                          color="white" 
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.noSubtasksContainer}>
              <Text style={styles.noSubtasksText}>No subtasks available</Text>
            </View>
          )}
          
          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton2} onPress={closeTaskModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
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
    borderRadius: 18,
    padding: 24,
    width: '90%',
    maxHeight: hp(85), // Reduced to give more breathing room
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  closeButton: {
    padding: 5,
  },
  infoContainer: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
    marginTop: 8,
  },
  subtasksSection: {
    marginBottom: 20,
    // Remove flex: 1 and minHeight to prevent overflow
  },
  subtasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subtasksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtasksProgress: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E9762B',
  },
  subtasksScrollView: {
    maxHeight: hp(35), // Use maxHeight instead of flex to prevent overflow
    minHeight: 200, // Minimum height to show at least 3 subtasks
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 8,
  },
  subtaskItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E9762B',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subtaskHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
  },
  subtaskNumberContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E9762B',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  subtaskNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  subtaskContent: {
    flex: 1,
  },
  subtaskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  subtaskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  subtaskDetails: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  subtaskDescription: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  statusIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  noSubtasksContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    height: 200, // Fixed height instead of minHeight
  },
  noSubtasksText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 10,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#E9762B',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton2: {
    flex: 1,
    backgroundColor: '#2E5D3B',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TaskModal;