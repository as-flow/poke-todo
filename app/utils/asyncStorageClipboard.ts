import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';

// Export all AsyncStorage data to clipboard
export const exportAllDataToClipboard = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys(); // Get all stored keys
    if (keys.length === 0) {
      alert('No data to export.');
      return;
    }

    const storedDataArray = await AsyncStorage.multiGet(keys); // Retrieve all key-value pairs
    const storedData = Object.fromEntries(storedDataArray); // Convert to an object

    await Clipboard.setStringAsync(JSON.stringify(storedData)); // Copy to clipboard
    alert('All data copied to clipboard!');
  } catch (error) {
    console.error('Failed to export data:', error);
    alert('Error exporting data.');
  }
};

// Import all AsyncStorage data from clipboard
export const importAllDataFromClipboard = async () => {
  try {
    const clipboardContent = await Clipboard.getStringAsync();
    if (!clipboardContent) {
      alert('Clipboard is empty.');
      return;
    }

    const importedData = JSON.parse(clipboardContent); // Parse clipboard content
    if (typeof importedData !== 'object' || importedData === null) {
      alert('Invalid data format!');
      return;
    }

    // Save each key-value pair back to AsyncStorage
    await AsyncStorage.multiSet(Object.entries(importedData));
    alert('All data imported successfully!');
  } catch (error) {
    console.error('Failed to import data:', error);
    alert('Error importing data.');
  }
};