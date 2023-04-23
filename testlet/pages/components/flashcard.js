import React from "react";

function Flashcard(props) {
  return (
    <div className="flashcard-container">
      <div className="flashcard-question">{props.question}</div>
      <div className="flashcard-answer">{props.answer}</div>
      <div className="spacing"></div>
    </div>
  );
}

export default Flashcard;
