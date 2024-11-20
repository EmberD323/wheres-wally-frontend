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
    const [result,setResult]=useState(null)

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
            setselectedX(imagePositionX);
            setselectedY(imagePositionY);
        }else{
            setselectedX(null);
            setselectedY(null);
            //remove box and dropdown
        }
    }
    function handleFind(e){
        // const characterSelected = e.target.textContent;
        // for(let i=0;i<answers.length;i++){
        //     if(answers[i].x >= selectedX-12.5 && answers[i].x <= selectedX+12.5){
        //         if(answers[i].y >= selectedY-12.5 && answers[i].y <= selectedY+12.5){
        //             if(answers[i].character == characterSelected){
        //                 console.log("you found me!")
        //                 break
        //             }
        //             else{
        //                 console.log("wrong character")

        //             }
                
        //         }else{
        //             console.log("no character y")
        //         }
        //     }
        //     else{
        //         console.log("no character x")
        //     }
        // }
       
    }
  
    return (
        <>
        
        <div className="homepage">
            <div className="header">
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


