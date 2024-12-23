import { useMemo, useState } from "react";
import FunctionCard from "./components/FunctionCard";
import InitialValueInput from "./components/InitialValueInput";

function App() {
  // const [equations, setEquations] = useState<string[]>(Array(5).fill(""));
  const [equations, setEquations] = useState<string[]>([
    "x + 10",
    "x * 2",
    "x - 15",
    "x / 3",
    "x * 2",
  ]);

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...equations];
    newEquations[index] = value;
    setEquations(newEquations);
  };

  const output = useMemo(() => {
    let currentValue: number | string = Number(5);

    for (const eq of equations) {
      try {
        if (eq && typeof currentValue === "number") {
          currentValue = eval(eq.replace("x", String(currentValue)));
        }
      } catch (e) {
        console.log(e);
      }
    }
    return currentValue;
  }, [equations]);

  console.log(output);

  return (
    <div className="flex flex-wrap items-center justify-center gap-[107px]">
      {equations.map((item, i) => (
        <div key={i} className="relative">
          <FunctionCard
            functionNumber={i}
            equation={item}
            handleEquationChange={handleEquationChange}
          />
          {(i === 0 || i === 2) && (
            <InitialValueInput
              headerText="Final Output y"
              rootClassName="absolute bottom-0"
              isOutput={i === 2}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
