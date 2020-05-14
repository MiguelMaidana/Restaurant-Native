import React, {useReducer} from "react"

import PedidoReducer from "./pedidosReducer"
import PedidoContext from "./pedidosContext"

import {SELECCIONAR_PRODUCTO} from "../../types/index"
import {CONFIRMAR_ORDENAR_PLATILLO,MOSTRAR_RESUMEN} from "../../types/index"


const PedidoState = props =>{
    
    // crear un state inicial
    const initialState = {
        pedido :[],
        platillo : null,
        total : 0,
    }

const [state, dispatch] = useReducer(PedidoReducer,initialState)


// selecciona el producto que el usuario desea ordenar

const seleccionarPlatillo =(platillo)=>{
    //console.log(platillo)
   dispatch({

    type:SELECCIONAR_PRODUCTO,
    payload:platillo

   })
  
}
// Cuando el usuario confirma un platillo

const guardarPedido =(pedido) =>{
    //console.log(pedido)
    dispatch({
        type:CONFIRMAR_ORDENAR_PLATILLO,
        payload:pedido
        })

}

// muestra el total a pagar en el resumen

const mostrarResumen = total =>{
    dispatch({
        type:MOSTRAR_RESUMEN,
        payload:total


    })
}

return (
    <PedidoContext.Provider
        value={{
            pedido:state.pedido,
            platillo:state.platillo,
            total : state.total,
            seleccionarPlatillo,
            guardarPedido,
            mostrarResumen
    }}
        
    >
        {props.children}


    </PedidoContext.Provider>
)


}
export default PedidoState