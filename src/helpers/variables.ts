import { Nav } from "../types/nav";

export const navigations: Nav[] = [
  {
    id: 1,
    path: '/',
    title: 'Game',
  },
  {
    id: 2,
    path: '/about',
    title: 'About',
  },
];

export const rowCoords: { [key: number]: string } = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  10: 'J',
}

export const columnCoords: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
}
