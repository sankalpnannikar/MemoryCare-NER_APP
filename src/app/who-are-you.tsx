/**
 * Who Are You Screen - MemoryCare-NER
 *
 * Role selection screen after login/registration:
 * - "Who are you?" heading
 * - "This helps personalize your experience" subtitle
 * - Elder card: "I want support, reminders, and a simpler everyday life"
 * - Caregiver card: "I take care of a loved one"
 * - Continue button (navigates to Elder Home or Caregiver Home based on selection)
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Role = 'elder' | 'caregiver' | null;

export default function WhoAreYouScreen() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleContinue = () => {
    if (!selectedRole) {
      Alert.alert('Select a Role', 'Please select who you are to continue.');
      return;
    }
    if (selectedRole === 'elder') {
      router.replace('/(elder-tabs)');
    } else {
      router.replace('/(caregiver-tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        {/* Back arrow icon - from Ionicons (internet icon pack) */}
        <Ionicons name="chevron-back" size={24} color={Colors.textDark} />
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          {/* Brain icon - from MaterialCommunityIcons (internet icon pack) */}
          <MaterialCommunityIcons name="brain" size={36} color="#4CAF50" />
          <View style={styles.logoHeart}>
            {/* Heart icon - from Ionicons (internet icon pack) */}
            <Ionicons name="heart" size={8} color="#FFF" />
          </View>
        </View>
        <Text style={styles.logoText}>MemoryCare-NER</Text>
      </View>

      {/* Heading */}
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.subtitle}>
        This helps personalize{'\n'}your experience
      </Text>

      {/* Role Cards */}
      <View style={styles.cardsContainer}>
        {/* Elder Card */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'elder' && styles.roleCardActive,
          ]}
          onPress={() => setSelectedRole('elder')}
          activeOpacity={0.7}
        >
          <View style={styles.roleCardContent}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: Colors.primaryLight },
              ]}
            >
              {/* Elderly person icon - from MaterialCommunityIcons (internet icon pack) */}
              <MaterialCommunityIcons
                name="account"
                size={36}
                color={Colors.primary}
              />
            </View>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleName}>Elder</Text>
              <Text style={styles.roleDescription}>
                I want support, reminders,{'\n'}and a simpler everyday life
              </Text>
            </View>
            {/* Chevron icon - from Ionicons (internet icon pack) */}
            <Ionicons
              name="chevron-forward"
              size={22}
              color={
                selectedRole === 'elder' ? Colors.primary : Colors.textLight
              }
            />
          </View>
          {selectedRole === 'elder' && (
            <View style={styles.selectedIndicator}>
              {/* Checkmark icon - from Ionicons (internet icon pack) */}
              <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
            </View>
          )}
        </TouchableOpacity>

        {/* Caregiver Card */}
        <TouchableOpacity
          style={[
            styles.roleCard,
            selectedRole === 'caregiver' && styles.roleCardActive,
          ]}
          onPress={() => setSelectedRole('caregiver')}
          activeOpacity={0.7}
        >
          <View style={styles.roleCardContent}>
            <View
              style={[
                styles.avatarCircle,
                { backgroundColor: Colors.greenLight },
              ]}
            >
              {/* Caregiver icon - from MaterialCommunityIcons (internet icon pack) */}
              <MaterialCommunityIcons
                name="hand-heart"
                size={36}
                color={Colors.green}
              />
            </View>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleName}>Caregiver</Text>
              <Text style={styles.roleDescription}>
                I take care of a loved one
              </Text>
            </View>
            {/* Chevron icon - from Ionicons (internet icon pack) */}
            <Ionicons
              name="chevron-forward"
              size={22}
              color={
                selectedRole === 'caregiver'
                  ? Colors.primary
                  : Colors.textLight
              }
            />
          </View>
          {selectedRole === 'caregiver' && (
            <View style={styles.selectedIndicator}>
              {/* Checkmark icon - from Ionicons (internet icon pack) */}
              <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          !selectedRole && styles.continueButtonDisabled,
        ]}
        onPress={handleContinue}
        disabled={!selectedRole}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  logoHeart: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  cardsContainer: {
    gap: 16,
    flex: 1,
  },
  roleCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  roleCardActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  roleCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTextContainer: {
    flex: 1,
  },
  roleName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonDisabled: {
    backgroundColor: Colors.textLight,
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
