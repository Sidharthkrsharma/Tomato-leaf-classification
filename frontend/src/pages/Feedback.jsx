import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import linkedin from "../linkedin.png";
import Stack from "../Stack.png";
import Git from "../Git.png";
import { toast } from "sonner";

import { RatingComponent } from "../components/star";

const FeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState({});
  const [value, setValue] = useState(0);

  const handleFeedback = async () => {

    if (!feedbackData.feedback || !feedbackData.rating) {
      toast.error("Please provide feedback and rating");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss();
    }
  };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/feedback`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.success) {
          setValue(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchFeedback();
  }, []);

  return (
    <div className="feedbackForm">
      <div className="feedbackLeft">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="feedLabel">Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Share your thoughts..."
              className="feedControl"
              onChange={(e) =>
                setFeedbackData({ ...feedbackData, feedback: e.target.value })
              }
            />
          </Form.Group>
        </Form>
        <div className="star">
          <h4>Please rate us</h4>
          <RatingComponent setRating={(value) => setFeedbackData({ ...feedbackData, rating: value })} />
        </div>
        <Button className="sendButton" variant="warning" onClick={handleFeedback}>
          Send
        </Button>
      </div>
      <div className="feedbackRight">
        <span>Join us on</span>
        <div className="lgs">
          <img src={linkedin} />
          <img src={Git} />
          <img src={Stack} />
        </div>
        <h3>Our valued users rated us</h3>
        <h1>{value}</h1>
        <RatingComponent rating={value} />
      </div>
    </div>
  );
};

export default FeedbackPage;
