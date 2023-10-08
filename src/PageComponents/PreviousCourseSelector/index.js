import React, { useState } from 'react';
import './style.css';
import { coursesData } from './../../Constants/CourseListConstants.js';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const PreviousCourseSelector = () => {
  const parseCourse = (courseStr) => {
    const courseNameMatch = courseStr.match(/^(.*?) - /);
    const courseName = courseNameMatch ? courseNameMatch[1].trim() : courseStr.split('(')[0].trim();
    const courseNumberMatch = courseStr.match(/- (.*?)\(/);
    const courseNumber = courseNumberMatch ? courseNumberMatch[1].trim() : "";
    const credits = courseStr.match(/\((\d+)\)/)[1];
    return { courseName, courseNumber, credits };
};

const initialCourses = Object.entries(coursesData).flatMap(([section, courses]) =>
courses.map(course => course)
);
    const [unselectedCourses, setUnselectedCourses] = useState(initialCourses);

    const handleCheckboxChange = (event, course) => {
      if (event.target.checked) {
          setUnselectedCourses(prevCourses => prevCourses.filter(item => item !== course));
      } else {
          setUnselectedCourses(prevCourses => [...prevCourses, course]);
      }
  };

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/selectedCourse', { state: { unselectedCourses } });
    };

    return (
        <div className="prev-course-container">
            <div className="green-block"></div>
            <div className="yellow-line-table"></div>
            <form>
                <table className="table-with-shadow" style={{ margin: '0 auto', width: '80%', borderSpacing: '0 10px' }}>
                    <thead>
                        <tr>
                            <th colSpan="4">
                                <h1>Computer Engineering (126 Credits)</h1>
                                <p>Please choose the classes you have already taken</p>
                            </th>
                        </tr>
                        <tr>
                            <th>Course Name</th>
                            <th>Course Number</th>
                            <th>Credits</th>
                            <th>Taken?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(coursesData).map(([section, courses]) => (
                            <React.Fragment key={section}>
                                <tr className={section === "Mason Cores" || section === "Math Courses" || section === "Physics Courses" || section === "Engineering Courses" || section === "Computer Science Courses" || section === "Electrical and Computer Engineering" ? "section-header" : ""}>
                                    <td colSpan="5" style={{ fontWeight: 'bold' }}>{section}</td>
                                </tr>
                                {courses.map(course => {
                                    const parsedCourse = parseCourse(course);
                                    return (
                                        <tr key={course}>
                                            <td>{parsedCourse.courseName}</td>
                                            <td>{parsedCourse.courseNumber}</td>
                                            <td>{parsedCourse.credits}</td>
                                            <td>
                                                <label className="custom-checkbox">
                                                <input type="checkbox" name={course} onChange={(e) => handleCheckboxChange(e, course)} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button
                        type="button"
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            marginBottom: '20px',
                            backgroundColor: '#FFCC33',
                            color: '#006633',
                            border: '2px solid #006633',
                            fontWeight: 'bold',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)'
                        }}
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PreviousCourseSelector;