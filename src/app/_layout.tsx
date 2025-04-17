import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TaskProvider } from '../contexts/taskContext';
import { View } from 'react-native';
import TopBar from '../components/TopBar';

export default function RootLayout() {
  return (
    <TaskProvider>
      <View style={{ flex: 1 }}>
        <TopBar />
        <Tabs
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#4f46e5',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName = 'circle';

              switch (route.name) {
                case 'Focus':
                  iconName = 'clock-outline';
                  break;
                case 'Tasks':
                  iconName = 'check-circle-outline';
                  break;
                case 'Battle':
                  iconName = 'sword-cross';
                  break;
                case 'Pokemon':
                  iconName = 'pokeball';
                  break;
                case 'Profile':
                  iconName = 'account-circle-outline';
                  break;
              }

              return (
                <MaterialCommunityIcons name={iconName} size={size} color={color} />
              );
            },
          })}
        >
          <Tabs.Screen name="Focus" options={{ title: 'Focus' }} />
          <Tabs.Screen name="Tasks" options={{ title: 'Tasks' }} />
          <Tabs.Screen name="Battle" options={{ title: 'Battle' }} />
          <Tabs.Screen name="Pokemon" options={{ title: 'Pokemon' }} />
          <Tabs.Screen name="Profile" options={{ title: 'Profile' }} />
        </Tabs>
      </View>
    </TaskProvider>
  );
}