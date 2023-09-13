import { NodeProperty } from 'api/visualisation/use-get-search';
import { NodeItem, NodePropertyItem, StyledBadge } from './styles';
import { getHighlightedText } from './utils';

export const renderNodeProperties = (search: string, params: NodeProperty) => {
  const { id, color, label, ...properties } = params;

  if (Object.entries(properties).length <= 1) {
    return {
      id,
      key: id,
      mode: 'node',
      value: id,
      label: (
        <NodePropertyItem>
          <StyledBadge color={color} text={label} />
          <span className="node-name">{getHighlightedText(properties.name, search)}</span>
        </NodePropertyItem>
      ),
    };
  }

  const property = Object.entries(properties)[1];

  const render = {
    id,
    key: id,
    mode: 'node',
    value: id,
    label: (
      <NodeItem>
        <StyledBadge color={color} text={label} />
        <div className="node-name">{property[0]}</div>
        <div className="node-property">
          <span>{property[0]}:</span>
          {getHighlightedText(property[1], search)}
        </div>
      </NodeItem>
    ),
  };

  return render;
};
