// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .page-container {
    max-width: 700px;
    text-align: center;
    padding: 20px;
  }

  .title {
    color: #AFCBFF;
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  .description {
    font-size: 1.2rem;
    color: #001f3f;
    margin-bottom: 20px;
  }

  .button-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  button {
    background-color: #FF9447;
    border: none;
    padding: 15px 30px;
    border-radius: 30px;
    font-size: 1.2rem;
    color: white;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #FFC04D;
  }
`;

function HomePage() {
  const navigate = useNavigate();

  const handleLearnNew = () => {
    navigate('/subject-type');
  };

  const handleReviewOld = () => {
    navigate('/review');
  };

  return (
    <PageWrapper>
      <Container className="page-container">
        <h1 className="title">Welcome to the Study Tool</h1>
        <p className="description">What would you like to do today?</p>
        <div className="button-group">
          <Button onClick={handleLearnNew}>Learn New Material</Button>
          <Button onClick={handleReviewOld}>Review Old Material</Button>
        </div>
      </Container>
    </PageWrapper>
  );
}

export default HomePage;
