import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value};${expires};path=/`;
};

const RegisterPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.loading("Creating account...");
      if (!formData.email || !formData.password) {
        return alert("Please enter your email and password");
      }
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success && data.data) {
        toast.success(data.message);
        setCookie("token", data.data, 2);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit} className="totalForm">
      <h1>Sign-up</h1>
      <Form.Group className="mb-3 regClass" controlId="formBasicEmail">
        <Form.Label className="regLabel">Email address</Form.Label>
        <Form.Control
          className="regForm"
          onChange={handleChange}
          value={formData.email}
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3 regClass" controlId="formBasicPassword">
        <Form.Label className="regLabel">Password</Form.Label>
        <Form.Control
          className="regForm"
          onChange={handleChange}
          value={formData.password}
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>
      <Button variant="outline-info" type="submit">
        Create Account
      </Button>
    </Form>
  );
};

export default RegisterPage;
