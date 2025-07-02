<<<<<<< HEAD
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient"; // or `import LinearGradient from "react-native-linear-gradient"`
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TimerPickerModal } from "react-native-timer-picker";
import pomodoroStyles from '../../styles/pomodoro'; // Adjust the import path as necessary

=======
import { Ionicons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import pomodoroStyles from '../../styles/pomodoro'; // Adjust the import path as necessary
>>>>>>> 184019e29de899aa210f9b3f8136ea270be1396d

const Pomodoro = () => {
  const [selectedMode, setSelectedMode] = useState<String>('Timer')
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

<<<<<<< HEAD
  const formatSeconds = (seconds : number) => {
=======
  const timePresets = {
    'Timer': 25 * 60, // 25 minutes
    'Short Break': 5 * 60, // 5 minutes
    'Long Break': 15 * 60, // 15 minutes
  }
  
  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
>>>>>>> 184019e29de899aa210f9b3f8136ea270be1396d
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
<<<<<<< HEAD
  
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

  const handleModeChange = (mode : String) => {
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
=======
>>>>>>> 184019e29de899aa210f9b3f8136ea270be1396d

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
            
            <TouchableOpacity style={styles.timerControlButton} onPress={handlePickerOpen}>
              <Ionicons name="ellipsis-horizontal-outline" size={wp(7)} color="#FFFFFF" />
            </TouchableOpacity>


            <TimerPickerModal
              visible={showPicker}
              setIsVisible={setShowPicker}
              onConfirm={(pickedDuration) => {
                handleTimeChange(pickedDuration); // Pass picked duration to handleTimeChange
                setShowPicker(false); // Close the picker
              }}
              modalTitle="Set Time"
              onCancel={() => setShowPicker(false)}
              closeOnOverlayPress
              hideHours
              LinearGradient={LinearGradient}
              styles={{
                modalTitle: {
                  fontFamily: 'Poppins-SemiBold',
                },
                text: {
                  fontFamily: 'Poppins-SemiBold',
                },
                theme: "light",
                backgroundColor: "#F1F0E9",
                confirmButton:{
                  backgroundColor: "#E9762B",
                  borderColor: "#E9762B",
                  fontFamily: 'Poppins-SemiBold',
                  color: "#FFFFFF",
                },
                cancelButton: {
                  fontFamily: 'Poppins-SemiBold', 
                }
              }}
            />
          </View>
        </View>
      </View>

      {/* Tasks Section */}
      <View style={styles.tasksSection}>
        <Text style={styles.taskTitle}>Task</Text>
        <ScrollView style={styles.taskList}>
          {['Apply responsive design for the App', 
            'Implement dark mode', 
            'Fix bugs',
            'Attend team meeting',
            'Update documentation',
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

const styles = pomodoroStyles
export default Pomodoro