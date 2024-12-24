import ConnectionLine from "@/components/ConnectionLine";
import FunctionCard from "@/components/FunctionCard";
import InitialValueInput from "@/components/InitialValueInput";
import { Equation } from "@/types";
import { useMemo, useState } from "react";

function App() {
  const [initialValue, setInitialValue] = useState("");
  const [equations, setEquations] = useState<Equation[]>([
    { id: 1, formula: "", order: 0 },
    { id: 2, formula: "", order: 1 },
    { id: 3, formula: "", order: 4 },
    { id: 4, formula: "", order: 2 },
    { id: 5, formula: "", order: 3 },
  ]);

  const output = useMemo(() => {
    let currentValue = Number(initialValue);

    const orderedEquations = [...equations]
      .sort((a, b) => a.order - b.order)
      .filter((eq) => !!eq.formula);

    for (const eq of orderedEquations) {
      try {
        if (eq) {
          const processedEq = eq.formula
            .replace("x", String(currentValue))
            .replace("^", "**");
          currentValue = eval(processedEq);
        }
      } catch (e) {
        console.log(e);
      }
    }
    return currentValue;
  }, [initialValue, equations]);

  const initialCardIndex = useMemo(
    () => equations.findIndex((eq) => eq.order === 0),
    [equations]
  );

  const outputCardIndex = useMemo(
    () => equations.findIndex((eq) => eq.order === equations.length - 1),
    [equations]
  );

  const validateEquation = (value: string) => {
    const validPattern = /^[0-9x\s+\-*/^.]*$/;
    return validPattern.test(value);
  };

  const handleEquationChange = (index: number, value: string) => {
    if (!validateEquation(value)) return;

    setEquations((prev) =>
      prev.map((eq, i) => (i === index ? { ...eq, formula: value } : eq))
    );
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-[107px] relative py-12">
      <ConnectionLine equations={equations} />
      {equations.map((eq, index) => (
        <div
          key={eq.id}
          id={`function-card-${index}`}
          className="relative z-0 flex"
        >
          <FunctionCard
            functionNumber={index}
            handleEquationChange={handleEquationChange}
            equations={equations}
          />
          {(index === initialCardIndex || index === outputCardIndex) && (
            <InitialValueInput
              isOutput={index === outputCardIndex}
              value={
                index === initialCardIndex
                  ? initialValue
                  : output?.toFixed(1).toString()
              }
              handleInputChange={(value) => setInitialValue(value)}
              nodeId={index === initialCardIndex ? "initial" : "output"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
