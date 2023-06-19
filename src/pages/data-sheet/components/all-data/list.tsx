import { Avatar, Col, List, Row } from 'antd';
import { useGetProjectAllData } from 'api/all-data/use-get-project-all-data';
import { PageParameters } from 'api/types';
import { Checkbox } from 'components/checkbox';
import { Text } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { AllDataResponse } from 'types/node';

type TypeInfoProps = {
  color?: string;
};

const TypeInfo = styled(({ color, ...props }) => <div {...props} />)<TypeInfoProps>`
  background-color: ${(props) => `${props.color}15`};
  text-align: center;
  border-radius: 8px;
`;

const StyledListItem = styled(({ color, ...props }) => <List.Item {...props} />)`
  && {
    margin-bottom: 8px;
    padding-left: 24px;
    padding-right: 32px;
    background: linear-gradient(90.12deg, rgba(255, 255, 255, 0.7) 1.63%, rgba(255, 255, 255, 0.2) 100%);

    &:hover {
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

      .all-data-type-name {
        background-color: ${(props) => `${props.color}`};
      }
    }
  }
`;

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const AllDataList = () => {
  const [pageData, setPageData] = useState(initPageData);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const handleItemClick = useCallback(
    (item: AllDataResponse) => {
      const updatedCheckedItems = checkedItems.includes(item.id)
        ? checkedItems.filter((i) => i !== item.id)
        : [...checkedItems, item.id];
      setCheckedItems(updatedCheckedItems);
    },
    [checkedItems]
  );

  const { rowsData } = useGetProjectAllData(pageData);
  // eslint-disable-next-line no-console
  console.log('rowsData', rowsData);
  return (
    <List
      pagination={{
        position: 'bottom',
        align: 'end',
        onChange: (page) => {
          setPageData({ page, size: DEFAULT_PAGE_SIZE });
        },
      }}
      // grid={{
      //   gutter: 8,
      //   column: 2,
      // }}
      dataSource={rowsData}
      renderItem={(item, index) => {
        const avatar = item.properties?.find((item) => item.default_image);
        const name = item.properties?.find((item) => item.default_property);
        // eslint-disable-next-line no-console
        console.log('avatar, name', avatar, name);
        return (
          <StyledListItem key={item.id} color={name?.type_color} onClick={() => handleItemClick(item)}>
            <Checkbox
              className="all-data-checkbox"
              style={{ marginRight: '16px' }}
              checked={checkedItems.includes(item.id)}
            />
            <List.Item.Meta
              avatar={<Avatar src={avatar?.node_name as string} />}
              title={
                <Row>
                  <Col span={6}>
                    <Text color={COLORS.PRIMARY.GRAY}>{name?.node_name as string}</Text>
                  </Col>
                  <Col span={18}>
                    <Row justify="end" align="middle" gutter={32}>
                      <Col offset={6} span={6}>
                        <TypeInfo color={name?.type_color} className="all-data-type-name">
                          <Text color={COLORS.PRIMARY.GRAY_DARK}>{name?.type_name}</Text>
                        </TypeInfo>
                      </Col>
                      <Col>
                        <Text color={COLORS.PRIMARY.GRAY}>
                          {name?.updated_at ? dayjs(name?.updated_at).format('DD MMMM [at] HH:mm') : ''}
                        </Text>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
            />
          </StyledListItem>
        );
      }}
    />
  );
};
