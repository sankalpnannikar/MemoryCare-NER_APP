/**
 * Elder Home Screen - MemoryCare-NER
 *
 * The main dashboard for Elder users showing:
 * - Header with MemoryCare-NER branding and profile avatar
 * - "Good Morning!" greeting with "Here's your day at a glance." subtitle
 * - Feature grid with 6 cards:
 *   1. Today's Reminders (calendar icon, orange)
 *   2. Memory Activities (brain icon, green)
 *   3. AI Voice Assistance (mic icon, purple)
 *   4. My Wellbeing (heart icon, pink)
 *   5. My Loved Ones (people icon, teal)
 *   6. Resources (book icon, blue)
 * - Motivational banner: "Small steps make brighter days!"
 *
 * Each card navigates to its corresponding full-page screen.
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 72) / 2;

// Feature cards data matching the mockup grid
const features = [
  {
    id: 'reminders',
    title: "Today's\nReminders",
    // Calendar icon - from Ionicons (internet icon pack)
    icon: 'calendar',
    iconFamily: 'Ionicons',
    color: Colors.orange,
    bgColor: Colors.orangeLight,
    route: '/reminders-page',
  },
  {
    id: 'activities',
    title: 'Memory\nActivities',
    // Brain icon - from MaterialCommunityIcons (internet icon pack)
    icon: 'brain',
    iconFamily: 'MaterialCommunityIcons',
    color: Colors.green,
    bgColor: Colors.greenLight,
    route: '/memory-activities',
  },
  {
    id: 'voice',
    title: 'AI Voice\nAssistance',
    // Mic icon - from Ionicons (internet icon pack)
    icon: 'mic',
    iconFamily: 'Ionicons',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
    route: '/ai-voice',
  },
  {
    id: 'wellbeing',
    title: 'My\nWellbeing',
    // Heart icon - from Ionicons (internet icon pack)
    icon: 'heart',
    iconFamily: 'Ionicons',
    color: Colors.pink,
    bgColor: Colors.pinkLight,
    route: '/wellbeing',
  },
  {
    id: 'loved-ones',
    title: 'My Loved\nOnes',
    // People icon - from Ionicons (internet icon pack)
    icon: 'people',
    iconFamily: 'Ionicons',
    color: Colors.teal,
    bgColor: Colors.tealLight,
    route: '/loved-ones',
  },
  {
    id: 'resources',
    title: 'Resources',
    // Book icon - from Ionicons (internet icon pack)
    icon: 'book',
    iconFamily: 'Ionicons',
    color: Colors.indigo,
    bgColor: Colors.indigoLight,
    route: '/resources',
  },
];

export default function ElderHomeScreen() {
  const renderIcon = (feature: (typeof features)[0]) => {
    if (feature.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={feature.icon as any}
          size={34}
          color={feature.color}
        />
      );
    }
    return (
      <Ionicons name={feature.icon as any} size={34} color={feature.color} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerLogo}>
              {/* Brain icon - from MaterialCommunityIcons (internet icon pack) */}
              <MaterialCommunityIcons name="brain" size={22} color="#4CAF50" />
            </View>
            <Text style={styles.headerTitle}>MemoryCare-NER</Text>
          </View>
          <TouchableOpacity
            style={styles.profileAvatar}
            onPress={() => router.push('/profile')}
          >
            {/* Profile avatar - colored circle with person icon */}
            {/* Person icon - from Ionicons (internet icon pack) */}
            <Ionicons name="person" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>

        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greetingTitle}>Good Morning!</Text>
          <Text style={styles.greetingSubtitle}>
            Here's your day at a glance.
          </Text>
        </View>

        {/* Feature Grid */}
        <View style={styles.featureGrid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.featureCard, { backgroundColor: feature.bgColor }]}
              onPress={() => router.push(feature.route as any)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.featureIconCircle,
                  { backgroundColor: `${feature.color}20` },
                ]}
              >
                {renderIcon(feature)}
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Motivational Banner */}
        <View style={styles.motivationalBanner}>
          {/* Star icon - from Ionicons (internet icon pack) */}
          <Ionicons name="sparkles" size={20} color={Colors.amber} />
          <Text style={styles.motivationalText}>
            Small steps make brighter days!
          </Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingSection: {
    marginTop: 8,
    marginBottom: 24,
  },
  greetingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textDark,
    marginBottom: 4,
  },
  greetingSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  featureCard: {
    width: CARD_SIZE,
    borderRadius: 20,
    padding: 18,
    minHeight: CARD_SIZE * 0.85,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textDark,
    lineHeight: 20,
  },
  motivationalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.amberLight,
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  motivationalText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
});
