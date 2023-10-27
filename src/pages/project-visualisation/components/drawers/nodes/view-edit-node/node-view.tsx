import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData, groupedData } from 'pages/data-sheet/components/table-section/node/utils';
import { centerImageStyle, COLORS } from 'helpers/constants';
import { Col, Image, Row } from 'antd';
import React, { useMemo } from 'react';
import { NodePropertiesValues } from 'types/node';
import { Button, GridConnectionButton } from 'components/button';
import { VIewDataType } from './index';
import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { useGraph } from 'components/layouts/components/visualisation/wrapper';

interface IProps {
  properties: NodePropertiesValues[] | undefined;
  selectedView: VIewDataType;
}

export const ViewNode: React.FC<IProps> = ({ selectedView, properties }) => {
  const { startOpenNode, finishOpenNode } = useGraph() ?? {};

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
        <Text color={COLORS.PRIMARY.BLUE}>name</Text>
        <Text>{selectedView?.name}</Text>
      </VerticalSpace>
      {properties ? (
        properties.map((d, index) => {
          return (
            <VerticalSpace key={d.id + index}>
              <div color={COLORS.PRIMARY.BLUE}>{d.nodeTypeProperty.name}</div>
              {getRowData(d)}
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
            <Col
              span={24}
              style={{
                gap: '0.5rem',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {item.map((row) => (
                <Button
                  type="text"
                  key={row.id}
                  onClick={() => {
                    finishOpenNode();
                    startOpenNode({
                      id: row.target_id,
                    });
                  }}
                >
                  <Text underline color={COLORS.PRIMARY.GRAY_DARK}>
                    {row.nodes.name}
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
