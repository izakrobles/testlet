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
import Link from "next/link";
import Going from "./components/going";

function CreateSet() {
  // useStates to manage popups and values within the textboxes
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
    return (
      <div>
        <Going />
        <div style={{ justifyContent: "center", textAlign: "center" }}>
          <h2>You need to be signed in to view this page</h2>
          <h3>
            <Link href="login">{"Click Here to Login!"}</Link>
          </h3>
        </div>
      </div>
    );
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

  const handleEditFlashcard = (index) => {
    setQuestion(flashcards[index].question);
    setAnswer(flashcards[index].answer);
    const newFlashcards = [...flashcards];
    newFlashcards.splice(index, 1);
    setFlashcards(newFlashcards);
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
    if (title === "" || flashcards.length < 1) { // Make sure there is content to be saved
      showPopupB(true);
      setTimeout(() => {
        showPopupB(false);
      }, 1750);
      return;
    }
    setSaving(true);
    // Saves the set
    const collectionRef = collection(db, "sets", user, title);
    for (const flashcard of flashcards) {
      await addDoc(collectionRef, {
        question: flashcard.question,
        answer: flashcard.answer,
      });
    }
    // Saves the set name to the list of names
    const docRef = doc(db, "sets", user);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const updatedSets = [...userData.UserSets, title];
      await updateDoc(docRef, { UserSets: updatedSets });
    } else {
      await setDoc(docRef, { UserSets: [title] });
    }
    // Clears parameters
    setPrevTitle(title);
    setTitle("");
    setAnswer("");
    setQuestion("");
    setFlashcards([]);
    setSaving(false);
    // Shows popUp saying it was saved
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 15000);
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
      {/* Maps the created flashcards to the page as the user creates them */}
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <div className="flashcard-container-outer">
            <div
              // A user can edit a card when they click on it
              onClick={() => handleEditFlashcard(index)}
              style={{ width: "100%" }}
            >
              <Flashcard
                question={flashcard.question}
                answer={flashcard.answer}
              />
            </div>
            <button
              // A user can delete a card when they press this button
              className="delete-card-button"
              onClick={() => handleDeleteFlashcard(index)}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default CreateSet;
