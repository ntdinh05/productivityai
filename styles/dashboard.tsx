import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5ED',
    paddingHorizontal: wp(7),
    paddingVertical: hp(1.2),
  },
  summary: {
    fontSize: wp(6.5),
    fontFamily: 'Poppins_600SemiBold',
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
    maxHeight: hp(31), // Limit height to 50% of screen height
  },

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
    flex: 1,
    fontSize: hp(1.9),
    color: '#4F704F',
    fontFamily: 'Poppins_600SemiBold',
  },
})

export default dashboardStyles;