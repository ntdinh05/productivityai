import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const pomodoroStyles = StyleSheet.create({
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
  modeSectionContainer: {
    flexDirection: 'column',
    backgroundColor: '#41644A',
    borderRadius: wp(5.5),
    marginBottom: hp(2),
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
  timerTextContainer: {
    width: wp(60), // Fixed width for consistent positioning
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp(2),
  },
  timerText: {
    fontSize: wp(18),
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontVariant: ['tabular-nums'], // Monospace numbers for consistent width
    includeFontPadding: false, // Removes extra padding on Android
  },
  timerTextFixedWidth: {
    fontSize: wp(18),
    height: hp(11), // Fixed height for timer text
    width: wp(30), // Fixed width for each part of the timer
  },
  timerColon: {
    width: wp(5), // Fixed width for the colon
    textAlign: 'center',
  },
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(8),
    marginTop: hp(2),
  },
  timerControlButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  startButton: {
    backgroundColor: '#F86F03',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(10),
    borderRadius: wp(6),
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

export default pomodoroStyles;