import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';

// Keyframes for fade-in and fade-out animations
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
    color: #AFCBFF; /* Pastel blue */
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 30px;
  }

  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #AFCBFF;
    margin-bottom: 20px;
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

function ConceptsPage({ formData, setFormData }) {
  const [keyConcepts, setKeyConcepts] = useState(formData.keyConcepts || '');
  const [animationClass, setAnimationClass] = useState('fade-in');
  const navigate = useNavigate();

  const handleNext = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setFormData({ ...formData, keyConcepts });
      navigate('/upload-resources');
    }, 500); // Animation duration
  };

  useEffect(() => {
    setAnimationClass('fade-in'); // Trigger fade-in on initial load
  }, []);

  return (
    <PageWrapper className={animationClass}>
      <Container className="page-container">
        <h1 className="title">Key Concepts</h1>
        <Form.Group>
          <Form.Label>Enter key concepts separated by commas:</Form.Label>
          <Form.Control
            as="textarea"
            value={keyConcepts}
            onChange={(e) => setKeyConcepts(e.target.value)}
            placeholder="Enter key concepts..."
          />
        </Form.Group>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default ConceptsPage;
