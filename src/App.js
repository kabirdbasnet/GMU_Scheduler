import React from 'react';
import BlockLine from './/PageComponents/HomePage';  // Import the BlockLine component

const App = ({ title }) => (
  <div className="app-container">
    <BlockLine />      {/* Include the BlockLine component below the title */}
  </div>
);

export default App;