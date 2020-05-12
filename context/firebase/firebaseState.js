import React,{useReducer} from "react"

import firebase from "../../firebase"
import FirebaseReducer from "./firebaseReducer"
import FirebaseContext from "./firebaseContext"

//console.log(firebase)

const FirebaseState = (props)=>{

        //creamos State inicial

        const initialState ={
            menu :[]
        }

        // useReducer con dispatch para ejecutar las funciones

        const [state,dispatch] = useReducer(FirebaseReducer,initialState)

    return (
        <FirebaseContext.Provider
            value={{
                menu: state.menu,
                firebase
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState