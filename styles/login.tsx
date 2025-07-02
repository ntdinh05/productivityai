import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
const loginStyles = StyleSheet.create({
  font: {
    fontFamily: 'Poppins_400Regular',
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
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
  signInButton: {
    width: '100%',
    backgroundColor: '#0B4619',
    padding: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
    marginTop: hp(1),
  },
  signInText: {
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
  appleIcon: {
    width: wp(5.5),
    height: wp(5.5),
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(2),
  },
  signUpText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  signUpLink: {
    color: '#00B140',
    fontFamily: 'Poppins-SemiBold',
  },
})

export default loginStyles;