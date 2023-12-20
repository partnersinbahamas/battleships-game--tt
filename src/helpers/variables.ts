import { Ship } from "../classes/Ship";
import { Nav } from "../types/nav";
import { ShipType } from "../types/ship";
// import { ShipType } from "../types/ship";

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
};

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
};

export const allowedShips: ShipType[] = [
  {
    id: 1,
    x: null,
    y: null,
    name: 'Destroyer',
    destroyed: false,
    towers: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
    ],
  },

  {
    id: 2,
    x: null,
    y: null,
    name: 'Submarine',
    destroyed: false,
    towers: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
    ],
  },

  {
    id: 3,
    x: null,
    y: null,
    name: 'Cruiser',
    destroyed: false,
    towers: [
      { id: 1, checked: false },
      { id: 2, checked: false },
    ],
  },

  {
    id: 4,
    x: null,
    y: null,
    name: 'Battleship',
    destroyed: false,
    towers: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
    ],
  },

  {
    id: 5,
    x: null,
    y: null,
    name: 'Destroyer',
    destroyed: false,
    towers: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
    ],
  },
]

export const ships = [
  {
    id: 1,
    size: 4,
    x: 10,
    y: 510,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 2,
    size: 3,
    x: 150,
    y: 510,
    name: 'Submarine',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 3,
    size: 2,
    x: 120,
    y: 390,
    name: 'Cruiser',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 4,
    size: 5,
    x: 10,
    y: 435,
    name: 'Battleship',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 5,
    size: 4,
    x: 88,
    y: 335,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
  },
]
