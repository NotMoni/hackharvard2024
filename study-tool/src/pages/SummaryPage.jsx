import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: white;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .page-container {
    max-width: 800px;
    text-align: center;
    padding: 20px;
  }

  .title {
    color: #AFCBFF; /* Pastel blue */
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  .summary-text {
    font-size: 1.2rem;
    color: #001f3f; /* Navy blue text */
    margin-bottom: 15px;
  }

  /* Button styling */
  button {
    background-color: #FF9447; /* Pastel orange */
    border: none;
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 1rem;
    color: white;
    margin-top: 20px;
    margin-right: 10px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #FFC04D; /* Lighter orange on hover */
  }

  /* Flashcard styling */
  .flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

  .flashcard {
    width: 400px;
    height: 250px;
    cursor: pointer;
    perspective: 1000px;
    margin-bottom: 30px;
  }

  .flashcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    transform-origin: center center;
  }

  .flip {
    transform: rotateY(180deg);
  }

  .flashcard-front,
  .flashcard-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    padding: 20px;
    border: 1px solid #AFCBFF;
    border-radius: 15px;
  }

  .flashcard-back {
    transform: rotateY(180deg);
    background-color: #AFCBFF;
    color: white;
  }

  .flashcard-front {
    background-color: #FFC04D;
  }

  /* Dots for progress indication */
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .dot {
    height: 12px;
    width: 12px;
    margin: 0 5px;
    background-color: #AFCBFF;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.3s ease;
  }

  .active {
    background-color: #FF9447; /* Active dot color */
  }

  /* Navigation button container */
  .navigation-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
`;

function SummaryPage({ formData }) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate flashcards response for testing
      const simulatedFlashcardResponse = {
        category: 'Flashcards',
        cards: [
          { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
          { question: 'What is JSX?', answer: 'JSX stands for JavaScript XML and allows you to write HTML inside JavaScript.' },
          { question: 'What is a component?', answer: 'A component is a reusable piece of UI in React.' },
        ],
      };

      // Simulate a network delay
      setTimeout(() => {
        setResponse(simulatedFlashcardResponse);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while generating practice material.');
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <Container className="page-container">
        <h1 className="title">Summary</h1>
        <p className="summary-text"><strong>Subject Type:</strong> {formData.subjectType}</p>
        <p className="summary-text"><strong>Bloom's Level:</strong> {formData.bloomLevel}</p>
        <p className="summary-text"><strong>Key Concepts:</strong> {formData.keyConcepts}</p>
        <p className="summary-text"><strong>Files Uploaded:</strong> {formData.files ? formData.files.length : 0}</p>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Practice Material'}
        </Button>

        {error && <Alert variant="danger">{error}</Alert>}

        {response && (
          <div>
            <h2>Generated Practice Material</h2>
            <RenderPracticeMaterial response={response} />
          </div>
        )}
      </Container>
    </PageWrapper>
  );
}

function RenderPracticeMaterial({ response }) {
  const { category, ...content } = response;

  switch (category) {
    case 'Flashcards':
      return <Flashcards cards={content.cards} />;
    default:
      return <p>No practice material available.</p>;
  }
}

// Flashcard component with flipping functionality and next/previous buttons
function Flashcards({ cards }) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false); // Reset flip state for the next card
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false); // Reset flip state for the previous card
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="flashcard-container">
      <div className="flashcard" onClick={handleCardClick}>
        <div className={`flashcard-inner ${isFlipped ? 'flip' : ''}`}>
          <div className="flashcard-front">
            <p>{currentCard.question}</p>
          </div>
          <div className="flashcard-back">
            <p>{currentCard.answer}</p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <Button onClick={handlePrevious}>Previous</Button>
        <Button onClick={handleNext}>Next</Button>
      </div>

      {/* Dots for progress indication */}
      <div className="dots">
        {cards.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentCardIndex === index ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default SummaryPage;
