import { useState } from 'react';
import {
  StyledSizeWrapper,
  StyledSize,
  StyledCircleOptions,
  StyledCircleOption,
  StyledCircle,
  StyledNumber,
} from './styles';

type SizeType = number | null;

export const SizeComponent = () => {
  const circleSizes = [10, 20, 30, 40, 50, 60, 70];
  const [selectedSize, setSelectedSize] = useState<SizeType>(30);

  const handleSizeChange = (size: number) => {
    setSelectedSize(size);
  };

  return (
    <StyledSizeWrapper>
      <StyledSize>Size</StyledSize>
      <StyledCircleOptions>
        {circleSizes.map((size) => (
          <StyledCircleOption key={size} onClick={() => handleSizeChange(size)}>
            <StyledCircle
              isSelected={selectedSize === size}
              size={size}
            />
            <StyledNumber>{size}</StyledNumber>
          </StyledCircleOption>
        ))}
      </StyledCircleOptions>
    </StyledSizeWrapper>
  );
};
