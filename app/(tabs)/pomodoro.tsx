import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
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
          <Ionicons name="timer-outline" size={wp(7)} color="#FFFFFF" />
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
          {['Apply responsive design for the App', 
            'Implement dark mode', 
            'Fix bugs',
          ].map((task, index) => (
            <TouchableOpacity key={index} style={[styles.taskItem, ]}>
              <View style={styles.taskLeftBorder} />
              <Text style={[styles.taskText]} numberOfLines={1} ellipsizeMode="tail">{task}</Text>
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
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(7),
  },
  title: {
    fontSize: wp(6.5),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp(2.5),
  },
  modeContainer: {
    flexDirection: 'row',
    paddingTop: hp(3),
    paddingHorizontal: wp(5),
    justifyContent: 'center',
    
  },
  clockContainer: {
    backgroundColor: '#41644A',
    borderRadius: wp(5.5),
    marginBottom: hp(6),
  },
  modeButton: {
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(2.5),
    borderRadius: wp(5.5),
    borderWidth: wp(0.75),
    borderColor: '#ABB0BC',
    marginHorizontal: wp(1),
  },
  selectedMode: {
    borderColor: '#E9762B',
  },
  modeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(3.5),
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: hp(2),
  },
  timerText: {
    fontSize: wp(21),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#F86F03',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(6),
    marginTop: hp(2),
  },
  startButtonText: {
    color: '#fff',
    fontSize: wp(4.5),
    fontFamily: 'Poppins-SemiBold',
  },
  tasksSection: {
    flex: 1,
  },
  taskTitle: {
    fontSize: wp(5.8),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp(1.8),
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D8D6CD',
    marginBottom: hp(1.3),
    height: hp(7),
  },
  taskLeftBorder: {
    width: wp(3),
    height: '100%',
    backgroundColor: '#F86F03'
  },
  taskText: {
    flex: 1,
    marginLeft: wp(3.8),
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(4),
  },
  menuButton: {
    padding: wp(3.8),
  },
  menuDots: {
    fontSize: wp(6),
    color: '#666',
  },
})

export default Pomodoro