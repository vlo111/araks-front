import { COLORS } from 'helpers/constants';
import { Text } from './text';

interface MarkedTextProps {
  longText: string;
}

const extractMatchedText = (text: string) => {
  return text?.split(/<em>(.*?)<\/em>/g).map((segment, index) => {
    if (index % 2 === 0) {
      return segment;
    } else {
      return (
        <span key={index} style={{ backgroundColor: '#FFDE80' }}>
          {segment}
        </span>
      );
    }
  });
};

export const MarkedText: React.FC<MarkedTextProps> = ({ longText }) => {
  return <Text color={COLORS.PRIMARY.GRAY}>{extractMatchedText(longText)}</Text>;
};
