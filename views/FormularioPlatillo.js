import React,{useState,useContext,useEffect} from 'react';
import {StyleSheet} from "react-native"
import{Container,Content, Form,Icon,Input,Grid,Text,Col,Button} from "native-base"
import {useNavigation} from "@react-navigation/native"
import globalStyles from "../styles/global"

import PedidoContext from "../context/pedidos/pedidosContext"




const FormularioPlatillo = () => {




    // state para cantidades
    const[cantidad,guardarCantidad] = useState(1)

    const[total,guardarTotal]= useState(0)

    //context
    const {platillo} = useContext(PedidoContext)
    //console.log(platillo)
    const {precio} =platillo

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
            </Container>
        
    );
};

export default FormularioPlatillo;