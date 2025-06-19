import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={
        {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        }
      }>Profile Page</Text>
      <Link href="/(auth)/login" style={{ marginTop: 20 }}>Sign In</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
