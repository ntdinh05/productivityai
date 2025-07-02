import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const calendarStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  viewSelector: {
    flexDirection: 'row',
    height: hp(5),
    backgroundColor: '#F1F0E9',
    marginVertical: hp(1),
    borderRadius: wp(3),
    marginHorizontal: wp(5),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  viewOption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedViewOption: {
    backgroundColor: '#E9762B',
  },
  viewOptionText: {
    fontSize: hp(2),
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  selectedViewOptionText: {
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
  },
  
  // Month view styles
  monthView: {
    flex: 1,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
  },
  monthYearHeader: {
    fontSize: wp(5),
    fontFamily: 'Poppins-SemiBold',
    marginRight: wp(1),
  },
  calendar: {
    height: hp(75),
  },
  
  // Month/Year picker styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthYearPickerContainer: {
    width: wp(80),
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(5),
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: wp(5),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp(2),
  },
  monthsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(2),
  },
  monthOption: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: hp(1),
    marginBottom: hp(1),
    borderRadius: wp(2),
  },
  selectedMonthOption: {
    backgroundColor: '#E9762B',
  },
  monthOptionText: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
  },
  selectedOptionText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(2),
  },
  yearText: {
    fontSize: wp(5),
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: wp(4),
  },
  doneButton: {
    backgroundColor: '#E9762B',
    paddingVertical: hp(1),
    paddingHorizontal: wp(8),
    borderRadius: wp(4),
  },
  doneButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: 'Poppins-SemiBold',
  },
  
  // Week view styles
  weekView: {
    flex: 1,
  },
  weekHeader: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    backgroundColor: '#F1F0E9',
    borderBottomWidth: 1,
    borderBottomColor: '#E9E9E9',
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),
  },
  navButton: {
    padding: hp(0.5),
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(0.5),
  },
  weekDayHeader: {
    fontSize: wp(3.5),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    width: wp(10),
  },
  weekDatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(0.5),
  },
  weekDateButton: {
    alignItems: 'center',
    width: wp(10),
  },
  weekDateText: {
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
    // marginBottom: hp(0.5),
  },
  selectedWeekDate: {
    backgroundColor: '#E9762B',
    borderRadius: wp(1),
    paddingVertical: hp(0.2),
  },
  selectedIndicator: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(1),
  },
  timelineContainer: {
    flex: 1,
    padding: wp(2),
    paddingBottom: 0,
  },
  hourRow: {
    flexDirection: 'row',
    height: hp(6),
    alignItems: 'center',
  },
  hourText: {
    width: wp(12),
    fontSize: wp(3),
    color: '#666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  hourLine: {
    flex: 1,
    height: hp(6),
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    justifyContent: 'center',
    position: 'relative',
  },
  eventItem: {
    position: 'absolute',
    left: wp(2),
    right: wp(2),
    height: hp(5.5),
    padding: wp(2),
    borderRadius: wp(2),
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  eventTitle: {
    color: '#333',
    fontFamily: 'Poppins-SemiBold',
    fontSize: wp(3.5),
  },
  eventTime: {
    color: '#555',
    fontFamily: 'Poppins-Regular',
    fontSize: wp(2.8),
    marginTop: hp(0.2),
  },
  currentTimeIndicator: {
    position: 'absolute',
    left: -wp(2),
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 20,
  },
  currentTimeIndicatorCircle: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    backgroundColor: '#E9762B',
  },
  currentTimeIndicatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E9762B',
  },
  addButton: {
    position: 'absolute',
    right: wp(5),
    bottom: hp(3),
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    backgroundColor: '#E9762B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButtonText: {
    color: '#fff',
    fontSize: wp(8),
    fontWeight: 'bold',
    marginTop: -wp(1), // Visual adjustment for the plus sign
  },
  
  // Add Event Modal styles
  addEventContainer: {
    width: wp(85),
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(5),
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: hp(2),
  },
  inputLabel: {
    fontSize: wp(3.5),
    fontFamily: 'Poppins-Regular',
    color: '#555',
    marginBottom: hp(0.5),
  },
  textInput: {
    width: '100%',
    height: hp(5),
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    fontFamily: 'Poppins-Regular',
    fontSize: wp(4),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(2),
  },
  timeInputContainer: {
    width: '47%',
  },
  timeInput: {
    height: hp(5),
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    fontFamily: 'Poppins-Regular',
    fontSize: wp(4),
  },
  colorContainer: {
    width: '100%',
    marginBottom: hp(3),
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
  },
  colorOption: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    width: '47%',
    height: hp(5),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#E9762B',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: 'Poppins-SemiBold',
  },
  cancelButton: {
    backgroundColor: '#E9E9E9',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: wp(4),
    fontFamily: 'Poppins-Regular',
  },
})
export default calendarStyles;