import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={
        {
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
        }
      }>Home Page</Text>
      <Link href="/(tabs)/loginpage" style={{ marginTop: 20 }}>Login Page</Link>
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
