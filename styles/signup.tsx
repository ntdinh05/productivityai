import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const signupStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: hp(2),
  },
  icon: {
    width: wp(12),
    height: wp(12),
  },
  title: {
    fontSize: hp(2.8),
    fontFamily: 'Poppins-SemiBold',
    marginBottom: hp(2.5),
    color: '#000',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: hp(1.8),
    marginBottom: hp(0.8),
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: hp(5.2),
    width: '100%',
    borderWidth: wp(0.3),
    borderColor: 'black',
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    fontSize: hp(1.8),
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#0B4619',
    padding: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: hp(1),
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: hp(1.8),
    fontFamily: 'Poppins-SemiBold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: hp(2),
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp(4),
  },
  socialButton: {
    width: wp(20),
    height: hp(5),
    borderWidth: wp(0.3),
    borderColor: '#ddd',
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: wp(5),
    height: wp(5),
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(3.5),
  },
  signInText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  signInLink: {
    color: '#0B4619',
    fontFamily: 'Poppins-SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(3), // Updated to responsive gap
  },
  halfInputContainer: {
    flex: 1,
  },
});

export default signupStyles;