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
    padding: 20px;
  }

  /* Title styling */
  .title {
    color: #AFCBFF; /* Pastel green */
    font-size: 2.5rem;
    margin-bottom: 30px;
  }

  /* File input and description styling */
  .file-input {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  /* Custom styled file upload button */
  .file-upload-button {
    background-color: #FF9447;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 1.1rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .file-upload-button:hover {
    background-color: #FFC04D;
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

  /* Next button styling */
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
`;

function UploadResourcesPage({ formData, setFormData }) {
  const [files, setFiles] = useState(formData.files || []);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleNext = () => {
    setFormData({ ...formData, files });
    navigate('/summary');
  };

  return (
    <PageWrapper>
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

        {/* Next button */}
        <Button onClick={handleNext}>Next</Button>
      </Container>
    </PageWrapper>
  );
}

export default UploadResourcesPage;
