import { useCallback, useState } from 'react';
import { Form } from 'antd';
import {
  StyledSizeWrapper,
  StyledSize,
  StyledCircleOptions,
  StyledCircleOption,
  StyledCircle,
  StyledNumber,
} from './styles';

type SizeType = number;

type Props = {
  initialSize: SizeType;
  fieldName: number | string;
};
export const CircleSizeComponent = ({ initialSize, fieldName }: Props) => {
  const form = Form.useFormInstance();
  const circleSizes = [20, 40, 60, 80, 100];
  const [size, setSize] = useState(initialSize || 40);

  const setValue = useCallback(
    (size: number) => {
      form.setFieldValue(['queries', fieldName, 'size'], size);
      setSize(size);
    },
    [form, fieldName]
  );

  return (
    <StyledSizeWrapper>
      <StyledSize>Size</StyledSize>
      <StyledCircleOptions>
        {circleSizes.map((item) => (
          <StyledCircleOption key={item} onClick={() => setValue(item)}>
            <StyledCircle isSelected={size === item} size={item} />
            <StyledNumber>{item}</StyledNumber>
          </StyledCircleOption>
        ))}
      </StyledCircleOptions>
    </StyledSizeWrapper>
  );
};
