export interface Location {
  address?: string;
  lat?: number;
  lng?: number;
}

export type SelectedLocation = google.maps.LatLngLiteral & {
  address: string;
};
