import { useState } from 'react';

function useInput(defaultValue = '') {
  const [input, setInput] = useState(defaultValue);
  const handler = e => setInput(e.target.value);
  return [input, handler];
}

export default useInput;
