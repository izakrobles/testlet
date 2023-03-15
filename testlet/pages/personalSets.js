import React, { useState } from "react";
import Link from "next/link";
import { db } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";

function PersonalSets() {
  const [sets, setSets] = useState([]);
  const user = "testletAdmin";

  const handleGetSets = async () => {
    const documentRef = doc(db, 'sets', user);
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const userData = documentSnapshot.data();
      setSets(userData.UserSets);
    }
  };
  handleGetSets();
  return (
    <>
      <title>Your Sets</title>
      <h1>Your Sets:</h1>
      <p>&nbsp;</p><p>&nbsp;</p>
      {sets.map((setName, index) => (
            <div key={index}>
                <Link href={{ pathname: "/viewSet", query: { set: setName } }}>
                    <h2>{setName}</h2>
                </Link>
                <p>&nbsp;</p>
            </div> 
        ))}
    </>
  );
}

export default PersonalSets;