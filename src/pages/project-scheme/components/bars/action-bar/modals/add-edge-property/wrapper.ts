import styled from 'styled-components';
import { Modal } from 'antd';

export const WrapperModal = styled(Modal)<{ color: string[] | undefined }>`
     
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
