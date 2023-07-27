import { COLORS } from 'helpers/constants';
import { Text } from './text';

interface MarkedTextProps {
  longText: string;
}

const extractMatchedText = (text: string) => {
  const matchStartTag = '<em>';
  const matchEndTag = '</em>';
  const startIndex = text.indexOf(matchStartTag);
  const endIndex = text.indexOf(matchEndTag);

  if (startIndex >= 0 && endIndex > startIndex + matchStartTag.length) {
    const prefix = text.substring(0, startIndex);
    const matched = text.substring(startIndex + matchStartTag.length, endIndex);
    const suffix = text.substring(endIndex + matchEndTag.length);
    return (
      <>
        {prefix}
        <span style={{ backgroundColor: '#FFFF00' }}>{matched}</span>
        {suffix}
      </>
    );
  }

  return text;
};

export const MarkedText: React.FC<MarkedTextProps> = ({ longText }) => {
  return <Text color={COLORS.PRIMARY.GRAY}>{extractMatchedText(longText)}</Text>;
};
