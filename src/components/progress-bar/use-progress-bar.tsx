/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useProgressBar = (start: boolean, stop: boolean) => {
  const [percent, setPercent] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [intervalContinue, setIntervalContinue] = useState<NodeJS.Timeout | null>(null);

  const startInterval = (time: number) =>
    setInterval(() => {
      setPercent((prev) => prev + 1);
    }, time);

  const clearAndRestartInterval = (time: number) => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(startInterval(time));
    }
  };

  useEffect(() => {
    if (start) {
      setIntervalId(startInterval(1000));
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalContinue(startInterval(20));
      }
    }
  }, [start]);

  useEffect(() => {
    if (intervalId) {
      if (percent === 1) document.body.style.overflow = 'hidden';
      if (percent === 10) clearAndRestartInterval(500);
      if (percent === 20) clearAndRestartInterval(1000);
      if (percent === 80) clearAndRestartInterval(5000);
      if (percent === 90) clearAndRestartInterval(15000);
      if (percent === 95) clearAndRestartInterval(90000);
    }

    if (percent === 150) {
      intervalContinue && clearInterval(intervalContinue);
      setPercent(0);
      document.body.style.overflow = 'auto';
    }
  }, [percent]);

  useEffect(() => {
    if (stop) {
      intervalId && clearInterval(intervalId);
      intervalContinue && clearInterval(intervalContinue);

      document.body.style.overflow = 'auto';
    }
  }, [stop]);

  return { percent, close: stop || percent === 149 || percent === 0 };
};
