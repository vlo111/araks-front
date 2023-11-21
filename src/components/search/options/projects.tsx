import { Badge } from 'antd';
import { ReactComponent as Araks } from '../../icons/araks-tiny.svg';
import { ProjectWrapper, StyledTitle, StyledAvatar } from './styles';
import { Icon } from '../../icon';

export const renderProjects = (id: string, title: string, color: string, icon: string, privacy: string) => {
  return {
    key: `project${id}`,
    id,
    mode: 'nodeType',
    value: id,
    privacy,
    label: (
      <ProjectWrapper>
        <Badge>
          <StyledAvatar
            color={color}
            shape="square"
            size="small"
            icon={
              (
                <Icon
                  color="#414141"
                  icon={icon}
                  size={14}
                  style={{ display: 'flex', height: '100%', margin: '0 auto' }}
                />
              ) || <Araks />
            }
          />
        </Badge>
        <StyledTitle>{title}</StyledTitle>
      </ProjectWrapper>
    ),
  };
};
