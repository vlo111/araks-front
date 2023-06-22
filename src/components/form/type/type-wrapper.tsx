import { MinusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;

  .dynamic-delete-button {
    position: absolute;
    right: -30px;
    top: 10px;
  }
`;

type Props = {
  children?: React.ReactNode;
  fieldLength: number;
  field: {
    name: number;
  };
  onRemove: () => void;
  startToRempove?: number;
};

export const TypeWrapper = ({ children, fieldLength, field, onRemove, startToRempove = 1 }: Props) => {
  return (
    <Wrapper>
      {children}
      {fieldLength > startToRempove && field.name >= startToRempove ? (
        <MinusCircleOutlined className="dynamic-delete-button" onClick={onRemove} />
      ) : null}
    </Wrapper>
  );
};
