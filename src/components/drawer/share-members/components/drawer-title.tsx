import { FC } from 'react';
import { Button } from 'antd';
import { ReactComponent as CaretLeftSvg } from 'components/icons/carret-left.svg';
import styled from 'styled-components';
import { SearchUsers } from './search-users';

interface DrawerTitleProps {
  onClose: () => void;
  search: string | undefined;
  setSearch: (value: string) => void;
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DrawerTitle: FC<DrawerTitleProps> = ({ onClose, setSearch, search }) => {
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
        <SearchUsers setSearch={setSearch} search={search} />
      </div>
    </Wrapper>
  );
};
