import Link from "next/link";
import { auth, db } from "../firebase/clientApp";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/loading";
import {
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";

const Account = () => {
  const [userState, loading, error] = useAuthState(auth);
  const [activeTab, setActiveTab] = useState("1");
  const [isLoading, setIsLoading] = useState(true);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = `/`;
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  const local = auth.currentUser;
  const username = local && local.email.split("@")[0];

  const [recentSets, setRecentSets] = useState([]);

  useEffect(() => {
    if (!loading && username) {
      const getRecentSets = async () => {
        const documentSnapshot = await getDoc(doc(db, "sets", username));
        if (documentSnapshot.exists()) {
          const userData = documentSnapshot.data();
          setRecentSets(userData.UserSets.slice(0, 4));
        }
        setIsLoading(false); // set isLoading to false once user data is loaded
      };
      getRecentSets();
    }
  }, [loading, username]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Container className="my-5">
            <Row>
              <Col md={2}>
                {local && (
                  <img
                    src={local.photoURL || "/nopfp.png"}
                    className="profile-pic"
                  />
                )}
              </Col>
              <Col md={6}>
                <h2>{username}</h2>
                <p>{local?.displayName}</p>
              </Col>
            </Row>
          </Container>
          <Container>
            <Tabs
              className="account-tab"
              activeKey={activeTab}
              onSelect={(selectedTab) => toggle(selectedTab)}
            >
              <Tab eventKey="1" title="Account Information">
                <h4>Account Information</h4>
                <p>Name: {local?.displayName}</p>
                <p>Email: {local?.email}</p>
                <p>Account Created: Coming Soon!</p>
              </Tab>
              <Tab eventKey="2" title="Recent Sets">
                <h4>Recent Sets</h4>
                {recentSets.length > 0 ? (
                  recentSets.map((setName, index) => (
                    <div key={index}>
                      <Link
                        href={{
                          pathname: "/viewSet",
                          query: { user: username, set: setName },
                        }}
                      >
                        <p>{setName}</p>
                      </Link>
                      <p>&nbsp;</p>
                    </div>
                  ))
                ) : (
                  <p>No recent sets found.</p>
                )}
              </Tab>
              <Tab eventKey="3" title="Stats">
                <h4>Streak: Coming Soon!</h4>
                <p>List of Achievements: Coming Soon!</p>
              </Tab>
              <Tab eventKey="4" title="Settings">
                <h4>Settings</h4>
                <p>Interaction: Maybe Coming Soon!</p>
                <p>Privacy = None</p>
                <p>User Data = Sold</p>
              </Tab>
            </Tabs>
            <Link href="/">
              <Button onClick={handleLogout}>Logout</Button>
            </Link>
          </Container>
        </div>
      )}
    </>
  );
};

export default Account;
