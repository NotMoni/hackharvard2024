import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
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
    color: #AFCBFF; /* Pastel pink */
    font-size: 2rem;
    margin-bottom: 20px;
  }

  /* Description and text styling */
  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 30px;
  }

  /* Dropdown styling */
  select {
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #AFCBFF;
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

function BloomTaxonomyPage({ formData, setFormData }) {
  const [bloomLevel, setBloomLevel] = useState(formData.bloomLevel || '');
  const navigate = useNavigate();

  const handleNext = () => {
    setFormData({ ...formData, bloomLevel });
    navigate('/concepts');
  };

  return (
    <PageWrapper>
      <Container className="page-container">
        <h1 className="title">Bloom's Taxonomy Level</h1>
        <Form.Group>
          <Form.Label>Select Bloom's Level:</Form.Label>
          <Form.Select
            value={bloomLevel}
            onChange={(e) => setBloomLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="Remember">Remember</option>
            <option value="Understand">Understand</option>
            <option value="Apply">Apply</option>
            <option value="Analyze">Analyze</option>
            <option value="Evaluate">Evaluate</option>
            <option value="Create">Create</option>
          </Form.Select>
        </Form.Group>
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default BloomTaxonomyPage;
