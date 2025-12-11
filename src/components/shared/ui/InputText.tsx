import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function InputText({ label, error, containerClassName, className, id, ...props }: InputTextProps) {
  const inputId = id || React.useId();

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Input 
        id={inputId} 
        className={cn(error && "border-red-500", className)} 
        {...props} 
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
