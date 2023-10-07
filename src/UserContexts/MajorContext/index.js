import React, { createContext, useContext, useState } from 'react';

const MajorContext = createContext();

export const useMajor = () => {
    return useContext(MajorContext);
};

export const MajorProvider = ({ children }) => {
    const [selectedMajor, setSelectedMajor] = useState('');

    return (
        <MajorContext.Provider value={{ selectedMajor, setSelectedMajor }}>
            {children}
        </MajorContext.Provider>
    );
};
