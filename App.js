import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from "./views/NuevaOrden"
import Menu from "./views/Menu"
import DetallePlatillo from "./views/DetallePlatillo"
import FormularioPlatillo from "./views/FormularioPlatillo"
import ResumenDePedido from "./views/ResumenDePedido"
import ProgresoDePedido from "./views/ProgresoDePedido"

// importar State de context 

import FirebaseState from "./context/firebase/firebaseState"
import PedidoState from "./context/pedidos/pedidosState"


const Stack = createStackNavigator();

function App() {
  return (
    <FirebaseState>
        <PedidoState>
            <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                  headerStyle :{
                    backgroundColor:"#FFDA00"
                  },
                  headerTitleStyle :{
                    fontWeight :"bold"
                  }  
                }}
                >
                      <Stack.Screen name="NuevaOrden" component={NuevaOrden} options={{title:"Nueva Orden"}} />
                      <Stack.Screen name="Menu" component={Menu} options={{title:"Nuestro Menu"}} />
                      <Stack.Screen name="DetallePlatillo" component={DetallePlatillo} options={{title:"Detalle Platillo"}} />
                      <Stack.Screen name="FormularioPlatillo" component={FormularioPlatillo} options={{title:"Ordenar Platillo"}} />
                      <Stack.Screen name="ResumenDePedido" component={ResumenDePedido} options={{title:"Resumen Pedido"}} />
                      <Stack.Screen name="ProgresoDePedido" component={ProgresoDePedido} options={{title:"Progreso Pedido"}} />
                </Stack.Navigator>
            </NavigationContainer>
        </PedidoState>
    </FirebaseState>
  );
}

export default App;