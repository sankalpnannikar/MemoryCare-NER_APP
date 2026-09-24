/**
 * My Loved Ones Screen - MemoryCare-NER
 *
 * Family members list screen with:
 * - Back arrow and "My Loved Ones" header
 * - List of loved ones with:
 *   - Avatar (colored circle with initials)
 *   - Name and relation
 *   - "View Details" link
 * - Loved ones from mockup:
 *   1. Amma (Elder) - orange avatar
 *   2. Appa (Elder) - blue avatar
 *   3. Meena (Daughter) - purple avatar
 * - "+ Add Loved One" button at bottom
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

interface LovedOne {
  id: string;
  name: string;
  relation: string;
  initials: string;
  avatarColor: string;
}

const lovedOnes: LovedOne[] = [
  {
    id: '1',
    name: 'Amma',
    relation: 'Elder',
    initials: 'A',
    avatarColor: Colors.orange,
  },
  {
    id: '2',
    name: 'Appa',
    relation: 'Elder',
    initials: 'A',
    avatarColor: Colors.primary,
  },
  {
    id: '3',
    name: 'Meena',
    relation: 'Daughter',
    initials: 'M',
    avatarColor: Colors.purple,
  },
];

export default function LovedOnesScreen() {
  const handleViewDetails = (person: LovedOne) => {
    Alert.alert(
      person.name,
      `${person.name} is your ${person.relation}.\n\nContact details, health info, and care preferences will be shown here.`
    );
  };

  const handleAddLovedOne = () => {
    Alert.alert(
      'Add Loved One',
      'This feature will allow you to add family members and their contact details.'
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
        <Text style={styles.headerTitle}>My Loved Ones</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Loved Ones List */}
        {lovedOnes.map((person) => (
          <View key={person.id} style={styles.personCard}>
            {/* Avatar - colored circle with initials (placeholder for profile image) */}
            {/* In a real app, this would use a profile photo from the internet/device */}
            <View
              style={[
                styles.avatar,
                { backgroundColor: person.avatarColor },
              ]}
            >
              <Text style={styles.avatarText}>{person.initials}</Text>
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personName}>{person.name}</Text>
              <Text style={styles.personRelation}>{person.relation}</Text>
              <TouchableOpacity onPress={() => handleViewDetails(person)}>
                <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
            </View>
            {/* Chevron icon - from Ionicons (internet icon pack) */}
            <TouchableOpacity onPress={() => handleViewDetails(person)}>
              <Ionicons
                name="chevron-forward"
                size={22}
                color={Colors.textLight}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Loved One Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddLovedOne}
        >
          {/* Add icon - from Ionicons (internet icon pack) */}
          <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
          <Text style={styles.addButtonText}>Add Loved One</Text>
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
  personCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
  },
  personInfo: {
    flex: 1,
  },
  personName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
  },
  personRelation: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  viewDetails: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 16,
    paddingVertical: 18,
    marginTop: 8,
    gap: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});
