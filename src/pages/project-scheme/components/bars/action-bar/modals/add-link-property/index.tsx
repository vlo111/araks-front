import React, { useMemo } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';

import { useSchema } from 'components/layouts/components/schema/wrapper';

import { ReactComponent as PlusSVG } from './icons/plus.svg';
import { ReactComponent as ArrowsSVG } from './icons/arrows.svg';

interface IPosition {
  left: number;
  top: number;
}

interface Color {
  color: string[];
}

const AntModal = styled(Modal)<Color>`
  .ant-modal-content {
    background: linear-gradient(95.36deg, ${({ color }) => color[0]}BA 5.15%, ${({ color }) => color[1]}33 100%);
    box-shadow: 0 4px 4px rgba(111, 111, 111, 0.3);
    backdrop-filter: blur(5px);
    border-radius: 4px;
    padding: 0;

    .ant-modal-body {
      .name {
        box-shadow: 0 4px 4px rgba(111, 111, 111, 0.16);
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
  const { openLinkPropertyModal, setOpenLinkPropertyModal } = useSchema() ?? {};

  const position: IPosition = useMemo(() => {
    return {
      left: openLinkPropertyModal?.x ?? 0,
      top: openLinkPropertyModal?.y ?? 0,
    };
  }, [openLinkPropertyModal]);

  return (
    <>
      <AntModal
        footer={false}
        open={openLinkPropertyModal !== undefined}
        mask={false}
        transitionName=""
        onCancel={() => {
          setOpenLinkPropertyModal(undefined);
        }}
        closable={false}
        width={`${MODAL_WIDTH}px`}
        style={{
          position: 'fixed',
          ...position,
        }}
        color={openLinkPropertyModal !== undefined ? openLinkPropertyModal?.color ?? [''] : ['']}
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
