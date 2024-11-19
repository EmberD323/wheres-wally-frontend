import { func } from "prop-types";

export default function TargetBox ({selectedX,selectedY,handleFind}){
    let positionX = selectedX - 12.5;
    let positionY = selectedY - 12.5;

    const mystyle = {
      left:positionX+"px",
      top:positionY+"px"
    };
    
    
    if(selectedX == null){
        return
    }
    return (
        <div className="selectedArea" style={mystyle}>
            <div className="box"></div>
            <div className="dropdown">
                <div onClick={handleFind}>Wally</div>
                <div onClick={handleFind}>Woof</div>
                <div onClick={handleFind}>Wenda</div>
                <div onClick={handleFind}>Wizard</div>
                <div onClick={handleFind}>Odlaw</div>

            </div>
        </div>

    )
}


