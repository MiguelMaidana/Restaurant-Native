import {SELECCIONAR_PRODUCTO} from "../../types/index"


export default (state,action) =>{
    switch(action.type){
        case SELECCIONAR_PRODUCTO :
            return{
                ...state,
                platillo : action.payload

            }
        default:
            return state
    }
}