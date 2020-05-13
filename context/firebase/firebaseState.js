import React,{useReducer} from "react"

import firebase from "../../firebase"
import FirebaseReducer from "./firebaseReducer"
import FirebaseContext from "./firebaseContext"

import {OBTENER_PRODUCTOS_EXITO} from "../../types/index"

import _ from "lodash"

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
                // ordenar por categortia con lodash

                platillos = _.sortBy(platillos,"categoria");
                //console.group(platillos)



                //console.log(platillos) Tenemos resultados de la base de datos
                dispatch({
                    type: OBTENER_PRODUCTOS_EXITO,
                    payload: platillos
                    
                });

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