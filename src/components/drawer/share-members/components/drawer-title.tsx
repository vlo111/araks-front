import { FC } from 'react';
import { Button } from 'antd';
import { ReactComponent as CaretLeftSvg } from 'components/icons/carret-left.svg';
import { Search } from '../../../search';
import styled from 'styled-components';

interface DrawerTitleProps {
  onClose: () => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DrawerTitle: FC<DrawerTitleProps> = ({ onClose }) => {
  return (
    <Wrapper>
      <div>
        <Button
          block
          style={{ display: 'flex', alignItems: 'center', background: 'transparent' }}
          icon={<CaretLeftSvg />}
          type="text"
          onClick={onClose}
        >
          Back
        </Button>
      </div>
      <div>
        <Search />
      </div>
    </Wrapper>
  );
};
