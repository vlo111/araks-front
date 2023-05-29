import styled from 'styled-components';
import { Modal } from 'components/modal';

export const WrapperModal = styled(Modal)<{ color: string[] }>`
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

        .text {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 9rem;
          font-weight: 600;
          font-size: 20px;
          line-height: 26px;
        }

        .icon {
          display: flex;
          align-items: center;
          cursor: pointer;

          svg {
            width: 40px;
          }
        }

        .edit-property-icon, .add-property-icon {
          cursor: pointer;
          position: absolute;
          display: flex;
        }
        
        .add-property-icon {
          right: 10px;
        }
        
        .edit-property-icon {
          right: 40px;
        }
      }
    }
  }
`;
