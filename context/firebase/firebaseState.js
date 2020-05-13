import React,{useReducer} from "react"

import firebase from "../../firebase"
import FirebaseReducer from "./firebaseReducer"
import FirebaseContext from "./firebaseContext"

import {OBTENER_PRODUCTOS} from "../../types/index"

console.log(firebase)

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
                
            });

            //Consultar Firebase

            firebase.db 
                    .collection("productos")
                    .where("existencia","==", true) // trae solo los que estan en existencia
                    .onSnapshot(manejarSnapshot)

           function manejarSnapshot(snapshot) {

                let platillos = snapshot.docs.map(doc =>{
                    return {
                        id: doc.id,
                        ...doc.data()
                    }
                })

                console.log(platillos)

           }

           
            
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