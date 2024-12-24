import ConnectionLine from "@/components/ConnectionLine";
import FunctionCard from "@/components/FunctionCard";
import InitialValueInput from "@/components/InitialValueInput";
import { Equation } from "@/types";
import { generateNextFunctionDropdownList } from "@/utils";
import { useMemo, useState } from "react";

function App() {
  const [equations, setEquations] = useState<Equation[]>([
    { id: 1, formula: "", order: 0 },
    { id: 2, formula: "", order: 1 },
    { id: 3, formula: "", order: 4 },
    { id: 4, formula: "", order: 2 },
    { id: 5, formula: "", order: 3 },
  ]);
  const [initialValue, setInitialValue] = useState("");

  const output = useMemo(() => {
    let currentValue: number = Number(initialValue);

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

  const handleEquationChange = (index: number, value: string) => {
    setEquations((prev) =>
      prev.map((eq, i) => (i === index ? { ...eq, formula: value } : eq))
    );
  };

  const nextFunctionDropdownList = generateNextFunctionDropdownList(equations);

  return (
    <div className="flex flex-wrap items-center justify-center gap-[107px] relative py-12">
      <ConnectionLine equations={equations} />
      {equations.map((item, i) => (
        <div key={i} id={`function-card-${i}`} className="relative z-0">
          <FunctionCard
            functionNumber={i}
            equation={item.formula}
            handleEquationChange={handleEquationChange}
            items={nextFunctionDropdownList}
          />
          {(i === 0 || i === 2) && (
            <InitialValueInput
              rootClassName="absolute bottom-0"
              isOutput={i === 2}
              value={i === 0 ? initialValue : output?.toFixed(2).toString()}
              handleInputChange={(value) => setInitialValue(value)}
              nodeId={i === 0 ? "initial" : "output"}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
