import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <MaterialCommunityIcons name="gold" size={24} color="#FFD700" />
        <Text style={styles.text}>123</Text>
      </View>
      <View style={styles.item}>
        <MaterialCommunityIcons name="lightning-bolt" size={24} color="#00BFFF" />
        <Text style={styles.text}>45</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#111827',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
