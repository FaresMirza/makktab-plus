import { useState, useEffect } from "react";

/**
 * Custom hook for OTP timer functionality
 * @param {number} initialSeconds - Initial countdown time in seconds
 * @param {boolean} isActive - Whether the timer should be active
 * @returns {{ seconds: number, canResend: boolean, resetTimer: () => void, formatTimer: (seconds: number) => string }}
 */
export const useOtpTimer = (initialSeconds = 90, isActive = false) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (isActive && seconds > 0 && !canResend) {
      const interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, seconds, canResend]);

  const resetTimer = () => {
    setSeconds(initialSeconds);
    setCanResend(false);
  };

  const formatTimer = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return {
    seconds,
    canResend,
    resetTimer,
    formatTimer,
  };
};
