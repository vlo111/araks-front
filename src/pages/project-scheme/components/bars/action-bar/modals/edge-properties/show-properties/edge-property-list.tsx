import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { COLORS } from "helpers/constants";
import { OpenEditModal } from '../types/property';
import { useGetProjectsEdgeTypeProperties } from 'api/node-edge-type/use-get-projects-edge-type-properties';
import { useSchema } from 'components/layouts/components/schema/wrapper';

type EdgePropertyProps = React.FC<{
  openEditModal: OpenEditModal;
}>;

const PropertyList = styled.div`
  min-height: 32px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem 0;

  .property-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Text = styled.div`
  font-weight: 600;
  letter-spacing: 0.07em;
  color: ${COLORS.PRIMARY.WHITE};
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  height: 2rem;
  gap: 1rem;
  cursor: pointer;

  &:hover {
    backdrop-filter: blur(1rem);
  }
`;

export const EdgePropertyList: EdgePropertyProps = ({ openEditModal }) => {
  const { openLinkPropertyModal } = useSchema() || {};

  const { data, isInitialLoading: loading } = useGetProjectsEdgeTypeProperties(openLinkPropertyModal?.id, {
    enabled: !!openLinkPropertyModal?.id,
  });

  return (
    <Spin spinning={loading}>
      <PropertyList>
        {data?.properties?.map((p) => (
          <Section key={p.id} onClick={() => openEditModal(p.id)}>
            <Text className="property-name" title={p.name}>
              {p.name}
            </Text>
            <Text>{p.ref_property_type_id}</Text>
          </Section>
        ))}
      </PropertyList>
    </Spin>
  );
};
