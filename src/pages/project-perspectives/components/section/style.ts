import styled from 'styled-components';
import { COLORS } from '../../../../helpers/constants';

const background = `linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%),
    linear-gradient(0deg, ${COLORS.PRIMARY.WHITE}, ${COLORS.PRIMARY.WHITE})`;

export const PerspectiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: fixed;
  right: 0;
  top: 152px;
  width: 600px;
  height: 100%;
  padding-top: 24px;
  background: ${background};
  box-shadow: 0px 10px 10px 0px #8d8fa633;
  border: 1px solid ${COLORS.PRIMARY.WHITE};
  z-index: 1;

  .ant-collapse {
    &-item {
      .ant-collapse-header {
        background: rgba(65, 65, 65, 0.1);
        font-weight: 600;
        letter-spacing: 0.07em;
        padding: 6px 15px !important;
        align-items: center;

        .ant-collapse-expand-icon {
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

    &-content-box {
      padding-bottom: 0 !important;
    }

    .add-panel {
      .ant-collapse-header {
        background: rgb(65, 65, 65);
      }

      .add-perspective {
        font-weight: 700;
        font-size: 20px;
        line-height: 26px;
        letter-spacing: 0.07em;
        color: #ffffff;
        background: #95a2e1;
        border-radius: 0;
        width: 40%;
        height: 21px;
        
        &:focus {
          >> {
          background: red;
          }
        }
      }
    }
  }
`;
