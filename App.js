import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from "./views/NuevaOrden"
import Menu from "./views/Menu"
import DetallePlatillo from "./views/DetallePlatillo"
import FormularioPlatillo from "./views/FormularioPlatillo"
import ResumenDePedido from "./views/ResumenDePedido"
import ProgresoDePedido from "./views/ProgresoDePedido"



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="NuevaOrden" component={NuevaOrden} options={{title:"Nueva Orden"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;