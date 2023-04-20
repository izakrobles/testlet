import React, { useState } from "react";
import Flashcard from "./components/flashcard";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/loading";

function CreateSet() {
  const [popupA, showPopupA] = useState(false);
  const [popupB, showPopupB] = useState(false);
  const [created, setCreated] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState("");
  const [prevTitle, setPrevTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);

  const [userState, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (!userState) {
    return <h2>You need to be signed in to view this page.</h2>;
  }

  const user = userState.displayName;

  const handleAddFlashcard = () => {
    if (!answer | !question) {
      showPopupA(true);
      setTimeout(() => {
        showPopupA(false);
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

  // setQuestion(flashcards[index].question)
  // tie in to delete button
  // Add new handle edit function with flashcard on click

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
  const handleSetTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddFlashcard();
    }
  };

  const handleGoToNewSet = () => {
    window.location.href = `/viewSet?user=${userState.displayName}&set=${prevTitle}`;
  };

  const handleSaveSetButton = async (event) => {
    event.preventDefault();
    if(title === '' || flashcards.length < 1){
      showPopupB(true);
      setTimeout(() => {
        showPopupB(false);
      }, 1750);
      return;
    }
    setSaving(true);
    const collectionRef = collection(db, "sets", user, title);
    for (const flashcard of flashcards) {
      await addDoc(collectionRef, {
        question: flashcard.question,
        answer: flashcard.answer,
      });
    }

    const docRef = doc(db, "sets", user);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const updatedSets = [...userData.UserSets, title];
      await updateDoc(docRef, { UserSets: updatedSets });
    } else {
      await setDoc(docRef, { UserSets: [title] });
    }
    setPrevTitle(title);
    setTitle("");
    setAnswer("");
    setQuestion("");
    setFlashcards([]);
    setSaving(false);

    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 10000);
    
  };

  return saving ? (
    <Loading />
  ) : (
    <>
      <title>{title ? "Creating set: " + title : "Create a Set"}</title>
      {popupA && (
        <div className="popup" onClick={() => showPopupA(false)}>
          Make sure there is content in both boxes.
        </div>
      )}
      {popupB && (
        <div className="popup" onClick={() => showPopupB(false)}>
          Make sure there is a title and at least one flashcard
        </div>
      )}
      {created && (
        <div className="navigateNew" onClick={() => handleGoToNewSet()}>
          You just created a new set. If you would like to see it click here!
        </div>
      )}
      <form className="new-set">
        <label>Your Set Title:</label>
        <input
          className="title"
          type="text"
          name="title"
          value={title}
          onChange={handleSetTitle}
        ></input>
        <button className="save-button" onClick={handleSaveSetButton}>
          Save New Set
        </button>
      </form>
      <div className="create-sets">
        <label>Question: </label>
        <input
          type="text"
          className="question"
          value={question}
          onChange={handleSetQuestion}
          onKeyDown={handleKeyDown}
        ></input>
        <label>Answer: </label>
        <input
          type="text"
          className="answer"
          value={answer}
          onChange={handleSetAnswer}
          onKeyDown={handleKeyDown}
        ></input>
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
