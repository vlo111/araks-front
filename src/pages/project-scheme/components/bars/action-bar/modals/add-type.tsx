import React, { useState } from 'react';

import { useSchema } from 'components/layouts/components/schema/wrapper';
import { Button } from 'components/button';
import { Input } from 'components/input';
import { Modal } from 'components/modal';

interface IAddTypeProps {
  openAddType: boolean | number[]
  setOpenAddType: (item: boolean | number[]) => void
}

export const AddTypeModal: React.FC<IAddTypeProps> = ({
  openAddType,
  setOpenAddType
}) => {
  const { graph } = useSchema() || {};

  const [type, setType] = useState('');

  const [color, setColor] = useState('');

  const saveType: () => void = () => {
    if(typeof openAddType !== "boolean") {
      graph.addNode({
        id: Math.random().toString(),
        shape: "er-rect",
        label: type,
        position: {
          x: openAddType[0],
          y: openAddType[1]
        },
        attrs: {
          body: {
            stroke: color
          }
        },
        ports: [
          {
            id: Math.random().toString(),
            group: "list",
            attrs: {
              portBody: {
                fill: "#F2F2F2",
                strokeWidth: 0
              },
              portNameLabel: {
                text: "Name"
              },
              portTypeLabel: {
                text: "STRING"
              }
            }
          },
          {
            id: "add",
            group: "list",
            attrs: {
              portBody: {
                fill: {
                  type: "linearGradient",
                  stops: [
                    {offset: "0%", color: `${"#ffffff"}B3`},
                    {offset: "100%", color: `${"#ffffff"}33`}
                  ]
                }
              },
              portNameLabel: {
                fill: "#808080",
                text: "+ Add property"
              }
            }
          }
        ]
      });
    }

    onClose();
  };

  const onClose: VoidFunction = () => {
    setType('');
    setColor('');
    graph.container.style.cursor = "";
    setOpenAddType(false);
  };

  return (
    <>
      <Modal
        footer={false}
        open={openAddType !== false}
        title="Write new type data"
        onCancel={onClose}
        closable={false}
        width="496px"
        centered
        // style={{ left: typeof openAddType !== 'boolean' ? openAddType[0] + 250 : '', top: typeof openAddType !== 'boolean' ? openAddType[1] : '' }}
      >
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            gap: '20px'
          }}
        >
          <Input
            type="text"
            placeholder="Node Type"
            value={type}
            onChange={(ev: { target: EventTarget & { value: string; }; }) =>
              setType((ev.target as EventTarget & { value: string }).value)
            }
          />
          <Input
            type="text"
            placeholder="Select Color"
            value={color}
            onChange={(ev: { target: EventTarget & { value: string; }; }) =>
              setColor((ev.target as EventTarget & { value: string }).value)
            }
          />
          <p>
            suggest color: #{Math.floor(Math.random() * 16777215).toString(16)}
          </p>
          <Button className="primary" onClick={saveType}>
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};
