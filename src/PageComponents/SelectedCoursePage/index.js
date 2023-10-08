import React, { useState, useEffect } from 'react';
import './style.css';
import { coursesData } from './../../Constants/CourseListConstants.js';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const SelectedCoursePage = () => {
    const location = useLocation();
    const unselectedCourses = location.state ? location.state.unselectedCourses : [];
    const [totalUnselectedCredits, setTotalUnselectedCredits] = useState(0);
    const [coursesToTake, setCoursesToTake] = useState([]);

    const navigate = useNavigate();

    const parseCourse = (courseStr) => {
        const courseNameMatch = courseStr.match(/^(.*?) - /);
        const courseName = courseNameMatch ? courseNameMatch[1].trim() : courseStr.split('(')[0].trim();
        const courseNumberMatch = courseStr.match(/- (.*?)\(/);
        const courseNumber = courseNumberMatch ? courseNumberMatch[1].trim() : "";
        const credits = courseStr.match(/\((\d+)\)/)[1];
        return { courseName, courseNumber, credits };
    };

    useEffect(() => {
        let creditsSum = 0;
        Object.entries(coursesData).forEach(([section, courses]) => {
            courses.forEach(course => {
                const parsedCourse = parseCourse(course);
                if (unselectedCourses.includes(course)) {
                    creditsSum += Number(parsedCourse.credits);
                }
            });
        });
        setTotalUnselectedCredits(creditsSum);
    }, [unselectedCourses]);

    const handleCheckboxChange = (course) => {
        if (coursesToTake.includes(course)) {
            setCoursesToTake(prev => prev.filter(c => c !== course));
        } else {
            setCoursesToTake(prev => [...prev, course]);
        }
    };

    const handleSubmit = () => {
        navigate('/evaluationPage', { state: { coursesToTake } });
    };

    return (
        <div className="container">
            <div className="green-block"></div>
            <div className="yellow-line"></div>

            <table className="table-with-shadow" style={{ margin: '0 auto', width: '80%', borderSpacing: '0 10px' }}>
                <thead>
                    <tr>
                        <th colSpan="4">
                            <h1>Computer Engineering ({totalUnselectedCredits} Credits Left)</h1>
                            <p>Please choose the classes you plan to take next semester for a schedule rating 👩‍💻:</p>
                        </th>
                    </tr>
                    <tr>
                        <th>Course Name</th>
                        <th>Course Number</th>
                        <th>Credits</th>
                        <th>Select</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(coursesData).map(([section, courses]) => (
                        <React.Fragment key={section}>
                            {courses.map(course => {
                                const parsedCourse = parseCourse(course);
                                if (unselectedCourses.includes(course)) {
                                    return (
                                        <tr key={course}>
                                            <td>{parsedCourse.courseName}</td>
                                            <td>{parsedCourse.courseNumber}</td>
                                            <td>{parsedCourse.credits}</td>
                                            <td>
                                                <label className="custom-checkbox">
                                                    <input 
                                                        type="checkbox"
                                                        onChange={() => handleCheckboxChange(course)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    );
                                }
                                return null;
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
        </div>
    );
};

export default SelectedCoursePage;
