import React, { useEffect, useState } from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Select } from 'components/select';
import { Button } from 'components/button';

const { Option } = Select;

interface IAddLinkProps {
  onClose: VoidFunction;
}

type OnSelectChange = (value: unknown, item: string) => void

export const AddLinkWrapper: React.FC<IAddLinkProps> = ({ onClose }) => {
  const { graph } = useSchema() || {};

  const [nodes, setNodes] = useState<string[]>();

  const [source, setSource] = useState<string>();
  const [target, setTarget] = useState<string>();

  const saveEdge: VoidFunction = () => {

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

  const onSelectChange: OnSelectChange = (value, item) => {
    const id = value as string;
    if (item === 'source') {
      setSource(id);
    } else {
      setTarget(id);
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
        <Button block type="primary" onClick={saveEdge}>
          Save
        </Button>
      </div>
    </>
  );
};
