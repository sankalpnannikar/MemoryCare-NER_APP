/**
 * AI Voice Assistance Screen - MemoryCare-NER
 *
 * Voice assistant interface with:
 * - Back arrow and "AI Voice Assistance" header
 * - "Your personal voice companion. Talk, ask or get reminders – anytime." subtitle
 * - Large microphone button in the center ("Tap to Talk")
 * - Suggestion prompts with colored dots:
 *   - "Remind me about my medicine" (blue dot)
 *   - "What's on my schedule today?" (green dot)
 *   - "Play some relaxing music" (purple dot)
 *   - "Tell me a memory activity" (orange dot)
 *   - "Call my daughter" (pink dot)
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Suggestion {
  id: string;
  text: string;
  dotColor: string;
}

const suggestions: Suggestion[] = [
  { id: '1', text: 'Remind me about my medicine', dotColor: Colors.primary },
  { id: '2', text: "What's on my schedule today?", dotColor: Colors.green },
  { id: '3', text: 'Play some relaxing music', dotColor: Colors.purple },
  { id: '4', text: 'Tell me a memory activity', dotColor: Colors.orange },
  { id: '5', text: 'Call my daughter', dotColor: Colors.pink },
];

export default function AIVoiceScreen() {
  const [isListening, setIsListening] = useState(false);
  const pulseAnim = new Animated.Value(1);

  const handleTapToTalk = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Start pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Stop after 3 seconds (simulated)
      setTimeout(() => {
        setIsListening(false);
        pulseAnim.setValue(1);
        Alert.alert('AI Assistant', 'I heard you! How can I help you today?');
      }, 3000);
    } else {
      pulseAnim.setValue(1);
    }
  };

  const handleSuggestionPress = (suggestion: Suggestion) => {
    Alert.alert('AI Assistant', `Processing: "${suggestion.text}"`);
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
        <Text style={styles.headerTitle}>AI Voice Assistance</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Your personal voice companion.{'\n'}Talk, ask or get reminders –
          anytime.
        </Text>

        {/* Microphone Button */}
        <View style={styles.micSection}>
          <Animated.View
            style={[
              styles.micOuterRing,
              isListening && {
                transform: [{ scale: pulseAnim }],
                backgroundColor: `${Colors.primary}15`,
              },
            ]}
          >
            <View
              style={[
                styles.micInnerRing,
                isListening && { backgroundColor: `${Colors.primary}25` },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.micButton,
                  isListening && styles.micButtonActive,
                ]}
                onPress={handleTapToTalk}
                activeOpacity={0.8}
              >
                {/* Microphone icon - from Ionicons (internet icon pack) */}
                <Ionicons
                  name="mic"
                  size={40}
                  color={Colors.white}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Text style={styles.tapText}>
            {isListening ? 'Listening...' : 'Tap to Talk'}
          </Text>
        </View>

        {/* Suggestion Prompts */}
        <View style={styles.suggestionsSection}>
          {suggestions.map((suggestion) => (
            <TouchableOpacity
              key={suggestion.id}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.suggestionDot,
                  { backgroundColor: suggestion.dotColor },
                ]}
              />
              <Text style={styles.suggestionText}>{suggestion.text}</Text>
            </TouchableOpacity>
          ))}
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
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  micSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  micOuterRing: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  micInnerRing: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  micButton: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: Colors.green,
  },
  tapText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 16,
  },
  suggestionsSection: {
    width: '100%',
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  suggestionDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  suggestionText: {
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
  },
});
