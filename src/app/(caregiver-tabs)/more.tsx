/**
 * More Tab - MemoryCare-NER (Caregiver Tabs)
 *
 * Additional options menu for Caregiver users with navigation to:
 * - Profile
 * - Care Journal
 * - AI Voice Assistance
 * - Settings
 * - Help & Support
 * - Logout
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  route?: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'profile',
    title: 'Profile',
    icon: 'person-circle',
    iconFamily: 'Ionicons',
    color: Colors.primary,
    route: '/profile',
  },
  {
    id: 'care-journal',
    title: 'Care Journal',
    icon: 'notebook',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.purple,
    route: '/care-journal',
  },
  {
    id: 'voice',
    title: 'AI Voice Assistance',
    icon: 'mic',
    iconFamily: 'Ionicons',
    color: Colors.indigo,
    route: '/ai-voice',
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: 'settings',
    iconFamily: 'Ionicons',
    color: Colors.textSecondary,
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: 'help-circle',
    iconFamily: 'Ionicons',
    color: Colors.orange,
  },
  {
    id: 'logout',
    title: 'Logout',
    icon: 'log-out',
    iconFamily: 'Ionicons',
    color: Colors.red,
  },
];

export default function CaregiverMoreTab() {
  const handlePress = (item: MenuItem) => {
    if (item.route) {
      router.push(item.route as any);
    } else if (item.id === 'logout') {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/login'),
        },
      ]);
    } else if (item.id === 'settings') {
      Alert.alert('Settings', 'Settings page coming soon!');
    } else if (item.id === 'help') {
      Alert.alert(
        'Help & Support',
        'Contact us at support@memorycare-ner.com or call 1-800-CARE.'
      );
    }
  };

  const renderIcon = (item: MenuItem) => {
    if (item.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={item.color}
        />
      );
    }
    return (
      <Ionicons name={item.icon as any} size={24} color={item.color} />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>More</Text>

        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handlePress(item)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.menuIconCircle,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                {renderIcon(item)}
              </View>
              <Text
                style={[
                  styles.menuTitle,
                  item.id === 'logout' && { color: Colors.red },
                ]}
              >
                {item.title}
              </Text>
              {/* Chevron icon - from Ionicons (internet icon pack) */}
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.textLight}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textDark,
    paddingVertical: 16,
  },
  menuList: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textDark,
  },
});
