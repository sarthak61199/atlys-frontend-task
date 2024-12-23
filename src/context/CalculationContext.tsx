import { createContext, ReactNode, useState } from "react";

interface CalculateContextType {
  initialInput: string;
  setInitialInput: (value: string) => void;
  outputValue: string;
  setOutputValue: (value: string) => void;
}

export const CalculateContext = createContext<CalculateContextType | undefined>(
  undefined
);

export const CalculateProvider = ({ children }: { children: ReactNode }) => {
  const [initialInput, setInitialInput] = useState("");
  const [outputValue, setOutputValue] = useState("");

  <CalculateContext.Provider
    value={{ initialInput, setInitialInput, outputValue, setOutputValue }}
  >
    {children}
  </CalculateContext.Provider>;
};
