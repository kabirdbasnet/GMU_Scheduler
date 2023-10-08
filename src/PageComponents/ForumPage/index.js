import React, { useState, useEffect, useRef } from 'react';
import { coursesData } from './../../Constants/CourseListConstants.js';
import './style.css';
import { useCourse } from '../../UserContexts/CourseContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [comments, setText] = useState('');
  const [difficulty, setDifficulty] = useState(1);
  const [classStructure, setClassStructure] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseId, setCourseId] = useState('');
  const [currentCourse, setCurrentCourse] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
    const { courses } = useCourse();
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
    const handleClassStructureChange = (e) => setClassStructure(parseInt(e.target.value, 10));
  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFocus = () => setIsFocused(true);
  const [formData, setFormData] = useState({
        courseId: '', // Dummy Course ID
        courseName: '',
        comments: '',
        difficulty: 1,
        classStructure: 1
    });



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
    var courseName = getCourseName(course);
    var courseCode = getCourseDisplay(course);
    return `${courseCode} - ${courseName}`;
    };

  const handleCourseSelect = (course) => {
    var selectedCourse = getFullCourseDisplay(course);
    var courseId = getCourseDisplay(course);
    var courseName = getCourseName(course);
    setFormData(prev => ({ ...prev, courseName, courseId }));
    setCurrentCourse(selectedCourse);
    setCourseName(courseName);
    setText('');
    setCourseId(courseId);
    setSearchQuery(selectedCourse);
    setIsFocused(false);
    };

const handleSubmit = () => {
  // Create an object with the data to send to the backend
  const courseIdWithoutSpaces = courseId.replace(/\s+/g, '');
  const structureText = getStructureText(classStructure);
  const dataToSubmit = [{
    c_name: courseName,
    c_id: courseIdWithoutSpaces,
    difficulty: difficulty,
    comments: comments,
    classStructure: structureText
  }];
  console.log(dataToSubmit)
  console.log(classStructure);

  axios.post('http://localhost:5001/ECECourses/add', dataToSubmit)
      .then(response => {
      })
      .catch(error => {
          console.error(error); // Handle any errors here
      });
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
    const getStructureText = (value) => {
      switch (value) {
        case 1:
          return 'Test Heavy';
        case 2:
          return 'Project Heavy';
        case 3:
          return 'Both';
        default:
          return '';
      }
    };

   const displayCourseData = () => {
     if (!courseId)
     {
        return null; // No course selected, so return
     }

     // Filter comments based on the selected course
     const courseComments = courses.filter(course => course.c_id === courseId.replace(/\s+/g, ''));
     if (courseComments.length === 0) return null; // If no comments found, return

     return courseComments.map(courseData => (
       <div key={courseData.comments} className="individual-comment-container">
         <p className="comment-standard">{courseData.comments}</p>
         <p className="difficulty-standard">Difficulty: {courseData.difficulty}/5</p>
         <p className="structure-standard">Structure: {courseData.classStructure}</p>
         <div className="comment-separator"/>
       </div>
     ));
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
      <div className="current-course"> {currentCourse} </div>
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

        <div className="structure-header">Course Structure:</div>
           <select className = "structure-dropdown" value={classStructure} onChange={handleClassStructureChange}>
                <option value={0}>Select</option>
                <option value={1}>Test Heavy</option>
                <option value={2}>Project Heavy</option>
                <option value={3}>Both</option>
              </select>
            </div>
       <Link to={"/"}>
        <button className = "forum-submit-button" onClick={handleSubmit}>Submit</button>
      </Link>
    <div className="forum-logo-container" />
    <div className="vertical-line"></div>
    <div className = "comments-container">Comments</div>
    <div className = "course-data-display">
        {displayCourseData()}
    </div>
    </div>
  );
};

export default Forum;
