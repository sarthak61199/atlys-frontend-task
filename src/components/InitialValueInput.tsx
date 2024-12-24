import ConnectionNode from "@/components/ConnectionNode";
import Input from "@/components/ui/Input";

interface InitialValueInputProps {
  isOutput?: boolean;
  handleInputChange?: (value: string) => void;
  value: string;
  nodeId: string;
}

function InitialValueInput({
  isOutput = false,
  handleInputChange,
  value,
  nodeId,
}: InitialValueInputProps) {
  return (
    <div
      className={`w-[115px] flex flex-col gap-[10px] absolute bottom-0 ${
        isOutput ? "-right-[124px]" : "-left-[124px]"
      }`}
    >
      <div
        className={`rounded-[14px] py-[3px] ${
          isOutput ? "bg-[#4CAF79]" : "bg-[#E29A2D]"
        }`}
      >
        <p className="text-[12px] text-center text-white">
          {isOutput ? "Final Output y" : "Initial value of x"}
        </p>
      </div>
      <div
        className={`flex items-center border-[2px] rounded-[15px] h-[50px] overflow-hidden ${
          isOutput ? "border-[#2DD179]" : "border-[#FFC267]"
        }`}
      >
        <div className={`h-full flex ${isOutput && "flex-row-reverse"}`}>
          <Input
            className={`border-none h-full text-lg font-bold ${
              isOutput && "text-right pr-[11px] pl-0"
            }`}
            readOnly={isOutput}
            onChange={(e) => handleInputChange?.(e.target.value)}
            value={value}
          />
          <div
            className={`flex justify-center bg-white items-center pr-[14px] pl-[15px] ${
              isOutput
                ? "border-r-[1px] border-[#C5F2DA]"
                : "border-l-[1px] border-[#FFEED5]"
            }`}
            id={nodeId}
          >
            <ConnectionNode />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialValueInput;
