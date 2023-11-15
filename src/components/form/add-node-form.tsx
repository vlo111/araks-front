import { Col, Row, Skeleton } from 'antd';
// import { useGetProjectNodeTypeProperties } from 'api/project-node-type-property/use-get-project-node-type-properties';
import { ProjectTypePropertyReturnData } from 'api/types';
// import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { VerticalSpace } from 'components/space/vertical-space';
import { Dispatch, SetStateAction } from 'react';
// import { GoogleMapScript } from 'helpers/google-map-script';
import { PropertyTypes } from './property/types';
import { BooleanType } from './type/boolean-type';
import { ConnectionType } from './type/connection-type';
import { DateTimeType } from './type/date-time-type';
import { DateType } from './type/date-type';
import { DocumentType } from './type/document-type';
import { ImageType } from './type/image-type';
import { LocationType } from './type/location-type';
import { NumericType } from './type/numeric-type';
import { RichTextType } from './type/rich-text-type';
import { TextType } from './type/text-type';
import { UrlType } from './type/url-type';
import { NodeEdges, NodePropertiesValues } from 'types/node';
import { EnumType } from './type/enum-type';

type Props = {
  data: ProjectTypePropertyReturnData[] | (ProjectTypePropertyReturnData[] | undefined);
  isInitialLoading: boolean;
  setStopSubmit?: Dispatch<SetStateAction<boolean>>;
  edges?: NodeEdges[] | undefined;
  nodeId?: string;
  nodeTypeId?: string;
  property?: NodePropertiesValues | undefined;
};

export const AddNodeForm = ({ data, isInitialLoading, setStopSubmit, nodeId, nodeTypeId, edges, property }: Props) => {
  if (isInitialLoading) {
    return <Skeleton />;
  }

  return (
    <VerticalSpace>
      <Row justify="center">
        <Col xs={16} xl={12}>
          <VerticalSpace>
            {data?.map((item) => {
              switch (item.ref_property_type_id) {
                case PropertyTypes.Text:
                  return <TextType key={item.id} data={item} />;
                case PropertyTypes.ENUM:
                  return <EnumType key={item.id} data={item} property={property} />;
                case PropertyTypes.Location:
                  return <LocationType key={item.id} data={item} />;
                case PropertyTypes.URL:
                  return <UrlType key={item.id} data={item} />;
                case PropertyTypes.IMAGE_URL:
                  return <ImageType nodeId={nodeId} key={item.id} data={item} />;
                case PropertyTypes.Integer:
                case PropertyTypes.Decimal:
                  return <NumericType key={item.id} data={item} />;
                case PropertyTypes.Date:
                  return <DateType key={item.id} data={item} />;
                case PropertyTypes.DateTime:
                  return <DateTimeType key={item.id} data={item} />;
                case PropertyTypes.Boolean:
                  return <BooleanType key={item.id} data={item} />;
                case PropertyTypes.RichText:
                  return <RichTextType key={item.id} data={item} />;
                case PropertyTypes.Document:
                  return <DocumentType nodeId={nodeId} key={item.id} data={item} setStopSubmit={setStopSubmit} />;
                case PropertyTypes.Connection:
                  return (
                    <ConnectionType key={item.id} nodeId={nodeId} nodeTypeId={nodeTypeId} data={item} edges={edges} />
                  );
                default:
                  return <></>;
              }
            })}
          </VerticalSpace>
        </Col>
      </Row>
      {/* <GoogleMapScript /> */}
    </VerticalSpace>
  );
};
