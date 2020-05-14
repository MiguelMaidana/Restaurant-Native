import React,{useContext,useEffect} from 'react';
import {Alert,StyleSheet} from "react-native"
import{Container,Content,List,ListItem,Thumbnail,Text,Left,Body,Button,H1,Footer,FooterTab} from "native-base"

import {useNavigation} from "@react-navigation/native"
import globalStyles from "../styles/global"

import PedidoContext from "../context/pedidos/pedidosContext"

const ResumenDePedido = props => {




    //context de pedido 
     const {pedido,total,mostrarResumen} = useContext(PedidoContext)
    
     useEffect(()=>{
        calcularTotal()
     },[pedido])


     const calcularTotal=()=>{

        let nuevoTotal=0;
        nuevoTotal = pedido.reduce((nuevoTotal,articulo)=> nuevoTotal + articulo.total,0)

        mostrarResumen(nuevoTotal)

     }
   // console.log(pedido)
    //console.log(pedido.nombre)

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
                                        </Body>
                                    </ListItem>


                                </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a pagar : ${total}</Text>
            </Content>
        </Container>
    );
};



export default ResumenDePedido;