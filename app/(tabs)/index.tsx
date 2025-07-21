import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Image, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import profileStyles from '../../styles/profile'; // Adjust the import path as necessary

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Your name',
    email: 'yourname@gmail.com',
    mobile: '',
    location: '',
  });

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const [tasks, setTasks] = useState([]);
  

  if (editMode) {
    // Editable Profile Form
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/taskbar_items/Profile Image.png')} // Replace with your asset
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatar}>
              <Text style={{ fontSize: 18, color: '#E9762B' }}>✎</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={profile.name}
            onChangeText={name => setProfile({ ...profile, name })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={profile.email}
            onChangeText={email => setProfile({ ...profile, email })}
          />
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            value={profile.mobile}
            onChangeText={mobile => setProfile({ ...profile, mobile })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={profile.location}
            onChangeText={location => setProfile({ ...profile, location })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={() => setEditMode(false)}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Profile Card with Menu
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/taskbar_items/Profile Image.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <View style={styles.divider} />
        <TouchableOpacity style={styles.menuItem} onPress={() => setEditMode(true)}>
          <Ionicons
            style={styles.menuIcon}
            name="person-outline"
            size={hp('3%')}
            color="#222"
          />
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            style={styles.menuIcon}
            name="settings-outline"
            size={hp('3%')}
            color="#222"
          />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <View style={styles.menuItem}>
          <Ionicons
            style={styles.menuIcon}
            name="notifications-outline"
            size={hp('3%')}
            color="#222"
          />
          <Text style={styles.menuText}>Notification</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? "#E9762B" : "#ccc"}
            trackColor={{ false: "#ccc", true: "#F8CBA5" }}
          />
        </View>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            style={styles.menuIcon}
            name="log-out-outline"
            size={hp('3%')}
            color="#E9762B"
          />
          <Text style={[styles.menuText, { color: '#E9762B' }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = profileStyles;
