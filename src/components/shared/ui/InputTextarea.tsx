import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface InputTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function InputTextarea({ label, error, containerClassName, className, id, ...props }: InputTextareaProps) {
  const inputId = id || React.useId();

  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <Textarea 
        id={inputId} 
        className={cn(error && "border-red-500", className)} 
        {...props} 
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
