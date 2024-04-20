import React, { useEffect } from "react";
import leaf from "../leafHome.png";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { checkToken, deleteCookie } from "..";

const HomePage = () => {
  const navigate = useNavigate();
  const isLoggedIn = checkToken("token");

  const LogOutButton = () => {
    deleteCookie("token");
    navigate("/");
  };

  return (
    <div className="homePage">
      <div className="home1">
        <h1>Title</h1>
        <span>Where nature befriends technology</span>
        <img src={leaf} />
      </div>
      <div className="home2">
        {isLoggedIn ? (
          <>
            <Button
              variant="warning"
              size="lg"
              className="buttons1"
              href="/predict"
            >
              Predict
            </Button>
            <Button
              variant="success"
              size="lg"
              className="buttons2"
              onClick={LogOutButton}
            >
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="warning"
              size="lg"
              className="buttons1"
              href="/register"
            >
              Get Started
            </Button>
            <Button
              variant="success"
              size="lg"
              className="buttons2"
              href="/login"
            >
              Log In
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
