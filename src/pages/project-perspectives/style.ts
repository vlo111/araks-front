import styled from 'styled-components';
import { COLORS } from '../../helpers/constants';

const background = `linear-gradient(122.32deg, rgba(237, 239, 248, 0.9) 3.09%, rgba(237, 239, 248, 0.4) 99.26%),
    linear-gradient(0deg, ${COLORS.PRIMARY.WHITE}, ${COLORS.PRIMARY.WHITE})`;

export const PerspectiveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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
    .ant-collapse-item {
      .ant-collapse-header {
        background: rgba(65, 65, 65, 0.1);
        font-weight: 600;
        letter-spacing: 0.07em;
      }
    }

    .ant-collapse-item-active {
      .ant-collapse-header {
        background: #414141;
        color: white;
      }

      ellipse {
        fill: white;
      }
    }

    &-content-box {
      padding-bottom: 0 !important;
    }
  }
`;
