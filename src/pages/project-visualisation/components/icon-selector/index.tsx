import  { useCallback,useState } from "react";
import { Form } from "antd";
import { icons } from '../icons';
import { StyledText, StyledIconsWrapper, StyledIcon, StyledDiv} from "./styles";

type Props = {
  fieldName: number | string;
};
export const IconSelector = ({  fieldName }: Props) => {
  const form = Form.useFormInstance();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const setValue = useCallback(
    (icon: string) => {
      form.setFieldValue(["queries", fieldName, "icon"], icon);
      setSelectedIcon(icon)
    },
    [form, fieldName]
  );


  return (
    <>
      <StyledText>Select Icon</StyledText>
      <StyledIconsWrapper>
        {icons.map((item) => (
          <StyledDiv key={item.key} isSelected={selectedIcon === item.src}>
            <StyledIcon key={item.key} onClick={() => setValue(item.src)}>
              <img src={item.src} alt={item.src} />
            </StyledIcon>
          </StyledDiv>
        ))}
      </StyledIconsWrapper>
    </>
  );
};
