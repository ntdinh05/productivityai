import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useTask } from '../(context)/TaskContext';

const TaskModal = () => {
  const { selectedTask, modalVisible, closeTaskModal, openEditModal } = useTask();

  const handleEdit = () => {
    closeTaskModal();
    openEditModal(selectedTask!);
  };

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
            <Text style={styles.modalText}>Date: {selectedTask?.date}</Text>
            <Text style={styles.modalText}>Time: {selectedTask?.time}</Text>
            <Text style={styles.modalText}>Progress: {selectedTask?.progress}</Text>
            {selectedTask?.description && (
              <Text style={styles.modalDescription}>{selectedTask.description}</Text>
            )}
          </View>

          {/* Subtasks */}
          {selectedTask?.subtasks && selectedTask.subtasks.length > 0 && (
            <View style={styles.subtasksSection}>
              <Text style={styles.subtasksTitle}>Subtasks ({selectedTask.subtasks.length})</Text>
              <ScrollView 
                style={styles.subtasksScrollView}
                showsVerticalScrollIndicator={true}
                nestedScrollEnabled={true}
              >
                {selectedTask.subtasks.map((subtask, index) => (
                  <View key={subtask.id} style={styles.subtaskItem}>
                    <Text style={styles.subtaskTitle}>
                      {index + 1}. {subtask.title}
                    </Text>
                    <Text style={styles.subtaskDetails}>
                      {subtask.date} • {subtask.time} • {subtask.progress}
                    </Text>
                  </View>
                ))}
              </ScrollView>
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
    maxHeight: hp(70),
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
    // Removed flex: 1 to prevent overflow
  },
  subtasksTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  subtasksScrollView: {
    maxHeight: hp(20), // Reduced max height to prevent overflow
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 8,
  },
  subtaskItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#E9762B',
  },
  subtaskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  subtaskDetails: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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