/**
 * Resources Tab - MemoryCare-NER (Caregiver Tabs)
 *
 * Tab screen showing care resources and guides for caregivers.
 * Includes informational articles, tips, and support resources.
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
    // Book icon - from Ionicons (internet icon pack)
    icon: 'book',
    iconFamily: 'Ionicons',
    color: Colors.primary,
    bgColor: Colors.primaryLight,
  },
  {
    id: '2',
    title: 'Health Tips',
    description: 'Nutrition and wellness advice for elders',
    // Heart icon - from Ionicons (internet icon pack)
    icon: 'heart',
    iconFamily: 'Ionicons',
    color: Colors.pink,
    bgColor: Colors.pinkLight,
  },
  {
    id: '3',
    title: 'Emergency Contacts',
    description: 'Quick access to emergency numbers',
    // Call icon - from Ionicons (internet icon pack)
    icon: 'call',
    iconFamily: 'Ionicons',
    color: Colors.red,
    bgColor: Colors.redLight,
  },
  {
    id: '4',
    title: 'Support Groups',
    description: 'Connect with other caregivers',
    // People icon - from Ionicons (internet icon pack)
    icon: 'people',
    iconFamily: 'Ionicons',
    color: Colors.teal,
    bgColor: Colors.tealLight,
  },
  {
    id: '5',
    title: 'Memory Care Articles',
    description: 'Latest research and articles on memory care',
    // Document icon - from Ionicons (internet icon pack)
    icon: 'document-text',
    iconFamily: 'Ionicons',
    color: Colors.purple,
    bgColor: Colors.purpleLight,
  },
];

export default function ResourcesTab() {
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.subtitle}>
          Helpful resources for your caregiving journey.
        </Text>

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textDark,
    paddingTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 20,
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
