import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom'
import { checkToken } from "..";
import { setCookie } from "./RegisterPage";
import {toast} from 'sonner';

const LoginPage = () =>{
    const [email , setEmail] = useState();
    const [password , setPassword] = useState();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        // const result = await firebase.SigninUserWithEmailAndPassword(email,password)
        // console.log("Success", result);
        try {
          toast.loading('Logging in...');
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email,password}),
          });
          const data = await response.json();
          if (data.success && data.data) {
            setCookie('token', data.data, 2);
            navigate('/predict');
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          toast.dismiss();
      }
    }
    const navigate = useNavigate();

    useEffect (()=> {
      if(checkToken('token')){
        navigate('/predict')
      }
    })

    return (
        <Form onSubmit={handleSubmit} className="totalLogForm" >
          <h1>Login/Sign-in </h1>
          <Form.Group className="mb-3 logClass" controlId="formBasicEmail">
            <Form.Label className="logLabel">Email address</Form.Label>
            <Form.Control className='logForm' onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" required/>
          </Form.Group>
    
          <Form.Group className="mb-3 logClass" controlId="formBasicPassword">
            <Form.Label className="logLabel" >Password</Form.Label>
            <Form.Control className='logForm' onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder="Password" required/>
          </Form.Group>
          <Button className="signInButton" variant="outline-light" type="submit">
            Sign In
          </Button>
        </Form>
      );
}

export  default LoginPage;