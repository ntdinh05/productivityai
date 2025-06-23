import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Pomodoro = () => {
  const [selectedMode, setSelectedMode] = useState('Timer')
  const [time, setTime] = useState('25:00')
  const [isRunning, setIsRunning] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pomodoro</Text>
      
      {/* Mode Selection */}
      <View style={styles.clockContainer}>
        <View style={styles.modeContainer}>
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'Timer' && styles.selectedMode]}
            onPress={() => setSelectedMode('Timer')}
          >
            <Text style={[
              styles.modeText, 
              { color: selectedMode === 'Timer' ? '#E9762B' : '#ABB0BC' }
            ]}>
              Timer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'Short Break' && styles.selectedMode]}
            onPress={() => setSelectedMode('Short Break')}
          >
            <Text style={[
              styles.modeText, 
              { color: selectedMode === 'Short Break' ? '#E9762B' : '#ABB0BC' }
            ]}>
              Short Break
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'Long Break' && styles.selectedMode]}
            onPress={() => setSelectedMode('Long Break')}
          >
            <Text style={[
              styles.modeText, 
              { color: selectedMode === 'Long Break' ? '#E9762B' : '#ABB0BC' }
            ]}>
              Long Break
            </Text>
          </TouchableOpacity>
        </View>

        {/* Timer Display */}
        <View style={styles.timerContainer}>
          <Ionicons name="timer-outline" size={30} color="#FFFFFF" />
          <Text style={styles.timerText}>{time}</Text>
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => setIsRunning(!isRunning)}
          >
            <Text style={styles.startButtonText}>
              {isRunning ? 'PAUSE' : 'START'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksSection}>
        <Text style={styles.taskTitle}>Task</Text>
        <ScrollView style={styles.taskList}>
          {['Task name', 'Task name', 'Task name'].map((task, index) => (
            <TouchableOpacity key={index} style={styles.taskItem}>
              <View style={styles.taskLeftBorder} />
              <Text style={styles.taskText}>{task}</Text>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuDots}>⋯</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 20,
    // paddingLeft: 10,
  },
  modeContainer: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  
  },
  clockContainer: {
    backgroundColor: '#41644A',
    borderRadius: 22,
    marginBottom: 50,
  },
  modeButton: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#ABB0BC',
  },
  selectedMode: {
    borderColor: '#E9762B',
  },
  modeText: {
    fontFamily: 'Poppins-SemiBold',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  timerText: {
    fontSize: 85,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#F86F03',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 30,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  tasksSection: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 15,
    // paddingLeft: 10,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8D6CD',
    marginBottom: 10,
    height: 60,
  },
  taskLeftBorder: {
    width: 12,
    height: '100%',
    backgroundColor: '#F86F03'
  },
  taskText: {
    flex: 1,
    marginLeft: 15,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  menuButton: {
    padding: 15,
  },
  menuDots: {
    fontSize: 24,
    color: '#666',
  },
})

export default Pomodoro