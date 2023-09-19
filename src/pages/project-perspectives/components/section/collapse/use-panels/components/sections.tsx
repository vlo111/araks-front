import styled from 'styled-components';
import { useSchema } from 'components/layouts/components/schema/wrapper';

const HeaderInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 30px;
  padding: 0.5rem 0.5rem 0.5rem 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  color: #232f6a;
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: 0.07875rem;

  &:first-child {
    border-right: 1px solid #808080;
  }
`;
export const InfoSection = () => {
  const { nodes, perspective_info } = useSchema() || {};

  return (
    <HeaderInfo>
      <InfoWrapper>
        <p>Type: </p>
        <div>
          <span>{perspective_info?.typesLength}</span>
          <span>/</span>
          <span>{nodes?.length}</span>
        </div>
      </InfoWrapper>
      <InfoWrapper>
        <p>Property: </p>
        <div>
          <span>{perspective_info?.propertiesLength}</span>
          <span>/</span>
          <span>{nodes?.map((n) => n.properties).flat().length - nodes?.length}</span>
        </div>
      </InfoWrapper>
    </HeaderInfo>
  );
};
