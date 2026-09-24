/**
 * Profile Screen - MemoryCare-NER
 *
 * User profile screen with:
 * - Back arrow and "Profile" header
 * - User avatar with name and role
 * - Menu items:
 *   - Edit Profile (person icon)
 *   - Location (location pin icon)
 *   - Notification Settings (bell icon)
 *   - Help & Support (help circle icon)
 *   - Logout (log-out icon, red)
 *
 * All menu items are tappable with chevron arrows.
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
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ProfileMenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  isDestructive?: boolean;
}

const menuItems: ProfileMenuItem[] = [
  {
    id: 'edit',
    title: 'Edit Profile',
    // Create/edit icon - from Ionicons (internet icon pack)
    icon: 'create-outline',
    color: Colors.primary,
  },
  {
    id: 'location',
    title: 'Location',
    // Location icon - from Ionicons (internet icon pack)
    icon: 'location-outline',
    color: Colors.green,
  },
  {
    id: 'notifications',
    title: 'Notification Settings',
    // Notification icon - from Ionicons (internet icon pack)
    icon: 'notifications-outline',
    color: Colors.orange,
  },
  {
    id: 'help',
    title: 'Help & Support',
    // Help icon - from Ionicons (internet icon pack)
    icon: 'help-circle-outline',
    color: Colors.purple,
  },
  {
    id: 'logout',
    title: 'Logout',
    // Logout icon - from Ionicons (internet icon pack)
    icon: 'log-out-outline',
    color: Colors.red,
    isDestructive: true,
  },
];

export default function ProfileScreen() {
  const handleMenuPress = (item: ProfileMenuItem) => {
    if (item.id === 'logout') {
      Alert.alert('Logout', 'Are you sure you want to logout?', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => router.replace('/login'),
        },
      ]);
    } else if (item.id === 'edit') {
      Alert.alert('Edit Profile', 'Edit your name, email, and other details.');
    } else if (item.id === 'location') {
      Alert.alert('Location', 'Update your location settings and address.');
    } else if (item.id === 'notifications') {
      Alert.alert(
        'Notification Settings',
        'Manage your reminder and alert preferences.'
      );
    } else if (item.id === 'help') {
      Alert.alert(
        'Help & Support',
        'Contact us at support@memorycare-ner.com or call 1-800-CARE.'
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          {/* Back arrow icon - from Ionicons (internet icon pack) */}
          <Ionicons name="chevron-back" size={24} color={Colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Avatar Section */}
        <View style={styles.profileSection}>
          {/* Avatar - colored circle with person icon (placeholder for profile photo) */}
          {/* In a real app, this would be a photo from the internet/device camera */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {/* Person icon - from Ionicons (internet icon pack) */}
              <Ionicons name="person" size={40} color={Colors.white} />
            </View>
            <TouchableOpacity style={styles.editAvatarBadge}>
              {/* Camera icon - from Ionicons (internet icon pack) */}
              <Ionicons name="camera" size={14} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>Amma</Text>
          <Text style={styles.profileRole}>Elder</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.menuIconCircle,
                  { backgroundColor: `${item.color}15` },
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={22}
                  color={item.color}
                />
              </View>
              <Text
                style={[
                  styles.menuTitle,
                  item.isDestructive && { color: Colors.red },
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  menuContainer: {
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
