export interface ILocation {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
  name: string;
  description: string;
}

export interface ICurrentLocation {
  loaded: boolean;
  coordinates: ICoordinates;
  error: string;
  accuracy: number;
}

export interface ICoordinates {
  lat: number;
  long: number;
}
