export interface IGeocodeQuery {
  address: string;
}

export interface IReverseGeocodeQuery {
  lat: number;
  lng: number;
}

export interface IPlaceAutocompleteQuery {
  input: string;
}

export interface IPlaceDetailsQuery {
  placeId: string;
}

export interface IDirectionsQuery {
  origin: string; // "19.0760,72.8777" or "Store Address"
  destination: string; // "Customer Address"
}

export interface ILocationCoordinates {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export interface IDirectionsResult {
  distanceText: string;
  distanceValueMeters: number;
  durationText: string;
  durationValueSeconds: number;
  originAddress: string;
  destinationAddress: string;
  polylinePoints?: string;
  estimatedDeliveryMinutes: number;
}
