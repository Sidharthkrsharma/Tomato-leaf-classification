import React, { useEffect } from "react";
import { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { toast } from "sonner";

const UpdateProfile =() =>{

    const [formData, setFormData] = useState({});

    const handleUpdate = async (e) => {
      e.preventDefault();
      try{
        toast.loading("Updating profile information...");
        const form = new FormData();
        Object.keys(formData).forEach(key => {
          form.append(key, formData[key]);
        });

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profileUpdate`,{
            method:"PUT",
            body:form,
            credentials:"include",
        });
        const data = await response.json();
        if(data.success){
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    }
    catch(error){
        toast.error(error.message);
    } finally {
        toast.dismiss();
    }
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
                  setFormData(data.data);
              }
          }
          catch(error){
              console.log("error fetching profile information",error)
          }
      };
      fetchProfileInformation();
  },[]);

   return (
      <div className="updateBox">
      <h1> Update your profile</h1>
      <Form onSubmit={handleUpdate}>
      <Row>
        <Form.Label column lg={2} className="update">
          Name
        </Form.Label>
        <Col>
          <Form.Control
          className="updateControl"
          onChange={e=> setFormData({...formData,name:e.target.value})}
          value={formData.name}
          type="text"
          placeholder="Your Full Name" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2} className="update">
          Organization
        </Form.Label>
        <Col>
          <Form.Control className="updateControl" onChange={e=> setFormData({...formData,organization:e.target.value})} value={formData.organization} type="text" placeholder="Organization" />
        </Col>
      </Row>
      <br />
      <Row>
        <Form.Label column lg={2} className="update">
          Profession
        </Form.Label>
        <Col>
          <Form.Control className="updateControl" onChange={e=> setFormData({...formData,profession:e.target.value})} value={formData.profession} type="text" placeholder="Profession" />
        </Col>
      </Row>
      <Form.Group  controlId="formFile" className="mb-3 profilePhoto">
        <Form.Label column lg={2} className="update" >Profile Photo</Form.Label>
        <Form.Control type="file"  className="profileForm" onChange={e=> setFormData({...formData,profilePhoto:e.target.files[0]})} />
      </Form.Group>
      <Button variant="primary" type="submit" className="updateButton">
        Update Profile
      </Button>
    </Form>
      </div>
  );
 
}

export  default UpdateProfile;