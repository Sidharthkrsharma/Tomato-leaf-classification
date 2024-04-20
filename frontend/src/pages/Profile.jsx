import React ,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button'
import linkedin from '../linkedin.png';
import Stack from '../Stack.png'
import Git from '../Git.png'
import Profile from "../Profile.png"
import { useNavigate } from "react-router-dom";

const ProfilePage = ()=>{
    const [userDetails,setUserDetails] = useState({});

    const navigate = useNavigate();

    const handleUpdate =()=>{
       navigate('/updateProfile')
    }

    const handleShare = () =>{
        navigate('/feedbackPage');
    }

    useEffect(() =>{
        const fetchProfileInformation = async ()=>{
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profile`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    credentials:"include",
                });
                const data = await response.json();
                if(data.success){
                    setUserDetails(data.data);
                }
            }
            catch(error){
                console.log("error fetching profile information",error)
            }
        };
        fetchProfileInformation();
    },[]);

    return (

        <div className="profile">
        <div className="credentials">
            <h1>Your Profile</h1>
            <h2>Name: {userDetails.name}</h2>
            <h2>Email: {userDetails.email}</h2>
            <h2>Organization: {userDetails.organization}</h2>
            <h2>Profession: {userDetails.profession}</h2>
            <Button variant="success" onClick={handleUpdate}>Update your profile</Button>
        </div>
        <div className="potrait">
            <img className="profilePic" src={userDetails.profilePhoto || Profile} alt="profile" style={{borderRadius:"50%",width:"200px",height:"200px",boxShadow:"0px 0px 10px 0px black"}}/>
            <div>
                <img src={linkedin}/>
                <img src={Git}/>
                <img src={Stack}/>
            </div>
            <Button variant="warning" onClick={handleShare}>Share your experience</Button>
        </div>
    </div>
)
}

export default ProfilePage;