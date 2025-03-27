import React from 'react';
import {StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CategoryPickerProps {
  selectedValue: string,
  onValueChange: ((itemValue: string, itemIndex: number) => void),
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {["recurring", "urgent", "future"].map(cat => (
        <Picker.Item key={cat} label={cat} value={cat} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: '100%',
    marginBottom: 10,
  },
});

export default CategoryPicker;
