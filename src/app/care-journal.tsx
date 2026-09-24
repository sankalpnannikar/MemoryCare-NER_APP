/**
 * Care Journal Screen - MemoryCare-NER
 *
 * Care journal for caregivers to log daily care notes:
 * - Back arrow and "Care Journal" header
 * - Today's date displayed
 * - List of journal entries with timestamps
 * - "Add Entry" button to create new journal entries
 * - Each entry shows time, note text, and mood indicator
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// Icons sourced from @expo/vector-icons (bundled with Expo)
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface JournalEntry {
  id: string;
  time: string;
  note: string;
  mood: 'happy' | 'neutral' | 'concerned';
  moodEmoji: string;
}

const initialEntries: JournalEntry[] = [
  {
    id: '1',
    time: '8:30 AM',
    note: 'Amma took her morning medicine on time. Had breakfast - idli and sambar.',
    mood: 'happy',
    moodEmoji: '😊',
  },
  {
    id: '2',
    time: '11:00 AM',
    note: 'Did a short memory activity together - picture quiz. She enjoyed it!',
    mood: 'happy',
    moodEmoji: '😊',
  },
  {
    id: '3',
    time: '2:00 PM',
    note: 'Amma seemed a bit tired after lunch. She rested for an hour.',
    mood: 'neutral',
    moodEmoji: '😐',
  },
  {
    id: '4',
    time: '4:30 PM',
    note: 'Went for a short walk in the garden. She was in a good mood.',
    mood: 'happy',
    moodEmoji: '😊',
  },
];

export default function CareJournalScreen() {
  const [entries, setEntries] = useState<JournalEntry[]>(initialEntries);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNote, setNewNote] = useState('');

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAddEntry = () => {
    if (!newNote.trim()) {
      Alert.alert('Empty Note', 'Please write something before saving.');
      return;
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    const newEntry: JournalEntry = {
      id: String(entries.length + 1),
      time: timeString,
      note: newNote.trim(),
      mood: 'happy',
      moodEmoji: '😊',
    };

    setEntries([newEntry, ...entries]);
    setNewNote('');
    setShowAddModal(false);
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
        <Text style={styles.headerTitle}>Care Journal</Text>
        <TouchableOpacity
          style={styles.addHeaderButton}
          onPress={() => setShowAddModal(true)}
        >
          {/* Add icon - from Ionicons (internet icon pack) */}
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Date */}
      <View style={styles.dateContainer}>
        {/* Calendar icon - from Ionicons (internet icon pack) */}
        <Ionicons name="calendar" size={18} color={Colors.primary} />
        <Text style={styles.dateText}>{dateString}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {entries.map((entry) => (
          <View key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryTimeContainer}>
                {/* Time icon - from Ionicons (internet icon pack) */}
                <Ionicons name="time-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.entryTime}>{entry.time}</Text>
              </View>
              <Text style={styles.entryMoodEmoji}>{entry.moodEmoji}</Text>
            </View>
            <Text style={styles.entryNote}>{entry.note}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Add Entry Button - Fixed at Bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          {/* Notebook icon - from MaterialCommunityIcons (internet icon pack) */}
          <MaterialCommunityIcons name="notebook-plus" size={22} color={Colors.white} />
          <Text style={styles.addButtonText}>Add Journal Entry</Text>
        </TouchableOpacity>
      </View>

      {/* Add Entry Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowAddModal(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>New Journal Entry</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Write your care note..."
              placeholderTextColor={Colors.textLight}
              multiline
              numberOfLines={4}
              value={newNote}
              onChangeText={setNewNote}
              textAlignVertical="top"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setShowAddModal(false);
                  setNewNote('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddEntry}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
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
  addHeaderButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  entryCard: {
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
  entryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  entryTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  entryTime: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  entryMoodEmoji: {
    fontSize: 20,
  },
  entryNote: {
    fontSize: 15,
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: Colors.background,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: 14,
    paddingVertical: 16,
    gap: 8,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textDark,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 16,
    fontSize: 15,
    color: Colors.textDark,
    minHeight: 120,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.white,
  },
});
