// common input component to fix the outline

import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import FormTitle from "../forms/components/form-title";

interface InputProps {
    value: string | number;
    setValue: React.Dispatch<any>;
    placeholder?: string | number;
    type?: string;
    reset?: boolean;
    cls?: string;
    containerClassName?: string; 
    disabled?: boolean;
    onKeyDown?: (str: string) => void;
    textarea?: boolean;
    icon?: React.ReactNode; 
    button?: React.ReactNode;
    label?: string;
}

export const resetClass = 'bg-transparent border-none text-sm lg:text-md focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0';

const AppInput: React.FC<InputProps> = ({
    value,
    setValue,
    placeholder,
    type,
    reset = true,
    cls,
    containerClassName, 
    disabled,
    onKeyDown,
    textarea = false,
    icon,
    button,
    label
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const [active, setActive] = React.useState<boolean>(false); 

    return (
        <>
            {label && <FormTitle title={label}/>}
        
            <div className={cn(active ? "border-main-color": "border-transparent", "bg-secondary flex items-center gap-1 px-2 py-[.02rem] pr-[.02rem] border-[.01rem] rounded-lg overflow-hidden", containerClassName)}>
                {icon && icon}
                {textarea ? (
                    <Textarea
                        value={value as string}
                        disabled={disabled}
                        onChange={handleChange}
                        className={cn(`${reset && resetClass} ${cls || ""}`)}
                        placeholder={String(placeholder || "Enter text...")}
                        onBlur={() => setActive(false)}
                        onFocus={() => setActive(true)}
                        onKeyDown={onKeyDown ? (e: any) => onKeyDown(e.target.value): () => {}}
                    />
                ) : (
                    <Input
                        value={value as string}
                        disabled={disabled}
                        onChange={handleChange}
                        type={type || "text"}
                        className={cn(`${reset && resetClass} ${cls || ""}`)}
                        placeholder={String(placeholder || "Enter text...")}
                        onBlur={() => setActive(false)}
                        onFocus={() => setActive(true)}
                        onKeyDown={onKeyDown ? (e: any) => onKeyDown(e.target.value): () => {}}
                    />
                )}
                {button && button}
            </div>
        </>
    );
};

export default AppInput;