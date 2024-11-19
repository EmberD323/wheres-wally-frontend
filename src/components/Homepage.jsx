import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import wally from "../assets/wally.jpg"
import characters from "../assets/characters3.jpg"


export default function HomePage (){
    //const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);

    function handleImageClick(e){
        if(selectedX==null){
            setselectedX(e.clientX);
            setselectedY(e.clientY);
        }else{
            setselectedX(null);
            setselectedY(null);
            //remove box and dropdown
        }
    }
    function handleFind(e){
        console.log(e.target.textContent)
    }
  
    return (
        <>
        <TargetBox selectedX={selectedX} selectedY={selectedY} handleFind={handleFind}></TargetBox>
        <div className="homepage">
            <div className="header">
                <h2>Wheres Waldo</h2>
                
                <img class="characters" src={characters} alt="characters"/>
            </div>
            <div>Find all 5 characters: Wally,Woof,Wenda,Wizard and Odlaw</div>
            <img class="wally" src={wally} alt="wheres-wally" onClick={handleImageClick}/>
        </div>
        </>
    )
}


