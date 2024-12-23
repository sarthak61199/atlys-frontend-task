import ConnectionNode from "./ui/ConnectionNode";
import Input from "./ui/Input";

function InitialValueInput({
  headerText,
  rootClassName = "",
  isOutput = false,
}: {
  headerText: string;
  rootClassName?: string;
  isOutput?: boolean;
}) {
  return (
    <div
      className={`w-[115px] flex flex-col gap-[10px] ${
        isOutput ? "-right-[124px]" : "-left-[124px]"
      } ${rootClassName}`}
    >
      <div
        className={`rounded-[14px] ${
          isOutput ? "bg-[#4CAF79]" : "bg-[#E29A2D]"
        }`}
      >
        <p className="text-[12px] text-center text-white">{headerText}</p>
      </div>
      <div
        className={`flex items-center border-[2px] rounded-[15px] overflow-hidden ${
          isOutput ? "border-[#2DD179]" : "border-[#FFC267]"
        }`}
      >
        <div className={`h-full flex ${isOutput && "flex-row-reverse"}`}>
          <Input className="border-0" readOnly={isOutput} />
          <div
            className={`border-[#FFEED5] flex justify-center items-center pr-[14px] pl-[15px] ${
              isOutput ? "border-r-[1px]" : "border-l-[1px]"
            } ${isOutput ? "border-[#C5F2DA]" : "border-[#FFEED5]"}`}
          >
            <ConnectionNode />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InitialValueInput;
