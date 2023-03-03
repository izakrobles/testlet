import React from "react";
import Flashcard from "./components/Flashcard";

import { db } from "@/firebase/clientApp";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

function ViewSets() {
  const [flashcards, loading, error] = useCollection(
    collection(db, "flashcardSet_00")
  );

  if (error) {
    console.error("Error fetching data: ", error);
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(flashcards);
  return (
    <>
      <title>Your Sets</title>

      {flashcards && (
        <>
          {flashcards.docs.map((flashcard, index) => (
            <div className="flashcard" key={index}>
              <Flashcard
                question={flashcard.data().question}
                answer={flashcard.data().answer}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default ViewSets;
