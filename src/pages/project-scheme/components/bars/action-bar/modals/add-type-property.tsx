import React, { useEffect, useState } from 'react';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { Button } from 'components/button';
import { useSchema } from 'components/layouts/components/schema/wrapper';

export enum Path {
  Rect = 'attrs/link_rect/height',
  Circle = 'attrs/link_circle/cy',
  Link = 'attrs/link_path/transform',
}

export const AddTypePropertyModal: React.FC = () => {
  const { addPortModal, setAddPortModal } = useSchema();

  const [position, setPosition] = useState<{ top: number; left: number }>();

  const [propertyName, setPropertyName] = useState('');

  const [propertyDataType, setPropertyDataType] = useState('');

  const saveProperty: VoidFunction = () => {
    if (typeof addPortModal !== 'boolean') {
      const { node, portId, isUpdate } = addPortModal;

      if (isUpdate as boolean) {
        node.portProp(portId, 'attrs/portNameLabel/text', propertyName);
        node.portProp(portId, 'attrs/portTypeLabel/text', propertyDataType);
      } else {
        //#region Set height of highlighted type, Set Center of Circle

        const ports = node.ports.items;

        const id = ports[ports.length - 1].id ?? '';

        const height = (node.portProp(id, Path.Rect) as number) + 30;

        node.portProp(id, Path.Rect, height);
        node.portProp(id, Path.Circle, height / 2);
        node.portProp(id, Path.Link, `matrix(1,0,0,1,${150 - 16}, ${height / 2 - 16})`);
        //#endregion

        const length: number = node.ports.items.length;

        node.insertPort(length - 2, {
          id: `1-${length}new`,
          group: 'cell',
          attrs: {
            portBody: {
              fill: '#F2F2F2',
            },
            portNameLabel: {
              text: propertyName,
              fill: 'black',
            },
            portTypeLabel: {
              text: propertyDataType,
            },
          },
        });
      }
    }
    onClose();
  };

  const onClose: VoidFunction = () => {
    setPropertyName('');
    setPropertyDataType('');
    setAddPortModal(false);
  };

  useEffect(() => {
    if (typeof addPortModal !== 'boolean') {
      if (addPortModal.isUpdate) {
        const { node, portId } = addPortModal;

        const { attrs } = node.portProp(portId);

        if (attrs !== undefined) {
          const { portNameLabel, portTypeLabel } = attrs;

          if (typeof portNameLabel.text === 'string' && typeof portTypeLabel.text === 'string') {
            setPropertyName(portNameLabel.text);
            setPropertyDataType(portTypeLabel.text);
          }
        }
      }

      setPosition({
        left: addPortModal.x,
        top: addPortModal.y,
      });
    }
  }, [addPortModal]);

  return (
    <>
      <Modal
        mask={false}
        transitionName=""
        width="232px"
        style={{
          position: 'fixed',
          ...position,
        }}
        footer={false}
        open={addPortModal !== false}
        title={`${typeof addPortModal !== 'boolean' && addPortModal.isUpdate ? 'Update' : 'Write new'} property data`}
        onCancel={onClose}
        closable={false}
      >
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            gap: '20px',
          }}
        >
          <Input
            type="text"
            placeholder="Property Name"
            value={propertyName}
            onChange={(ev) => setPropertyName((ev.target as EventTarget & { value: string }).value)}
          />
          <Input
            type="text"
            placeholder="Data type"
            value={propertyDataType}
            onChange={(ev) => setPropertyDataType((ev.target as EventTarget & { value: string }).value)}
          />
          <Button className="primary" onClick={saveProperty}>
            {typeof addPortModal !== 'boolean' && addPortModal.isUpdate ? 'Update' : 'Save'}
          </Button>
        </div>
      </Modal>
    </>
  );
};
