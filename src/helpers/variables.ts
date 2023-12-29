import { Nav } from "../types/nav";
import { ShipType } from "../types/ship";

const screenWidth = window.innerWidth;

const isTablet = screenWidth >= 640;
const isDesktop = screenWidth >= 1280;

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

export type Coordinates = {
  [key: number]: string | number
}

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
};

export const columnCoords: { [key: number]: number } = {
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
  7: 6,
  8: 7,
  9: 8,
  10: 9,
};

export const ships: ShipType[] = [
  {
    id: 1,
    size: 4,
    x: 0,
    y: isDesktop ? 390 : isTablet ? 350 : 260,
    defX: 0,
    defY: isDesktop ? 390 : isTablet ? 350 : 260,
    coordX: null,
    coordY: null,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
    towers: [
      {id: 1, isChecked: false, square: null},
      {id: 2, isChecked: false, square: null},
      {id: 3, isChecked: false, square: null},
      {id: 4, isChecked: false, square: null},
    ],
  },

  {
    id: 2,
    size: 3,
    x: isDesktop ? 237 : isTablet ? 218 : 165,
    y: isDesktop ? 390 : isTablet ? 350 : 260,
    defX: isDesktop ? 237 : isTablet ? 218 : 165,
    defY: isDesktop ? 390 : isTablet ? 350 : 260,
    coordX: null,
    coordY: null,
    name: 'Submarine',
    direction: 'row',
    destroyed: false,
    towers: [
      {id: 1, isChecked: false, square: null},
      {id: 2, isChecked: false, square: null},
      {id: 3, isChecked: false, square: null}
    ],
  },

  {
    id: 3,
    size: 2,
    x: isDesktop ? 155 : isTablet ? 140 : 105,
    y: isDesktop ? 390 : isTablet ? 350 : 260,
    defX: isDesktop ? 155 : isTablet ? 140 : 105,
    defY: isDesktop ? 390 : isTablet ? 350 : 260,
    coordX: null,
    coordY: null,
    name: 'Cruiser',
    direction: 'row',
    destroyed: false,
    towers: [
      {id: 1, isChecked: false, square: null},
      {id: 2, isChecked: false, square: null},
    ],
  },

  {
    id: 4,
    size: 5,
    x: isDesktop ? 155 : isTablet ? 140 : 105,
    y: isDesktop ? 435 : isTablet ? 390 : 295,
    defX: isDesktop ? 155 : isTablet ? 140 : 105,
    defY: isDesktop ? 435 : isTablet ? 390 : 295,
    coordX: null,
    coordY: null,
    name: 'Battleship',
    direction: 'row',
    destroyed: false,
    towers: [
      {id: 1, isChecked: false, square: null},
      {id: 2, isChecked: false, square: null},
      {id: 3, isChecked: false, square: null},
      {id: 4, isChecked: false, square: null},
      {id: 5, isChecked: false, square: null},
    ],
  },

  {
    id: 5,
    size: 4,
    x: 0,
    y: isDesktop ? 435 : isTablet ? 390 : 295,
    defX: 0,
    defY: isDesktop ? 435 : isTablet ? 390 : 295,
    coordX: null,
    coordY: null,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
    towers: [
      {id: 1, isChecked: false, square: null},
      {id: 2, isChecked: false, square: null},
      {id: 3, isChecked: false, square: null},
      {id: 4, isChecked: false, square: null},
    ],
  },
]
