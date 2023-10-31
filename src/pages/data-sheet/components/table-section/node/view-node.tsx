import { Col, Image, Row } from 'antd';
import { Button, GridConnectionButton } from 'components/button';

import { Text, Title } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { centerImageStyle, COLORS } from 'helpers/constants';
import { useMemo } from 'react';
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData, groupedData } from './utils';
import { ReactComponent as InComeConnection } from 'components/icons/in-come.svg';

export const VIewNode = () => {
  const { state: selectedView, dispatch } = useViewDatasheet();
  const groupedDataList = useMemo(
    () => (selectedView?.edges ? Object.entries(groupedData(selectedView.edges.concat(selectedView.edges_in))) : []),
    [selectedView]
  );

  return (
    <VerticalSpace>
      {selectedView?.default_image && (
        <Image
          src={`${process.env.REACT_APP_AWS_URL}${selectedView?.default_image}`}
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
                backgroundColor={
                  selectedView?.id !== item[0].source.id ? item[0].source.nodeType.color : item[0].target.nodeType.color
                }
                block
                icon={
                  <InComeConnection
                    style={{ transform: `rotate(${selectedView?.id !== item[0].source.id ? 180 : 0}deg)` }}
                  />
                }
              >
                {selectedView?.id !== item[0].source.id ? item[0].source.nodeType.name : item[0].target.nodeType.name}
              </GridConnectionButton>
            </Col>
            <Col
              span={24}
              style={{
                gap: '0.5rem',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {item.map((row) => (
                <Button type="text" key={row.id} onClick={() => dispatch(row.target_id)}>
                  <Text underline color={COLORS.PRIMARY.GRAY_DARK}>
                    {selectedView?.id !== row.source.id ? row.source.name : row.target.name}
                  </Text>
                </Button>
              ))}
            </Col>
          </Row>
        </VerticalSpace>
      ))}
    </VerticalSpace>
  );
};
