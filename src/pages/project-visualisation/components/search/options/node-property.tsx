import { NodeProperty } from 'api/visualisation/use-get-search';
import { NodeItem, NodePropertyItem, StyledBadge } from './styles';
import { getHighlightedText } from './utils';

export const renderNodeProperties = (search: string, params: NodeProperty) => {
  const { id, color, label, ...properties } = params;

  if (properties.name) {
    return {
      id,
      key: id,
      mode: 'node',
      value: properties.name,
      label: (
        <NodePropertyItem>
          <StyledBadge color={color} text={label} />
          <span className="node-name">{getHighlightedText(properties.name, search)}</span>
        </NodePropertyItem>
      ),
    };
  }

  const property = Object.entries(properties)[0];

  const render = {
    id,
    key: id,
    mode: 'node',
    value: property[1],
    label: (
      <NodeItem>
        <StyledBadge color={color} text={label} />
        <div className="node-name">Fake Node Name</div>
        <div className="node-property">
          <span>{property[0]}:</span>
          {getHighlightedText(property[1], search)}
        </div>
      </NodeItem>
    ),
  };

  return render;
};
