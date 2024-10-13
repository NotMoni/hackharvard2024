import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Form } from 'react-bootstrap';
import styled, { keyframes } from 'styled-components';
import pdfToText from 'react-pdftotext';

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
    max-width: 700px;
    text-align: center;
    padding: 20px;
  }

  .title {
    color: #AFCBFF;
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  .file-input {
    margin-top: 30px;
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
    margin-bottom: 20px;
  }

  .file-upload-label:hover {
    background-color: #FFC04D;
  }

  .file-count {
    margin-bottom: 30px;
    font-size: 1.2rem;
    color: #001f3f;
  }

  button {
    background-color: #FF9447;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 1.1rem;
    color: white;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }

  button:hover {
    background-color: #FFC04D;
  }

  .file-list {
    text-align: left;
    margin-top: 20px;
  }

  .file-list-item {
    font-size: 1rem;
    color: #333;
  }
`;

function UploadResourcesPage({ formData, setFormData }) {
  const [files, setFiles] = useState(formData.files || []);
  const [pdfTexts, setPdfTexts] = useState([]); // To store extracted text from PDFs
  const [animationClass, setAnimationClass] = useState('fade-in');
  const navigate = useNavigate();

  useEffect(() => {
    setAnimationClass('fade-in'); // Trigger fade-in on page load
  }, []);

  const handleFileChange = async (e) => {
    const newFiles = Array.from(e.target.files); // Convert FileList to an array
    setFiles((prevFiles) => [...prevFiles, ...newFiles]); // Append new files to the existing list

    // Extract text from PDFs if there are any PDFs uploaded
    const pdfFiles = newFiles.filter((file) => file.type === 'application/pdf');
    const extractedTexts = await Promise.all(
      pdfFiles.map((file) => extractTextFromPDF(file))
    );

    // Append new extracted texts to existing pdfTexts state
    setPdfTexts((prevTexts) => [...prevTexts, ...extractedTexts]);
  };

  const handleNext = () => {
    setAnimationClass('fade-out');
    setTimeout(() => {
      setFormData({ ...formData, files, pdfTexts });
      navigate('/summary');
    }, 500); // Wait for fade-out animation to complete
  };

  // Function to extract text from PDF
  const extractTextFromPDF = async (file) => {
    try {
      const text = await pdfToText(file);
      return { name: file.name, text }; // Return an object with file name and extracted text
    } catch (error) {
      console.error('Failed to extract text from PDF:', error);
      return { name: file.name, text: 'Failed to extract text' }; // Return error message as text
    }
  };

  return (
    <PageWrapper className={animationClass}>
      <Container className="page-container">
        <h1 className="title">Upload Resources</h1>

        {/* Custom file input */}
        <Form.Group controlId="fileUpload" className="file-input">
          <Form.Label className="file-upload-label" htmlFor="file-upload">
            Select files to upload
          </Form.Label>
          <Form.Control
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
            style={{ display: 'none' }} /* Hide default file input */
          />
        </Form.Group>

        {/* Display file count */}
        <p className="file-count">{files.length} file(s) selected</p>

        {/* Display file names */}
        {files.length > 0 && (
          <div className="file-list">
            <ul>
              {files.map((file, index) => (
                <li key={index} className="file-list-item">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display extracted PDF text */}
        {pdfTexts.length > 0 && (
          <div className="file-list">
            <h3>Extracted PDF Texts</h3>
            <ul>
              {pdfTexts.map((pdf, index) => (
                <li key={index} className="file-list-item">
                  <strong>{pdf.name}:</strong> {pdf.text.substring(0, 100)}...
                  {/* Preview first 100 characters */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next button */}
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default UploadResourcesPage;
