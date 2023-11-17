import { StyledBadge, TypeItem, StyledProjectName } from './styles';

export const renderTypes = (id: string, node_type_id: string, title: string, color: string, node_type_name: string) => {
  return {
    key: `node-type${id}${node_type_id}`,
    id,
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
