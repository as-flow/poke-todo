import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import TimePicker from './TimePicker';
import { Task } from '../../types';
import CategoryPicker from './CategoryPicker';
import { useTaskContext } from '../contexts/taskContext';

interface TaskModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  selectedTask: Task | null;
  setSelectedTask: (task: Task | null) => void;
  category: Task["category"];
}

const TaskModal: React.FC<TaskModalProps> = ({
  modalVisible,
  setModalVisible,
  selectedTask,
  setSelectedTask,
  category,
}) => {
  const [text, setText] = useState<string>('');
  const [timeRequired, setTimeRequired] = useState<string>('1 minute');
  const [taskCategory, setTaskCategory] = useState<string>(category);

  const { addTask, editTask, deleteTask } = useTaskContext();

  const handleAddTask = () => {
    if (text.trim()) {
      addTask({ id: Date.now().toString(), text: text, completed: false, timeRequired, category });
      setText('');
      setTimeRequired('1 minute');
      setModalVisible(false);
    }
  };

  const handleEditTask = () => {
    if (selectedTask) {
      editTask({ ...selectedTask })
      setSelectedTask(null);
      setModalVisible(false);
    }
  };

  const handleDeleteTask = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      setSelectedTask(null);
      setModalVisible(false);
    }
  };

  return (
    <Modal visible={modalVisible} transparent animationType="slide">
      <Pressable onPress={() => setModalVisible(false)} style={styles.modalContainer}>
        <TouchableWithoutFeedback>
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
                <TimePicker
                  selectedValue={selectedTask.timeRequired}
                  onValueChange={(itemValue) => setSelectedTask({ ...selectedTask, timeRequired: itemValue })}
                />
                <CategoryPicker
                  selectedValue={selectedTask.category}
                  onValueChange={(itemValue) => setSelectedTask({ ...selectedTask, category: itemValue as Task["category"] })}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleEditTask}>
                  <Text style={styles.addButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteTask}>
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.modalTitle}>Add Task</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter task"
                  value={text}
                  onChangeText={setText}
                />
                <TimePicker
                  selectedValue={timeRequired}
                  onValueChange={setTimeRequired}
                />
                <CategoryPicker
                  selectedValue={taskCategory}
                  onValueChange={setTaskCategory}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Pressable>
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
