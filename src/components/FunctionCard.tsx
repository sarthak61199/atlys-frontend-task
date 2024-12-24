import FunctionCardIcon from "../assets/icons/function-card-icon.svg";
import { SelectItem } from "../types";
import ConnectionNode from "./ui/ConnectionNode";
import Input from "./ui/Input";
import Select from "./ui/Select";

function FunctionCard({
  functionNumber,
  equation,
  handleEquationChange,
  items,
}: {
  functionNumber: number;
  equation: string;
  handleEquationChange: (index: number, value: string) => void;
  items: SelectItem[];
}) {
  return (
    <div className="bg-white shadow-md max-w-[235px] px-5 pt-[15px] rounded-[15px] border-[1px] border-[#DFDFDF]">
      <div className="flex gap-[6px] items-center mb-5">
        <img src={FunctionCardIcon} />
        <span className="text-[#A5A5A5]">Function: {functionNumber + 1}</span>
      </div>
      <form className="flex flex-col gap-[17px]">
        <Input
          label="Equation"
          value={equation}
          onChange={(e) => handleEquationChange(functionNumber, e.target.value)}
        />
        <Select
          label="Next Function"
          items={items}
          disabled
          value={items[functionNumber]?.value}
        />
      </form>
      <div className="flex justify-between mt-[46px] pb-[17px]">
        <div className="flex items-center gap-1">
          <ConnectionNode />
          <span className="text-[#585757] text-[10px]">input</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#585757] text-[10px]">output</span>
          <ConnectionNode />
        </div>
      </div>
    </div>
  );
}

export default FunctionCard;
