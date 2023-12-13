import React, { useState } from 'react';

const Counter = () => {
  // 1. Initialize State
  const [count, setCount] = useState(0);

  // 4. Implement Functionality
  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    // 5. Ensure Non-Negative Value
    if (count > 0) {
      setCount(count - 1);
    }
  };

  // 2. Display Value
  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <p style={{ fontSize: '24px' }}>Count: {count}</p>

      {/* 3. Increment and Decrement Buttons */}
      <button
        style={{
          fontSize: '18px',
          padding: '8px 16px',
          marginRight: '8px',
          cursor: 'pointer',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
        onClick={increment}
      >
        Increment
      </button>
      <button
        style={{
          fontSize: '18px',
          padding: '8px 16px',
          cursor: 'pointer',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
        onClick={decrement}
      >
        Decrement
      </button>
    </div>
  );
};

// 6. Testing: Render the Counter component in the main App component
const App = () => {
  return (
    <div>
      <Counter />
    </div>
  );
};

export default App;
