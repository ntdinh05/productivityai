import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

const loginpage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
  return (
    <View>
      <Text>loginpage</Text>
    </View>
  )
}

export default loginpage

const styles = StyleSheet.create({

})