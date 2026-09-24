/**
 * Activities Tab - MemoryCare-NER (Elder Tabs)
 *
 * Tab screen showing memory activities with:
 * - "Memory Activities" header
 * - "Fun activities to keep your mind active." subtitle
 * - Activity list items with icons and chevron arrows:
 *   1. Word Games (abc icon, blue)
 *   2. Picture Quiz (image icon, green)
 *   3. Daily Puzzles (puzzle icon, purple)
 *   4. Music & Memories (music icon, pink)
 *   5. Mindfulness (leaf icon, teal)
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
}

const activities: Activity[] = [
  {
    id: '1',
    title: 'Word Games',
    icon: 'format-letter-case',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: '2',
    title: 'Picture Quiz',
    icon: 'image',
    iconFamily: 'Ionicons',
    color: Colors.green,
    bgColor: Colors.greenLight,
  },
  {
    id: '3',
    title: 'Daily Puzzles',
    icon: 'puzzle',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
  {
    id: '4',
    title: 'Music & Memories',
    icon: 'musical-notes',
    iconFamily: 'Ionicons',
    color: Colors.pink,
    bgColor: Colors.pinkLight,
  },
  {
    id: '5',
    title: 'Mindfulness',
    icon: 'leaf',
    iconFamily: 'Ionicons',
    color: Colors.teal,
    bgColor: Colors.tealLight,
  },
];

export default function ActivitiesTab() {
  const handleActivityPress = (activity: Activity) => {
    Alert.alert(activity.title, `Starting ${activity.title}...`);
  };

  const renderIcon = (activity: Activity) => {
    if (activity.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={activity.icon as any}
          size={26}
          color={activity.color}
        />
      );
    }
    return (
      <Ionicons name={activity.icon as any} size={26} color={activity.color} />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Memory Activities</Text>
          <Text style={styles.subtitle}>
            Fun activities to keep your mind active.
          </Text>
        </View>

        {/* Activity List */}
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
            <Text style={styles.activityTitle}>{activity.title}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
});
