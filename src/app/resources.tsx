/**
 * Resources Screen (Stack) - MemoryCare-NER
 *
 * Full-page resources screen pushed from Elder Home or Caregiver Home:
 * - Back arrow and "Resources" header
 * - List of care resources with icons, titles, and descriptions
 * - Resources include guides, health tips, emergency contacts, and support
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

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconFamily: 'Ionicons' | 'MaterialCommunityIcons';
  color: string;
  bgColor: string;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Caregiving Guide',
    description: 'Essential tips for daily care routines',
    icon: 'book',
    iconFamily: 'Ionicons',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: '2',
    title: 'Health & Nutrition',
    description: 'Healthy eating and wellness tips for elders',
    icon: 'nutrition',
    iconFamily: 'Ionicons',
    color: Colors.green,
    bgColor: Colors.greenLight,
  },
  {
    id: '3',
    title: 'Emergency Contacts',
    description: 'Quick access to emergency numbers and services',
    icon: 'call',
    iconFamily: 'Ionicons',
    color: Colors.red,
    bgColor: Colors.redLight,
  },
  {
    id: '4',
    title: 'Support Communities',
    description: 'Connect with caregiver support groups',
    icon: 'people',
    iconFamily: 'Ionicons',
    color: Colors.teal,
    bgColor: Colors.tealLight,
  },
  {
    id: '5',
    title: 'Memory Care Articles',
    description: 'Latest research and insights on memory care',
    icon: 'document-text',
    iconFamily: 'Ionicons',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
  {
    id: '6',
    title: 'Exercise Programs',
    description: 'Gentle exercise routines for better health',
    icon: 'fitness',
    iconFamily: 'Ionicons',
    color: Colors.orange,
    bgColor: Colors.orangeLight,
  },
];

export default function ResourcesScreen() {
  const handleResourcePress = (resource: Resource) => {
    Alert.alert(resource.title, resource.description);
  };

  const renderIcon = (resource: Resource) => {
    if (resource.iconFamily === 'MaterialCommunityIcons') {
      return (
        <MaterialCommunityIcons
          name={resource.icon as any}
          size={26}
          color={resource.color}
        />
      );
    }
    return (
      <Ionicons name={resource.icon as any} size={26} color={resource.color} />
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
        <Text style={styles.headerTitle}>Resources</Text>
        <View style={styles.backButton} />
      </View>

      <Text style={styles.subtitle}>
        Helpful resources for care and wellbeing.
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => handleResourcePress(resource)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.resourceIconCircle,
                { backgroundColor: resource.bgColor },
              ]}
            >
              {renderIcon(resource)}
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDescription}>
                {resource.description}
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
  resourceCard: {
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
  resourceIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 3,
  },
  resourceDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
