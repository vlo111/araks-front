import React from 'react';
import styled from 'styled-components';
import { Search } from './search';

const ToolStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  left: 490px;
  top: 176px;
  z-index: 1;

  > * {
    width: 40px;
    height: 40px;
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
  }

  .add-type,
  .add-link {
    cursor: pointer;

    &:hover {
      rect:first-child {
        fill: rgba(35, 47, 106, 0.8);
      }
    }
  }
`;

export const SearchData: React.FC = () => {
  return (
    <>
      <ToolStyle>
        <Search />
      </ToolStyle>
    </>
  );
};
