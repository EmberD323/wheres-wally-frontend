
export default function ScoreCard ({score}){
    return (
        <div key={crypto.randomUUID()} className="scoreCard">
            <div className="name"> {score.name}</div>
            <div className="time">{score.seconds}</div>
        </div>
    
    )
}