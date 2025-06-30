// Rest of the import statements
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { Stack } from 'expo-router';
import React from 'react';


import * as SplashScreen from 'expo-splash-screen';

import { useEffect } from 'react';


SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          title: 'Home',

        }}
      />
      <Stack.Screen
        name="(auth)/login"
        options={{
          title: 'Sign In',
          headerStyle: { backgroundColor: '#F1F0E9' },
          
        }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{
          title: 'Sign Up',
          headerStyle: { backgroundColor: '#F1F0E9' },
        }}
      />
    
    </Stack>
  )
}
