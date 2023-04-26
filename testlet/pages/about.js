import React from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <div>
      <Head>
        <title>Testlet - About</title>
      </Head>

      <Container className="my-5 text-center"> {/* Same external styles as homepage for consistency */}
        <Row>
          <Col>
            <h1>About Testlet</h1>
            <p className="lead my-4">
              At Testlet, we believe that learning should be fun and accessible
              to everyone. That's why we've created the ultimate flashcard
              platform for students and educators alike. Our online flashcard
              tool makes it easy to create and share flashcard sets, helping you
              achieve your learning goals faster than ever before.
              <br></br> {/* Newline formatting */}
              <br></br>
              But we're more than just a flashcard tool. We're a community of
              learners, dedicated to supporting each other on the path to
              success. With Testlet, you can connect with classmates and share
              study materials, making your learning experience more
              collaborative and effective. Join the Testlet community today and
              revolutionize your learning experience!
            </p>
          </Col>
        </Row>
      </Container>

      <Container fluid className="bg-light py-5">
        <Container>
          <Row>
            <Col>
              <div className="text-center my-3">
                <i className="bi bi-bookmark-heart h2 text-primary"></i>
                <h3 className="feature-title">How it works</h3>
                <p className="text-muted">
                  The more you practice recalling a piece of information or
                  retrieving it from memory, the more likely you are to remember
                  it later on. This psychological finding explains why it's so
                  much more effective to study with flashcards than it is to
                  look over your notes until you feel like you know them.
                  Testlet's study tools are designed to help you maximize the
                  benefits of retrieval practice. Keep practicing retrieval,
                  even after you get a question right the first time!
                </p>
              </div>
            </Col>
            <Col>
              <div className="text-center my-3">
                <i className="bi bi-shield-lock h2 text-primary"></i>
                <h3 className="feature-title">How it started</h3>
                <p className="text-muted">
                  Testlet was born out of a semester project by a group of five
                  computer science students who shared a passion for learning
                  and technology. As students themselves, they were well aware
                  of the challenges and frustrations of studying, especially
                  when it came to memorizing and retaining large amounts of
                  information. They decided to tackle this problem by creating
                  an online flashcard tool that would make studying more
                  efficient, organized, and effective, and thus, Testlet was
                  born.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Container className="my-5">
        <Row>
          <Col>
            <img
              src="group.png"
              alt="group photo of team"
              className="img-fluid"
            />
          </Col>
          <Col>
            <h2>Our Team</h2>
            <p className="our-team">
              We're a group of passionate learners and developers who believe
              in making learning accessible to everyone. Our team members have
              extensive experience in computer science, software development,
              and education. We are constantly learning and growing as we work
              to improve Testlet and make it the best it can be.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
