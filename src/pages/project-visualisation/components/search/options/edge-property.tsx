import { EdgeTypeItem, StyledBadge } from './styles';
import { getHighlightedText } from './utils';
import { EdgeProperties } from 'api/visualisation/use-get-search';
import { ReactComponent as RelatedNodeSVG } from '../../icons/search-edge-nodes.svg';
import { ReactComponent as EdgeSVG } from '../../icons/search-edge.svg';

export const renderEdgeProperties = (edge: EdgeProperties, search: string) => {
  const { id, relation, source_id, source_name, source_color, target_name, target_id, target_color, ...properties } =
    edge;

  if (properties.name) {
    return {
      id,
      key: `${id}${source_id}${target_id}`,
      value: properties.name,
      label: (
        <EdgeTypeItem>
          <div className="edge-name">
            <EdgeSVG />
            {getHighlightedText(relation, search)}
          </div>
          <div className="related-nodes">
            <div>
              <StyledBadge color={source_color ?? 'red'} text={source_name ?? 'Fake Name'} />
            </div>
            <div>
              <RelatedNodeSVG />
            </div>
            <div>
              <StyledBadge color={source_color ?? 'red'} text={source_name ?? 'Fake Name'} />
            </div>
          </div>
          <span className="edge-name">{getHighlightedText(properties.name, search)}</span>
        </EdgeTypeItem>
      ),
    };
  }

  const property = Object.entries(properties)[0];

  return {
    key: `${id}${source_id}${target_id}`,
    id: id,
    value: relation,
    label: (
      <EdgeTypeItem>
        <div className="edge-name">
          <EdgeSVG />
          {getHighlightedText(relation, search)}
        </div>
        <div className="related-nodes">
          <div>
            <StyledBadge color={source_color ?? 'red'} text={source_name ?? 'Fake Name'} />
          </div>
          <div>
            <RelatedNodeSVG />
          </div>
          <div>
            <StyledBadge color={source_color ?? 'red'} text={source_name ?? 'Fake Name'} />
          </div>
        </div>
        <div className="edge-property">
          <span>{property[0]}:</span>
          {getHighlightedText(property[1], search)}
        </div>
      </EdgeTypeItem>
    ),
  };
};
