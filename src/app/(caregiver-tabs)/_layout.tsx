/**
 * Caregiver Tabs Layout - MemoryCare-NER
 *
 * Bottom tab navigator for Caregiver users with 4 tabs:
 * 1. Home - Caregiver dashboard with care overview grid
 * 2. Loved Ones - List of elders being cared for
 * 3. Resources - Care resources and guides
 * 4. More - Additional options menu
 *
 * Uses custom tab bar styling matching the mockup design.
 */
import { Tabs } from 'expo-router';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function CaregiverTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          paddingTop: 6,
          paddingBottom: 8,
          height: 65,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            // Home icon - from Ionicons (internet icon pack)
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="loved-ones-tab"
        options={{
          title: 'Loved Ones',
          tabBarIcon: ({ color, size }) => (
            // Heart icon - from Ionicons (internet icon pack)
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources-tab"
        options={{
          title: 'Resources',
          tabBarIcon: ({ color, size }) => (
            // Book icon - from Ionicons (internet icon pack)
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, size }) => (
            // Dots/more icon - from Ionicons (internet icon pack)
            <Ionicons name="ellipsis-horizontal" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
