import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import TargetBox from "./Partials/TargetBox";
import wally from "../assets/wally.jpg"
import characters from "../assets/waldoandwenda.jpeg"


export default function HomePage (){
    //const [posts,setPosts,token,setToken,edit,setEdit,users,setUsers] = useOutletContext();
    const [selectedX,setselectedX]=useState(null);
    const [selectedY,setselectedY]=useState(null);
    // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    // function getWindowDimensions() {
    //     const { innerWidth: width, innerHeight: height } = window;
    //     return {
    //       width,
    //       height
    //     };
    // }
    // useEffect(() => {
    //     function handleResize() {
    //     setWindowDimensions(getWindowDimensions());
    //     }

    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);
    // let {width,height} = windowDimensions;

    function handleImageClick(e){
        if(selectedX==null){
            const boundaryX = e.target.offsetLeft;//distance from left of screen to image
            const boundaryY = e.target.offsetTop;//distance from top of screen to image
            const imagePositionX = e.clientX - boundaryX;
            const imagePositionY = e.clientY - boundaryY;
            console.log(imagePositionX,imagePositionY)


            setselectedX(imagePositionX);
            setselectedY(imagePositionY);
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


