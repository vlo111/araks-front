import styled from 'styled-components';
import { Collapse } from 'antd';

export const StyledCollapse = styled(Collapse)`
  .ant-collapse-item {
    .ant-collapse-header {
      background: rgba(65, 65, 65, 0.1);
      font-weight: 600;
      letter-spacing: 0.07em;
      padding: 6px 15px !important;
      align-items: center;

      .ant-collapse-expand-icon {
        display: none;
        position: absolute;
        left: -15px;
        scale: 1.5;

        path {
          fill: rgb(65, 65, 65);
        }
      }

      &:hover {
        background: rgba(65, 65, 65, 0.2);
      }
    }

    svg {
      &:hover {
        background: rgba(35, 47, 106, 0.2);
        border-radius: 10px;
      }
    }

    &-active {
      .ant-collapse-header {
        background: #414141;
        color: white;

        &:hover {
          background: #414141;
        }
      }

      ellipse {
        fill: white;
      }

      svg {
        &:hover {
          background: white;

          ellipse {
            fill: #232f6a;
          }
        }
      }
    }
  }

  .ant-collapse-content-box {
    min-height: 8rem;
    padding-bottom: 0 !important;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .ant-collapse-arrow:hover {
    svg {
      background: none;
    }
  }
`;
