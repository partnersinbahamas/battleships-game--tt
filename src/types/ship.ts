
export type ShipType = {
  id: number,
  destroyed: boolean,
  size: number,
  direction: 'column' | 'row',
  name: string,
  x: number,
  y: number,
  defX: number,
  defY: number,
  coordX: number | null,
  coordY: number | null,
}