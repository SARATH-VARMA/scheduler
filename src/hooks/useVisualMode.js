import { useState } from 'react';
// Keeps track of the current view mode of appointment as well as a history of modes
export default function useVisualMode(initial) {
// Sets states
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
// Transitions to new mode
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory(prev => ([...prev.slice(0, prev.length - 1), newMode]));
    } else {
      setHistory(prev => ([...prev, newMode]));
    }
  }
  // Go back to previous mode in history 
  function back() { 
  // Checks if history has atleast two items
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => ([...prev.slice(0, prev.length - 1)]));
    }   
  }
  return {
    mode,
    transition,
    back
  };
}; 