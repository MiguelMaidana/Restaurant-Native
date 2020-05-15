import React,{useContext,useEffect} from 'react';
import {Alert,StyleSheet} from "react-native"
import{Container,Content,List,ListItem,Thumbnail,Text,Left,Body,Button,H1,Footer,FooterTab} from "native-base"

import {useNavigation} from "@react-navigation/native"
import globalStyles from "../styles/global"
import firebase from "../firebase/index"

import PedidoContext from "../context/pedidos/pedidosContext"

const ResumenDePedido = props => {

    const navigation = useNavigation()


    //context de pedido 
     const {pedido,total,mostrarResumen,eliminarProducto,pedidoRealizado} = useContext(PedidoContext)
    
     useEffect(()=>{
        calcularTotal()
     },[pedido])


     const calcularTotal=()=>{

        let nuevoTotal=0;
        nuevoTotal = pedido.reduce((nuevoTotal,articulo)=> nuevoTotal + articulo.total,0)

        mostrarResumen(nuevoTotal)

     }

     //  redirecciona  a progreso pedido

     const progresoPedido=()=>{
        Alert.alert (
            "Revisa tu pedido",
            "Una vez que Realizas tu pedido NO podras cambiarlo",
            [
                {
                    text:"Confirmar",
                    onPress: async ()=>{
                        // crear un objeto para enviar a firebase

                        const pedidoObj ={
                            tiempoentrega:0,
                            completado: false,
                            total : Number(total),
                            orden : pedido, // array
                            creado: Date.now()
                        }

                        
                        // escribir el pedido en Firebase

                        try{
                            const pedido = await firebase.db.collection("ordenes").add(pedidoObj)
                            pedidoRealizado(pedido.id)

                            // redireccionar a progreso
                            navigation.navigate("ProgresoDePedido")
                        }catch(error){
                            console.log(error)
                        }
                      
                    }
                },
                {
                    text:"Revisar", style:"cancel"
                }
            ]

        )
     }
     // elimina un producto del arreglo del pedido 

     const confirmarEliminacion = (id)=>{
        Alert.alert (
            "Deseas eliminar este Articulo ",
            "Una vez eliminado no se puede recuperar",
            [
                {
                    text:"Confirmar",
                    onPress:()=>{

                        // eliminar del state 

                        eliminarProducto(id)

                    }
                },
                {
                    text:"Cancelar", style:"cancel"
                }
            ]

        )
     }
   

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Del Pedido</H1>

                {pedido.map((platillo, i)=>{

                    const {cantidad, nombre, imagen, id , precio} = platillo

                    return(
                                <List key={id + i}>
                                    
                                    <ListItem thumbnail>
                                        <Left>
                                            <Thumbnail large square source={{uri:imagen}} />
                                        </Left>

                                        <Body>
                                            <Text>{nombre}</Text>
                                            <Text>Cantidad : {cantidad}</Text>
                                            <Text>precio : ${precio}</Text>

                                            <Button
                                                full
                                                danger
                                                style={{marginTop:20}}
                                                onPress={()=>confirmarEliminacion(id)}
                                            >
                                                <Text style={[globalStyles.botonTexto,{color:"white"}]}>Eliminar</Text>
                                            </Button>
                                        </Body>
                                    </ListItem>


                                </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a pagar : ${total}</Text>

                <Button
                    style={{marginTop:30}}
                    onPress={()=> navigation.navigate("Menu")}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto,{color:"white"}]}>Seguir Ordenando</Text>
                </Button>
            </Content>

            <Footer>
                <FooterTab>
                <Button
                    style={globalStyles.boton}
                    onPress={()=> progresoPedido()}
                    
                >
                    <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};



export default ResumenDePedido;