import { EquationsContext } from "@/context/EquationsContext";
import { EquationsContextType } from "@/types";
import { useContext } from "react";

function useEquations() {
  const context = useContext<EquationsContextType | undefined>(
    EquationsContext
  );

  if (!context) {
    throw new Error("Context is required");
  }

  return context;
}

export default useEquations;
