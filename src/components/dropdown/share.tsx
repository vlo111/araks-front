import { SelectProps, Select } from "antd"
import styled from "styled-components"
import { CaretDownFilled } from '@ant-design/icons';

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text, textStyles } from "../typography";
import { COLORS } from "../../helpers/constants";

import './share.css';

import { SHARE_OPTIONS } from "./constants";

const ShareSelect = styled(Select)`
    
    && {
      .ant-select-selector {
        background-color: #EDEDF3;
        

        .ant-select-selection-item {
          ${ textStyles }
          padding: 3px 16px;
        }
       
        &:active {
          box-shadow: none
        }
      }

      &&.ant-select-focused .ant-select-selector {
        box-shadow: none
      }
    }
`;

type Props = {
  handleOnChange?: () => void,
  defaultValue?: string
}
export const Share = ({ handleOnChange, defaultValue }: Props) => {
  const list = defaultValue === SHARE_OPTIONS[2].value ? SHARE_OPTIONS : SHARE_OPTIONS.slice(0, -1);
  return <ShareSelect
    value={defaultValue || list[0]}
    disabled={defaultValue === SHARE_OPTIONS[2].value}
    popupClassName='share-dropdown'
    style={{ width: 156 }}
    onChange={handleOnChange}
    options={list}
    suffixIcon={<CaretDownFilled />}
  />;
}