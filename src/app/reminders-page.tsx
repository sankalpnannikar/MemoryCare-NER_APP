/**
 * Reminders Page (Full Stack Screen) - MemoryCare-NER
 *
 * Full-page reminders screen pushed from Elder Home dashboard:
 * - Back arrow navigation
 * - "Today's Reminders" header
 * - List of reminders with checkable circles:
 *   1. Take Medicine (8:00 AM) - completed ✓
 *   2. Drink Water (10:00 AM) - pending
 *   3. Short Walk (4:00 PM) - pending
 *   4. Rest Time (9:00 PM) - pending
 * - "+ Add Reminder" button at bottom
 */
import React, { useState } from 'react';
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

interface Reminder {
  id: string;
  title: string;
  time: string;
  icon: string;
  iconColor: string;
  completed: boolean;
}

const initialReminders: Reminder[] = [
  {
    id: '1',
    title: 'Take Medicine',
    time: '8:00 AM',
    // Medical icon - from Ionicons (internet icon pack)
    icon: 'medical',
    iconColor: Colors.red,
    completed: true,
  },
  {
    id: '2',
    title: 'Drink Water',
    time: '10:00 AM',
    // Water icon - from Ionicons (internet icon pack)
    icon: 'water',
    iconColor: Colors.primary,
    completed: false,
  },
  {
    id: '3',
    title: 'Short Walk',
    time: '4:00 PM',
    // Walk icon - from Ionicons (internet icon pack)
    icon: 'walk',
    iconColor: Colors.green,
    completed: false,
  },
  {
    id: '4',
    title: 'Rest Time',
    time: '9:00 PM',
    // Bed/moon icon - from Ionicons (internet icon pack)
    icon: 'bed',
    iconColor: Colors.purple,
    completed: false,
  },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const addReminder = () => {
    Alert.alert(
      'Add Reminder',
      'This feature will allow you to create custom reminders with time, title, and repeat options.'
    );
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
        <Text style={styles.headerTitle}>Today's Reminders</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Reminder Items */}
        {reminders.map((reminder) => (
          <TouchableOpacity
            key={reminder.id}
            style={[
              styles.reminderCard,
              reminder.completed && styles.reminderCardCompleted,
            ]}
            onPress={() => toggleReminder(reminder.id)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.reminderIconCircle,
                { backgroundColor: `${reminder.iconColor}15` },
              ]}
            >
              <Ionicons
                name={reminder.icon as any}
                size={24}
                color={reminder.iconColor}
              />
            </View>
            <View style={styles.reminderInfo}>
              <Text
                style={[
                  styles.reminderTitle,
                  reminder.completed && styles.reminderTitleCompleted,
                ]}
              >
                {reminder.title}
              </Text>
              <Text style={styles.reminderTime}>{reminder.time}</Text>
            </View>
            <View
              style={[
                styles.checkbox,
                reminder.completed && styles.checkboxChecked,
              ]}
            >
              {reminder.completed && (
                // Checkmark icon - from Ionicons (internet icon pack)
                <Ionicons name="checkmark" size={16} color={Colors.white} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Reminder Button - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addReminder}>
          {/* Add icon - from Ionicons (internet icon pack) */}
          <Ionicons name="add" size={22} color={Colors.white} />
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderCardCompleted: {
    opacity: 0.7,
  },
  reminderIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
    marginBottom: 2,
  },
  reminderTitleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.textSecondary,
  },
  reminderTime: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.green,
    borderColor: Colors.green,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: Colors.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
