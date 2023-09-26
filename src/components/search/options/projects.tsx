import { Badge } from 'antd';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { ProjectWrapper, StyledTitle, StyledAvatar } from './styles';

export const renderProjects = (id: string, title: string, color: string, icon?: string) => {
  return {
    id: id,
    mode: 'nodeType',
    value: id,
    label: (
      <ProjectWrapper>
        <Badge>
          <StyledAvatar color={color} shape="square" size="small" icon={icon || <Araks />} />
        </Badge>
        <StyledTitle>{title}</StyledTitle>
      </ProjectWrapper>
    ),
  };
};
