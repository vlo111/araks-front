import { useState } from 'react';
import { Col, Radio as RadioComponent, Row } from 'antd';

import { Icon, iconsList } from 'components/icon';
import { Input } from 'components/input';
import { VerticalSpace } from 'components/space/vertical-space';
import styled from 'styled-components';
import { MenuText } from 'components/typography';
import { FormItem } from 'components/form/form-item';

const { Search } = Input;

const RadioGroup = styled(RadioComponent.Group)``;

const RadioButton = styled(RadioComponent.Button)`
  height: 30px;
  width: 30px;
  border: none;
  background-color: transparent;
  padding: 6px 5px;

  &&.ant-radio-button-wrapper {
    border: 1px solid #eaeaea;
  }

  &&.ant-radio-button-wrapper-checked {
    border: 1px solid #848aaa;

    &:hover,
    &:active {
      border: 1px solid #848aaa;
    }
  }
`;

const shuffled = iconsList.sort(() => 0.5 - Math.random());
const selected = shuffled.slice(0, 11);

export const SelectIcon = () => {
  const [icons, setIcons] = useState<string[]>(selected);

  const onSearch = (value: string) =>
    value.length >= 3 ? setIcons(iconsList.filter((item) => item.includes(value))) : [];

  return (
    <VerticalSpace>
      <Search placeholder="search for icon" onSearch={onSearch} enterButton />
      <FormItem name="icon">
        <RadioGroup buttonStyle="solid">
          <Row gutter={[10, 20]}>
            {icons ? (
              icons.map((item) => (
                <Col key={item}>
                  <RadioButton value={item}>
                    <Icon color="#808080" icon={item} size={17} />
                  </RadioButton>
                </Col>
              ))
            ) : (
              <MenuText>Not found any icon</MenuText>
            )}
          </Row>
        </RadioGroup>
      </FormItem>
    </VerticalSpace>
  );
};
