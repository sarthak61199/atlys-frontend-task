import FunctionCardIcon from "../assets/icons/function-card-icon.svg";
import ConnectionNode from "./ui/ConnectionNode";
import Input from "./ui/Input";

function FunctionCard({
  functionNumber,
  equation,
  handleEquationChange,
}: {
  functionNumber: number;
  equation: string;
  handleEquationChange: (index: number, value: string) => void;
}) {
  return (
    <div className="bg-white shadow-md max-w-[235px] h-[251px] px-5 pt-[15px] pb-[20px] rounded-[15px] border-[1px] border-[#DFDFDF]">
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
        <Input label="Next Function" />
      </form>
      <div className="flex justify-between mt-[46px]">
        <div className="flex items-center gap-1">
          <ConnectionNode />
          <span>input</span>
        </div>
        <div className="flex items-center gap-1">
          <ConnectionNode />
          <span>output</span>
        </div>
      </div>
    </div>
  );
}

export default FunctionCard;
