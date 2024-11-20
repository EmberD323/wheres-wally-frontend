
export default function CharactersFound ({answers,wallyFound,wendaFound,imageHeight,imageWidth}){
    if(answers ==null ||imageHeight==null || imageWidth==null  ) return;
    if(wallyFound == false && wendaFound == false  ) return;

    const mystyle1 = {
      left:answers[0].x*imageWidth/100 - 12.5+"px",
      top:answers[0].y*imageHeight/100 - 12.5+"px"
    };
    const mystyle2 = {
        left:answers[1].x*imageWidth/100 - 12.5+"px",
        top:answers[1].y*imageHeight/100 - 12.5+"px"
      };
    
    return (
        <>
        <div className="foundAreaWally" id={String(wallyFound)} style={mystyle1}>
            <div className="foundBox"></div>
        </div>
        <div className="foundAreaWenda" id={String(wendaFound)} style={mystyle2}>
                <div className="foundBox"></div>
        </div>
        </>

    )
}


