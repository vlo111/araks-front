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
};

export const TypeWrapper = ({ children, fieldLength, field, onRemove }: Props) => {
  return (
    <Wrapper>
      {children}
      {fieldLength > 1 && field.name >= 1 ? (
        <MinusCircleOutlined className="dynamic-delete-button" onClick={onRemove} />
      ) : null}
    </Wrapper>
  );
};
