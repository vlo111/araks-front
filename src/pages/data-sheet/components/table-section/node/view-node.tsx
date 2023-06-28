import { Col, Image, Row, Space } from 'antd';
import { GridConnectionButton } from 'components/button';

import { Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { centerImageStyle, COLORS } from 'helpers/constants';
import { useMemo } from 'react';
import { VerticalSpace } from './../../../../../components/space/vertical-space';
import { getRowData, groupedData } from './utils';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

export const VIewNode = () => {
  const { state: selectedView } = useViewDatasheet();
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
        <Text color={COLORS.PRIMARY.BLUE}>name</Text>
        <Text>{selectedView?.name}</Text>
      </VerticalSpace>
      {selectedView?.properties ? (
        selectedView.properties.map((data) => {
          return (
            <VerticalSpace key={data.id}>
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
              <Text color={COLORS.PRIMARY.BLUE}>{index}</Text>
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
              <Text underline key={row.id} color={COLORS.PRIMARY.BLUE}>
                {row.nodes.name}
              </Text>
            ))}
          </Space>
        </VerticalSpace>
      ))}
    </VerticalSpace>
  );
};
