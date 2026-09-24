/**
 * Splash Screen - MemoryCare-NER
 * 
 * The landing screen showing the app branding:
 * - Brain logo with heart accent
 * - App name "MemoryCare-NER"
 * - Tagline "Care Today, Brighter Tomorrows"
 * - Illustration of caregivers (using vector icons as illustration)
 * - Subtitle "Support · Connect · Remember"
 * 
 * Auto-navigates to the Login screen after 3 seconds.
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
// Icons sourced from @expo/vector-icons (bundled with Expo)
// MaterialCommunityIcons: https://materialdesignicons.com/
// Ionicons: https://ionic.io/ionicons
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* Background decorative circles */}
      <View style={styles.bgCircle1} />
      <View style={styles.bgCircle2} />
      <View style={styles.bgCircle3} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        {/* Brain Logo with Heart */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            {/* Brain icon - from MaterialCommunityIcons (internet icon pack) */}
            <MaterialCommunityIcons name="brain" size={64} color="#4CAF50" />
          </View>
          {/* Heart icon overlay - from Ionicons (internet icon pack) */}
          <View style={styles.heartBadge}>
            <Ionicons name="heart" size={18} color="#FFFFFF" />
          </View>
        </View>

        {/* App Name */}
        <Text style={styles.appName}>MemoryCare-NER</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Care Today</Text>
        <Text style={styles.tagline}>Brighter Tomorrows</Text>

        {/* Illustration Area - using icons as placeholder for illustration */}
        {/* In the mockup, this shows an illustration of people caring for each other */}
        {/* Image source: Mockup design - represented here with vector icons */}
        <View style={styles.illustrationContainer}>
          <View style={styles.illustrationBg}>
            {/* Person icons representing the caregiving illustration from the mockup */}
            <MaterialCommunityIcons
              name="account-group"
              size={100}
              color="rgba(255,255,255,0.3)"
            />
          </View>
          <View style={styles.illustrationOverlay}>
            {/* Elderly person icon - from MaterialCommunityIcons (internet icon pack) */}
            <MaterialCommunityIcons
              name="human-cane"
              size={50}
              color="rgba(255,255,255,0.6)"
              style={{ marginRight: 10 }}
            />
            {/* Caregiver icon - from MaterialCommunityIcons (internet icon pack) */}
            <MaterialCommunityIcons
              name="hand-heart"
              size={50}
              color="rgba(255,255,255,0.6)"
            />
          </View>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Support · Connect · Remember</Text>

        {/* Get Started Button */}
        <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
          <Text style={styles.getStartedText}>Get Started</Text>
          {/* Arrow icon - from Ionicons (internet icon pack) */}
          <Ionicons name="arrow-forward" size={20} color="#0B3D91" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B3D91',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  bgCircle1: {
    position: 'absolute',
    top: -100,
    right: -80,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(21, 101, 192, 0.4)',
  },
  bgCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -100,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(21, 101, 192, 0.3)',
  },
  bgCircle3: {
    position: 'absolute',
    top: height * 0.3,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(67, 160, 71, 0.15)',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heartBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 20,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 28,
  },
  illustrationContainer: {
    marginTop: 40,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    height: 140,
  },
  illustrationBg: {
    position: 'absolute',
  },
  illustrationOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 2,
    marginBottom: 40,
  },
  getStartedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B3D91',
  },
});
