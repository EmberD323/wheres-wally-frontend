import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import ScoreCards from "./Partials/ScoreCards";


export default function ScorePage (){
    const [loading,setLoading] = useState(true);
    const [scores,setScores]=useState(null);

    //fetch scores
    useEffect(()=>{
        fetch("https://wheres-wally-backend.onrender.com/scores",{
        method: "GET",
        mode:"cors"
        })
        .then((response)=>response.json())
        .then((json)=>setScores(json))
        .catch((error)=>console.log(error))
        .finally(()=>setLoading(false));

    },[])

    if(loading) return <p>Loading</p>

    return (
        <div className="scorepage">
            <h2>Scoreboard</h2>
            <ScoreCards scores={scores}></ScoreCards>
        </div>
    )
}


