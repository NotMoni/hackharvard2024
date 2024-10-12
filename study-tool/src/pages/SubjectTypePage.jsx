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

  .blurb {
    margin-top: 20px;
    font-size: 1rem;
    color: #001f3f;
    background-color: #f0f8ff;
    padding: 15px;
    border-radius: 5px;
    text-align: left;
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
  const [subjectType, setSubjectType] = useState(formData.subjectType || 1); // Default to "Low-Level Declarative"
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

  // Descriptions for each subject type
  const descriptions = {
    1: {
      title: 'Declarative Low Level',
      types: 'Types of Questions: Isolated Facts, Recall',
      examples: 'Examples: "What is A", "List A", "Describe A", "Why is A important"',
    },
    2: {
      title: 'Declarative Mid Level',
      types: 'Types of Questions: Applying a theoretical concept, Multi-concept',
      examples: 'Examples: "What is A and how does it do B", "How does A relate to B", "Apply the concept of classical conditioning..."',
    },
    3: {
      title: 'Procedural Low Level',
      types: 'Types of Questions: Isolated Process, Problem Solving',
      examples: 'Examples: "Factor a polynomial", "Take the derivative of (some polynomial)"',
    },
    4: {
      title: 'Procedural Mid Level',
      types: 'Types of Questions: Multistep Process, Problem Solving',
      examples: 'Examples: Concepts like integrals, limits, and finding if an integral is convergent or divergent.',
    },
  };

  // Get the current description based on the selected subjectType
  const selectedDescription = descriptions[subjectType];

  return (
    <PageWrapper className={animationClass}>
      <Container className="page-container">
        <h1 className="title">Subject Type</h1>
        <p className="description">
          Declarative learning focuses on facts and information, while Procedural learning emphasizes skills and processes.
        </p>

        {/* Slider to select subject type */}
        <Form.Group>
          <div className="range-container">
            <span className="range-label">Declarative</span>
            <Form.Range
              min="1"
              max="4"
              value={subjectType}
              onChange={(e) => setSubjectType(parseInt(e.target.value))}
              className="range-slider"
            />
            <span className="range-label">Procedural</span>
          </div>
          <Form.Label>Selected Value: {subjectType}</Form.Label>
        </Form.Group>

        {/* Dynamic blurb based on selected value */}
        <div className="blurb">
          <strong>{selectedDescription.title}</strong>
          <p>{selectedDescription.types}</p>
          <p>{selectedDescription.examples}</p>
        </div>

        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default SubjectTypePage;
