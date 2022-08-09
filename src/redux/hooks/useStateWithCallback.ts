import { useEffect, useRef, useState } from 'react';

const useStateWithCallback = (initialState: any) => {
  const [state, setState] = useState(initialState);
  const callbackRef = useRef(() => undefined);

  const setStateCB = (newState: any, callback: any) => {
    callbackRef.current = callback;
    setState(newState);
  };

  useEffect(() => {
    callbackRef.current?.();
  }, [state]);

  return [state, setStateCB];
};

export default useStateWithCallback;
