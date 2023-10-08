import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MajorProvider } from './UserContexts/MajorContext';
import HomePage from './PageComponents/HomePage';
import ForumPage from './PageComponents/ForumPage';
import { CourseProvider } from './UserContexts/CourseContext';
import PreviousCourseSelector from './PageComponents/PreviousCourseSelector';
import EvaluationPage from './PageComponents/EvaluationPage';
import SelectedCoursePage from './PageComponents/SelectedCoursePage';
const App = () => {
  return (
    <Router>
      <MajorProvider>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/scheduleCourse" element={<PreviousCourseSelector />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/selectedCourse" element={<SelectedCoursePage />} />
          <Route path="/evaluationPage" element={<EvaluationPage />} />
          <Route component={() => <Redirect to="/" />} />
        </Routes>
        </CourseProvider>
      </MajorProvider>
    </Router>
  );
};

export default App;
