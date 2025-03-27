import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import { AntDesign } from '@expo/vector-icons';
import TaskModal from './TaskModal';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  timeRequired: string;
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hoursLeft, setHoursLeft] = useState<number>(24);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const calculateRemainingTime = () => {
    const currentDate = new Date();
    const currentTime = currentDate.getHours() + currentDate.getMinutes() / 60;

    const totalMinutes = tasks.filter(task => !task.completed).reduce((sum, task) => {
      const time = parseInt(task.timeRequired.split(' ')[0]);
      return task.timeRequired.includes('minute') ? sum + time :
             task.timeRequired.includes('hour') ? sum + time * 60 : 
             task.timeRequired.includes('day') ? sum + time * 1440 : sum;
    }, 0);

    const remainingTime = Math.max(24 - currentTime - totalMinutes / 60, 0);
    setHoursLeft(remainingTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 60000);

    return () => clearInterval(interval);
  }, [tasks]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: !task.completed } : task));
    calculateRemainingTime();
  };

  const openEditDeleteModal = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeIndicator}>Hours left today: {hoursLeft.toFixed(1)}</Text>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.taskContainer} 
            onPress={() => toggleTaskCompletion(item.id)} 
            onLongPress={() => openEditDeleteModal(item)}
          >
            <Checkbox
              value={item.completed}
              onValueChange={() => toggleTaskCompletion(item.id)}
            />
            <View>
              <Text style={[styles.taskText, item.completed && styles.completed]}>{item.text}</Text>
              <Text style={styles.timeText}>Time: {item.timeRequired}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <TaskModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        tasks={tasks}
        setTasks={setTasks}
        calculateRemainingTime={calculateRemainingTime}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  timeIndicator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
    marginLeft: 10,
  },
  timeText: {
    fontSize: 14,
    marginLeft: 10,
    color: 'gray',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#28a745',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default TodoList;
