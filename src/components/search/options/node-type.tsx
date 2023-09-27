import { StyledBadge, TypeItem, StyledProjectName } from './styles';

export const renderTypes = (id: string, title: string, color: string, node_type_name: string) => {
  return {
    id: id,
    mode: 'nodeType',
    value: id,
    label: (
      <TypeItem>
        <StyledBadge color={color} text={node_type_name} />
        <StyledProjectName>Project: {title}</StyledProjectName>
      </TypeItem>
    ),
  };
};
