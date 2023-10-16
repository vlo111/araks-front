import { FC } from 'react';
import styled from 'styled-components';
import { Search } from './search';

type Props = FC<{ collapsed?: boolean }>;

const ToolStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 8px;
  top: 176px;
  z-index: 1;
  transition: left 0.5s ease-in-out;

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

export const SearchData: Props = ({ collapsed }) => {
  return (
    <>
      <ToolStyle style={{ left: collapsed ? '490px' : '30px' }}>
        <Search collapsed={collapsed} />
      </ToolStyle>
    </>
  );
};
