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

  return (
    <>
      <title>Create a Set</title>
      <h1>Create New Set</h1>
      <div className="create-sets">
        <form>
          <label>Question:  </label>
          <input
            type="text"
            className="question"
            value={question}
            onChange={handleSetQuestion}
          ></input>
        </form>
        <form>
          <label>Answer:  </label>
          <input
            type="text"
            className="answer"
            value={answer}
            onChange={handleSetAnswer}
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
