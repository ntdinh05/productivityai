import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const chatboxStyles = StyleSheet.create({
  header: {
    height: hp('12%'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: hp('1%'),
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    backgroundColor: '#F6F5ED',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E9E9E9',
  },
  logo: {
    width: wp('10%'),
    height: wp('10%'),
    resizeMode: 'contain',
  },
  logoLarge: {
    width: wp('20%'),
    height: wp('20%'),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  centerLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F5ED',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
    borderTopWidth: 0.5,
    borderTopColor: '#E9E9E9',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: wp('6%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    marginHorizontal: wp('2%'),
    fontSize: hp('2%'),
    color: '#222',
    borderWidth: 1,
    borderColor: '#E9E9E9',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#4F704F',
    borderRadius: wp('5%'),
    margin: wp('2%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    maxWidth: '75%',
  },
  userText: {
    color: '#fff',
    fontSize: hp('2%'),
  },
  aiBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E9E9E9',
    borderRadius: wp('5%'),
    margin: wp('2%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    maxWidth: '75%',
  },
  aiText: {
    color: '#222',
    fontSize: hp('2%'),
  },
});

export default chatboxStyles;