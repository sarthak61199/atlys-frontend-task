import { Equation, EquationsContextType } from "@/types";
import { createContext, ReactNode, useState } from "react";

export const EquationsContext = createContext<EquationsContextType | undefined>(
  undefined
);

export function EquationsProvider({ children }: { children: ReactNode }) {
  const [equations, setEquations] = useState<Equation[]>([
    { id: 1, formula: "", order: 0 },
    { id: 2, formula: "", order: 1 },
    { id: 3, formula: "", order: 4 },
    { id: 4, formula: "", order: 2 },
    { id: 5, formula: "", order: 3 },
  ]);

  const handleEquationChange = (index: number, value: string) => {
    if (!validateEquation(value)) return;

    setEquations((prev) =>
      prev.map((eq, i) => (i === index ? { ...eq, formula: value } : eq))
    );
  };

  const validateEquation = (value: string) => {
    const validPattern = /^[0-9x\s+\-*/^.]*$/;
    return validPattern.test(value);
  };

  return (
    <EquationsContext.Provider value={{ equations, handleEquationChange }}>
      {children}
    </EquationsContext.Provider>
  );
}
