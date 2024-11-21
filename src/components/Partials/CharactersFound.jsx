
export default function CharactersFound ({answers,wallyFound,wendaFound,imageHeight,imageWidth}){
    if(answers ==null ||imageHeight==null || imageWidth==null  ) return;
    //if(wallyFound == false && wendaFound == false  ) return;
    console.log(answers[0].y*imageHeight/100)

    const mystyle1 = {
      left:answers[0].x*imageWidth/100 -12.5+"px",
      top:answers[0].y*imageHeight/100 +"px"
    };
    const mystyle2 = {
        left:answers[1].x*imageWidth/100 - 12.5+"px",
        top:answers[1].y*imageHeight/100 - 25+"px"
      };
    // /{String(wallyFound)}
    // /{String(wendaFound)}
    return (
        <>
        <div className="foundAreaWally" id="true" style={mystyle1}>
            <div className="foundBox"></div>
        </div>
        <div className="foundAreaWenda" id="true" style={mystyle2}>
                <div className="foundBox"></div>
        </div>
        </>

    )
}


