import Link from "next/link";
import { auth } from "../firebase/clientApp";
import React, { useState } from "react";
import Head from "next/head";
import { Container, Row, Col, Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import classnames from "classnames";

function Account() {
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

  const local = auth.currentUser;
  
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
          <Nav class ="nav-account" tabs rounded>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                Account Information
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                Study Sets
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '3' })} onClick={() => { toggle('3'); }}>
                Stats
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: activeTab === '4' })} onClick={() => { toggle('4'); }}>
                Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <Button onClick={handleLogout}>Logout</Button>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <h4>Account Information</h4>
              <p>
                Name: Jog Dough
              </p>
              <p>
                Email: Jog Dough Email
              </p>
              <p>
                Account Created: Day-Month-Year
              </p>
            </TabPane>
            <TabPane tabId="2">
              <h4>Study Sets</h4>
              <p>Most Recent study set</p>
              <p>Study sets</p>
            </TabPane>
            <TabPane tabId="3">
              <h4>Streak: 400 Days</h4>
              <p>List of Achievements</p>
            </TabPane>
            <TabPane tabId="4">
              <h4>Settings</h4>
              <p>Privacy = None</p>
              <p>User Data = Sold</p>
            </TabPane>
          </TabContent>
        </Container>

        <footer className="foot bg-primary text-light text-center py-3">
          <p className="mb-0">&copy; 2023 Testlet. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default Account;
