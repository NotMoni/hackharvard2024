import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import styled from 'styled-components';

const PageWrapper = styled.div`
  /* General styles for the page */
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .page-container {
    max-width: 700px;
    text-align: center;
  }

  /* Title styling */
  .title {
    color: #AFCBFF; /* Pastel blue */
    font-size: 2rem;
    margin-bottom: 20px;
  }

  /* Description and text styling */
  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 30px;
  }

  /* Textarea styling */
  textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
    border: 1px solid #AFCBFF;
    margin-bottom: 20px;
  }

  /* Button styling */
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
  const navigate = useNavigate();

  const handleNext = () => {
    setFormData({ ...formData, keyConcepts });
    navigate('/upload-resources');
  };

  return (
    <PageWrapper>
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
