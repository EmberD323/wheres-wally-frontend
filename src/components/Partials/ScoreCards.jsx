import ScoreCard from "./ScoreCard.jsx";

export default function ScoreCards ({scores}){
    if(scores==null)return
    return (
        <div className="scoreCards">
            <div key={crypto.randomUUID()} className="scoreCard">
            <div className="title"> Name</div>
            <div className="title">Time</div>
            </div>
            {scores.map((score) => {
                return <ScoreCard score={score}/>
            })}
        </div>
    
    )
}