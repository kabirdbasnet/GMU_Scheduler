import React from 'react';
import { MajorProvider } from './/UserContexts/MajorContext';  // Ensure correct path here
import HomePage from './/PageComponents/HomePage';  // Or your main component

const App = () => {

    return (
        <MajorProvider>
            <HomePage />
        </MajorProvider>
    );
}

export default App;