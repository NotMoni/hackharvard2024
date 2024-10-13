// src/pages/ReviewPage.jsx
import React, { useState } from 'react';
import { Container, Button, Form, Alert } from 'react-bootstrap';
import styled from 'styled-components';

const PageWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Changed to flex-start to prevent vertical centering */
  padding: 20px;

  .page-container {
    width: 100%; /* Changed to take full width */
    max-width: 800px; /* Optional max-width */
    text-align: center;
    padding: 20px;  
  }

  .title {
    color: #AFCBFF; 
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  .file-upload-label {
    display: block;
    background-color: #FF9447;
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 1.1rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 20px auto;
    width: fit-content;
  }

  .file-upload-label:hover {
    background-color: #FFC04D;
  }

  button {
    background-color: #FF9447; 
    border: none;
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 1rem;
    color: white;
    transition: background-color 0.3s ease;
    margin: 10px; /* Added margin for spacing */
  }

  button:hover {
    background-color: #FFC04D;
  }

  /* Flashcard container styling */
  .flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    margin-top: 30px;
    width: 100%; /* Ensure it takes full width */
  }

  /* Flashcard flip styling */
  .flashcard {
    perspective: 1000px;
    width: 80%; /* Increased width to 80% */
    max-width: 500px; /* Optional max-width */
    height: 300px; /* Increased height */
    margin: 20px auto; /* Center horizontally */
  }

  .flashcard-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
    transform-origin: center; /* Ensure flip axis is centered */
  }

  .flip {
    transform: rotateY(180deg);
  }

  .flashcard-front, .flashcard-back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: #AFCBFF;
    color: white;
    font-size: 1.4rem; /* Increased font size */
    text-align: center; /* Center text */
    word-wrap: break-word; /* Handle long words */
    word-break: break-word;
  }

  .flashcard-back {
    transform: rotateY(180deg);
    background-color: #FF9447;
  }

  /* Navigation buttons styling */
  .navigation-buttons {
    display: flex;
    justify-content: center; /* Center buttons horizontally */
    align-items: center;
    margin-top: 20px;
  }

  .navigation-buttons button {
    margin: 0 10px; /* Spacing between buttons */
  }

  /* Dots styling */
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 20px;
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

  /* Additional styles for other components */
  .question, .project-title, .project-description {
    width: 80%; /* Increased width */
    max-width: 600px; /* Optional max-width */
    margin: 0 auto; /* Center horizontally */
    text-align: center;
  }

  .answer-box, .project-steps, .left-align {
    width: 80%; /* Increased width */
    max-width: 600px; /* Optional max-width */
    margin: 20px auto; /* Center horizontally and add spacing */
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #AFCBFF;
    border-radius: 10px;
  }

  /* Adjust form check alignment */
  .left-align {
    text-align: left;
  }

  /* Adjust button spacing in forms */
  .flashcard-container button,
  .project-based-container button,
  .quiz-container button,
  .long-answer-container button {
    margin: 10px;
  }
