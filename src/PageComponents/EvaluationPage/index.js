import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './style.css';
import { Link } from 'react-router-dom';
import { useCourse } from '../../UserContexts/CourseContext';

const EvaluationPage = () => {
    const location = useLocation();
    const coursesToTake = location.state ? location.state.coursesToTake : [];
    const [totalSelectedCredits, setTotalSelectedCredits] = useState(0);
    const { courses } = useCourse();
    const parseCourse = (courseStr) => {
        const courseNameMatch = courseStr.match(/^(.*?) - /);
        const courseName = courseNameMatch ? courseNameMatch[1].trim() : courseStr.split('(')[0].trim();
        const courseNumberMatch = courseStr.match(/- (.*?)\(/);
        const courseNumber = courseNumberMatch ? courseNumberMatch[1].trim() : "";
        const credits = courseStr.match(/\((\d+)\)/)[1];
        return { courseName, courseNumber, credits };
    };
    const calculateAverageDifficulty = () => {
            let totalDifficulty = 0;
            coursesToTake.forEach(course => {
                const parsedCourse = parseCourse(course);
                const matchingCourses = courses.filter(c => c.c_id === parsedCourse.courseNumber.replace(/\s+/g, ''));
                if (matchingCourses.length > 0) {
                    const difficultySum = matchingCourses.reduce((sum, c) => sum + c.difficulty, 0);
                    totalDifficulty += difficultySum / matchingCourses.length;
                }
            });
            return coursesToTake.length > 0 ? (totalDifficulty / coursesToTake.length).toFixed(1) : 'N/A';
        };

        const calculateAverageEachCourse = (courseNumber) => {
            const matchingCourses = courses.filter(c => c.c_id.replace(/\s+/g, '') === courseNumber);
            if (matchingCourses.length === 0) {
                return 'N/A'; // No matching courses found
            }

            // Calculate the average difficulty for the matching courses
            const totalDifficulty = matchingCourses.reduce((total, course) => total + course.difficulty, 0);
            const averageDifficulty = totalDifficulty / matchingCourses.length;
            return averageDifficulty.toFixed(2); // Display with two decimal places
        };


        const calculateDifficultyMessage = (difficulty) => {

            if (difficulty >= 0 && difficulty <= 2) {
                return 'This schedule is really easy, you could challenge yourself.';
            }
            if (difficulty > 2 && difficulty <= 3) {
                return 'This schedule is easy, you could challenge a little further.';
            }
            if (difficulty > 3 && difficulty <= 3.5) {
                return 'This schedule is average, you should keep your schedule at this level.';
            }
            if (difficulty > 3.5 && difficulty <= 4.5) {
                return 'This schedule is challenging. Try to keep it at this level depending on if the class structure is your preference.';
            }
            if (difficulty > 4.5 && difficulty <= 4.9) {
                return 'This schedule is really challenging, Try to swap out a class or two.';
            }
            if (difficulty ==5) {
                return 'This schedule is really impossible, Try to swap multiple classes.';
            }
            return null;
        };

        const courseNumberGroups = coursesToTake.reduce((groups, course) => {
                const parsedCourse = parseCourse(course);
                const courseNumber = parsedCourse.courseNumber;

                if (!groups[courseNumber]) {
                    groups[courseNumber] = {
                        courseName: parsedCourse.courseName,
                        credits: parsedCourse.credits,
                        averageDifficulty: calculateAverageDifficulty(courseNumber),
                    };
                }

                return groups;
            }, {});

    useEffect(() => {
        let creditsSum = 0;
        coursesToTake.forEach(course => {
            const parsedCourse = parseCourse(course);
            creditsSum += Number(parsedCourse.credits);
        });
        setTotalSelectedCredits(creditsSum);
    }, [coursesToTake]);

    return (
        <div className="eval-page-container">
            <div className="green-block"></div>
            <div className="yellow-line"></div>

            <table className="table-with-shadow" style={{ margin: '0 auto', width: '80%', borderSpacing: '0 10px' }}>
                <thead>
                    <tr>
                        <th colSpan="4">
                            <h1>Next Semester Courses 🤖 ({totalSelectedCredits} Credits) </h1>
                            <p>These are the courses you've chosen for the next semester:</p>
                        </th>
                    </tr>
                    <tr>
                        <th>Course Name</th>
                        <th>Course Number</th>
                        <th>Credits</th>
                        <th>Average Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {coursesToTake.map(course => {
                        const parsedCourse = parseCourse(course);
                        const averageDifficulty = calculateAverageEachCourse(parsedCourse.courseNumber.replace(/\s+/g, ''));
                        const tags = "Easy, Popular";
                        return (
                            <tr key={course}>
                                <td>{parsedCourse.courseName}</td>
                                <td>{parsedCourse.courseNumber}</td>
                                <td>{parsedCourse.credits}</td>
                                <td>{averageDifficulty}</td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
    <tr style={{ backgroundColor: '#FFCC33' }}>
        <td colSpan="2"></td>
        <td></td>
        <td>Rating: {calculateAverageDifficulty()}</td>
    </tr>
    <tr style={{ backgroundColor: '#d5e9e1' }}>
        <td colSpan="4" className={"rater-type"}>{
            calculateDifficultyMessage(calculateAverageDifficulty())
        }</td>
    </tr>
</tfoot>
            </table>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link to="/">
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
                >
                    Go back to beginning
                </button>
                </Link>
            </div>
        </div>
    );
};

export default EvaluationPage;
