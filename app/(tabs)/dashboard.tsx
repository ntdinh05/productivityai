import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import dashboardStyles from '../../styles/dashboard'; // Adjust the import path as necessary


const initialTasks = [
  { id: '1', title: 'Complete React Native project before deadline', completed: true },
  { id: '2', title: 'Review code for pull request', completed: false },
  { id: '3', title: 'Attend team meeting', completed: false },
  { id: '4', title: 'Update documentation', completed: true },
  { id: '5', title: 'Plan next sprint', completed: false },
  { id: '6', title: 'Fix bugs', completed: false },
  { id: '7', title: 'Write tests', completed: false },
]

const Dashboard = () => {
  const [tasks, setTasks] = useState(initialTasks)

  const toggleTask = (id: string) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.summary}>Summary</Text>
       
      {/* Bar Chart Mockup */}
      <View style={styles.chartContainer}>
        <View style={styles.barRow}>
          {[hp(10), hp(8), hp(9), hp(5), hp(7), hp(6), hp(9.5)].map((height, idx) => (
            <View key={idx} style={[styles.bar, { height }]} />
          ))}
        </View>
      </View>
      
      {/* Streaks and Awards */}
      <View style={styles.row}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.iconLabelTop}>Streaks</Text>
          <View style={styles.iconBox}>
            <View style={styles.streakIcon}>
              <Text style={{ fontSize: hp(5) }}>🔥</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.iconLabelTop}>Awards</Text>
          <View style={styles.iconBox}>
            <View style={styles.awardIcon}>
              <Text style={{ fontSize: hp(5) }}>🏅</Text>
            </View>
          </View>
        </View>
      </View>
      {/* To Do List */}
      <View style={[styles.todoContainer]}>
      <Text style={styles.todoHeader}>To do list:</Text>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTask(item.id)}>
              <View style={[
                styles.circle,
                { backgroundColor: item.completed ? '#4F704F' : 'transparent', borderColor: '#4F704F', justifyContent: 'center', alignItems: 'center'}
              ]}>
                {item.completed && (
                  <Text style={{ color: '#fff', fontSize: hp(1.6), fontWeight: 'bold' }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.todoText} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = dashboardStyles;