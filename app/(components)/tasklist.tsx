import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const dummyTasks = [
  {
    id: 1,
    title: 'Productivity AI Project',
    time: '18:00',
    progress: 'In Progress',
  },
  {
    id: 2,
    title: 'Homework',
    time: '18:00',
    progress: 'Not Started',
  },
  {
    id: 3,
    title: 'Homework',
    time: '18:00',
    progress: 'Not Started',
  },
  {
    id: 4,
    title: 'Homework',
    time: '18:00',
    progress: 'Completed',
  },
];

function TaskList() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [selectedTask, setSelectedTask] = useState(null); // Track the selected task
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility

  const openTaskModal = (task) => {
    setSelectedTask(task); // Set the selected task
    setModalVisible(true); // Open the modal
  };

  const closeTaskModal = () => {
    setModalVisible(false); // Close the modal
    setSelectedTask(null); // Clear the selected task
  };

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={styles.card}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTitle}>Tasks</Text>
          <Text style={styles.summaryPercent}>20%</Text>
        </View>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.taskRow}
              key={item.id}
              onPress={() => openTaskModal(item)} // Open modal on task click
            >
              <View style={styles.leftSection}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text
                  style={
                    item.progress === 'Not Started'
                      ? styles.notstartedStatus
                      : item.progress === 'In Progress'
                      ? styles.inprogressStatus
                      : styles.completedStatus
                  }
                >
                  {item.progress}
                </Text>
              </View>
              <View style={styles.rightSection}>
                <Text style={styles.time}>{item.time}</Text>
                <Ionicons name="alarm" size={18} color="#222" style={{ marginLeft: 6 }} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Modal for Task Details */}
      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={closeTaskModal} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedTask?.title}</Text>
            <Text style={styles.modalText}>Time: {selectedTask?.time}</Text>
            <Text style={styles.modalText}>Progress: {selectedTask?.progress}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeTaskModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    maxHeight: '80%',
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskTitle: {
    fontSize: 16,
    color: '#222',
    fontWeight: '400',
  },
  notstartedStatus: {
    color: '#FF0000',
    fontSize: 16,
    fontWeight: '500',
  },
  inprogressStatus: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: '500',
  },
  completedStatus: {
    color: '#2E5D3B',
    fontSize: 16,
    fontWeight: '500',
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
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#2E5D3B',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default TaskList;
