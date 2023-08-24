import { Col, Image, Row, Space } from 'antd';
import { Button, GridConnectionButton } from 'components/button';

import { Text, Title } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { centerImageStyle, COLORS } from 'helpers/constants';
import { useMemo } from 'react';
import { VerticalSpace } from './../../../../../components/space/vertical-space';
import { getRowData, groupedData } from './utils';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

export const VIewNode = () => {
  const { state: selectedView, dispatch } = useViewDatasheet();
  const groupedDataList = useMemo(
    () => (selectedView?.edges ? Object.entries(groupedData(selectedView.edges)) : []),
    [selectedView?.edges]
  );

  return (
    <VerticalSpace>
      {selectedView?.default_image && (
        <Image
          src={selectedView?.default_image}
          width={161}
          height={127}
          style={{ borderRadius: '4px', ...centerImageStyle }}
        />
      )}
      <VerticalSpace>
        <Text color={COLORS.PRIMARY.BLUE}>Name</Text>
        <Title level={3}>{selectedView?.name}</Title>
      </VerticalSpace>
      {selectedView?.properties ? (
        selectedView.properties.map((data, index) => {
          return (
            <VerticalSpace key={data.id + index}>
              <Text color={COLORS.PRIMARY.BLUE}>{data.nodeTypeProperty.name}</Text>
              {getRowData(data)}
            </VerticalSpace>
          );
        })
      ) : (
        <></>
      )}
      {groupedDataList.map(([index, item]) => (
        <VerticalSpace key={index}>
          <Row>
            <Col>
              <Text color={COLORS.PRIMARY.BLUE}>{item[0].edgeTypes.name}</Text>
            </Col>
            <Col span={8} offset={1}>
              <GridConnectionButton
                type="text"
                size="small"
                backgroundColor={item[0].nodes.nodeType.color}
                block
                icon={<Connection />}
              >
                {item[0].nodes.nodeType.name}
              </GridConnectionButton>
            </Col>
          </Row>
          <Space size="large">
            {item.map((row) => (
              <Button type="text" key={row.id} onClick={() => dispatch(row.target_id)}>
                <Text underline color={COLORS.PRIMARY.GRAY_DARK}>
                  {row.nodes.name}
                </Text>
              </Button>
            ))}
          </Space>
        </VerticalSpace>
      ))}
    </VerticalSpace>
  );
};
