import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F5ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#E9762B',
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E9762B',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#222',
  },
  email: {
    fontSize: 14,
    color: '#E9762B',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E9762B',
    width: '100%',
    marginVertical: 12,
    opacity: 0.3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F0E9',
    justifyContent: 'space-between',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    flex: 1,
    color: '#222',
  },
  allowText: {
    fontSize: 14,
    color: '#4F704F',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    backgroundColor: '#F1F0E9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#222',
  },
  saveButton: {
    backgroundColor: '#E9762B',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default profileStyles;