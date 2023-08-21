import DOMPurify from 'dompurify';

type Props = {
  text: string;
};

export const ShowSafeText = ({ text }: Props) => {
  const sanitizedHTML = DOMPurify.sanitize(text);
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};
