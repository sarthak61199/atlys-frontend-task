import { InputHTMLAttributes } from "react";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ className, label, ...props }: CustomInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={label} className="text-[12px]">
          {label}
        </label>
      )}
      <input
        name={label}
        id={label}
        className={`w-full h-[33px] border-[1px] pl-[11px] border-[#D3D3D3] rounded-lg outline-none text-[12px] ${className}`}
        {...props}
      />
    </div>
  );
}

export default Input;
