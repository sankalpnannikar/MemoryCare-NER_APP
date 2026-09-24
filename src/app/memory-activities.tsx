/**
 * Memory Activities Screen - MemoryCare-NER
 *
 * Full-page memory activities screen pushed from Elder Home:
 * - Back arrow and "Memory Activities" header
 * - "Fun activities to keep your mind active." subtitle
 * - Activity list with icons, titles, and chevron arrows:
 *   1. Word Games (abc icon, blue)
 *   2. Picture Quiz (image icon, green)
 *   3. Daily Puzzles (puzzle icon, purple)
 *   4. Music & Memories (music icon, pink)
 *   5. Mindfulness (leaf icon, teal)
 *
 * Each activity item is tappable and shows an alert for now.
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

interface Activity {
  id: string;
  title: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  bgColor: string;
  description: string;
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Word Games',
    // Letter case icon - from MaterialCommunityIcons (internet icon pack)
    icon: 'format-letter-case',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
    description: 'Build vocabulary and word recall skills',
  },
  {
    id: '2',
    title: 'Picture Quiz',
    // Image icon - from Ionicons (internet icon pack)
    icon: 'image',
    iconFamily: 'Ionicons',
    color: Colors.green,
    bgColor: Colors.greenLight,
    description: 'Test your visual memory with fun quizzes',
  },
  {
    id: '3',
    title: 'Daily Puzzles',
    // Puzzle icon - from MaterialCommunityIcons (internet icon pack)
    icon: 'puzzle',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
    description: 'Challenge your brain with daily puzzles',
  },
  {
    id: '4',
    title: 'Music & Memories',
    // Music icon - from Ionicons (internet icon pack)
    icon: 'musical-notes',
    iconFamily: 'Ionicons',
    color: Colors.pink,
    bgColor: Colors.pinkLight,
    description: 'Listen to music that brings back memories',
  },
  {
    id: '5',
    title: 'Mindfulness',
    // Leaf icon - from Ionicons (internet icon pack)
    icon: 'leaf',
    iconFamily: 'Ionicons',
    color: Colors.teal,
    bgColor: Colors.tealLight,
    description: 'Guided breathing and meditation exercises',
  },
];

export default function MemoryActivitiesScreen() {
  const handleActivityPress = (activity: Activity) => {
    Alert.alert(activity.title, activity.description);
  };

  const renderIcon = (activity: Activity) => {
    if (activity.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={activity.icon as any}
          size={28}
          color={activity.color}
        />
      );
    }
    return (
      <Ionicons name={activity.icon as any} size={28} color={activity.color} />
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
        <Text style={styles.headerTitle}>Memory Activities</Text>
        <View style={styles.backButton} />
      </View>

      <Text style={styles.subtitle}>
        Fun activities to keep your mind active.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activities.map((activity) => (
          <TouchableOpacity
            key={activity.id}
            style={styles.activityCard}
            onPress={() => handleActivityPress(activity)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.activityIconCircle,
                { backgroundColor: activity.bgColor },
              ]}
            >
              {renderIcon(activity)}
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityDescription}>
                {activity.description}
              </Text>
            </View>
            {/* Chevron icon - from Ionicons (internet icon pack) */}
            <Ionicons
              name="chevron-forward"
              size={22}
              color={Colors.textLight}
            />
          </TouchableOpacity>
        ))}
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
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  activityCard: {
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
  activityIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 3,
  },
  activityDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
