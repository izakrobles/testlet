import React, { useState, useEffect } from "react";

function FlipCard(props) {
  const [view, setView] = useState(false);

  const toggleView = () => {
    setView(!view);
  };

  let show = view ? props.answer : props.question;

  return (
    <div className="FlipCard-container">
      <div className="FlipCard-post" onClick={toggleView} >
        <h1>{show}</h1>
      </div>
    </div>
  );
}

export default FlipCard;
