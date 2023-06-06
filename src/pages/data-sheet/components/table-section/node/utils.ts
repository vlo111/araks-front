import { PropertyTypes } from 'components/form/property/types';
import { Location } from 'components/modal/types';

type ValueNamed = {
  name: string;
};

type LocationValue = {
  address: Location;
};

export function getLocation(locationValue: LocationValue) {
  return {
    location: {
      latitude: locationValue.address.lat,
      longitude: locationValue.address.lng,
    },
    address: locationValue.address.address,
  };
}

export function getNodesData(value: unknown, refPropertyType: string, isMultiple: boolean) {
  switch (refPropertyType) {
    case PropertyTypes.Text:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Location:
      return isMultiple
        ? (value as LocationValue[]).map((item) => getLocation(item))
        : [getLocation(value as LocationValue)];
    case PropertyTypes.URL:
    case PropertyTypes.IMAGE_URL:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Date:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.DateTime:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.Boolean:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    case PropertyTypes.RichText:
      return isMultiple ? (value as ValueNamed[]).map((item) => item.name) : [value];
    // case PropertyTypes.Document:
    //   return <DocumentType key={item.id} data={item} />;
    // case PropertyTypes.Connection:
    //   return <ConnectionType key={item.id} data={item} />;
    default:
      return [];
  }
}
