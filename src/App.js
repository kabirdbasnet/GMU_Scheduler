import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MajorProvider } from './UserContexts/MajorContext';
import HomePage from './PageComponents/HomePage';
import ForumPage from './PageComponents/ForumPage';

const App = () => {
  return (
    <Router>
      <MajorProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<ForumPage />} />
        </Routes>
      </MajorProvider>
    </Router>
  );
};

export default App;
