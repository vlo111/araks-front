import { useCallback, useState } from 'react';
import { Form } from 'antd';
import { StyledSizeWrapper, StyledBorderOption, StyledBorder, StyledDiv, StyledNumber, StyledSize } from './styles';

type SizeType = number;

type Props = {
  initialSize: SizeType;
  fieldName: number | string;
};
export const BorderSizeComponent = ({ initialSize, fieldName }: Props) => {
  const form = Form.useFormInstance();
  const borderSizes = [2, 4, 6, 8, 10];
  const [size, setSize] = useState(initialSize || 6);

  const setValue = useCallback(
    (size: number) => {
      form.setFieldValue(['queries', fieldName, 'borderSize'], size);
      setSize(size);
    },
    [form, fieldName]
  );

  return (
    <StyledSizeWrapper>
      <StyledSize>Select Size</StyledSize>
      <StyledBorderOption>
        {borderSizes.map((item) => (
          <StyledDiv key={item} onClick={() => setValue(item)}>
            <StyledBorder isSelected={size === item} size={item} />
            <StyledNumber>{item}</StyledNumber>
          </StyledDiv>
        ))}
      </StyledBorderOption>
    </StyledSizeWrapper>
  );
};
