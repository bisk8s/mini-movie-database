import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

// Dimensões do layout:
const layoutWidth = 1080;
const layoutHeight = 1920;

export function rspWidth(value: number, baseValue: number = layoutWidth): number {
  return value * (width / baseValue);
}
export function rspHeight(value: number, baseValue: number = layoutHeight): number {
  return value * (height / baseValue);
}
