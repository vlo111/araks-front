import { Dropdown as Component, Button, Space } from "antd"
import styled from "styled-components"

import { ReactComponent as SortIcon } from '../icons/sort.svg';
import { ReactComponent as Polygon } from '../icons/polygon.svg';
import { Text } from "../typography";
import { COLORS } from "../../helpers/constants";

const DropdownButton = styled(Button)`
    width: 232px;
    padding: 7px 16px;
    border: 1px solid #DEE1E8;
    background-color: #EDEDF3;
`;


const DropdownContent = () => <DropdownButton>
<Space align="center" style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Space>
        <SortIcon />
        <Text style={{ color: COLORS.PRIMARY.GRAY, marginLeft: '16px' }}>Custom</Text>
    </Space>
    <Polygon />
</Space>
</DropdownButton>;

export const Sort = styled((props) => <Component {...props} children={<DropdownContent />} />)`
    
`;