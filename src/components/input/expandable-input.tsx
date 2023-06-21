import { useState } from 'react';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// import { CSSTransition } from 'react-transition-group';

import { Input } from '.';
import styled from 'styled-components';
import './expandable-input.css';
import { COLORS } from 'helpers/constants';
import debounce from 'lodash.debounce';

const StyleInput = styled(Input)`
  .ant-input-affix-wrapper {
    padding-left: 0px;
  }
  ::placeholder {
    color: ${COLORS.PRIMARY.GRAY};
  }
`;
const StyleButton = styled(Button)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);

  &&:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%);
    box-shadow: 0px 10px 10px rgba(141, 143, 166, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

type Props = {
  setSearchText: (text: string) => void;
};

export const ExpandableInput = ({ setSearchText }: Props) => {
  const [open, setOpen] = useState(false); // state to control the open state of autocomplete

  const handleSearch = (value: string) => {
    setSearchText(value); // update the input value
    // do some other logic here
  };

  const handleClick = () => {
    setOpen(true); // open the autocomplete when button is clicked
  };

  const handleClose = () => {
    setOpen(false); // close the autocomplete when input is blurred
  };

  const handlePrefixClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    handleClose();
  };

  const debouncedSearch = debounce(handleSearch, 300);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <CSSTransition in={true} timeout={500} classNames="my-node" unmountOnExit>
      <AutoComplete
        style={{ display: open ? 'block' : 'none' }} // set width to 0 when closed
        value={value} // controlled input value
        options={options} // options for autocomplete
        onSearch={handleSearch} // handle search event
        onSelect={handleSelect} // handle select event
        onBlur={handleClose} // handle blur event
      > */}
      <StyleInput
        prefix={<SearchOutlined onClick={handlePrefixClick} style={{ color: COLORS.PRIMARY.GRAY }} />}
        style={{ display: open ? '' : 'none' }}
        placeholder="search"
        onChange={(e) => debouncedSearch(e.target.value)}
      />
      {/* </AutoComplete> */}
      {/* </CSSTransition> */}
      {!open && <StyleButton icon={<SearchOutlined style={{ color: COLORS.PRIMARY.GRAY }} />} onClick={handleClick} />}
    </div>
  );
};
