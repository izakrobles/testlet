import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db, auth } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/loading";

function PersonalSets() {
  const [userState, loading, error] = useAuthState(auth);
  const [sets, setSets] = useState([]);

  useEffect(() => {
    if (!loading && userState) {
      const handleGetSets = async () => {
        const documentRef = doc(db, "sets", userState.displayName);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          const userData = documentSnapshot.data();
          setSets(userData.UserSets);
        }
      };
      handleGetSets();
    }
  }, [loading, userState]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userState) {
    return <div>You need to be signed in to view this page.</div>;
  }

  return (
    <>
      <title>Your Sets</title>
      <h1>Your Sets:</h1>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      {sets.map((setName, index) => (
        <div key={index}>
          <Link
            href={{
              pathname: "/viewSet",
              query: { user: userState.displayName, set: setName },
            }}
          >
            <h2>{setName}</h2>
          </Link>
          <p>&nbsp;</p>
        </div>
      ))}
    </>
  );
}

export default PersonalSets;
