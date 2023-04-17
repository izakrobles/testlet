import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/clientApp";
import FlipCard from "./components/flipCard";

function Study() {
  const router = useRouter();
  const { user, set } = router.query;

  const decodedSet = decodeURIComponent(set);
  const decodedUser = decodeURIComponent(user);

  const [iterator, setIterator] = useState(0);
  const [flashcards, loading, error] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 37 && iterator > 0) {
        setIterator(iterator - 1);
      } else if (
        event.keyCode === 39 &&
        iterator < flashcards.docs.length - 1
      ) {
        setIterator(iterator + 1);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [iterator, flashcards]);

  if (error) {
    console.error("Error fetching data: ", error);
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const flashcard = flashcards.docs[iterator];

  return (
    <>
      <title>{decodedSet}</title>
      <h1>{decodedSet}</h1>
      {flashcard && (
        <div className="flashcard">
          <FlipCard
            question={flashcard.data().question}
            answer={flashcard.data().answer}
          />
        </div>
      )}
    </>
  );
}

export default Study;
