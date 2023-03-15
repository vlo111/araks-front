import { TreeSelect as TreeSelectComponent } from 'antd';
import { COLORS } from 'helpers/constants';
import { useInputSize } from 'hooks/use-breakpoint';
import { TreeSelectProps } from 'rc-tree-select';
import styled from 'styled-components';

const TreeSelectStyled = styled(TreeSelectComponent)`
    &&{
        .ant-select-selector {
            background: linear-gradient(91.78deg, rgba(255, 255, 255, 0.64) 6.81%, rgba(255, 255, 255, 0.16) 100%);            border: 1px solid ${COLORS.PRIMARY.GRAY};
        }
    }
`;

export const TreeSelect = (props: TreeSelectProps) => {
    const size = useInputSize();
    return <TreeSelectStyled
        // size={size}
        showSearch
        style={{ width: '100%' }}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        {...props}
    />
}