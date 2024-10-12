// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SubjectTypePage from './pages/SubjectTypePage';
import BloomTaxonomyPage from './pages/BloomTaxonomyPage';
import UploadResourcesPage from './pages/UploadResourcesPage';
import ConceptsPage from './pages/ConceptPage';
import SummaryPage from './pages/SummaryPage';
import ReviewPage from './pages/ReviewPage'; // Import ReviewPage
import GlobalStyles from './GlobalStyles';

function App() {
  const [formData, setFormData] = useState({});

  return (
    <Router>
      <GlobalStyles />
      <div className="app-container">
        <div
          className="logo-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '20px',
            textAlign: 'center',
          }}
        >
          <img
            src="logo.png"
            width={100}
            height={100}
            alt="Study Tool Logo"
            style={{
              display: 'block',
              marginBottom: '20px',
            }}
          />
        </div>
        <Routes>
          <Route
            path="/"
            element={<HomePage />}
          />
          <Route
            path="/subject-type"
            element={<SubjectTypePage formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/bloom"
            element={<BloomTaxonomyPage formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/concepts"
            element={<ConceptsPage formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/upload-resources"
            element={<UploadResourcesPage formData={formData} setFormData={setFormData} />}
          />
          <Route
            path="/summary"
            element={<SummaryPage formData={formData} />}
          />
          <Route
            path="/review"
            element={<ReviewPage />} // Route for review page
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
