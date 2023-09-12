import { EdgeTypeItem, StyledBadge } from './styles';
import { getHighlightedText } from './utils';
import { EdgeType } from 'api/visualisation/use-get-search';
import { ReactComponent as RelatedNodeSVG } from '../../icons/search-edge-nodes.svg';
import { ReactComponent as EdgeSVG } from '../../icons/search-edge.svg';

export const renderEdgeTypes = (edge: EdgeType, search: string) => ({
  key: `${edge.id}${edge.source_id}${edge.target_id}`,
  id: edge.id,
  value: edge.relation,
  label: (
    <EdgeTypeItem>
      <div className="edge-name">
        <EdgeSVG />
        {getHighlightedText(edge.relation, search)}
      </div>
      <div className="related-nodes">
        <div>
          <StyledBadge color={edge.source_color ?? 'red'} text={edge.source_name ?? 'Fake Name'} />
        </div>
        <div>
          <RelatedNodeSVG />
        </div>
        <div>
          <StyledBadge color={edge.source_color ?? 'red'} text={edge.source_name ?? 'Fake Name'} />
        </div>
      </div>
    </EdgeTypeItem>
  ),
});
