import React, { useEffect, useState } from 'react';
import { Input } from 'components/input';
import { Modal } from 'components/modal';
import { Button } from "components/button";

import { useSchema } from '../provider';

export const AddTypePropertyModal: React.FC = () => {
  const { addPortModal, setAddPortModal } = useSchema();

  const [position, setPosition] = useState<{ top: number; left: number }>();

  const [propertyName, setPropertyName] = useState('');

  const [propertyDataType, setPropertyDataType] = useState('');

  const saveProperty: VoidFunction = () => {
    if (typeof addPortModal !== 'boolean') {
      const { node, port, isUpdate } = addPortModal;

      if (isUpdate as boolean) {
        node.portProp(port, 'attrs/portNameLabel/text', propertyName);
        node.portProp(port, 'attrs/portTypeLabel/text', propertyDataType);
      } else {

        //#region Set height of highlighted type, Set Center of Circle
        const linkPort = node.port.ports[node.port.ports.length - 1];

        const pathRect = 'attrs/link_rect/height';
        const pathCircle = 'attrs/link_circle/cy';
        const pathLink = 'attrs/link_path/transform';

        const height = (node.portProp(linkPort, pathRect) as number) + 30;

        node.portProp(linkPort, pathRect, height);
        node.portProp(linkPort, pathCircle, height / 2);
        node.portProp(linkPort, pathLink, `matrix(1,0,0,1,${150 - 16}, ${height / 2 - 16})`);
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
        const portNameLabel = addPortModal.node.portProp(addPortModal.port).attrs.portNameLabel.text;
        const portTypeLabel = addPortModal.node.portProp(addPortModal.port).attrs.portTypeLabel.text;
        setPropertyName(portNameLabel);
        setPropertyDataType(portTypeLabel);
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
