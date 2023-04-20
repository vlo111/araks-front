import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'components/input';
import styled from 'styled-components';
import { SearchActionProps } from './type';

const Wrapper = styled.div`
  padding: 0 24px 24px;
  display: flex;
  justify-content: space-between;
`;

export const SearchAction = ({ isSearchActive, setSearchActive, onChange, onClear }: SearchActionProps) => {
  return (
    <Wrapper className={`search-box ${isSearchActive ? 'active' : ''}`} style={{ width: '100%' }}>
      <Input placeholder="search" style={{ width: '90%' }} size="small" onChange={onChange} />
      <CloseOutlined
        className="cancel-btn"
        onClick={() => {
          onClear();
          setSearchActive(false);
        }}
      />
    </Wrapper>
  );
};
