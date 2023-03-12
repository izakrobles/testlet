import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase/clientApp";

function CreateSet() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState("");

  const user = "irobles";

  const handleAddFlashcard = () => {
    if (!answer | !question) {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1750);
      return;
    }

    const newFlashcards = [
      ...flashcards,
      { question: question, answer: answer },
    ];
    setFlashcards(newFlashcards);
    setAnswer("");
    setQuestion("");
  };

  const handleDeleteFlashcard = (index) => {
    const newFlashcards = [...flashcards];
    newFlashcards.splice(index, 1);
    setFlashcards(newFlashcards);
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

  const handleSaveSetButton = async () => {
    event.preventDefault();
    const collectionRef = collection(db, "sets", user, title);
    for (const flashcard of flashcards) {
      await addDoc(collectionRef, {
        question: flashcard.question,
        answer: flashcard.answer
      });
    }
  };  

  return (
    <>
      <title>Create a Set</title>
      {showPopup && (
        <div className="popup" onClick={() => setShowPopup(false)}>
          Make sure there is content in both boxes.
        </div>
      )}
      <form className="new-set">
        <label>Your Set Title:</label>
        <input className="title" type="text" name="title" onChange={(e) => setTitle(e.target.value)} ></input>
        <button className="save-button" onClick={handleSaveSetButton}>
          Save New Set
        </button>
      </form>
      <div className="create-sets">
        <form>
          <label>Question: </label>
          <input
            type="text"
            className="question"
            value={question}
            onChange={handleSetQuestion}
            onKeyDown={handleKeyDown}
          ></input>
        </form>
        <form>
          <label>Answer: </label>
          <input
            type="text"
            className="answer"
            value={answer}
            onChange={handleSetAnswer}
            onKeyDown={handleKeyDown}
          ></input>
        </form>
        <button className="create-set-button" onClick={handleAddFlashcard}>
          +
        </button>
      </div>

      {flashcards.map((flashcard, index) => (
        <div
          className="flashcard"
          key={index}
          onClick={() => handleDeleteFlashcard(index)}
        >
          <Flashcard question={flashcard.question} answer={flashcard.answer} />
        </div>
      ))}
    </>
  );
}

export default CreateSet;
