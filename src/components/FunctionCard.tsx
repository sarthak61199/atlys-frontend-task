import GripHorizontal from "@/assets/icons/grip-horizontal.svg";
import ConnectionNode from "@/components/ConnectionNode";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import useEquations from "@/hooks/useEquations";
import { generateNextFunctionDropdownList } from "@/utils";

interface FunctionCardProps {
  functionNumber: number;
}

function FunctionCard({ functionNumber }: FunctionCardProps) {
  const { equations, handleEquationChange } = useEquations();
  const nextFunctionDropdownList = generateNextFunctionDropdownList(equations);

  return (
    <div className="bg-white shadow-md max-w-[235px] px-5 pt-[15px] rounded-[15px] border-[1px] border-[#DFDFDF]">
      <div className="flex gap-[6px] items-center mb-5">
        <img src={GripHorizontal} />
        <span className="text-[#A5A5A5]">Function: {functionNumber + 1}</span>
      </div>
      <form className="flex flex-col gap-[17px]">
        <Input
          label="Equation"
          value={equations[functionNumber].formula}
          onChange={(e) => handleEquationChange(functionNumber, e.target.value)}
        />
        <Select
          label="Next Function"
          items={nextFunctionDropdownList}
          disabled
          value={nextFunctionDropdownList[functionNumber]?.value}
        />
      </form>
      <div className="flex justify-between mt-[46px] pb-[17px]">
        <div className="flex items-center gap-1 connection-node-container">
          <ConnectionNode />
          <span className="text-[#585757] text-[10px]">input</span>
        </div>
        <div className="flex items-center gap-1 connection-node-container">
          <span className="text-[#585757] text-[10px]">output</span>
          <ConnectionNode />
        </div>
      </div>
    </div>
  );
}

export default FunctionCard;
