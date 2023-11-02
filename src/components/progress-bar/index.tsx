import { Progress } from 'antd';

import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';

const conicColors = { '0%': '#303030', '50%': '#808080', '100%': '#59CFDF' };

const ProgressBarWrapper = styled(Progress)`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(35, 47, 106, 0.2);
  backdrop-filter: blur(8px);

  .ant-progress-inner {
    left: 45%;
    top: 35%;
  }
`;

type CallbackFunction = () => void;

const useInterval = (callback: CallbackFunction, delay: number) => {
  const savedCallback = useRef<CallbackFunction | null>(null);
  const intervalId = useRef<number | null>(null);

  const clear = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null; // Set it to null after clearing
    }
  };

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    intervalId.current = setInterval(tick, delay) as unknown as number;

    return () => {
      clear();
    };
  }, [delay]);

  return clear;
};

export const ProgressBar = ({ isLoading }: { isLoading: boolean }) => {
  const [progress, setProgress] = useState(0);

  const [delay, setDelay] = useState(499);

  useEffect(() => {
    if (progress === 10) {
      setDelay(200);
    } else if (progress === 20) {
      setDelay(400);
    } else if (progress === 30) {
      setDelay(800);
    } else if (progress === 40) {
      setDelay(1000);
    } else if (progress === 50) {
      setDelay(2000);
    }
  }, [progress]);

  const stopInterval = useInterval(() => {
    setProgress(1);
    if (progress > 100) {
      stopInterval();

      setTimeout(() => {
        setProgress(-1);
      }, 2000);
    } else {
      setProgress(progress + 1);
    }
  }, delay);

  useEffect(() => {
    if (!isLoading) {
      setDelay(100);
      stopInterval();
      setProgress(-1);
    }
  }, [isLoading, stopInterval]);

  return progress !== -1 ? (
    <ProgressBarWrapper type="circle" percent={progress} strokeColor={progress < 100 ? conicColors : undefined} />
  ) : (
    <></>
  );
};
