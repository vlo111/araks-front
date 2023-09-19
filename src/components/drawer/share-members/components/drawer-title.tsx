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

  .stretch {
    border-radius: 4px;
    border: 1px solid #fff;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0px 10px 10px 0px rgba(141, 143, 166, 0.2);
    backdrop-filter: blur(7px);
  }
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
