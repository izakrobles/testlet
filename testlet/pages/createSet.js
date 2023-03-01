import React, { useState } from "react";
import Flashcard from "./components/Flashcard";

function CreateSet() {
  const [flashcards, setFlashcards] = useState([]);
  const question = "What is a Blueberry?";
  const answer = "A berry that is blue";

  const handleAddFlashcard = () => {
    const newFlashcards = [...flashcards, { question, answer }];
    setFlashcards(newFlashcards);
  };

  return (
    <>
      <title>Create a Set</title>
      <h1>Create New Set</h1>
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
