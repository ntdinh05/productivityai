import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const loginpage = () => {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} placeholder='Email'/>
        <TextInput style={styles.input} placeholder='Password' secureTextEntry={true}/>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Login pressed')}>
          <Text style={{textAlign: 'center', color: 'white'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Register pressed')}>
          <Text style={{textAlign: 'center', color: 'white'}}>Register</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  )
}

export default loginpage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // formContainer: {
  //   flex: 1,
  //   // padding: 20,
  //   justifyContent: 'center',
  // },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 50,
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '90%',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  },
  googleButton: {
    width: '90%',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15,
  }
})