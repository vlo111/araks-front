import { SearchOutlined } from '@ant-design/icons';

import { Input } from '.';
import styled from 'styled-components';
import './expandable-input.css';
import { COLORS } from 'helpers/constants';
import debounce from 'lodash.debounce';

const StyleInput = styled(Input)`
  &.ant-input-affix-wrapper {
    /* padding-left: 0px; */
    background: ${COLORS.PRIMARY.WHITE};
  }
  ::placeholder {
    color: ${COLORS.PRIMARY.GRAY};
  }
`;

type Props = {
  setSearchText: (text: string) => void;
};

export const ExpandableInput = ({ setSearchText }: Props) => {
  const handleSearch = (value: string) => {
    setSearchText(value); // update the input value
  };

  const handlePrefixClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <StyleInput
        prefix={<SearchOutlined onClick={handlePrefixClick} style={{ color: COLORS.PRIMARY.GRAY }} />}
        placeholder="search"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
};
