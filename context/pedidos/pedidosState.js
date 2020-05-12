import React, {useReducer} from "react"

import PedidoReducer from "./pedidosReducer"
import PedidoContext from "./pedidosContext"




const PedidoState = props =>{
    
    // crear un state inicial
    const initialState = {
        pedido :[]
    }

const [state, dispatch] = useReducer(PedidoReducer,initialState)

return (
    <PedidoContext.Provider
        value={{pedido:state.pedido}}
    >
        {props.children}


    </PedidoContext.Provider>
)


}
export default PedidoState