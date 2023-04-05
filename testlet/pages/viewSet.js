import React from "react";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db,auth } from "@/firebase/clientApp";
import Flashcard from "./components/flashcard";

function ViewSet() {
  const router = useRouter();
  const { set } = router.query;
  const user = auth.currentUser.displayName;

  const decodedSet = decodeURIComponent(set);

  const [flashcards, loading, error] = useCollection(
    collection(db, "sets", user, decodedSet)
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
      <title>{decodedSet}</title>
      <h1>{decodedSet}</h1>
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

export default ViewSet;
