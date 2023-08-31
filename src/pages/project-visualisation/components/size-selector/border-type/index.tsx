import { useCallback, useState } from 'react';
import { Form } from 'antd';
import { ReactComponent as Solid } from '../../icons/solid.svg';
import { ReactComponent as Dashed } from '../../icons/dashed.svg';
import { StyledButton, StyledButtonsWrapper, StyledWrapper, StyledSpan } from '../styles';

type BorderTypeProps = {
  onTypeChange?: (type: 'solid' | 'dashed') => void;
  fieldName: number | string;
};

export const BorderType = ({ onTypeChange, fieldName }: BorderTypeProps) => {
  const form = Form.useFormInstance();
  const [borderDashed, setBorderDashed] = useState<boolean>(false);

  const setValue = useCallback(
    (borderDashed: boolean) => {
      form.setFieldValue(['queries', fieldName, 'borderDashed'], borderDashed);
      setBorderDashed(borderDashed);
    },
    [form, fieldName]
  );

  const handleSolidClick = () => {
    setValue(false);
  };

  const handleDashedClick = () => {
    setValue(true);
  };

  return (
    <StyledButtonsWrapper>
      <StyledButton onClick={handleSolidClick} isActive={!borderDashed}>
        <StyledWrapper>
          <Solid />
          <StyledSpan>Solid</StyledSpan>
        </StyledWrapper>
      </StyledButton>
      <StyledButton onClick={handleDashedClick} isActive={borderDashed}>
        <StyledWrapper>
          <Dashed />
          <StyledSpan>Dashed</StyledSpan>
        </StyledWrapper>
      </StyledButton>
    </StyledButtonsWrapper>
  );
};
