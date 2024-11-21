import { useState, } from "react";
import { useNavigate} from "react-router-dom";

import Errors from "./Errors";



export default function Form ({timer,wendaFound,wallyFound}){
    let formOpen;
    const[name,setName] = useState("");
    const[formErrors,setFormErrors] = useState(null);
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        
        const response = await fetch("https://wheres-wally-backend.onrender.com/scores", {
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name,time:timer}),
        }); 
        if(response.status != 200){//if theres errors
            const errors = await response.json();
            setFormErrors(errors)
            //setFormErrors(errors)
        }
        else{
            navigate('../scorepage');

        }
    }
    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleCancel(e){
        e.preventDefault();
        formOpen = "false";
    }
    
    if(wallyFound && wendaFound){
        formOpen = "true";
    }
    else{
        formOpen = "false";
    }
   
    return (

            
            <form className="form-container" id={formOpen} >
                <button type="cancel" onClick={handleCancel}>Cancel</button>
                <div>Congrats you won! You found Wally and Wenda in {timer} seconds.</div>
                <div>Enter your name below to get on the Scoreboard.</div>
                <div className="formElements">
                    <label htmlFor="name"><b>Name:</b></label>
                    <input type="text" placeholder="name" className="name" min={1} max={20} value={name} onChange={handleNameChange} required/>
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    
                </div>
                <Errors errors={formErrors}/>
            </form>

    )
}


