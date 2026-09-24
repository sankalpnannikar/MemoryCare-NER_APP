/**
 * My Wellbeing Screen - MemoryCare-NER
 *
 * Wellbeing tracking screen with:
 * - Back arrow and "My Wellbeing" header
 * - "A quick view of how you're doing." subtitle
 * - "How do you feel today?" section with mood emoji selector (Good/Okay/Not Good)
 * - Sleep tracker (shows "7 hrs")
 * - Activity tracker (shows "Small walk")
 * - Mood tracker (shows "Happy")
 *
 * Each tracker is tappable for detail view.
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
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Mood = 'good' | 'okay' | 'not-good' | null;

const moods = [
  { id: 'good' as Mood, label: 'Good', emoji: '😊', color: Colors.green },
  { id: 'okay' as Mood, label: 'Okay', emoji: '😐', color: Colors.orange },
  { id: 'not-good' as Mood, label: 'Not Good', emoji: '😔', color: Colors.red },
];

export default function WellbeingScreen() {
  const [selectedMood, setSelectedMood] = useState<Mood>('good');

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
        <Text style={styles.headerTitle}>My Wellbeing</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.subtitle}>
          A quick view of how you're doing.
        </Text>

        {/* Mood Selection */}
        <View style={styles.moodSection}>
          <View style={styles.moodHeader}>
            {/* Smiley face icon - from Ionicons (internet icon pack) */}
            <Ionicons name="happy-outline" size={22} color={Colors.amber} />
            <Text style={styles.moodQuestion}>How do you feel today?</Text>
          </View>

          <View style={styles.moodOptions}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood.id}
                style={[
                  styles.moodOption,
                  selectedMood === mood.id && {
                    backgroundColor: `${mood.color}15`,
                    borderColor: mood.color,
                  },
                ]}
                onPress={() => setSelectedMood(mood.id)}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                <Text
                  style={[
                    styles.moodLabel,
                    selectedMood === mood.id && {
                      color: mood.color,
                      fontWeight: '700',
                    },
                  ]}
                >
                  {mood.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sleep Tracker */}
        <TouchableOpacity
          style={styles.trackerCard}
          onPress={() => Alert.alert('Sleep', 'You slept 7 hours last night. Great job!')}
          activeOpacity={0.7}
        >
          <View style={styles.trackerLeft}>
            <View style={[styles.trackerIconCircle, { backgroundColor: Colors.indigoLight }]}>
              {/* Moon/sleep icon - from Ionicons (internet icon pack) */}
              <Ionicons name="moon" size={24} color={Colors.indigo} />
            </View>
            <Text style={styles.trackerTitle}>Sleep</Text>
          </View>
          <View style={styles.trackerRight}>
            <Text style={styles.trackerValue}>7 hrs</Text>
            {/* Chevron icon - from Ionicons (internet icon pack) */}
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </View>
        </TouchableOpacity>

        {/* Activity Tracker */}
        <TouchableOpacity
          style={styles.trackerCard}
          onPress={() => Alert.alert('Activity', 'You took a small walk today. Keep it up!')}
          activeOpacity={0.7}
        >
          <View style={styles.trackerLeft}>
            <View style={[styles.trackerIconCircle, { backgroundColor: Colors.greenLight }]}>
              {/* Walk/activity icon - from Ionicons (internet icon pack) */}
              <Ionicons name="walk" size={24} color={Colors.green} />
            </View>
            <Text style={styles.trackerTitle}>Activity</Text>
          </View>
          <View style={styles.trackerRight}>
            <Text style={styles.trackerValue}>Small walk</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </View>
        </TouchableOpacity>

        {/* Mood Tracker */}
        <TouchableOpacity
          style={styles.trackerCard}
          onPress={() => Alert.alert('Mood', 'Your mood today: Happy 😊')}
          activeOpacity={0.7}
        >
          <View style={styles.trackerLeft}>
            <View style={[styles.trackerIconCircle, { backgroundColor: Colors.pinkLight }]}>
              {/* Heart icon - from Ionicons (internet icon pack) */}
              <Ionicons name="heart" size={24} color={Colors.pink} />
            </View>
            <Text style={styles.trackerTitle}>Mood</Text>
          </View>
          <View style={styles.trackerRight}>
            <Text style={styles.trackerValue}>Happy</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </View>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  moodSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 18,
  },
  moodQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  moodOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  moodLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  trackerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  trackerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  trackerIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textDark,
  },
  trackerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  trackerValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
