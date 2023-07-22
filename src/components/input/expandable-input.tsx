import { SearchOutlined } from '@ant-design/icons';

import { Input } from '.';
import styled, { css } from 'styled-components';
import './expandable-input.css';
import { COLORS } from 'helpers/constants';
import debounce from 'lodash.debounce';
import { changeHeight } from 'helpers/styles';
import { Select } from 'antd';
import { useState } from 'react';

const StyleInput = styled(Input)`
  .ant-input-affix-wrapper {
    /* padding-left: 0px; */
    background: ${COLORS.PRIMARY.WHITE};
    ${(props) =>
      !props.size
        ? css`
            ${changeHeight}
          `
        : ''}
  }
  ::placeholder {
    color: ${COLORS.PRIMARY.GRAY};
  }
`;

export type SearchText = {
  text: string;
  type: string;
};

type Props = {
  setSearchText: ({ text, type }: SearchText) => void;
};

export const ExpandableInput = ({ setSearchText }: Props) => {
  const [type, setType] = useState('node');
  const [text, setText] = useState('');
  const handleSearch = (value: string) => {
    setText(value); // update the input value
  };
  // eslint-disable-next-line no-console
  console.log('type, text', type, text);

  const handlePrefixClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSearchText({ text, type });
  };

  const debouncedSearch = debounce(handleSearch, 300);

  const selectAfter = (
    <Select
      defaultValue="node"
      popupMatchSelectWidth={150}
      dropdownStyle={{}}
      options={[
        { label: 'Node', value: 'node' },
        { label: 'Document', value: 'document' },
      ]}
      onSelect={(value: string) => {
        setType(value);
      }}
    />
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: COLORS.PRIMARY.WHITE }}>
      <StyleInput
        suffix={<SearchOutlined onClick={handlePrefixClick} style={{ color: COLORS.PRIMARY.GRAY }} />}
        placeholder="search"
        onChange={(e) => debouncedSearch(e.target.value)}
        // addonAfter={selectAfter}
        addonBefore={selectAfter}
      />
    </div>
  );
};
