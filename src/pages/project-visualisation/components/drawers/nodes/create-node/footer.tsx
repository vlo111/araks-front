import React from 'react';
import { Col, Row } from 'antd';
import { Button } from 'components/button';

type DrawerFooter = React.FC<{ onCancel: VoidFunction; isLoading: boolean; onSave: VoidFunction }>;

export const NodeCreateDrawerFooter: DrawerFooter = ({ onCancel, isLoading, onSave }) => {
  return (
    <Row gutter={16} justify="center">
      <Col span={4}>
        <Button style={{ marginRight: 8 }} onClick={onCancel} block>
          Cancel
        </Button>
      </Col>
      <Col span={4}>
        <Button type="primary" disabled={isLoading} loading={isLoading} onClick={onSave} block>
          Save
        </Button>
      </Col>
    </Row>
  );
};
