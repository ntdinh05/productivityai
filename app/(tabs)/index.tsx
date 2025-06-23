import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Profile() {
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
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
