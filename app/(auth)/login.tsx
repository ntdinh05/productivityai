import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, AppState, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase'; // Adjust the path as needed

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
      
    })
    if (error) Alert.alert(error.message)
    setLoading(false)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/logos/app_logo.png')} 
            style={styles.icon}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Sign in your account</Text>
        
        {/* Form */}
        <View style={styles.form}>
          <Text style={[styles.label, styles.font]}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.font]}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signInButton} onPress={() => signInWithEmail()}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or sign in with</Text>

          {/* Social Sign In Buttons */}
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/logos/google.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/logos/microsoft.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image 
                source={require('../../assets/logos/apple.png')}
                style={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <Link href="/signup" style={styles.signUpLink}>SIGN UP</Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginPage

const styles = StyleSheet.create({
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