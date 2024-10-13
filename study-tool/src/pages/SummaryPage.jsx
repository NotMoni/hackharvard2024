import React, { useState } from 'react';
import { Container, Button, Alert, Form } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import jsPDF from 'jspdf';
// In SummaryPage.jsx


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

const flipCard = keyframes`
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(180deg);
  }
`;

const PageWrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  &.fade-in {
    animation: ${fadeIn} 0.5s ease-in-out;
  }

  &.fade-out {
    animation: ${fadeOut} 0.5s ease-in-out;
  }

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

  .left-align {
    text-align: left; /* For left-aligning options and steps */
    margin-left: 20px;
  }

  /* Flashcard flip styling */
  .flashcard {
    perspective: 1000px;
    width: 300px;
    height: 200px;
    margin: 20px 0;
  }

  .flashcard-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    position: relative;
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
    font-size: 1.2rem;
  }

  .flashcard-back {
    transform: rotateY(180deg);
    background-color: #FF9447;
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
            console.log(formData);
            // Send formData to the backend
            const response = await fetch('https://hackharvard2024-4shg.onrender.com/q', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Send formData
            });

            if (!response.ok) {
                throw new Error('Failed to send data');
            }
            
            const responseData = await response.json();
            setResponse(responseData);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while sending the summary to the backend.');
            setLoading(false);
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        let yPosition = 10; // Start y position for the content
        const lineSpacing = 10; // Space between lines
        const pageWidth = 180; // Define the maximum width for text (A4 width minus margins)
        const pageHeight = doc.internal.pageSize.height; // Get the height of the page

        doc.setFontSize(16);
        doc.text('Generated Practice Material', 10, yPosition);
        yPosition += lineSpacing;

        if (response) {
            const { category, ...content } = response;

            doc.setFontSize(14);
            doc.text(`Category: ${category}`, 10, yPosition);
            yPosition += lineSpacing;

            const checkPageOverflow = () => {
                if (yPosition + lineSpacing > pageHeight - 20) {
                    doc.addPage();
                    yPosition = 10; // Reset yPosition for the new page
                }
            };

            switch (category) {
                case 'Flashcards':
                    content.cards.forEach((card) => {
                        const questionLines = doc.splitTextToSize(`Question: ${card.question}`, pageWidth);
                        doc.text(questionLines, 10, yPosition);
                        yPosition += questionLines.length * lineSpacing;
                        checkPageOverflow();

                        const answerLines = doc.splitTextToSize(`Answer: ${card.answer}`, pageWidth);
                        doc.text(answerLines, 10, yPosition);
                        yPosition += answerLines.length * lineSpacing;
                        checkPageOverflow();
                    });
                    break;

                case 'Long-Answer':
                    content.questions.forEach((question) => {
                        const questionLines = doc.splitTextToSize(`Question: ${question.question}`, pageWidth);
                        doc.text(questionLines, 10, yPosition);
                        yPosition += questionLines.length * lineSpacing;
                        checkPageOverflow();

                        const answerLines = doc.splitTextToSize(`Answer: ${question.answer}`, pageWidth);
                        doc.text(answerLines, 10, yPosition);
                        yPosition += answerLines.length * lineSpacing;
                        checkPageOverflow();
                    });
                    break;

                case 'Quiz':
                    content.questions.forEach((question) => {
                        const questionLines = doc.splitTextToSize(`Question: ${question.question}`, pageWidth);
                        doc.text(questionLines, 10, yPosition);
                        yPosition += questionLines.length * lineSpacing;
                        checkPageOverflow();

                        const optionsLines = doc.splitTextToSize(`Options: ${question.options.join(', ')}`, pageWidth);
                        doc.text(optionsLines, 10, yPosition);
                        yPosition += optionsLines.length * lineSpacing;
                        checkPageOverflow();

                        const correctAnswerLine = `Correct Answer: ${question.correctAnswer}`;
                        doc.text(correctAnswerLine, 10, yPosition);
                        yPosition += lineSpacing;
                        checkPageOverflow();
                    });
                    break;

                case 'Project-Based':
                    content.projects.forEach((project) => {
                        const titleLines = doc.splitTextToSize(`Project: ${project.title}`, pageWidth);
                        doc.text(titleLines, 10, yPosition);
                        yPosition += titleLines.length * lineSpacing;
                        checkPageOverflow();

                        const descriptionLines = doc.splitTextToSize(`Description: ${project.description}`, pageWidth);
                        doc.text(descriptionLines, 10, yPosition);
                        yPosition += descriptionLines.length * lineSpacing;
                        checkPageOverflow();

                        project.steps.forEach((step, stepIndex) => {
                            const stepLines = doc.splitTextToSize(`Step ${stepIndex + 1}: ${step}`, pageWidth);
                            doc.text(stepLines, 10, yPosition);
                            yPosition += stepLines.length * lineSpacing;
                            checkPageOverflow();
                        });
                        yPosition += lineSpacing; // Extra space between projects
                        checkPageOverflow();
                    });
                    break;

                default:
                    doc.text('No practice material available.', 10, yPosition);
            }
        }

        doc.save('practice_material.pdf');
    };

    const generateKAGMFile = () => {
        // Convert formData or response into JSON string
        const dataToDownload = response ? JSON.stringify(response, null, 2) : JSON.stringify(formData, null, 2);
        const blob = new Blob([dataToDownload], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element and trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = 'study.kagm';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <PageWrapper>
        <Container className="page-container">
          {!response && (
            <>
              {/* Render the summary only when response is not available */}
              <h1 className="title">Summary</h1>
              <p className="summary-text">
                <strong>Subject Type:</strong> {formData.subjectType}
              </p>
              <p className="summary-text">
                <strong>Bloom's Level:</strong> {formData.bloomLevel}
              </p>
              <p className="summary-text">
                <strong>Files Uploaded:</strong>{" "}
                {formData.files ? formData.files.length : 0}
              </p>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Generating..." : "Generate Practice Material"}
              </Button>
              {error && <Alert variant="danger">{error}</Alert>}
            </>
          )}
  
          {response && (
            <>
              {/* Render the practice material when response is available */}
              <RenderPracticeMaterial response={response} />
              <Button onClick={generatePDF}>Download PDF</Button>
              <Button onClick={generateKAGMFile}>Download .kagm File</Button>
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

export default SummaryPage;
