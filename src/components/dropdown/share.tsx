import { SelectProps, Select } from "antd"
import styled from "styled-components"
import { CaretDownFilled } from '@ant-design/icons';

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from "../typography";
import { COLORS } from "../../helpers/constants";
import { useSort } from "../../context/sort-context";

import { SHARE_OPTIONS } from "./constants";

const ShareSelect = styled(Select)`
    
    && {
      .ant-select-selector {
        background-color: #EDEDF3;
       
        
      }
    }
    

    .ant-select-item-option-content {
      font-size: 16px;

    }
`;

type Props = {
  handleOnChange?: () => void
}

export const Share = ({ handleOnChange }: Props) => {
  return <ShareSelect
    defaultValue={SHARE_OPTIONS[0]}
    style={{ width: 120 }}
    onChange={handleOnChange}
    options={SHARE_OPTIONS}
    suffixIcon={<CaretDownFilled />}
  />;
}