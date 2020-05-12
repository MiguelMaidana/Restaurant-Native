import React,{useReducer} from "react"

import firebase from "../../firebase"
import FirebaseReducer from "./firebaseReducer"
import FirebaseContext from "./firebaseContext"

import {OBTENER_PRODUCTOS} from "../../types/index"

//console.log(firebase)

const FirebaseState = (props)=>{

        //creamos State inicial

        const initialState ={
            menu :[]
        }

        // useReducer con dispatch para ejecutar las funciones

        const [state,dispatch] = useReducer(FirebaseReducer,initialState)

        // funcion que se ejecuta para traer los productos

        const obtenerProductos=()=>{
            dispatch({
                type: OBTENER_PRODUCTOS,
                payload
            })
        }

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase,
                obtenerProductos
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState