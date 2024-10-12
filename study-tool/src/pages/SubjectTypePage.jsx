import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Keyframes for fade-in and fade-out transitions
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const PageWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  /* Add fade-in or fade-out animation based on the class */
  &.fade-in {
    animation: ${fadeIn} 0.5s ease-in-out;
  }

  &.fade-out {
    animation: ${fadeOut} 0.5s ease-in-out;
  }

  .page-container {
    max-width: 700px;
    text-align: center;
  }

  .title {
    color: #AFCBFF;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 30px;
  }

  .range-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  .range-label {
    font-size: 1.2rem;
    color: #001f3f;
    width: 100px;
    text-align: center;
  }

  .range-slider {
    flex-grow: 2;
    margin: 0 40px;
    accent-color: #FF9447;
  }

  button {
    background-color: #FF9447;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 1rem;
    color: white;
    margin-top: 20px;
  }

  button:hover {
    background-color: #FFC04D;
  }
`;

function SubjectTypePage({ formData, setFormData }) {
  const [subjectType, setSubjectType] = useState(formData.subjectType || 3);
  const [animationClass, setAnimationClass] = useState('fade-in');
  const navigate = useNavigate();

  const handleNext = () => {
    // Trigger fade-out animation
    setAnimationClass('fade-out');
    setTimeout(() => {
      // After fade-out completes, navigate to the next page
      setFormData({ ...formData, subjectType });
      navigate('/bloom');
    }, 500); // Match the animation duration
  };

  return (
    <PageWrapper className={animationClass}>
      <Container className="page-container">
        <h1 className="title">Subject Type</h1>
        <p className="description">
          Declarative learning focuses on facts and information, while Procedural learning emphasizes skills and processes.
        </p>
        <Form.Group>
          <div className="range-container">
            <span className="range-label">Declarative</span>
            <Form.Range
              min="1"
              max="5"
              value={subjectType}
              onChange={(e) => setSubjectType(e.target.value)}
              className="range-slider"
            />
            <span className="range-label">Procedural</span>
          </div>
          <Form.Label>Selected Value: {subjectType}</Form.Label>
        </Form.Group>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default SubjectTypePage;
