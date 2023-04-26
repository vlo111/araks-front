import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';
import React from 'react';
import { Form, FormInstance } from 'antd';

export const AddSchemaEdgePropertyForm: React.FC<{ form: FormInstance }> = ({ form }) => {
  return (
    <Form
      name="project-node-type"
      form={form}
      autoComplete="off"
      layout="vertical"
      requiredMark={false}
      // onFinish={onFinish}
    >
      <div className="name">
        <ArrowsSVG />
        <span>Working for</span>
        <PlusSVG />
      </div>
      <div className="list" />
    </Form>
  );
};
