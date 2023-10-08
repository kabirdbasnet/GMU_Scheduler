import React, { useState, useEffect, useRef } from 'react';
import { coursesData } from './../../Constants/CourseListConstants.js';
import './style.css';

const Forum = () => {
  const [comments, setText] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [structure, setStructure] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredCourses([]);
      return;
    }

    const allCourses = Object.values(coursesData).flat();

    const filtered = allCourses.filter(course => {
      const match = course.match(/-(.*?)\(/);
      if (!match) return false;
      const courseNameAndNumber = match[1].trim().toLowerCase();
      return courseNameAndNumber.includes(searchQuery.toLowerCase());
    });

    setFilteredCourses(filtered);
  }, [searchQuery]);

  const handleBlur = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  const handleTextChange = (e) => setText(e.target.value);
  const handleDifficultyChange = (e) => setDifficulty(parseInt(e.target.value, 10));
  const handleStructureChange = (e) => setStructure(parseInt(e.target.value, 10));
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFocus = () => setIsFocused(true);

const getCourseFullNameAndCode = (course) => {
    const courseNameMatch = course.match(/-(.*?)-/);  // Matches the course name
    const courseCodeMatch = course.match(/([A-Z]+)\s+(\d+)/);  // Matches the course code (E.g. MATH 113)

    if (courseNameMatch && courseCodeMatch) {
        const courseName = courseNameMatch[1].trim();  // Extract the course name
        const courseCode = courseCodeMatch[0].trim();  // Extract the course code
        return `${courseName} - ${courseCode}`;
    }
    return course; // Return the original course string as a fallback
};

const getFullCourseDisplay = (course) => {
    const courseName = getCourseName(course);
    const courseCode = getCourseDisplay(course);
    return `${courseCode} - ${courseName}`;
};

const handleCourseSelect = (course) => {
    const selectedCourse = getFullCourseDisplay(course);
    setSearchQuery(selectedCourse);
    setIsFocused(false);
};

  const handleSubmit = () => {
    console.log('Course:', searchQuery);
    console.log('Comments:', comments);
    console.log('Difficulty:', difficulty);
  };

  const getCourseDisplay = (course) => {
    const match = course.match(/([A-Z]+)\s+(\d+)/);
    if (match) {
      return `${match[1]} ${match[2]}`;
    }
    return course;
  };

  const getCourseName = (course) => {
      const match = course.match(/^(.*?)\s*-\s*[A-Z]+\s+\d+/);
      return match ? match[1].trim() : null;
  };


  return (
    <div className="container">
        <div className="green-block"></div>
         <div className="yellow-line"></div>
      <div className ="forum-header">Course Review</div>
      <div ref={inputRef} className="dropdown-container">
        <input
        className="dropdown-placeholder"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleFocus}
          placeholder="Search by course number..."
        />
        {isFocused && filteredCourses.length > 0 && (
          <div className="dropdown-list">
            {filteredCourses.map(course => (
              <div key={course} onClick={() => handleCourseSelect(course)} className="dropdown-item">
                {getCourseDisplay(course)}
              </div>
            ))}
          </div>
        )}
      </div>
      <textarea
        value={comments}
        onChange={handleTextChange}
        placeholder="Write your course review (max 500 characters)"
        rows="6"
        maxLength="500"
      />
      <div>
        <div className="diff-header">Difficulty:</div>
        <select className = "diff-dropdown" value={difficulty} onChange={handleDifficultyChange}>
          <option value={1}>1 (Easiest)</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5 (Hardest)</option>
        </select>
      </div>
      <div>
        <div className="structure-header">Course Structure:</div>
           <select className = "structure-dropdown" value={structure} onChange={handleStructureChange}>
                <option value={1}>Test Heavy</option>
                <option value={2}>Project Heavy</option>
              </select>
            </div>
      <button className = "forum-submit-button" onClick={handleSubmit}>Submit</button>
    <div className="forum-logo-container" />
    </div>

  );
};

export default Forum;
