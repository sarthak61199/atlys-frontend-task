import ChevronDown from "@/assets/icons/chevron-down.svg";
import { SelectItem } from "@/types";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";

interface SelectProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  label?: string;
  items: SelectItem[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Select({
  className,
  label,
  items,
  value,
  onChange,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedItem = items.find((item) => item.value === value);
    if (selectedItem) {
      setSelectedLabel(selectedItem.label);
    }
  }, [value, items]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: SelectItem) => {
    setSelectedLabel(item.label);
    onChange?.(item.value);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1" ref={dropdownRef}>
      {label && (
        <label htmlFor={label} className="text-[12px]">
          {label}
        </label>
      )}
      <div className="relative">
        <select id={label} name={label} className="hidden" />
        <div
          className={`
            w-full h-[33px] border-[1px] pl-[11px] border-[#D3D3D3] 
            rounded-lg outline-none text-[12px] flex items-center 
            justify-between pr-[11px] cursor-pointer
            ${disabled ? "bg-[#F5F5F5] cursor-default" : "bg-white"}
            ${className}
          `}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          <span className={`${disabled ? "text-[#D3D3D3]" : "bg-white"}`}>
            {selectedLabel}
          </span>
          <img src={ChevronDown} />
        </div>

        {isOpen && !disabled && (
          <div className="absolute w-full mt-1 bg-white border-[1px] border-[#D3D3D3] rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-50">
            {items.map((item) => (
              <div
                key={item.value}
                className={`
                  px-[11px] py-2 text-[12px] cursor-pointer hover:bg-gray-50
                  ${item.value === value ? "bg-gray-100" : ""}
               
                `}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Select;
