import { EdgeTypeItem, StyledBadge } from './styles';
import { getHighlightedText } from './utils';
import { EdgeProperties } from 'api/visualisation/use-get-search';
import { ReactComponent as RelatedNodeSVG } from '../../../icons/search-edge-nodes.svg';
import { ReactComponent as EdgeSVG } from '../../../icons/search-edge.svg';

export const renderEdgeProperties = (edge: EdgeProperties, search: string) => {
  const { id, relation, source_id, source_name, source_color, target_name, target_id, target_color, ...properties } =
    edge;

  if (Object.entries(properties)[0]?.length === undefined || Object.entries(properties)[0]?.length <= 1) {
    return {
      id,
      value: id,
      mode: 'relation',
      label: (
        <EdgeTypeItem>
          <div className="edge-name">
            <EdgeSVG />
            {getHighlightedText(relation, search)}
          </div>
          <div className="related-nodes">
            <div>
              <StyledBadge color={source_color} text={source_name} />
            </div>
            <div>
              <RelatedNodeSVG />
            </div>
            <div>
              <StyledBadge color={source_color} text={source_name} />
            </div>
          </div>
          <span className="edge-name">{getHighlightedText(relation, search)}</span>
        </EdgeTypeItem>
      ),
    };
  }

  const property = Object.entries(properties)[0];

  return {
    id: id,
    mode: 'relation',
    value: id,
    label: (
      <EdgeTypeItem>
        <div className="edge-name">
          <EdgeSVG />
          {getHighlightedText(relation, search)}
        </div>
        <div className="related-nodes">
          <div>
            <StyledBadge color={source_color} text={source_name} />
          </div>
          <div>
            <RelatedNodeSVG />
          </div>
          <div>
            <StyledBadge color={source_color} text={source_name} />
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
