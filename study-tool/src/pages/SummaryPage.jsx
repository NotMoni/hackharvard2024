import React, { useState } from 'react';
import { Container, Button, Alert, Form } from 'react-bootstrap';
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

  .flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
  }

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

  .navigation-buttons {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

  .answer-box {
    margin-top: 20px;
    text-align: left;
    font-size: 1.2rem;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #AFCBFF;
    border-radius: 10px;
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
            // Simulate project-based category for testing
            const simulatedResponse = {
                category: 'Project-Based',
                projects: [
                    {
                        title: 'Build a Personal Portfolio Website',
                        description: 'Create a portfolio website to showcase your skills, projects, and resume.',
                        steps: ['Step 1: Choose a tech stack', 'Step 2: Design the layout', 'Step 3: Develop the website', 'Step 4: Deploy the website', 'Step 5: Add a contact form']
                    },
                    {
                        title: 'Develop a To-Do List Application',
                        description: 'Build a simple to-do list app that allows users to add, delete, and complete tasks.',
                        steps: ['Step 1: Set up project structure', 'Step 2: Create UI for adding tasks', 'Step 3: Implement task completion and deletion', 'Step 4: Store tasks using local storage']
                    }
                ]
            };

            // Simulate a network delay
            setTimeout(() => {
                setResponse(simulatedResponse);
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
            <div className="project-steps">
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

            <Form.Group>
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

// Flashcards and LongAnswer components (unchanged)
// Existing Flashcards and Long-Answer components (unchanged)
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

export default SummaryPage;

