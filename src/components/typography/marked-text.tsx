import { COLORS } from 'helpers/constants';
import { Text } from './text';

interface MarkedTextProps {
  longText: string;
  searchTerm: string;
}

export const MarkedText: React.FC<MarkedTextProps> = ({ longText, searchTerm }) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return <Text>{longText}</Text>;
  }

  const parts = longText.split(new RegExp(`(${searchTerm})`, 'gi'));
  return (
    <Text color={COLORS.PRIMARY.GRAY}>
      {parts.map((part, index) =>
        part.toLowerCase() === searchTerm.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: 'yellow', fontWeight: 'bold' }}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </Text>
  );
};
