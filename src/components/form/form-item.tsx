import { Form } from "antd"
import styled from "styled-components"
import { COLORS } from "../../helpers/constants";
import { SecondaryText } from "../typography";

const { Item } = Form;


export const FormItem = styled(({label, ...props}) => <Item {...props} label={<SecondaryText style={{color: COLORS.PRIMARY.BLUE}}>{label}</SecondaryText>} />)`
    
`;