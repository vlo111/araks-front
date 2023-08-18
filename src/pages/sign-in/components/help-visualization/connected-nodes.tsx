import { Row, Col } from 'antd';
import { HelpTargetType } from '../type';
import React, { Dispatch } from 'react';
import { StyledAvatar, StyledCol } from '../index';

export const ConnectedNodes = ({
  targets,
  setNode,
  setEnabled,
}: {
  targets: HelpTargetType[];
  setNode: Dispatch<React.SetStateAction<string>>;
  setEnabled: Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Row style={{ display: 'grid', gridGap: '27px', fontWeight: '700' }}>
        <Col>Connected nodes</Col>
        {targets &&
          targets.map((target: HelpTargetType) => {
            return (
              <StyledCol
                key={target.source.id}
                onClick={() => {
                  setNode(target.source.id);
                  setEnabled(true);
                }}
              >
                <StyledAvatar />
                {target.source.name}
              </StyledCol>
            );
          })}
      </Row>
    </>
  );
};
