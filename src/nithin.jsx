// import React, { useState, useEffect } from 'react';

// const ExampleComponent = () => {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // This function will run after every render
//     console.log('Effect ran');
//   });

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// };

// export default ExampleComponent;


import React, { useRef } from 'react';

const ExampleComponent = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

export default ExampleComponent;
