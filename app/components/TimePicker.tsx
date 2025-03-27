import React from 'react';
import {StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface TaskModalProps {
  selectedValue: string,
  onValueChange: ((itemValue: string, itemIndex: number) => void),
}

const TimePicker: React.FC<TaskModalProps> = ({
  selectedValue,
  onValueChange,
}) => {
  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={styles.picker}
    >
      {[1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 50, 55].map(min => (
        <Picker.Item key={min} label={`${min} minutes`} value={`${min} minutes`} />
      ))}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hour => (
        <Picker.Item key={hour} label={`${hour} hours`} value={`${hour} hours`} />
      ))}
      {[1, 2, 3, 4, 5, 6, 7].map(day => (
        <Picker.Item key={day} label={`${day} days`} value={`${day} days`} />
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

export default TimePicker;
