export interface Equation {
  id: number;
  formula: string;
  order: number;
}

export interface Connection {
  type: "initial" | "card" | "output";
  cardIndex?: number;
  from?: number;
  to?: number;
}

export interface SelectItem {
  label: string;
  value: string;
}

export interface Equation {
  id: number;
  formula: string;
  order: number;
}

export interface ConnectionPath {
  mainPath: string;
  startCircle: {
    cx: number;
    cy: number;
  };
  endCircle: {
    cx: number;
    cy: number;
  };
}
