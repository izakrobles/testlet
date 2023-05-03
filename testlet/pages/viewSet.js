import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  updateDoc,
  getDoc,
  query,
  getDocs,
  writeBatch,
} from "firebase/firestore";
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

  const [checkDelete, showCheckDelete] = useState(false); //Confirm that set should be deleted
  const [isCreator, setCreator] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [userState, loadingB, errorB] = useAuthState(auth);

  // Only give the user the option to edit if they are the author of the set
  useEffect(() => {
    if (userState) {
      if (userState.displayName === decodedUser) {
        setCreator(true);
      } else {
        setCreator(false);
      }
    }
  }, [userState, decodedUser]);

  // fetches flashcards
  const [flashcards, loading, error] = useCollection(
    collection(db, "sets", decodedUser, decodedSet)
  );

  if (error) {
    console.error("Error fetching data: ", error);
    return <div>Error fetching data</div>;
  }

  if (loading | isLoading) {
    return <Loading />;
  }

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

  const handleDeleteSet = async (event) => {
    setLoading(true);
    const oldDocumentRef = collection(db, "sets", user, decodedSet);
    await deleteAllDocumentsInCollection(oldDocumentRef);
    const docRef = doc(db, "sets", user);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      const userData = docSnapshot.data();
      const updatedSets = userData.UserSets.filter((set) => set !== decodedSet); // Remove the oldTitle
      await updateDoc(docRef, { UserSets: updatedSets });
    }
    window.location.href = `/personalSets`;
  };

  const handleDeleteCheck = () => {
    showCheckDelete(true);
  };

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
            <button onClick={handleDeleteCheck} className="button-middle">
              Delete
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
      {flashcards && ( // Maps flashcards to the Flashcard object for viewing purposes
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
      {checkDelete && (
        <div className="delete-popup">
          <h4>Are you sure you want to delete this set?</h4>
          <button onClick={handleDeleteSet} className="button-pair-left">
            Yes
          </button>
          <button
            onClick={() => showCheckDelete(false)}
            className="button-pair-right"
          >
            No
          </button>
        </div>
      )}
    </>
  );
}

export default ViewSet;
