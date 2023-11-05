import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';



import ViewList from './views/ViewList'; // Nome do componente e do arquivo começa com letra maiúscula
import ViewRegister from './views/ViewRegister'; // Nome do componente e do arquivo começa com letra maiúscula

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Agendados" component={ViewList} /> 
        <Stack.Screen name="Agendar" component={ViewRegister} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
