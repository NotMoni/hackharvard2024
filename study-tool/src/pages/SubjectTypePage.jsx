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
    max-width: 700px; /* Increased width for better layout */
    text-align: center;
  }

  /* Title styling */
  .title {
    color: #AFCBFF;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  /* Description and text styling */
  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 30px;
  }

  /* Range container for positioning Declarative and Procedural */
  .range-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }

  /* Declarative and Procedural labels */
  .range-label {
    font-size: 1.2rem;
    color: #001f3f;
    width: 100px; /* Increased width for better alignment */
    text-align: center;
  }

  /* Slider styling */
  .range-slider {
    flex-grow: 2; /* Make the slider take more space */
    margin: 0 40px; /* Add more space between labels and slider */
    accent-color: #FF9447; /* Pastel orange slider color */
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

function SubjectTypePage({ formData, setFormData }) {
  const [subjectType, setSubjectType] = useState(formData.subjectType || 3);
  const navigate = useNavigate();

  const handleNext = () => {
    setFormData({ ...formData, subjectType });
    navigate('/bloom');
  };

  return (
    <PageWrapper>
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
