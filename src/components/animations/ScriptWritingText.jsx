import { useEffect, useRef, useState } from 'react';

// Add this new component for the writing animation with script font
export default function ScriptWritingText({
  text,
  className = '',
  speed = 35,
  delay = 200,
  onComplete,
  autoStart = false,
}) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Keep the latest callback without making the typing effect restart
  // whenever the parent re-renders.
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!autoStart) return;

    let charIndex = 0;
    let intervalId = null;

    // Reset immediately so each auto-start begins with the same typing state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayText('');
    setIsComplete(false);

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setDisplayText(text.slice(0, charIndex));

        if (charIndex >= text.length) {
          clearInterval(intervalId);
          intervalId = null;
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, speed, delay, autoStart]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 400);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span
        className="inline-block w-[3px] h-[0.8em] bg-current ml-0.5 align-middle"
        style={{
          opacity: isComplete ? 0 : cursorVisible ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      />
    </span>
  );
}
