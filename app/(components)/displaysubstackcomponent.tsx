import React from 'react';
import { Text, View } from 'react-native';
import { SubTask } from '../(context)/TaskContext';

function DisplaySubTaskComponent({ subTask }: { subTask: SubTask }) {
  return (
    <View style={{ padding: 10, backgroundColor: '#f9f9f9', borderRadius: 8 }}>
      <Text style={{ fontWeight: 'bold' }}>{subTask.title}</Text>
      <Text>{subTask.description}</Text>
      <Text style={{ color: '#888', fontSize: 12 }}>
        Due: {subTask.date} {subTask.time}
      </Text>
      <Text>Status: {subTask.progress}</Text>
    </View>
  )
}

export default DisplaySubTaskComponent