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

const dashboard = () => {
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

export default dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5ED',
    paddingHorizontal: wp(7),
    paddingVertical: hp(1.2),
  },
  summary: {
<<<<<<<<< Temporary merge branch 1
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 32,
    fontWeight: 'bold',
=========
    fontSize: wp(6.5),
    fontFamily: 'Poppins_600SemiBold',
>>>>>>>>> Temporary merge branch 2
    color: '#222',
    marginBottom: hp(3),
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(5.5),
    borderWidth: wp(0.5),
    borderColor: '#C9C9B6',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    marginBottom: hp(2),
    alignItems: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: hp(10),
    justifyContent: 'space-between',
    width: '100%',
  },
  bar: {
    width: wp(5),
    backgroundColor: '#E17B2F',
    borderRadius: wp(1.5),
    marginHorizontal: wp(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    gap: wp(5),
  },
  iconLabelTop: {
    fontSize: hp(2.5),
    fontFamily: 'Poppins_600SemiBold',
    color: '#4F704F',
    marginBottom: hp(1),
  },
  iconBox: {
    backgroundColor: '#fff',
    borderRadius: wp(4),
    borderWidth: wp(0.5),
    borderColor: '#C9C9B6',
    alignItems: 'center',
    paddingVertical: hp(0),
    height: hp(16),
    width: wp(37),
    },
  streakIcon: {
    width: wp(17),
    height: hp(16),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  awardIcon: {
    width: wp(17),
    height: hp(16),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(5.5),
    borderWidth: wp(0.5),
    borderColor: '#4F704F',
    marginTop: hp(1),
    overflow: 'hidden',
<<<<<<<<< Temporary merge branch 1
    maxHeight: 500,},
  
=========
    maxHeight: hp(31), // Limit height to 50% of screen height
  },

>>>>>>>>> Temporary merge branch 2
  todoHeader: {
    backgroundColor: '#4F704F',
    color: '#fff',
    fontSize: hp(2.5),
    fontFamily: 'Poppins_600SemiBold',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    marginBottom: hp(1),
    height: hp(6), // Fixed height for header
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    borderRadius: wp(3.8),
    paddingVertical: hp(1),
    paddingRight: wp(2),
    paddingLeft: hp(1),
    height: hp(5.5),
  },
  circle: {
    width: hp(2.8),
    height: hp(2.8),
    borderRadius: hp(0.8),
    borderWidth: wp(0.8),
    marginRight: wp(2.5),
    marginLeft: wp(0.5),
  },
  todoText: {
<<<<<<<<< Temporary merge branch 1
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
=========
    flex: 1,
    fontSize: hp(1.9),
>>>>>>>>> Temporary merge branch 2
    color: '#4F704F',
    fontFamily: 'Poppins_600SemiBold',
  },
})