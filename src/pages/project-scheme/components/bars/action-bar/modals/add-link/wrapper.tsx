import React, { useEffect, useState } from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Select } from 'components/select';
import { Button } from 'components/button';

const { Option } = Select;

interface IAddLinkProps {
  onClose: VoidFunction;
}

export const AddLinkWrapper: React.FC<IAddLinkProps> = ({ onClose }) => {
  const { graph } = useSchema() || {};

  const [nodes, setNodes] = useState<string[]>();

  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();

  const saveEdge: () => void = () => {

    const nodes = graph?.getNodes();

    graph.addEdge({
      id: Math.random().toString(),
      shape: 'er-edge',
      target: {
        cell: nodes.find((n) => n.attr('text/text') === target)?.id ?? '',
      },
      source: {
        cell: nodes.find((n) => n.attr('text/text') === source)?.id ?? '',
      },
      attrs: {
        line: {
          stroke: nodes
              .find((n) => n.attr('text/text') === source)
              ?.attr('body/stroke'),
          strokeWidth: 2,
        },
      },
    });

    onClose();
  };

  const onSelectChange: (value: any, item: string) => void = (value, item) => {
    if (item === 'source') {
      setSource(value);
    } else {
      setTarget(value);
    }
  };

  useEffect(() => {
    setNodes(graph?.getNodes().map((n) => n.attr('text/text')));
  }, [graph]);

  return (
    <>
      <div
        style={{
          flexDirection: 'column',
          display: 'flex',
          gap: '20px',
        }}
      >
        <Select onChange={(v) => onSelectChange(v, 'source')} placeholder="Choose source type">
          {nodes?.map((option) => (
            <Option key={option} value={option} className="customSelectOption">
              {option}
            </Option>
          ))}
        </Select>
        <Select onChange={(v) => onSelectChange(v, 'target')} placeholder="Choose target type">
          {nodes?.map((option) => (
            <Option key={option} value={option} className="customSelectOption">
              {option}
            </Option>
          ))}
        </Select>
        {/* <AsnInput */}
        {/*  type="text" */}
        {/*  placeholder="Node Type" */}
        {/*  value={type} */}
        {/*  onChange={(ev) => */}
        {/*    setType((ev.target as EventTarget & { value: string }).value) */}
        {/*  } */}
        {/* /> */}
        {/* <AsnInput */}
        {/*  type="text" */}
        {/*  placeholder="Select Color" */}
        {/*  value={color} */}
        {/*  onChange={(ev) => */}
        {/*    setColor((ev.target as EventTarget & { value: string }).value) */}
        {/*  } */}
        {/* /> */}
        <Button block type="primary" onClick={saveEdge}>
          Save
        </Button>
      </div>
    </>
  );
};
