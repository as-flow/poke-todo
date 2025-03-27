import React from 'react';
import { TabView } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import TodoList from './pages/TodoList';
import { TaskProvider } from './contexts';

const renderScene = ({ route }: { route: { key: string, title: string } }) => {
  switch (route.key) {
    case 'recurring':
      return <TodoList tabKey='recurring' />;
    case 'urgent':
      return <TodoList tabKey='urgent' />;
    case 'future':
      return <TodoList tabKey='future' />;
    default:
      return null;
  }
};

export const routes = [
  { key: 'recurring', title: 'Recurring' },
  { key: 'urgent', title: 'Urgent' },
  { key: 'future', title: 'Future' },
];

function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <TaskProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </TaskProvider>
  );
}

export default App;
