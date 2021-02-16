import type { Property } from 'csstype';

export interface Theme {
  primary: Property.Color;
  secondary: Property.Color;
}

export const theme: Theme = {
  primary: '#3b63b3',
  secondary: '#e6187c',
};

export default theme;
