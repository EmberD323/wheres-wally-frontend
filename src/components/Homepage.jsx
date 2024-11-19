import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import wally from "../assets/wally.jpg"
import characters from "../assets/waldoandwenda.jpeg"


export default function HomePage (){
    //const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    const [answers,setAnswers]=useState(null);

    //fetch answers
    useEffect(()=>{
        fetch("https://wheres-wally-backend.onrender.com/characters",{
        method: "GET",
        mode:"cors"
        })
        .then((response)=>response.json())
        .then((json)=>setAnswers(json))
    },[])

    function handleImageClick(e){
        if(selectedX==null){
            const boundaryX = e.target.parentNode.offsetLeft;//distance from left of screen to image
            const boundaryY = e.target.parentNode.offsetTop;//distance from top of screen to image
            const imagePositionX = e.clientX - boundaryX;
            const imagePositionY = e.clientY - boundaryY;
            setselectedX(imagePositionX);
            setselectedY(imagePositionY);
        }else{
            setselectedX(null);
            setselectedY(null);
            //remove box and dropdown
        }
    }
    function handleFind(e){
        const characterSelected = e.target.textContent;
        console.log(answers)
        console.log(selectedX,selectedY,characterSelected)
        for(let i=0;i<answers.length;i++){
            if(answers[i].x >= selectedX-12.5 && answers[i].x <= selectedX+12.5){
                if(answers[i].y >= selectedY-12.5 && answers[i].y <= selectedY+12.5){
                    if(answers[i].character == characterSelected){
                        console.log("you found me!")
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
                <h2>Wheres Wally</h2>
                <img class="characters" src={characters} alt="characters"/>

            </div>
            <div>Find Wally and Wenda</div>
            <div className="imageContainer">
                <img class="wally" src={wally} alt="wheres-wally" onClick={handleImageClick}/>
                <TargetBox selectedX={selectedX} selectedY={selectedY} handleFind={handleFind}></TargetBox>
            </div>
        </div>
        </>
    )
}


