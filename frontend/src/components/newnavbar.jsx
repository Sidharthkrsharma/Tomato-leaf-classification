import React ,{useEffect}from "react";
import historyLogo from '../ic_round-history.png';
import userLogo from '../iconamoon_profile.png';
import feedbackLogo from '../Feedback.png'
import aboutLogo from '../About.png'
import linkedin from '../linkedin.png';
import Stack from '../Stack.png'
import Git from '../Git.png'
import upload from "../upload.png"
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { checkToken, deleteCookie } from "..";


const SlideNavbar =()=>{

    const navigate = useNavigate();


    const LogOutButton =() =>{
       deleteCookie('token');
         navigate('/');
    }

    useEffect(() =>{
        if(!checkToken('token')){
         navigate('/')
        }
     },[])

    const handleClick =() =>{
        navigate("/predict");
    }

    const handleProfile =() =>{
        navigate("/profilePage")
    }

    const handleHistory =()=>{
        navigate("/historyPage")
    }

    const handleFeedback =()=>{
        navigate("/feedbackPage")
    }

    return (

        <div className="slide">
        <div className='eachLine' onClick={handleProfile}>
           <img src={userLogo} />
          <h1>Profile</h1>
        </div>
        <div className='eachLine' onClick={handleHistory}>
           <img src={historyLogo} />
           <h1>History</h1>
        </div>
        <div className='eachLine'  onClick={handleClick}>
           <img src={upload} />
           <h1>Prediction</h1>
        </div>
        <div className='eachLine' onClick={handleFeedback}>
           <img src={feedbackLogo} />
           <h1>Feedback</h1>
        </div>
        <div className='eachLine'>
           <img src={aboutLogo} />
           <h1>About us</h1>
        </div>
        <Button variant="danger" onClick={LogOutButton} >
            Log Out
        </Button>
        <div className="Foot">
            <span>Join us on</span>
            <div className="Join">
                <img src={linkedin} />
                <img src={Git} />
                <img src={Stack} />
            </div>
        </div>
    </div>
        )
}

export default SlideNavbar;