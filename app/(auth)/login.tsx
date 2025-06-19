import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
    
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
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, styles.font]}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.signInButton}>
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
    backgroundColor: '#f',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  icon: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 30,
    color: '#000',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontFamily: 'Poppins-Regular',
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
  },
  signInButton: {
    width: '100%',
    backgroundColor: '#0B4619',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 100,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  appleIcon: {
    width: 28,
    height: 28,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUpText: {
    color: '#666',
    fontFamily: 'Poppins-Regular',
  },
  signUpLink: {
    color: '#0B4619',
    fontFamily: 'Poppins-SemiBold',
  },
})