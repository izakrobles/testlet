import React, { useState, useEffect } from "react";
import Link from "next/link";
import { db, auth } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/loading";
import { Container, Col, Card } from "react-bootstrap";

function PersonalSets() {
  const [userState, loading, error] = useAuthState(auth);
  const [sets, setSets] = useState([]);

  // Gets names of collection under the logged in user
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
      <Container className="my-5">
        <h1>Your Sets</h1>
        <p>&nbsp;</p>
        <p>Here you can view your own personal study sets you have created!</p>
        <hr></hr>
        <p>&nbsp;</p>
      </Container>
      <Container className="my-5">
        <Col>
          {sets.map((setName, index) => (
            <div key={index}>
              <Card bg="primary" style={{ width: "50rem" }}>
                <Link
                  href={{
                    pathname: "/viewSet",
                    query: { user: userState.displayName, set: setName },
                  }}
                >
                  <Card.Body>{setName}</Card.Body>
                </Link>
              </Card>
              <p>&nbsp;</p>
            </div>
          ))}
        </Col>
      </Container>
    </>
  );
}

export default PersonalSets;
