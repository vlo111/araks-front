import { Breadcrumb } from 'antd';
import { COLORS } from 'helpers/constants';
import styled from 'styled-components';

export const ProjectBreadcrumb = styled(Breadcrumb)`
  margin-left: 32px;

  .home {
    cursor: pointer;
    color: ${COLORS.PRIMARY.GRAY_DARK};
  }

  .project-name {
    color: ${COLORS.PRIMARY.BLUE};
  }
`;
