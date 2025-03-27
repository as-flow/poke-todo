import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  timeRequired: string;
};

interface TaskModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  calculateRemainingTime: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  modalVisible,
  setModalVisible,
  selectedTask,
  setSelectedTask,
  tasks,
  setTasks,
  calculateRemainingTime,
}) => {
  const [task, setTask] = useState<string>('');
  const [timeRequired, setTimeRequired] = useState<string>('1 minute');

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false, timeRequired }]);
      setTask('');
      setTimeRequired('1 minute');
      setModalVisible(false);
      calculateRemainingTime();
    }
  };

  const editTask = () => {
    if (selectedTask) {
      setTasks(tasks.map(task => task.id === selectedTask.id ? { ...task, text: task.text, timeRequired } : task));
      setSelectedTask(null);
      setModalVisible(false);
      calculateRemainingTime();
    }
  };

  const deleteTask = () => {
    if (selectedTask) {
      setTasks(tasks.filter(task => task.id !== selectedTask.id));
      setSelectedTask(null);
      setModalVisible(false);
      calculateRemainingTime();
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {selectedTask ? (
            <>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={selectedTask.text}
                onChangeText={(text) => setSelectedTask({ ...selectedTask, text })}
              />
              <Picker
                selectedValue={selectedTask.timeRequired}
                onValueChange={(itemValue) => setSelectedTask({ ...selectedTask, timeRequired: itemValue })}
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
              <TouchableOpacity style={styles.addButton} onPress={editTask}>
                <Text style={styles.addButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={deleteTask}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Add Task</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter task"
                value={task}
                onChangeText={setTask}
              />
              <Picker
                selectedValue={timeRequired}
                onValueChange={setTimeRequired}
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
              <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TaskModal;
