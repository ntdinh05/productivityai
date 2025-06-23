import { supabase } from '@/lib/supabase';
import React, { useState } from 'react';
import { Alert, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
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
        <Text style={styles.title}>Create an account</Text>

        {/* First Name & Last Name Row */}
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              textContentType='oneTimeCode'
              autoCapitalize="words"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              textContentType='oneTimeCode'
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={()=> Keyboard.dismiss()}
            textContentType='oneTimeCode'
            secureTextEntry
          />

          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onSubmitEditing={()=> Keyboard.dismiss()}
            textContentType='oneTimeCode'
            secureTextEntry
          />

          <TouchableOpacity style={styles.signUpButton} disabled={loading} onPress={signUpWithEmail}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or sign up with</Text>

          {/* Social Sign Up Buttons */}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  iconContainer: {
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
  signUpButton: {
    width: '100%',
    backgroundColor: '#0B4619',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  signUpButtonText: {
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
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
    gap: 12, // Optional, for spacing between fields (React Native 0.71+)
  },
  halfInputContainer: {
    flex: 1,
  },
});

export default SignupPage;