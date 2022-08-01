import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../actions";


export default function SerchBar (){
    const dispatch = useDispatch()
    const[name,setName] = useState('')

    function handle(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function hadleSudmit(e){
        e.preventDefault()
        dispatch(getName(name))
        
    }
    return(
        <div>
            <input type="text" placeholder="ingresar nombre de la receta" onChange={(e)=>handle(e)}/>
            <button onClick={(e)=>hadleSudmit(e)}>Buscar</button>
        </div>
    )
}