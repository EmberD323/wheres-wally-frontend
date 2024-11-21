import ScoreCard from "./ScoreCard.jsx";

export default function ScoreCards ({scores}){
    console.log(scores)
    if(scores==null)return
    if(scores.length===0){
        return(
            <div className="noScores">No Scores yet - play the game and be the first on the board!</div>     
        )
    }
    return (
        <div className="scoreCards">
            <div className="title"> Name</div>
            <div className="title">Time</div>
            {scores.map((score) => {
                return <ScoreCard score={score}/>
            })}
        </div>
    
    )
}