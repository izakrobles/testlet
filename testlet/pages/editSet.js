import React, { useState, useEffect } from "react";
import Flashcard from "./components/flashcard";
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc,
  query,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Going from "./components/going";

function EditSet() {
  const [popupA, showPopupA] = useState(false); // You have not added content to Q an A
  const [popupB, showPopupB] = useState(false); // You have not created title or added sets
  const [created, setCreated] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [title, setTitle] = useState("");
  const [oldTitle, setOldTitle] = useState(""); // Stores the title before it is saved
  const [prevTitle, setPrevTitle] = useState(""); // Stores the title after it is saved
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [first, setFirst] = useState(true);

  const router = useRouter();
  const { user, set } = router.query;

  const decodedSet = decodeURIComponent(set);
  const decodedUser = decodeURIComponent(user);

  const [raw, loadingB, errorB] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
  );

  // This retrieves the flsahcard info and sets the values to the inputs
  useEffect(() => {
    if (raw && first) {
      let flashInput = [];
      for (let i = 0; i < raw.docs.length; i++) {
        flashInput.push(raw.docs[i].data());
      }
      setTitle(decodedSet);
      setOldTitle(decodedSet);
      setFlashcards(flashInput);
      setFirst(false);
    }
  }, [raw]);

  const [userState, loading, error] = useAuthState(auth); // Gets Account

  if (loading | loadingB) {
    return <Loading />;
  }

  if (error | errorB) {
    return <h2>Error: {error}</h2>;
  }

  if (!userState) {
    //Makes sure you must be logged in to view this screen
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

  /* 
    Firebase does not let you delete a collection
    You must delete all documents from a collection in order to
    "delete" the colection
   */
  const deleteAllDocumentsInCollection = async (collectionRef) => {
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log("All documents in the collection have been deleted.");
  };

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
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0); //Brings the view to the top of the page when editing
    }
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
    if (title === "" || flashcards.length < 1) {
      showPopupB(true);
      setTimeout(() => {
        showPopupB(false);
      }, 1750);
      return;
    }
    setSaving(true);

    // Removing the old set before saving the new one
    const oldDocumentRef = collection(db, "sets", user, oldTitle);
    await deleteAllDocumentsInCollection(oldDocumentRef);

    // Adding the set to the database
    const collectionRef = collection(db, "sets", user, title);
    for (const flashcard of flashcards) {
      await addDoc(collectionRef, {
        question: flashcard.question,
        answer: flashcard.answer,
      });
    }

    // Removing the old title and adding the new title
    const docRef = doc(db, "sets", user);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const updatedSets = userData.UserSets.filter((set) => set !== oldTitle); // Remove the oldTitle
      updatedSets.push(title); // Add the new title
      await updateDoc(docRef, { UserSets: updatedSets });
    } else {
      await setDoc(docRef, { UserSets: [title] });
    }
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 12500);

    setPrevTitle(title);
    setSaving(false);
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
          Your set has been saved! Click here to view it!
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
          Update Set
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
        <div key={index}>
          <div className="flashcard-container-outer">
            <div
              onClick={() => handleEditFlashcard(index)}
              style={{ width: "100%" }}
            >
              <Flashcard
                question={flashcard.question}
                answer={flashcard.answer}
              />
            </div>
            <button
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

export default EditSet;
