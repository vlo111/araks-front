import { useEffect, useState } from 'react';

export const useProgressBar = (isLoading: boolean, isFinished: VoidFunction) => {
  const [percent, setPercent] = useState<number>(0);
  const [intervalTime, setIntervalTime] = useState<number>(1000);
  const [isLoadingChanges, setIsLoadingChanges] = useState<number>(0);
  const [showProgress, setShowProgress] = useState<boolean>(true);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    const determineIntervalTime = (count: number) => {
      const intervals = [500, 200, 400, 800, 1000, 2000];
      return intervals[Math.min(Math.floor(count / 10), intervals.length - 1)];
    };

    if (isLoading) {
      setIsLoadingChanges(1);
      intervalId = setInterval(() => {
        setPercent((prevCount) => {
          const nextCount = prevCount + 1;
          const newIntervalTime = determineIntervalTime(nextCount);

          if (newIntervalTime !== intervalTime) {
            if (intervalId) clearInterval(intervalId);
            setIntervalTime(newIntervalTime);
          }

          return nextCount;
        });
      }, intervalTime);
    } else if (isLoadingChanges === 1) {
      intervalId = setInterval(() => {
        setPercent((prevCount) => {
          const nextCount = prevCount + 1;
          const newIntervalTime = 40;

          if (newIntervalTime !== intervalTime) {
            if (intervalId) clearInterval(intervalId);
            setIntervalTime(newIntervalTime);
          }

          return nextCount;
        });
      }, intervalTime);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading, intervalTime, isLoadingChanges]);

  useEffect(() => {
    if (percent >= 100) {
      setTimeout(() => {
        setShowProgress(false);
        isFinished();
      }, 1000);
    }
  }, [percent, isFinished]);

  return { showProgress, isLoadingChanges, percent };
};
