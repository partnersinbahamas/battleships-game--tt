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

// export const allowedShips: ShipType[] = [
//   {
//     id: 1,
//     x: null,
//     y: null,
//     name: 'Destroyer',
//     destroyed: false,
//     towers: [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//       { id: 3, checked: false },
//       { id: 4, checked: false },
//     ],
//   },

//   {
//     id: 2,
//     x: null,
//     y: null,
//     name: 'Submarine',
//     destroyed: false,
//     towers: [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//       { id: 3, checked: false },
//     ],
//   },

//   {
//     id: 3,
//     x: null,
//     y: null,
//     name: 'Cruiser',
//     destroyed: false,
//     towers: [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//     ],
//   },

//   {
//     id: 4,
//     x: null,
//     y: null,
//     name: 'Battleship',
//     destroyed: false,
//     towers: [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//       { id: 3, checked: false },
//       { id: 4, checked: false },
//       { id: 5, checked: false },
//     ],
//   },

//   {
//     id: 5,
//     x: null,
//     y: null,
//     name: 'Destroyer',
//     destroyed: false,
//     towers: [
//       { id: 1, checked: false },
//       { id: 2, checked: false },
//       { id: 3, checked: false },
//       { id: 4, checked: false },
//     ],
//   },
// ]

export const ships: ShipType[] = [
  {
    id: 1,
    size: 4,
    x: 0,
    y: 390,
    defX: 0,
    defY: 390,
    coordX: null,
    coordY: null,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 2,
    size: 3,
    x: 210,
    y: 390,
    defX: 210,
    defY: 390,
    coordX: null,
    coordY: null,
    name: 'Submarine',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 3,
    size: 2,
    x: 140,
    y: 390,
    defX: 140,
    defY: 390,
    coordX: null,
    coordY: null,
    name: 'Cruiser',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 4,
    size: 5,
    x: 140,
    y: 435,
    defX: 140,
    defY: 435,
    coordX: null,
    coordY: null,
    name: 'Battleship',
    direction: 'row',
    destroyed: false,
  },

  {
    id: 5,
    size: 4,
    x: 0,
    y: 435,
    defX: 0,
    defY: 435,
    coordX: null,
    coordY: null,
    name: 'Destroyer',
    direction: 'row',
    destroyed: false,
  },
]
