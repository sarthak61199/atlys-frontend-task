export type Equation = {
  id: number;
  formula: string;
  order: number;
};

export type Connection = {
  type: "initial" | "card" | "output";
  cardIndex?: number;
  from?: number;
  to?: number;
};

export type SelectItem = {
  label: string;
  value: string;
};

export type ConnectionPath = {
  mainPath: string;
  startCircle: {
    cx: number;
    cy: number;
  };
  endCircle: {
    cx: number;
    cy: number;
  };
};

export type EquationsContextType = {
  equations: Equation[];
  handleEquationChange: (index: number, value: string) => void;
};
