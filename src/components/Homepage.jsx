import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import wally from "../assets/wally.jpg"
import characters from "../assets/waldoandwenda.jpeg"


export default function HomePage (){
    // const [timer,setTimer] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    const [answers,setAnswers]=useState(null);
    const [result,setResult]=useState(null)
    const [timer, setTimer] = useState(0);
    const [pause, setPause] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if(!pause){
                setTimer(prev => prev + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [pause]);

    //fetch answers
    useEffect(()=>{
        fetch("https://wheres-wally-backend.onrender.com/characters",{
        method: "GET",
        mode:"cors"
        })
        .then((response)=>response.json())
        .then((json)=>setAnswers(json))
        .catch((error)=>console.log(error))
    },[pause])

    function handleImageClick(e){
        if(selectedX==null){
            let scrollHeight = window.scrollY;
            const boundaryX = e.target.parentNode.offsetLeft;//distance from left of screen to image
            const boundaryY = e.target.parentNode.offsetTop;//distance from top of screen to image
            let imagePositionX,imagePositionY
            if(scrollHeight > 0){
                imagePositionY = e.clientY - boundaryY +scrollHeight;
            }
            else{
                imagePositionY = e.clientY - boundaryY;
            }
            imagePositionX = e.clientX - boundaryX;   
            console.log(imagePositionX,imagePositionY)         
            setselectedX(imagePositionX);
            setselectedY(imagePositionY)
        }else{
            setselectedX(null);
            setselectedY(null);
            //remove box and dropdown
        }
    }
    function handleFind(e){
        const imageContainer = e.currentTarget.parentNode.parentNode.parentNode;
        let imageHeight = imageContainer.getBoundingClientRect().height;
        let imageWidth = imageContainer.getBoundingClientRect().width;
        const characterSelected = e.target.textContent;
        for(let i=0;i<answers.length;i++){
            if((answers[i].x*imageWidth)/100 >= selectedX-12.5 && (answers[i].x*imageWidth)/100 <= selectedX+12.5){
                if((answers[i].y*imageHeight)/100 >= selectedY-12.5 && (answers[i].y*imageHeight)/100 <= selectedY+12.5){
                    if(answers[i].character == characterSelected){
                        console.log("you found me!")
                        setPause(!pause)
                        console.log(timer)
                        break
                    }
                    else{
                        console.log("wrong character")


                    }
                
                }else{
                    console.log("no character y")
                }
            }
            else{
                console.log("no character x")
            }
        }
       
    }
  
    return (
        <>
        
        <div className="homepage">
            <div className="header">
                <div>{timer}</div>
                
                <h2>Wheres Wally</h2>
                <img class="characters" src={characters} alt="characters"/>

            </div>
            <div>Find Wally and Wenda</div>
            <div>{result}</div>
            <div className="imageContainer">
                <img class="wally" src={wally} alt="wheres-wally" onClick={handleImageClick}/>
                <TargetBox selectedX={selectedX} selectedY={selectedY} handleFind={handleFind}></TargetBox>
            </div>
        </div>
        </>
    )
}


