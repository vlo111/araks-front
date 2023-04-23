import { SearchOutlined } from '@ant-design/icons';
import { SearchActionProps } from 'components/actions/type';
import styled from 'styled-components';

export const SearchIcon = styled(({ setSearchActive }: Pick<SearchActionProps, 'setSearchActive'>) => (
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
