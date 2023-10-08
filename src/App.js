import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MajorProvider } from './UserContexts/MajorContext';
import HomePage from './PageComponents/HomePage';
import ForumPage from './PageComponents/ForumPage';
import { CourseProvider } from './UserContexts/CourseContext';

const App = () => {
  return (
    <Router>
      <MajorProvider>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route component={() => <Redirect to="/" />} />
        </Routes>
        </CourseProvider>
      </MajorProvider>
    </Router>
  );
};

export default App;
