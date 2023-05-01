import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase/clientApp";
import FlipCard from "./components/flipCard";
import Loading from "./components/loading";

function Study() {
  const router = useRouter();
  const { user, set } = router.query;

  const decodedSet = decodeURIComponent(set);
  const decodedUser = decodeURIComponent(user);

  const [iterator, setIterator] = useState(0); // Keeps track of which flashcard is being viewed
  const [flashcards, setFlashcards] = useState([]);
  const [key, setKey] = useState(0); // unique on the id

  // retrieves flashcards
  const [raw, loading, error] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
  );

  // sets flashcards
  useEffect(() => {
    if (raw) {
      setFlashcards(raw.docs);
    }
  }, [raw]);

  // Handles navigating through the cards with the keys on the keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37 && iterator > 0) {
        setIterator(iterator - 1);
      } else if (event.keyCode === 39 && iterator < flashcards.length - 1) {
        setIterator(iterator + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [iterator, flashcards]);

  const handlePrev = () => {
    if (iterator > 0) {
      setIterator(iterator - 1);
    }
  };

  const handleNext = () => {
    if (iterator < flashcards.length - 1) {
      setIterator(iterator + 1);
    }
  };

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleShuffle = () => {
    setFlashcards(shuffleArray(flashcards));
    setIterator(0);
    setKey(key + 1);
  };

  if (error) {
    console.error("Error fetching data: ", error);
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <Loading />;
  }

  const progress = Math.round(((iterator + 1) / flashcards.length) * 100);
  const flashcard = flashcards[iterator];

  return (
    <>
      <title>{decodedSet}</title>
      <h1>{decodedSet}</h1>
      <button onClick={handleShuffle} className="button-pair-left">
        Shuffle
      </button>
      <button onClick={() => setIterator(0)} className="button-pair-right">
        Restart
      </button>
      {flashcards.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          Progress: {progress}% ({iterator + 1}/{flashcards.length})
          <div
            style={{
              backgroundColor: "#ccc",
              height: "0.5rem",
              borderRadius: "0.25rem",
              marginTop: "0.5rem",
            }}
          >
            <div
              style={{
                backgroundColor: "#004aad",
                height: "0.5rem",
                width: `${progress}%`, //dynamically handles the size of the progress bar
                borderRadius: "0.25rem",
              }}
            ></div>
          </div>
        </div>
      )}
      {flashcard && (
        <div className="flashcard">
          <FlipCard //shows the card that interator points to
            key={key}
            question={flashcard.data().question}
            answer={flashcard.data().answer}
          />
          <div style={{ textAlign: "center", marginTop: "1%" }}>
            <button onClick={handlePrev} className="button-pair-left">
              Previous
            </button>
            <button onClick={handleNext} className="button-pair-right">
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Study;
