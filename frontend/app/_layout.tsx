import { Stack } from 'expo-router';
import { Colors } from '../constants/colors';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.card },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="menu"
          options={{
            presentation: 'fullScreenModal', // Better for a long list
            headerShown: false, // <-- CHANGED to hide the header
          }}
        />
        {/* ADD THIS: This is your new elegant "surprise me" modal */}
        <Stack.Screen
          name="modal"
          options={{
            presentation: 'transparentModal', // Fades in over the top
            headerShown: false,
            animation: 'fade',
          }}
        />
      </Stack>
    </>
  );
}