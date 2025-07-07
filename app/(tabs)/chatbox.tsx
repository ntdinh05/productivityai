import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import chatboxStyles from '../../styles/chatbox';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

type Message = {
  from: 'user' | 'ai';
  text: string;
};

export default function Chatbox() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { from: 'user', text: input.trim() },
      { from: 'ai', text: '...' }
    ]);
    setInput('');
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#F6F5ED' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={hp('0.5%')}
    >
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={chatboxStyles.header}>
        // How to point the back button to the dashboard tab???
          <TouchableOpacity onPress={() => '../app/tabs/dashboard'}>
            <Ionicons name="chevron-back" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
          <Image source={require('../../assets/logos/app_logo.png')} style={chatboxStyles.logo} />
          <Ionicons name="videocam-outline" size={hp('3%')} color="#4F704F" />
        </View>
        {/* Chat area */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={{ flexGrow: 1, justifyContent: messages.length === 0 ? 'center' : 'flex-start' }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) =>
            item.from === 'user' ? (
              <View style={chatboxStyles.userBubble}>
                <Text style={chatboxStyles.userText}>{item.text}</Text>
              </View>
            ) : (
              <View style={chatboxStyles.aiBubble}>
                <Text style={chatboxStyles.aiText}>{item.text}</Text>
              </View>
            )
          }
          ListEmptyComponent={
            <View style={chatboxStyles.centerLogo}>
              <Image source={require('../../assets/logos/app_logo.png')} style={chatboxStyles.logoLarge} />
            </View>
          }
        />
        {/* Input bar */}
        <View style={chatboxStyles.inputBar}>
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="image-outline" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="document-outline" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
          <TextInput
            style={chatboxStyles.input}
            placeholder="Message"
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#aaa"
            returnKeyType="send"
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Ionicons name="mic-outline" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="headset-outline" size={hp('3%')} color="#4F704F" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}