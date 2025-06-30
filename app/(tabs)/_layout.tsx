// Rest of the import statements
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';

// Import Tabs from expo-router, Tabs allows bottom navigation bar


import * as SplashScreen from 'expo-splash-screen';

import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';


SplashScreen.preventAutoHideAsync();


export default function TabsLayout() {
//   const [loaded, error] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold
//   });

//   useEffect(() => {
//     if (loaded || error) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded, error]);

//   if (!loaded && !error) {
//     return null;
//   }

  return (
    <Tabs
    screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { display: 'contents' }, // Hide icons if not needed
    }}
    >
        <Tabs.Screen
            name="dashboard"
            options={{
                title: 'Dashboard',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={hp('3%')}
                        name={focused ? "home" : "home-outline"}
                    />
                )
            }}
        />
        <Tabs.Screen
            name="pomodoro"
            options={{
                title: 'Pomodoro',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={hp('3%')}
                        name={focused ? "timer" : "timer-outline"}
                    />
                )
            }}
        />
        <Tabs.Screen
            name="calendar"
            options={{
                title: 'Calendar',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={hp('3%')}
                        name={focused ? "calendar" : "calendar-outline"}
                    />
                )
            }}
        />
        <Tabs.Screen
            name="mytasks"
            options={{
                title: 'My Tasks',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={hp('3%')}
                        name={focused ? "list" : "list-outline"}
                    />
                )
            }}
        />
        <Tabs.Screen
            name="index"
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons
                        size={hp('3%')}
                        name={focused ? "person" : "person-outline"}
                    />
                )
            }}
        />
    </Tabs>
  )
}
const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#99C9A1',
        height: hp(9),  // Responsive height
        paddingBottom: hp(1.8),
        paddingTop: hp(1.2),
    },
    tabLabel: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: hp(1.5),  // Responsive font size
    },
    tabBarIcon: {
        display: 'flex'
    }
});