`;

function ReviewPage() {
    const [fileContent, setFileContent] = useState(null);
    const [error, setError] = useState(null);
  
    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file && file.name.endsWith('.kagm')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const content = JSON.parse(event.target.result);
            setFileContent(content);
            setError(null);
          } catch (err) {
            setError('Invalid file format.');
            setFileContent(null);
          }
        };
        reader.readAsText(file);
      } else {
        setError('Please upload a valid .kagm file.');
        setFileContent(null);
      }
    };
  
    return (
      <PageWrapper>
        <Container className="page-container">
          {fileContent ? (
            <>
              {/* When a file is uploaded, hide everything else and display only the change file button and practice material */}
              <Form.Group controlId="fileUpload" className="file-input">
                <Form.Label className="file-upload-label" htmlFor="file-upload">
                  Change File
                </Form.Label>
                <Form.Control
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".kagm"
                  style={{ display: 'none' }}
                />
              </Form.Group>
  
              {/* Display the practice material */}
              <div>
                <RenderPracticeMaterial response={fileContent} />
              </div>
            </>
          ) : (
            <>
              {/* When no file is uploaded, display the title, upload button, and any errors */}
              <h1 className="title">Review Old Material</h1>
              <Form.Group controlId="fileUpload" className="file-input">
                <Form.Label className="file-upload-label" htmlFor="file-upload">
                  Select a .kagm file to upload
                </Form.Label>
                <Form.Control
                  id="file-upload"
                  type="file"
                  onChange={handleFileUpload}
                  accept=".kagm"
                  style={{ display: 'none' }}
                />
              </Form.Group>
              {error && <Alert variant="danger">{error}</Alert>}
            </>
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
        case 'Long-Answer':
            return <LongAnswer questions={content.questions} />;
        case 'Quiz':
            return <Quiz questions={content.questions} />;
        case 'Project-Based':
            return <ProjectBased projects={content.projects} />;
        default:
            return <p>No practice material available.</p>;
    }
}

// Project-Based component with steps and navigation
function ProjectBased({ projects }) {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const handleNext = () => {
        setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
    };

    const handlePrevious = () => {
        setCurrentProjectIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length);
    };

    const currentProject = projects[currentProjectIndex];

    return (
        <div className="flashcard-container">
            <div className="project-title">
                <h3>{currentProject.title}</h3>
            </div>
            <div className="project-description">
                <p>{currentProject.description}</p>
            </div>
            <div className="project-steps left-align">
                <h4>Steps to Approach:</h4>
                <ul>
                    {currentProject.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>
            </div>

            <div className="navigation-buttons">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>

            <div className="dots">
                {projects.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentProjectIndex === index ? 'active' : ''}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

// Quiz component with multiple-choice system and navigation
function Quiz({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        setShowAnswer(false);
        setSelectedAnswer(''); // Reset the selected answer
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setSelectedAnswer(''); // Reset the selected answer
        setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    const handleAnswerClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flashcard-container">
            <div className="question">
                <p><strong>Question:</strong> {currentQuestion.question}</p>
            </div>

            <Form.Group className="left-align">
                {currentQuestion.options.map((option, index) => (
                    <Form.Check
                        key={index}
                        type="radio"
                        label={option}
                        name="quiz-options"
                        value={option}
                        checked={selectedAnswer === option}
                        onChange={() => handleAnswerClick(option)}
                    />
                ))}
            </Form.Group>

            <Button onClick={toggleShowAnswer}>
                {showAnswer ? 'Hide Answer' : 'Check Answer'}
            </Button>

            {showAnswer && (
                <div className="answer-box">
                    <p>
                        {selectedAnswer === currentQuestion.correctAnswer
                            ? 'Correct!'
                            : `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`}
                    </p>
                </div>
            )}

            <div className="navigation-buttons">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>

            <div className="dots">
                {questions.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentQuestionIndex === index ? 'active' : ''}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

// Flashcards with flip functionality
function Flashcards({ cards }) {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
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

            <div className="navigation-buttons">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>

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

function LongAnswer({ questions }) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleNext = () => {
        setShowAnswer(false);
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };

    const handlePrevious = () => {
        setShowAnswer(false);
        setCurrentQuestionIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    };

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flashcard-container">
            <div className="question">
                <p><strong>Question:</strong> {currentQuestion.question}</p>
            </div>

            <Form.Group className="answer-box">
                <Form.Label>Type your answer:</Form.Label>
                <textarea placeholder="Write your answer here..." />
            </Form.Group>

            <Button onClick={toggleShowAnswer}>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </Button>

            {showAnswer && (
                <div className="answer-box">
                    <p><strong>Answer:</strong> {currentQuestion.answer}</p>
                </div>
            )}

            <div className="navigation-buttons">
                <Button onClick={handlePrevious}>Previous</Button>
                <Button onClick={handleNext}>Next</Button>
            </div>

            <div className="dots">
                {questions.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentQuestionIndex === index ? 'active' : ''}`}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default ReviewPage;
