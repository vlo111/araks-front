import { Select as SelectComponent } from 'antd';
import { COLORS } from 'helpers/constants';
import { changeHeight, placeholderSize } from 'helpers/styles';
import styled, { css } from 'styled-components';

export const Select = styled(SelectComponent)`
    &&{
        .ant-select-selector {
            background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);            
            border: 1px solid ${COLORS.PRIMARY.GRAY};
            padding: 3px 11px;
            
            ${props => !props.size ? css` 
                ${changeHeight} 
            ` : ''}

            input.ant-select-selection-search-input {
                ${props => !props.size ? css`
                    ${changeHeight}
                ` : ''}
            }

            .ant-select-selection-placeholder {
                ${placeholderSize}
            }
        }
    }
`;

export { TreeSelect } from './tree-select';