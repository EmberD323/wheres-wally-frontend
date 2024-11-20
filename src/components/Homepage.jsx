import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import Form from "./Partials/Form";

import wally from "../assets/wally.jpg"
import characters from "../assets/waldoandwenda.jpeg"
import { number } from "prop-types";


export default function HomePage (){
    // const [timer,setTimer] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    const [answers,setAnswers]=useState(null);
    const [result,setResult]=useState(null)
    const [timer, setTimer] = useState(0);
    const [pause, setPause] = useState(false);
    const [numberFound,setNumberFound] = useState(0);

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
        if(numberFound >= 2){return}
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
        //check coordinates and characters against selected
        for(let i=0;i<answers.length;i++){
            if((answers[i].x*imageWidth)/100 >= selectedX-12.5 && (answers[i].x*imageWidth)/100 <= selectedX+12.5){
                if((answers[i].y*imageHeight)/100 >= selectedY-12.5 && (answers[i].y*imageHeight)/100 <= selectedY+12.5){
                    if(answers[i].character == characterSelected){
                        setNumberFound(numberFound+1)
                        console.log(numberFound)
                        if(numberFound >= 1){
                            setPause(!pause)
                            setResult("You found " +characterSelected +", and won the game in a time of "+ timer +" seconds.")
                            break
                        }
                        setResult("You found " +characterSelected)
                        break
                    }
                    else{
                        setResult("Nope, " +characterSelected + " isn't in the box");
                    }
                
                }else{
                    setResult("Nope, " +characterSelected + " isn't in the box");
                }
            }
            else{
                setResult("Nope, " +characterSelected + " isn't in the box");
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
            <Form timer={timer} numberFound={numberFound}></Form>
        </div>
        </>
    )
}


