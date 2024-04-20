import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingComponent = ({ rating, setRating }) => {
  return (
    <ReactStars
      count={5}
      onChange={(newRating) => setRating(newRating)}
      size={50}
      isHalf={true}
      value={parseFloat(rating)}
      emptyIcon={<i className="far fa-star"></i>}
      halfIcon={<i className="fa fa-star-half-alt"></i>}
      fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  );
};

export { RatingComponent as default, RatingComponent };
