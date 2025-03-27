import React, { useState, useEffect } from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { View, useWindowDimensions } from 'react-native';
import List from './TodoList';

const renderScene = SceneMap({
  recurring: List,
  urgent: List,
  future: List,
});

const routes = [
  { key: 'recurring', title: 'Recurring' },
  { key: 'urgent', title: 'Urgent' },
  { key: 'future', title: 'Future' },
];

function App() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default App;
