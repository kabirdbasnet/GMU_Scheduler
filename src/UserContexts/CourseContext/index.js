// UserContexts/CourseContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/ECECourses')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Failed to fetch courses:", error));
    }, []);

    return (
        <CourseContext.Provider value={{ courses, setCourses }}>
            {children}
        </CourseContext.Provider>
    );
}

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourse must be used within a CourseProvider');
    }
    return context;
}
