import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  const [selected, setSelected] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete React Native project before deadline', completed: true, time: '10:00 AM - 11:00 AM', date: '2025-06-27' },
    { id: '2', title: 'Review code for pull request', completed: false, time: '11:00 AM - 12:00 PM', date: '2025-06-27' },
    { id: '3', title: 'Attend team meeting', completed: false, time: '12:00 PM - 1:00 PM', date: '2025-06-28' },
    { id: '4', title: 'Update documentation', completed: true, time: '1:00 PM - 2:00 PM', date: '2025-06-28' },
    { id: '5', title: 'Plan next sprint', completed: false, time: '2:00 PM - 3:00 PM', date: '2025-06-29' },
    { id: '6', title: 'Fix bugs', completed: false, time: '3:00 PM - 4:00 PM', date: '2025-06-29' },
    { id: '7', title: 'Write tests', completed: false, time: '4:00 PM', date: '2025-06-29' },
    { id: '8', title: 'Morning workout', completed: true, time: '7:00 AM - 8:00 AM', date: '2025-06-30' },
    { id: '9', title: 'Client presentation', completed: false, time: '9:00 AM - 10:30 AM', date: '2025-06-30' },
    { id: '10', title: 'Lunch with team', completed: false, time: '12:30 PM - 1:30 PM', date: '2025-06-30' },
    { id: '11', title: 'API integration review', completed: false, time: '3:00 PM - 4:00 PM', date: '2025-06-30' },
    { id: '12', title: 'Database optimization', completed: false, time: '9:00 AM - 11:00 AM', date: '2025-07-01' },
    { id: '13', title: 'UI/UX design review', completed: true, time: '11:30 AM - 12:30 PM', date: '2025-07-01' },
    { id: '14', title: 'Code refactoring', completed: false, time: '2:00 PM - 4:00 PM', date: '2025-07-01' },
    { id: '15', title: 'Weekly standup', completed: false, time: '9:00 AM - 9:30 AM', date: '2025-07-02' },
    { id: '16', title: 'Security audit', completed: false, time: '10:00 AM - 12:00 PM', date: '2025-07-02' },
    { id: '17', title: 'Deploy to staging', completed: true, time: '2:00 PM - 3:00 PM', date: '2025-07-02' },
    { id: '18', title: 'Performance testing', completed: false, time: '3:30 PM - 5:00 PM', date: '2025-07-02' },
    { id: '19', title: 'Doctor appointment', completed: false, time: '10:00 AM - 11:00 AM', date: '2025-07-03' },
    { id: '20', title: 'Grocery shopping', completed: false, time: '2:00 PM - 3:00 PM', date: '2025-07-03' },
  ]);
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
              <TouchableOpacity style={styles.eventBox}>
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