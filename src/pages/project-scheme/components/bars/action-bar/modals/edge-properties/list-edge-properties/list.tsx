import React from 'react';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import styled from 'styled-components';

type EdgePropertyProps = React.FC<{
  list: EdgeTypePropertiesResponse | undefined;
  openEditModal: (item?: string | boolean) => void;
}>;

const List = styled.div`
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
  color: #ffffff;
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

export const EdgePropertyList: EdgePropertyProps = ({ list, openEditModal }) => (
  <List>
    {list?.properties?.map((p) => (
      <Section key={p.id} onClick={() => openEditModal(p.id)}>
        <Text className="property-name" title={p.name}>
          {p.name}
        </Text>
        <Text>{p.ref_property_type_id}</Text>
      </Section>
    ))}
  </List>
);
