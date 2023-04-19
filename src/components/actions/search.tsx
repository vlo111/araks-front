import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'components/input';
import styled from 'styled-components';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';

export enum SearchPostionTypes {
  left = 'left',
  right = 'right',
}

type Props = {
  isSearchActive: boolean;
  setSearchActive: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

export const SearchIcon = styled(({ setSearchActive }: Pick<Props, 'setSearchActive'>) => (
  <SearchOutlined className="search-btn" onClick={() => setSearchActive(true)} />
))`
  &.search-btn {
    cursor: pointer;
    font-size: 18px;
    color: #c3c3c3;
    transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: 2;
  }
`;

const Wrapper = styled.div`
  padding: 0 24px 24px;
  display: flex;
  justify-content: space-between;
`;

export const SearchAction = ({ isSearchActive, setSearchActive }: Props) => {
  const { searchTextFilter, searchTextClear } = useDataSheetWrapper();

  return (
    <Wrapper className={`search-box ${isSearchActive ? 'active' : ''}`} style={{ width: '100%' }}>
      <Input
        placeholder="search"
        style={{ width: '90%' }}
        size="small"
        onChange={(e) => {
          if (e.target.value.length > 2) {
            searchTextFilter(e.target.value);
            return;
          }
          searchTextClear();
        }}
      />
      <CloseOutlined
        className="cancel-btn"
        onClick={() => {
          setSearchActive(false);
          searchTextClear();
        }}
      />
    </Wrapper>
  );
};
