
export type Property = {
  id: string;
  title: string;
  _geo: {
    lat: number;
    lng: number;
  },
  price: number;
  currency: string;
  rooms: number;
  bathrooms: number;
  type: string;
  surface_covered: number;
}