import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonPrimaryProps extends ButtonProps {
  isLoading?: boolean;
}

export function ButtonPrimary({ children, isLoading, className, ...props }: ButtonPrimaryProps) {
  return (
    <Button 
      className={cn("font-medium", className)} 
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
