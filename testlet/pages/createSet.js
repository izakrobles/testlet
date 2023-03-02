import React, { useState } from "react";
import Flashcard from "./components/Flashcard";

function CreateSet() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleAddFlashcard = () => {
    const newFlashcards = [
      ...flashcards,
      { question: question, answer: answer },
    ];
    setFlashcards(newFlashcards);
    setAnswer("");
    setQuestion("");
  };

  const handleSetQuestion = (event) => {
    setQuestion(event.target.value);
  };
  const handleSetAnswer = (event) => {
    setAnswer(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFlashcard();
    }
  };

  return (
    <>
      <title>Create a Set</title>
      <form className="new-set">
          <label>Your Set Title:</label>
          <input className="title"
            type="text"
          ></input>
        </form>
      <div className="create-sets">
        <form>
          <label>Question:  </label>
          <input
            type="text"
            className="question"
            value={question}
            onChange={handleSetQuestion}
            onKeyDown={handleKeyDown}
          ></input>
        </form>
        <form>
          <label>Answer:  </label>
          <input
            type="text"
            className="answer"
            value={answer}
            onChange={handleSetAnswer}
            onKeyDown={handleKeyDown}
          ></input>
        </form>
        </div>
        <button className="create-set" onClick={handleAddFlashcard}>
          Flashcard +
        </button>

      {flashcards.map((flashcard, index) => (
        <Flashcard
          key={index}
          question={flashcard.question}
          answer={flashcard.answer}
        />
      ))}
    </>
  );
}

export default CreateSet;
