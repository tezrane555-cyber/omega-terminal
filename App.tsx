import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './src/services/AppContext';
import ChatScreen from './src/screens/ChatScreen';
import ConfigScreen from './src/screens/ConfigScreen';
import ToolsScreen from './src/screens/ToolsScreen';
import TerminalScreen from './src/screens/TerminalScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons: Record<string, string> = {
                Chat: 'chat', Config: 'settings', Tools: 'build', Terminal: 'terminal',
              };
              return <Icon name={icons[route.name] || 'help'} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#00ff41',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#1a1a2e' },
            headerStyle: { backgroundColor: '#0a0a0a' },
            headerTintColor: '#00ff41',
          })}
        >
          <Tab.Screen name="Chat" component={ChatScreen} />
          <Tab.Screen name="Config" component={ConfigScreen} />
          <Tab.Screen name="Tools" component={ToolsScreen} />
          <Tab.Screen name="Terminal" component={TerminalScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
