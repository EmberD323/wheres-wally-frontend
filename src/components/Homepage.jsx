import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import wally from "../assets/wally.jpg"

export default function HomePage (){
    //const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    const [firstClick,setfirstClick]=useState(true);


    function handleImageClick(e){
        if(selectedX==null){
            //add box and dropdown
            // if (firstClick == true) {
            //     offsetX = e.pageX - $('#PopUpTitleBar').offset().left;
            //     console.log(offsetX)
            //     offsetY = e.pageY - $('#PopUpTitleBar').offset().top;
            //     console.log(offsetY)

            //     //firstClick = false;
            // }

            setselectedX(e.clientX)
            setselectedY(e.clientY)
            console.log(e.clientX,e.clientY)
            console.log(e.screenX,e.screenY)


        }else{
            setselectedX(null)
            setselectedY(null)
            //remove box and dropdown
        }
    }
  
    return (
        <>
        
        <TargetBox selectedX={selectedX} selectedY={selectedY}></TargetBox>
        <div className="homepage">
            <h2>Wheres Waldo</h2>
            <h3>Include pics of what they are looking for</h3>
            <img src={wally} alt="wheres-wally" onClick={handleImageClick}/>
        </div>
        </>
    )
}


