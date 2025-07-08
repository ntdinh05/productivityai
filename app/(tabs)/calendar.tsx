import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useTask} from "@/app/(context)/TaskContext";
import TaskModal from "@/app/(components)/taskmodal";
import calendar from "@/styles/calendar";

const App = () => {
  const [selected, setSelected] = useState('');
  const { tasks, openTaskModal } = useTask();
  // const calendarTasks = tasks.map(task => ({
  //     ...task,
  //     date: '2025-07-07', // You can modify this to use actual dates from your tasks
  //     completed: task.progress === 'Completed'
  // }));
  const handleTaskPress = (task) => {
    openTaskModal(task);
  }
  const filteredTasks = selected ? tasks.filter(task => task.date === selected) : tasks;
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.calendarContainer}>
            <Calendar
                markingType={'multi-dot'}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                disableMonthChange={false}
                // enableSwipeMonths={true}
                markedDates={{
                    [selected]: {
                        selected: true, 
                        disableTouchEvent: true, 
                        selectedColor: 'orange',
                    },
                }}
                theme={{
                    calendarBackground: '#fff',
                    backgroundColor: '#fff',
                    textSectionTitleColor: '#41644A',
                    textDayHeaderFontFamily: 'Poppins_600SemiBold',
                    selectedDayBackgroundColor: '#E9762B',
                    todayTextColor: '#E9762B',
                    dayTextColor: 'black',
                    textDisabledColor: '#7f8999',
                    dotColor: '#E9762B',
                    selectedDotColor: 'white',
                    arrowColor: '#E9762B',
                    monthTextColor: '#E9762B',
                    textMonthFontFamily: 'Poppins_600SemiBold',
                    textDayFontFamily: 'Poppins_400Regular',
                    textMonthFontSize: hp(2),
                    indicatorColor: '#E9762B',
                }}
            />
        </View>
        
        {/* Event List */}
        <View style={[styles.todoContainer]}>
          <Text style={styles.todoHeader}>Event list</Text>
          <FlatList
            data={filteredTasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.eventBox} onPress={() => handleTaskPress(item)}>
                <View style={styles.eventContent}>
                  <Text style={styles.todoText} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>          
                  <View style={styles.timeContainer}>
                    <Text style={styles.timeText} numberOfLines={1}>{item.time}</Text>
                    <Text style={styles.dateText} numberOfLines={1}>{item.date}</Text>
                  </View>
                  <Text style={[styles.todoText, { fontSize: hp(1.8), color: item.completed ? '#4CAF50' : '#E9762B' }]}>
                    {item.completed ? 'Completed' : 'Pending'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                  <Text style={[styles.todoText, { textAlign: 'center', marginVertical: hp(2), color: '#7f8999' }]}>
                    No events for this date
                  </Text>
            }
          />
        </View>
        <TaskModal/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
  },
  calendarContainer: {
    backgroundColor: '#F1F0E9',
    borderWidth: wp(0.5),
    borderColor: '#41644A',
    borderRadius: wp(5),
    overflow: 'hidden',
  },
    todoContainer: {
    backgroundColor: '#fff',
    borderRadius: wp(5.5),
    borderWidth: wp(0.5),
    borderColor: '#4F704F',
    marginTop: hp(2),
    overflow: 'hidden',
    maxHeight: hp(45), // Limit height to 50% of screen height
  },

  todoHeader: {
    backgroundColor: '#4F704F',
    color: '#fff',
    fontSize: hp(2.5),
    fontFamily: 'Poppins_600SemiBold',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderTopLeftRadius: wp(4),
    borderTopRightRadius: wp(4),
    marginBottom: hp(1),
    height: hp(6), // Fixed height for header
    textAlign: 'left',
    textAlignVertical: 'center',
  },
  eventBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    marginHorizontal: wp(3),
    marginVertical: hp(1),
    borderRadius: wp(3.8),
    paddingVertical: hp(1),
    paddingRight: wp(2),
    paddingLeft: hp(1),
    height: hp(10),
  },
  eventContent: {
    flex: 1,
  },
  todoText: {
    fontSize: hp(1.9),
    color: '#4F704F',
    fontFamily: 'Poppins_600SemiBold',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: wp(2),
  },
  timeText: {
    fontSize: hp(1.8),
    color: '#7f8999',
    fontFamily: 'Poppins_600SemiBold',
    flexShrink: 0,
  },
  dateText: {
    fontSize: hp(1.8),
    color: '#7f8999',
    fontFamily: 'Poppins_600SemiBold',
    flexShrink: 0,
  },
});

export default App;