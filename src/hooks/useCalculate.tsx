import { useContext } from "react";
import { CalculateContext } from "../context/CalculationContext";

export const useCalculate = () => {
  return useContext(CalculateContext);
};
