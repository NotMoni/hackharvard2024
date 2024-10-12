import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import { FaBrain, FaLightbulb, FaHandsHelping, FaSearch, FaBalanceScale, FaPencilRuler } from 'react-icons/fa';

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

  select {
    margin-top: 20px;
    font-size: 1rem;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #AFCBFF;
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

  .bloom-explanation {
    display: flex;
    align-items: center;
    margin: 15px 0;
    font-size: 1rem;
    color: #001f3f;
    text-align: left;
  }

  .bloom-explanation svg {
    margin-right: 10px;
    color: #AFCBFF;
  }
`;

function BloomTaxonomyPage({ formData, setFormData }) {
  const [bloomLevel, setBloomLevel] = useState(formData.bloomLevel || '');
  const [animationClass, setAnimationClass] = useState('fade-in');
  const navigate = useNavigate();

  const handleNext = () => {
    // Trigger fade-out animation
    setAnimationClass('fade-out');
    setTimeout(() => {
      // After fade-out completes, navigate to the next page
      setFormData({ ...formData, bloomLevel });
      navigate('/concepts');
    }, 500); // Match the animation duration
  };

  return (
    <PageWrapper className={animationClass}>
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

        {/* Static explanations for Bloom's Taxonomy levels with icons */}
        <div className="bloom-explanation">
          <FaBrain size={40}/>
          <p><strong>Remember</strong>: Recall basic facts and concepts.</p>
        </div>
        <div className="bloom-explanation">
          <FaLightbulb size={40}/>
          <p><strong>Understand</strong>: Explain ideas or concepts.</p>
        </div>
        <div className="bloom-explanation">
          <FaHandsHelping size={40}/>
          <p><strong>Apply</strong>: Use information in new situations.</p>
        </div>
        <div className="bloom-explanation">
          <FaSearch size={40}/>
          <p><strong>Analyze</strong>: Draw connections among ideas.</p>
        </div>
        <div className="bloom-explanation">
          <FaBalanceScale size={40} />
          <p><strong>Evaluate</strong>: Justify a decision or action.</p>
        </div>
        <div className="bloom-explanation">
          <FaPencilRuler size={40}/>
          <p><strong>Create</strong>: Produce new or original work.</p>
        </div>
      </Container>
    </PageWrapper>
  );
}

export default BloomTaxonomyPage;
