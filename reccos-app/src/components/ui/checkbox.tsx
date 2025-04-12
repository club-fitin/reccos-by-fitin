"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  checked?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, id, checked, onChange, ...props }, ref) => {
    return (
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={cn("h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500", className)}
        {...props}
      />
    )
  }
)

Checkbox.displayName = "Checkbox"

export { Checkbox } 