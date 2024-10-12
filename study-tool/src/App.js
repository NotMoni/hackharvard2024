// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubjectTypePage from './pages/SubjectTypePage';
import BloomTaxonomyPage from './pages/BloomTaxonomyPage';
import UploadResourcesPage from './pages/UploadResourcesPage';
import ConceptsPage from './pages/ConceptPage';
import SummaryPage from './pages/SummaryPage';
import GlobalStyles from './GlobalStyles';  // Import GlobalStyles

function App() {
  const [formData, setFormData] = useState({});

  return (
    <Router>
      <GlobalStyles />
      <div className="app-container">
        <Routes>
          <Route
            path="/"
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
