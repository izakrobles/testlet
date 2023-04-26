import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { db, auth } from "@/firebase/clientApp";
import Flashcard from "./components/flashcard";
import Loading from "./components/loading";

function ViewSet() {
  const router = useRouter();
  const { user, set } = router.query;

  const decodedSet = decodeURIComponent(set);
  const decodedUser = decodeURIComponent(user);

  const [isCreator, setCreator] = useState(false);
  const [userState, loadingB, errorB] = useAuthState(auth);

  useEffect(() => {
    if (userState) {
      if (userState.displayName === decodedUser) {
        setCreator(true);
      } else {
        setCreator(false);
      }
    }
  }, [userState, decodedUser]);

  const [flashcards, loading, error] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
  );

  if (error) {
    console.error("Error fetching data: ", error);
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <Loading />;
  }

  const handleGoToEdit = () => {
    window.location.href = `/editSet?user=${userState.displayName}&set=${decodedSet}`;
  };

  const handleGoToStudy = () => {
    window.location.href = `/study?user=${decodedUser}&set=${decodedSet}`;
  };

  return (
    <>
      <title>{decodedSet}</title>
      <h1>{decodedSet}</h1>
      <div style={{ marginBottom: "2%" }}>
        {isCreator ? (
          <div>
            <button onClick={handleGoToStudy} className="button-pair-left">
              Study
            </button>
            <button onClick={handleGoToEdit} className="button-pair-right">
              Edit
            </button>
          </div>
        ) : (
          <button onClick={handleGoToStudy} className="button-single">
            Study
          </button>
        )}
      </div>

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
