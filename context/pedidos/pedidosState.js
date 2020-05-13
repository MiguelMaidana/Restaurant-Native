import React, {useReducer} from "react"

import PedidoReducer from "./pedidosReducer"
import PedidoContext from "./pedidosContext"

import {SELECCIONAR_PRODUCTO} from "../../types/index"
import {CONFIRMAR_ORDENAR_PLATILLO} from "../../types/index"


const PedidoState = props =>{
    
    // crear un state inicial
    const initialState = {
        pedido :[],
        platillo : null
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

    dispatch({
        type:CONFIRMAR_ORDENAR_PLATILLO,
        payload:pedido
        })

} 

return (
    <PedidoContext.Provider
        value={{
            pedido:state.pedido,
            platillo:state.platillo,
            seleccionarPlatillo,
            guardarPedido
    }}
        
    >
        {props.children}


    </PedidoContext.Provider>
)


}
export default PedidoState