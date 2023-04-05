import React from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Testlet - Home</title>
      </Head>

      <Container className="my-5">
        <Row>
          <Col md={6}>
            <h1>Revolutionize Your Learning</h1>
            <p className="lead my-4">
              Testlet is the ultimate platform for students and educators alike.
              We offer the best online flashcard tool available to help you
              achieve your learning goals.
            </p>
            <a href="createSet" className="btn btn-primary">
              Get Started
            </a>
          </Col>
          <Col md={6}>
          <video controls={false} muted autoPlay loop width={"100%"} height={"100%"}>
            <source src="/stockA.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-light py-5">
        <Container>
          <Row>
            <Col md={4}>
              <div className="text-center my-3">
                <i className="bi bi-bookmark-heart h2 text-primary"></i>
                <h3 className="feature-title">Save Time</h3>
                <p className="text-muted">
                  With Testlet, you can easily create flash card sets, saving
                  you time and helping you stay organized.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center my-3">
                <i className="bi bi-broadcast h2 text-primary"></i>
                <h3 className="feature-title">Stored Remotely</h3>
                <p className="text-muted">
                  Testlet allows you to create and access your flash card sets
                  anywhere at any time!
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center my-3">
                <i className="bi bi-shield-lock h2 text-primary"></i>
                <h3 className="feature-title">Secure</h3>
                <p className="text-muted">
                  We take security seriously at Testlet, so you can be confident
                  that your data is safe and secure. <br></br>
                  <sub>
                    (and definately not being sold to the highest bidder)
                  </sub>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="my-5">
        <Row>
          <Col md={6}>
            <video controls={false} muted autoPlay loop width={"100%"} height={"100%"}>
              <source src="/stockB.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Col>
          <Col md={6}>
            <h2>Features</h2>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-check2 text-primary"></i> Create quizzes*
                and flashcards
              </li>
              <li>
                <i className="bi bi-check2 text-primary"></i> Share study
                materials with classmates*
              </li>
              <li>
                <i className="bi bi-check2 text-primary"></i> Store and access
                study sets in real time
              </li>
              <li>
                <i className="bi bi-check2 text-primary"></i> Additional
                feature...
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
