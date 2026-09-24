/**
 * Loved Ones Tab - MemoryCare-NER (Caregiver Tabs)
 *
 * Tab screen showing the list of elders being cared for.
 * Similar to the Loved Ones stack screen but integrated into the tab navigation.
 * Shows family members with avatars, names, relations, and "View Details" links.
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

export default function LovedOnesTab() {
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>My Loved Ones</Text>

        {/* Loved Ones List */}
        {lovedOnes.map((person) => (
          <View key={person.id} style={styles.personCard}>
            {/* Avatar - colored circle with initials */}
            {/* Placeholder for profile photo from internet/device */}
            <View
              style={[styles.avatar, { backgroundColor: person.avatarColor }]}
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
            <TouchableOpacity onPress={() => handleViewDetails(person)}>
              {/* Chevron icon - from Ionicons (internet icon pack) */}
              <Ionicons
                name="chevron-forward"
                size={22}
                color={Colors.textLight}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add Loved One Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddLovedOne}>
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
