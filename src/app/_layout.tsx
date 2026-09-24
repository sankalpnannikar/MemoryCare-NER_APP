/**
 * Root Layout - MemoryCare-NER
 * Stack navigator that manages the entire navigation tree:
 * - Auth screens (splash, login, register, role selection)
 * - Elder tab navigator
 * - Caregiver tab navigator
 * - Full-page stack screens (reminders, activities, voice, wellbeing, etc.)
 */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: '#F5F7FA' },
        }}
      >
        {/* Auth Flow */}
        <Stack.Screen name="index" options={{ animation: 'fade' }} />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="who-are-you" />

        {/* Main App - Tab Navigators */}
        <Stack.Screen
          name="(elder-tabs)"
          options={{ animation: 'fade', gestureEnabled: false }}
        />
        <Stack.Screen
          name="(caregiver-tabs)"
          options={{ animation: 'fade', gestureEnabled: false }}
        />

        {/* Full Page Stack Screens */}
        <Stack.Screen name="reminders-page" />
        <Stack.Screen name="memory-activities" />
        <Stack.Screen name="ai-voice" />
        <Stack.Screen name="wellbeing" />
        <Stack.Screen name="loved-ones" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="resources" />
        <Stack.Screen name="care-journal" />
      </Stack>
    </>
  );
}
