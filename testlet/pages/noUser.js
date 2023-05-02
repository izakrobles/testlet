import Link from "next/link";
import { auth } from "../firebase/clientApp";
import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Nav,
  TabContent,
  TabPane,
  Button,
} from "react-bootstrap";
import classnames from "classnames";
import { Tab, Tabs } from "react-bootstrap";

const noUser = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  };

  return (
    <>
      <div>
        <Container className="my-5">
          <Row>
            <Col md={2}>
              <img src="/nopfp.png" className="profile-pic" />
            </Col>
            <Col md={6}>
              <h2>JDough1</h2>
              <p>Jog Dough</p>
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
              <p>Name: Jog Dough</p>
              <p>Email: Jog Dough Email</p>
              <p>Account Created: Day-Month-Year</p>
            </Tab>
            <Tab eventKey="2" title="Recent Sets">
              <h4>Recent Sets</h4>
              <p>Most Recent Study set</p>
              <p>2nd Most Recent Study Set</p>
              <p>3rd Most Recent Study Set</p>
              <p>4th Most Recent Study Set</p>
            </Tab>
            <Tab eventKey="3" title="Stats">
              <h4>Streak: 400 Days</h4>
              <p>List of Achievements</p>
            </Tab>
            <Tab eventKey="4" title="Settings">
              <h4>Settings</h4>
              <p>Privacy = None</p>
              <p>User Data = Sold</p>
            </Tab>
          </Tabs>
          <Link href="/">
            <Button onClick={handleLogout}>Logout</Button>
          </Link>
        </Container>
      </div>
    </>
  );
};

export default noUser;
