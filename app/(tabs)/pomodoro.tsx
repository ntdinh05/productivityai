import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerPickerModal } from "react-native-timer-picker";
import { useTask } from '../(context)/TaskContext';
import pomodoroStyles from '../../styles/pomodoro';
import TaskModal from '../(components)/taskmodal';


const Pomodoro = () => {
  // const navigation = useNavigation();
  const { tasks, openTaskModal, openTaskInMyTasks } = useTask();
  const [selectedMode, setSelectedMode] = useState<string>('Timer')
  const [showPicker, setShowPicker] = useState(false)
  // const [time, setTime] = useState('25:00')
  const [timeLeft, setTimeLeft] = useState<number | null>(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const [timePresets, setTimePresets] = useState({
    'Timer': 25 * 60, // 25 minutes in seconds
    'Short Break': 5 * 60, // 5 minutes in seconds
    'Long Break': 15 * 60, // 15 minutes in seconds
  });

  const formatSeconds = (seconds : number) => {
    const secs = seconds % 60;
    return secs.toString().padStart(2, '0');
  }
  const formatMinutes = (seconds : number) => {
    const mins = Math.floor(seconds / 60);
    return mins.toString().padStart(2, '0');
  }

  const timeToSeconds = (pickedDuration: any) => {
    // If the time is a string (e.g., "25:00"), split and convert
    return pickedDuration.minutes * 60 + pickedDuration.seconds;
  }
  
  useEffect(() => {
    
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1)}, 1000);
       } else {
         clearInterval(intervalRef.current);
       }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
      alert('Time\'s up!')
    }
  }, [timeLeft])

  const handleModeChange = (mode : string) => {
    setSelectedMode(mode);
    setTimeLeft(timePresets[mode]);
    setIsRunning(false);
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  }

  const handleTimeChange = (pickedDuration: any) => {
    const seconds = timeToSeconds(pickedDuration); // Convert picked duration to seconds
    setTimePresets((prevPresets) => ({
      ...prevPresets,
      [selectedMode]: seconds,
    }));
    setTimeLeft(seconds); // Update the timer
  }

  const handlePickerOpen = () => {
    setShowPicker(true);
  }

  const handleTaskClick = (task) => {
    openTaskModal(task);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Pomodoro</Text>
      
      {/* Mode Selection */}
      <View style={styles.modeSectionContainer}>
        <View style={styles.modeContainer}>
          <TouchableOpacity 
            style={[styles.modeButton, selectedMode === 'Timer' && styles.selectedMode]}
            onPress={() => handleModeChange('Timer')}
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
            onPress={() => handleModeChange('Short Break')}
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
            onPress={() => handleModeChange('Long Break')}
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
          <View style={styles.timerTextContainer}>
            <Text style={[styles.timerText, styles.timerTextFixedWidth]}>{formatMinutes(timeLeft)}</Text>
            <Text style={[styles.timerText, styles.timerColon]}>:</Text>
            <Text style={[styles.timerText, styles.timerTextFixedWidth]}>{formatSeconds(timeLeft)}</Text>
          </View>
          
          {/* Timer Controls */}
          <View style={styles.timerControls}>
            <TouchableOpacity 
              style={styles.timerControlButton}
              onPress={() => {
                setIsRunning(false);
                setTimeLeft(timePresets[selectedMode]);
              }}
            >
              <Ionicons name="refresh-outline" size={wp(7)} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.startButton]}
              onPress={handleStartPause}
            >
              <Text style={[styles.startButtonText]}>
                {isRunning ? 'PAUSE' : 'START'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.timerControlButton} onPress={() => setShowPicker(true)}>
              <Ionicons name="ellipsis-horizontal-outline" size={wp(7)} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksSection}>
        <Text style={styles.taskTitle}>Tasks</Text>
        <ScrollView style={styles.taskList}>
          {tasks.map((task) => (
            <TouchableOpacity 
              key={task.id} 
              style={styles.taskItem}
              onPress={() => handleTaskClick(task)}
            >
              <View style={styles.taskLeftBorder} />
              <Text style={styles.taskText} numberOfLines={1} ellipsizeMode="tail">
                {task.title}
              </Text>
              <TouchableOpacity style={styles.menuButton}>
                <Text style={styles.menuDots}>⋯</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Timer Picker Modal */}
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          handleTimeChange(pickedDuration);
          setShowPicker(false);
        }}
        modalTitle="Set Time"
        onCancel={() => setShowPicker(false)}
        closeOnOverlayPress
        hideHours
        LinearGradient={LinearGradient}
        styles={{
          theme: "light",
          backgroundColor: "#F1F0E9",
          confirmButton: {
            backgroundColor: "#E9762B",
            borderColor: "#E9762B",
            color: '#FFFFFF',
          },
        }}
      />
      <TaskModal/>
    </SafeAreaView>
  )
}

const styles = pomodoroStyles;
export default Pomodoro;