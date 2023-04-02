import React, { useLayoutEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import { useSchema } from 'components/layouts/components/schema/wrapper';

import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';

const AntModal = styled(Modal)<{ color: string[] }>`
  .ant-modal-content {
    background: linear-gradient(
      95.36deg,
      ${({ color }) => (color !== undefined ? color[0] : '')}BA 5.15%,
      ${({ color }) => (color !== undefined ? color[1] : '')}33 100%
    );
    box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.3);
    backdrop-filter: blur(5px);
    border-radius: 4px;
    padding: 0;

    .ant-modal-body {
      .name {
        box-shadow: 0px 4px 4px rgba(111, 111, 111, 0.16);
        height: 32px;
        width: 100%;
        display: flex;
        align-items: center;
        color: white;

        svg:first-child {
          width: 40px;
        }

        svg:last-child {
          position: absolute;
          right: 0;
          width: 40px;
        }
      }

      .list {
        min-height: 32px;
      }
    }
  }
`;

const MODAL_WIDTH = 232;

export const AddLinkPropertyModal: React.FC = () => {
  const { openLinkPropertyModal, setOpenLinkPropertyModal } = useSchema();

  const [position, setPosition] = useState<{ top: number; left: number }>();

  useLayoutEffect(() => {
    if (typeof openLinkPropertyModal !== 'boolean') {
      setPosition({
        left: openLinkPropertyModal.x - MODAL_WIDTH / 2,
        top: openLinkPropertyModal.y,
      });
    }
  }, [openLinkPropertyModal]);

  return (
    <>
      <AntModal
        footer={false}
        open={openLinkPropertyModal !== false}
        mask={false}
        transitionName=""
        onCancel={() => {
          setOpenLinkPropertyModal(false);
        }}
        closable={false}
        width={`${MODAL_WIDTH}px`}
        style={{
          position: 'fixed',
          ...position,
        }}
        color={typeof openLinkPropertyModal !== 'boolean' ? openLinkPropertyModal?.color ?? [''] : ['']}
      >
        <div className="name">
          <ArrowsSVG />
          <span>Working for</span>
          <PlusSVG />
        </div>
        <div className="list" />
      </AntModal>
    </>
  );
};
