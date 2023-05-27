export interface Edge {
  firstVertex: number;
  secondVertex: number;
  weight: number;
}

export interface VertexPosition {
  x: number,
  y: number,
  number: number
}

export interface VertexPositions {
  [key: number]: VertexPosition
}

export interface EdgePosition {
  from: {
    x: number,
    y: number
  },
  to: {
    x: number,
    y: number
  },
  weight: number
}
