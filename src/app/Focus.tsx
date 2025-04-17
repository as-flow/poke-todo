import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Focus() {
  const [duration, setDuration] = useState(25); // in minutes
  const [remainingTime, setRemainingTime] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setRemainingTime(duration * 60);
    setIsRunning(true);
  };

  const handleGiveUp = () => {
    setIsRunning(false);
    setRemainingTime(duration * 60);
  };

  const handleSelectDuration = (value: number) => {
    setDuration(value);
    setRemainingTime(value * 60);
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      {/* Circle Timer */}
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

      {/* Start / Give up Button */}
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
