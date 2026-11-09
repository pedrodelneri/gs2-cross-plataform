import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Telas
import DashboardScreen from './src/screens/DashboardScreen';
import AlertFormScreen from './src/screens/AlertFormScreen';

// 1. Tipagem das rotas (excelente prática para projetos em TypeScript)
export type RootStackParamList = {
  Dashboard: undefined; // undefined significa que a rota não exige parâmetros
  AlertForm: undefined;
};

// 2. Criação do Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: '#2C3E50' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Painel de Inteligência' }} 
        />
        <Stack.Screen 
          name="AlertForm" 
          component={AlertFormScreen} 
          options={{ title: 'Registrar Alerta' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}