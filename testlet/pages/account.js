import { useRouter } from "next/router";
import Link from "next/link";
import { auth, db } from "../firebase/clientApp";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal } from "react-bootstrap";
import { updateProfile } from "firebase/auth";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Tab, Tabs } from "react-bootstrap";
import { doc, getDoc } from "firebase/firestore";
import { imageMap } from "@/data//profilePictures";
import Loading from "./components/loading";

const Account = () => {
  const [userState, loading] = useAuthState(auth);
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
  const username = local && local.email.split("@")[0]; //psudeo username used to mirror quizlet

  const [recentSets, setRecentSets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPictureUrl, setNewPictureUrl] = useState("");

  const handlePictureSelect = async (picture) => {
    if (local) {
      await updateProfile(local, { photoURL: picture.url });
      setShowModal(false); // close the modal
    }
  };

  const handleNewPictureSubmit = async () => {
    if (!/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(newPictureUrl)) {
      return;
    }

    if (local) {
      updateProfile(local, { photoURL: newPictureUrl });
      setShowModal(false);
      location.reload();
    }
  };

  useEffect(() => { //loading in sets from users db
    if (!loading && username) { //renders the sets after loading done and username found
      const getRecentSets = async () => {
        const documentSnapshot = await getDoc(doc(db, "sets", userState.displayName));
        if (documentSnapshot.exists()) {
          const userData = documentSnapshot.data();
          setRecentSets(userData.UserSets.slice(0, 4));
        }
        setIsLoading(false); // set isLoading to false once user data is loaded
      };
      getRecentSets();
    }
  }, [loading, username]);

  const router = useRouter(); //forces unlogged in users to different page.
  useEffect(() => {
    if (!loading && !userState) {
      router.push("/login");
    }
  }, [loading, userState]);

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
                  <div className="d-flex align-items-center">
                    <a href="#" onClick={() => setShowModal(true)}>
                      <img
                        src={local.photoURL || "/nopfp.png"} //defaults to user picture or none
                        className="profile-pic"
                        title="Change profile picture"
                      />
                      <div className="change-image-banner">Change image</div>
                    </a>
                  </div>
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
              onSelect={(selectedTab) => toggle(selectedTab)} //allows tab switching
            >
              <Tab eventKey="1" title="Account Information">
                <h4>Account Information</h4>
                <p>Name: {local?.displayName}</p>
                <p>Email: {local?.email}</p>
                <p>Account Created: Coming Soon!</p>
              </Tab>
              <Tab eventKey="2" title="Recent Sets">
                <h4>Recent Sets</h4>
                {recentSets.length > 0 ? ( //makes sure there is at least one recent set
                  recentSets.map((setName, index) => (
                    <ul key={index}>
                      <li>
                      <Link
                        href={{
                          pathname: "/viewSet",
                          query: { user: userState.displayName, set: setName },
                        }}
                      >
                        <p>{setName}</p>
                      </Link>
                      </li>
                    </ul>
                  ))
                ) : (
                  <p>No recent sets found.</p> //displays if could not find any sets or error
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Select Profile Picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {Object.keys(imageMap).map((key) => {
                  const picture = imageMap[key];
                  return (
                    <img
                      key={picture.id}
                      src={picture.url}
                      alt={picture.altText}
                      className="modal-picture"
                      onClick={() => handlePictureSelect(picture)}
                    />
                  );
                })}
                <div className="modal-user-input">
                  <div>
                    <h4 class="pfpURL">Enter an image URL for your pfp:</h4>
                    <input
                      type="text"
                      value={newPictureUrl}
                      onChange={(e) => setNewPictureUrl(e.target.value)}
                    />
                    <Button variant="primary" onClick={handleNewPictureSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      )}
    </>
  );
};

export default Account;
