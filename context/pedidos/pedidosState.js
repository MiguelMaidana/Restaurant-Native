import React, {useReducer} from "react"

import PedidoReducer from "./pedidosReducer"
import PedidoContext from "./pedidosContext"

import {SELECCIONAR_PRODUCTO} from "../../types/index"


const PedidoState = props =>{
    
    // crear un state inicial
    const initialState = {
        pedido :[],
        platillo : null
    }

const [state, dispatch] = useReducer(PedidoReducer,initialState)


// selecciona el producto que el usuario desea ordenar

const seleccionarPlatillo =(platillo)=>{
    console.log(platillo)
   dispatch({

    type:SELECCIONAR_PRODUCTO,
    payload:platillo

   })
  
}

return (
    <PedidoContext.Provider
        value={{
            pedido:state.pedido,
            platillo:state.platillo,
            seleccionarPlatillo
    }}
        
    >
        {props.children}


    </PedidoContext.Provider>
)


}
export default PedidoState