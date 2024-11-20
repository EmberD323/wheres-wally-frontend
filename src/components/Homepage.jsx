import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import CharactersFound from "./Partials/CharactersFound";
import Form from "./Partials/Form";
import wally from "../assets/wally.jpg"
import characters from "../assets/waldoandwenda.jpeg"

export default function HomePage (){
    // const [timer,setTimer] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    const [answers,setAnswers]=useState(null);
    const [result,setResult]=useState(null)
    const [timer, setTimer] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [wallyFound,setWallyFound] = useState(false);
    const [wendaFound,setWendaFound] = useState(false);
    //start timer on render
    useEffect(() => {
        const interval = setInterval(() => {
            if(wallyFound == false || wendaFound == false){
                setTimer(prev => prev + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [wallyFound,wendaFound]);

    //fetch answers from backend
    useEffect(()=>{
        fetch("https://wheres-wally-backend.onrender.com/characters",{
        method: "GET",
        mode:"cors"
        })
        .then((response)=>response.json())
        .then((json)=>  setAnswers(json))
        .catch((error)=>console.log(error))
    },[])

    function handleImageClick(e){
        if(wallyFound && wendaFound){return}
        //set clicked point 
        if(selectedX==null){
            let scrollHeight = window.scrollY;//calculate amount of scroll
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
            setselectedX(imagePositionX);
            setselectedY(imagePositionY)
        }else{//if clicked away set as null
            setselectedX(null);
            setselectedY(null);
        }
    }
    function handleFind(e){
        const imageContainer = e.currentTarget.parentNode.parentNode.parentNode;
        let imageHeight1 = imageContainer.getBoundingClientRect().height;
        let imageWidth1 = imageContainer.getBoundingClientRect().width;
        //for use in characters found
        setImageHeight(imageHeight1)
        setImageWidth(imageWidth1)
        //character chosen
        const characterSelected = e.target.textContent;
        //check coordinates and characters against selected
        for(let i=0;i<answers.length;i++){
            if((answers[i].x*imageWidth1)/100 >= selectedX-12.5 && (answers[i].x*imageWidth1)/100 <= selectedX+12.5){
                if((answers[i].y*imageHeight1)/100 >= selectedY-12.5 && (answers[i].y*imageHeight1)/100 <= selectedY+12.5){
                    if(answers[i].character == characterSelected){
                        if(characterSelected=="Wally"){
                            setWallyFound(true)
                        }
                        else{
                            setWendaFound(true)
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
                <img className="characters" src={characters} alt="characters"/>
            </div>
            <div>Find Wally and Wenda</div>
            <div>{result}</div>
            <div className="imageContainer">
                <img className="wally" src={wally} alt="wheres-wally" onClick={handleImageClick}/>
                <TargetBox selectedX={selectedX} selectedY={selectedY} handleFind={handleFind}></TargetBox>
                <CharactersFound answers={answers} wallyFound={wallyFound} wendaFound={wendaFound} imageHeight={imageHeight} imageWidth={imageWidth}/>
            </div>
            <Form timer={timer} wendaFound={wendaFound} wallyFound={wallyFound}></Form>
            
        </div>
        </>
    )
}


