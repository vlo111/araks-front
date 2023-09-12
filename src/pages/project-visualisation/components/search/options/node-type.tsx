import { StyledBadge, TypeItem } from './styles';
import { getHighlightedText } from './utils';

export const renderTypes = (id: string, title: string, color: string, search: string) => ({
  key: id,
  id: id,
  value: title,
  label: (
    <TypeItem>
      {getHighlightedText(title, search)}
      <StyledBadge color={color} text={title} />
    </TypeItem>
  ),
});
