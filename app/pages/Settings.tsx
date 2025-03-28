import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { exportAllDataToClipboard, importAllDataFromClipboard } from '../utils/asyncStorageClipboard';

const Settings: React.FC = () => {
  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={exportAllDataToClipboard}>
        <Text style={styles.buttonText}>Export All Data</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={importAllDataFromClipboard}>
        <Text style={styles.buttonText}>Import All Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Settings;