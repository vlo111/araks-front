import { Input } from '.';
import styled, { css } from 'styled-components';
import './expandable-input.css';
import { COLORS } from 'helpers/constants';
import { changeHeight } from 'helpers/styles';
import { useState } from 'react';
import { Select } from 'components/select';

const StyleInput = styled(Input.Search)`
  .ant-input-affix-wrapper {
    padding: 4px 11px;
    background: ${COLORS.PRIMARY.WHITE};
    ${(props) =>
      !props.size
        ? css`
            ${changeHeight}
          `
        : ''}

    &:hover, &:focus, &-focused {
      border-right: none;
    }
  }
  ::placeholder {
    color: ${COLORS.PRIMARY.GRAY};
  }

  .ant-input-search-button {
    border: 1px solid;
    border-left: none;

    ${(props) =>
      !props.size
        ? css`
            ${changeHeight}
          `
        : ''}
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

  const selectAfter = (
    <Select
      defaultValue="node"
      popupMatchSelectWidth={150}
      dropdownStyle={{}}
      options={[
        { label: 'Node', value: 'node' },
        { label: 'Document', value: 'document' },
      ]}
      onSelect={(value) => {
        setType(value as string);
      }}
    />
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: COLORS.PRIMARY.WHITE }}>
      <StyleInput
        placeholder="search"
        addonBefore={selectAfter}
        onSearch={(value, e) => {
          setSearchText({ text: value, type });
        }}
        allowClear
      />
    </div>
  );
};
