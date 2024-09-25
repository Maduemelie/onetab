import { useRef } from 'react';

const NameInputPage = ({ setName }) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    const name = inputRef.current.value;
    if (name.trim()) {
      localStorage.setItem('userName', name);
      setName(name);
    }
  };

  return (
    <div>
      <h1>Enter Your Name</h1>
      <input
        type="text"
        ref={inputRef}
        placeholder="Enter your name"
        required
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NameInputPage;
