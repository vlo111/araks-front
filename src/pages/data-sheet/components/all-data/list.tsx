import { Avatar, Col, List, Row } from 'antd';
import { useGetProjectAllData } from 'api/all-data/use-get-project-all-data';
import { PageParameters } from 'api/types';
import { Text } from 'components/typography';
import dayjs from 'dayjs';
import { COLORS, DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'helpers/constants';
import { useState } from 'react';
import styled from 'styled-components';

const TypeInfo = styled.div`
  background-color: ${(props) => `${props.color}15`};
  text-align: center;
  border-radius: 8px;
`;

const initPageData: PageParameters = { page: DEFAULT_PAGE_NUMBER, size: DEFAULT_PAGE_SIZE };

export const AllDataList = () => {
  const [pageData, setPageData] = useState(initPageData);

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
          <List.Item key={item.id}>
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
                        <TypeInfo color={name?.type_color}>
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
          </List.Item>
        );
      }}
    />
  );
};
