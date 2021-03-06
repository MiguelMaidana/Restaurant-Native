import React,{useState,useContext,useEffect} from 'react';
import {Alert} from "react-native"
import{Container,Content, Form,Icon,Input,Grid,Text,Col,Button,Footer,FooterTab} from "native-base"
import {useNavigation} from "@react-navigation/native"
import globalStyles from "../styles/global"

import PedidoContext from "../context/pedidos/pedidosContext"




const FormularioPlatillo = () => {




    // state para cantidades
    const[cantidad,guardarCantidad] = useState(1)

    const[total,guardarTotal]= useState(0)

    //context
    const {platillo,guardarPedido} = useContext(PedidoContext)

    //console.log("estoy en platillo en el state : " ,platillo)

    const {precio} =platillo

    // redireccionar 

    const navigation = useNavigation()



    // en cuanto el componente carga, calcular la cantidad a pagar

    useEffect(()=>{
        calcularTotal()
    },[cantidad])


    //calcula el precio del platillo segun su cantidad
    
    const calcularTotal=()=>{
        const totalPagar = precio*cantidad
        guardarTotal(totalPagar)
    }

    //decrementarUNO

    const decrementarUno =()=>{
        if(cantidad >1){
            const nuevaCantidad = parseInt(cantidad) - 1 
            guardarCantidad(nuevaCantidad)
        }
    }

  
    // se incremente en uno la cantidad 

    const incrementarUno =()=>{
        const nuevaCantidad = parseInt(cantidad) + 1 
        guardarCantidad(nuevaCantidad)
    }

    // confirma si la orden es correcta

    const confirmarOrden =()=>{
        Alert.alert(
            "Deseas Confirmar tu pedido?",
            "Un pedido confirmado ya no se podra modificar",
            [
                {
                    text:"Confirmar",
                    onPress:()=>{
                        //Almacenar el pedido al pedido principal

                        const pedido={
                            ...platillo,
                            cantidad,
                            total
                        }

                        //console.log(pedido.id)
                        // console.log("viendo que llega a mi state en pedidos",pedido)
                        // console.log(pedido.id)
                        guardarPedido(pedido)

                        // navegar hacia el Resumen

                        navigation.navigate("ResumenDePedido")
                    },
                },
                {
                    text:"Cancelar",
                    style :"cancel"

                }
            ]
        )
    }   

    return (
        
            <Container>
                <Content>
                    <Form>
                        <Text style={globalStyles.titulo}>Cantidad</Text>
                        <Grid>
                            <Col>
                                <Button
                                    props
                                    dark
                                    style={{height:80, justifyContent:"center"}}
                                    onPress={()=>decrementarUno()}
                                >
                                    <Icon style={{fontSize :40}} name="remove" />
                                </Button>
                            </Col>
                            <Col>
                                <Input
                                    style={{textAlign:"center", fontSize:20}}
                                    value={cantidad.toString()}
                                    keyboardType="numeric"
                                    onChangeText={cantidad=> guardarCantidad(cantidad)}
                                />
                            </Col>
                            <Col>
                                     <Button
                                        props
                                        dark
                                        style={{height:80, justifyContent:"center"}}
                                        onPress={()=>incrementarUno()}

                                     >
                                        <Icon style={{fontSize :40}} name="add" />
                                    </Button>
                            </Col>
                        </Grid>
                            <Text style={globalStyles.cantidad}>SubTotal : ${total}</Text>
                    </Form>
                </Content>
                        <Footer>
                            <FooterTab>
                                    <Button
                                    style={globalStyles.boton}
                                    onPress={()=> confirmarOrden()}
                                    >
                                        <Text style={globalStyles.botonTexto}>Agregar Al Pedido</Text>
                                    </Button>
                            </FooterTab>
                        </Footer>
            </Container>
        
    );
};

export default FormularioPlatillo;