import ConnectionLine from "@/components/ConnectionLine";
import FunctionCard from "@/components/FunctionCard";
import InitialValueInput from "@/components/InitialValueInput";
import useEquations from "@/hooks/useEquations";
import { useMemo, useState } from "react";

function App() {
  const [initialValue, setInitialValue] = useState("");
  const { equations } = useEquations();

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

  return (
    <div className="flex flex-wrap items-center justify-center gap-[107px] relative py-12">
      <ConnectionLine />
      {equations.map((eq, index) => (
        <div
          key={eq.id}
          id={`function-card-${index}`}
          className="relative z-0 flex"
        >
          <FunctionCard functionNumber={index} />
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
