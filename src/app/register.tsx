/**
 * Register Screen - MemoryCare-NER
 *
 * Registration form with:
 * - MemoryCare-NER logo at top
 * - "Create an Account" heading with "Join us to make care easier" subtitle
 * - Email input with mail icon
 * - Username input with person icon
 * - Location input with location pin icon (placeholder: "e.g., City, State")
 * - "I am a" dropdown/picker with person icon
 * - Register button (navigates to Who Are You screen)
 * - "Already have an account? Login" link (navigates back to Login)
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const ROLES = ['Elder', 'Caregiver', 'Family Member', 'Healthcare Professional'];

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [showRolePicker, setShowRolePicker] = useState(false);

  const handleRegister = () => {
    if (!email || !username || !location || !role) {
      Alert.alert('Missing Fields', 'Please fill in all fields to register.');
      return;
    }
    // Navigate to role selection after registration
    router.push('/who-are-you');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            {/* Back arrow icon - from Ionicons (internet icon pack) */}
            <Ionicons name="chevron-back" size={24} color={Colors.textDark} />
          </TouchableOpacity>

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              {/* Brain icon - from MaterialCommunityIcons (internet icon pack) */}
              <MaterialCommunityIcons name="brain" size={40} color="#4CAF50" />
              <View style={styles.logoHeart}>
                {/* Heart icon - from Ionicons (internet icon pack) */}
                <Ionicons name="heart" size={10} color="#FFF" />
              </View>
            </View>
            <Text style={styles.logoText}>MemoryCare-NER</Text>
          </View>

          {/* Heading */}
          <Text style={styles.title}>Create an Account</Text>
          <Text style={styles.subtitle}>Join us to make care easier</Text>

          {/* Form Fields */}
          <View style={styles.form}>
            {/* Email Field */}
            <View style={styles.inputContainer}>
              {/* Mail icon - from Ionicons (internet icon pack) */}
              <Ionicons name="mail-outline" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={Colors.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Username Field */}
            <View style={styles.inputContainer}>
              {/* Person icon - from Ionicons (internet icon pack) */}
              <Ionicons name="person-outline" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                placeholderTextColor={Colors.textLight}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            {/* Location Field */}
            <View style={styles.inputContainer}>
              {/* Location icon - from Ionicons (internet icon pack) */}
              <Ionicons name="location-outline" size={20} color={Colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="e.g., City, State"
                placeholderTextColor={Colors.textLight}
                value={location}
                onChangeText={setLocation}
              />
            </View>

            {/* Role Picker */}
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowRolePicker(true)}
            >
              {/* People icon - from Ionicons (internet icon pack) */}
              <Ionicons name="people-outline" size={20} color={Colors.textSecondary} />
              <Text
                style={[styles.input, !role && { color: Colors.textLight }]}
              >
                {role || 'I am a'}
              </Text>
              {/* Chevron icon - from Ionicons (internet icon pack) */}
              <Ionicons name="chevron-down" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity
              style={styles.loginLinkButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginLinkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Role Picker Modal */}
      <Modal
        visible={showRolePicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowRolePicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowRolePicker(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your role</Text>
            <FlatList
              data={ROLES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    role === item && styles.roleOptionActive,
                  ]}
                  onPress={() => {
                    setRole(item);
                    setShowRolePicker(false);
                  }}
                >
                  <Text
                    style={[
                      styles.roleOptionText,
                      role === item && styles.roleOptionTextActive,
                    ]}
                  >
                    {item}
                  </Text>
                  {role === item && (
                    <Ionicons name="checkmark-circle" size={22} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 30,
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
    marginTop: 16,
    marginBottom: 24,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  logoHeart: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textDark,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 28,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textDark,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  loginText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  loginLinkButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 50,
  },
  loginLinkText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  roleOptionActive: {
    backgroundColor: Colors.primaryLight,
  },
  roleOptionText: {
    fontSize: 16,
    color: Colors.textPrimary,
  },
  roleOptionTextActive: {
    fontWeight: '600',
    color: Colors.primary,
  },
});
