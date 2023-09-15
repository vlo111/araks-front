import { StyledBadge, TypeItem } from './styles';
import { getHighlightedText } from './utils';

export const renderTypes = (id: string, title: string, color: string, search: string) => ({
  id: id,
  mode: 'nodeType',
  value: id,
  label: (
    <TypeItem>
      {getHighlightedText(title, search)}
      <StyledBadge color={color} text={title} />
    </TypeItem>
  ),
});
