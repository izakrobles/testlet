import React from "react";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/clientApp";
import Flashcard from "./components/flashcard";
import Link from "next/link";

function ViewSet() {
  const router = useRouter();
  const { user, set } = router.query;

  const decodedSet = decodeURIComponent(set);
  const decodedUser = decodeURIComponent(user);

  const [flashcards, loading, error] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
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

      <Link
        href={{ pathname: "/study", query: { user: decodedUser, set: set } }}
      >
        <h2>Study</h2>
      </Link>

      {flashcards && (
        <>
          {flashcards.docs.map((flashcard, index) => (
            <div className="flashcard-container-outer">
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
