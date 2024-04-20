import React ,{useState}from "react";
import { useNavigate } from "react-router-dom";
import vector from "../Vector.png"
import { checkToken } from "..";
const NavBar = () =>{

    const [isNavigated , setNavigated] = useState(false);
     
    const navigate = useNavigate();

    const handleClick =() =>{
       if (isNavigated){
        navigate(-1);
       }
       else {
        navigate('/slideNavbar');
       }
       setNavigated(!isNavigated);
    }


    if (checkToken('token')){
        return (
            <div className="vector" >
                <img src={vector} alt="Vector" onClick={handleClick}/>
            </div>
        );
    } else {
        return null; 
    }
}

export default NavBar;