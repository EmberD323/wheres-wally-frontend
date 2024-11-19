export default function TargetBox ({selectedX,selectedY}){
    let positionX = selectedX - 12.5;
    let positionY = selectedY - 12.5;
    //console.log(e.clientX,e.clientY)
    //console.log(e.screenX,e.screenY)
    //380 179
    //2296 300

    const mystyle = {
      left:positionX+"px",
      top:positionY+"px"
    };
    
    if(selectedX == null){
        return
    }
    return (
        <div className="selectedArea" style={mystyle}></div>

    )
}


