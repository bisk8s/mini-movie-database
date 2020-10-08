export function stringToArray(str: string): string[] {
  return str.split(',').map(val => val.trim());
}
