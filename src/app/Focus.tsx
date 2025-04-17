import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
  FlatList,
  AppState
} from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Focus() {
  const [duration, setDuration] = useState(25); // minutes
  const [endTime, setEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  // Background-safe timer
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && endTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((endTime - now) / 1000));
        setRemainingTime(diff);

        if (diff <= 0) {
          setIsRunning(false);
          setEndTime(null);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, endTime]);

  // Handle app returning from background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active' && isRunning && endTime) {
        const now = Date.now();
        const diff = Math.max(0, Math.floor((endTime - now) / 1000));
        setRemainingTime(diff);
      }
    });

    return () => sub.remove();
  }, [isRunning, endTime]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    const now = Date.now();
    const end = now + duration * 60 * 1000 + 1000;
    setEndTime(end);
    setIsRunning(true);
  };

  const handleGiveUp = () => {
    setIsRunning(false);
    setRemainingTime(duration * 60);
    setEndTime(null);
  };

  const handleSelectDuration = (value: number) => {
    setDuration(value);
    setRemainingTime(value * 60);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Circular Timer */}
      <TouchableOpacity onPress={() => !isRunning && setShowPicker(true)}>
        <AnimatedCircularProgress
          size={220}
          width={15}
          fill={(remainingTime / (duration * 60)) * 100}
          tintColor="#4f46e5"
          backgroundColor="#e5e7eb"
          rotation={0}
          lineCap="round"
        >
          {() => (
            <Text style={styles.timerText}>
              {formatTime(remainingTime)}
            </Text>
          )}
        </AnimatedCircularProgress>
      </TouchableOpacity>

      {/* Start / Give Up Button */}
      <TouchableOpacity
        style={[styles.button, isRunning && styles.giveUp]}
        onPress={isRunning ? handleGiveUp : handleStart}
      >
        <Text style={styles.buttonText}>
          {isRunning ? 'Give Up' : 'Start Training'}
        </Text>
      </TouchableOpacity>

      {/* Duration Picker Modal */}
      <Modal visible={showPicker} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            <FlatList
              data={Array.from({ length: 120 }, (_, i) => i + 1)}
              keyExtractor={(item) => item.toString()}
              numColumns={4}
              contentContainerStyle={{ gap: 10 }}
              columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: 5 }}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.durationItem}
                  onPress={() => handleSelectDuration(item)}
                >
                  <Text style={styles.durationText}>{item} min</Text>
                </Pressable>
              )}
            />
            <TouchableOpacity onPress={() => setShowPicker(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 30,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#111827',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  giveUp: {
    backgroundColor: '#dc2626',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  durationItem: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  durationText: {
    fontWeight: '500',
  },
  cancel: {
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
