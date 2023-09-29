import Lottie from 'react-lottie';
import animationData from './animation.json';
import { FC } from 'react';

type Props = FC<{ style?: { [key: string]: string }; className?: string }>;

export const Loading: Props = ({ style, className = '' }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  const options = {
    rendererSettings: { className },
    ...defaultOptions,
  };

  return <Lottie speed={3} isClickToPauseDisabled={true} options={options} style={style} />;
};
