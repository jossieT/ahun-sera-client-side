'use client';

import { UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

export function FileUpload() {
  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex flex-col items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
          <UploadCloud className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="text-sm font-medium">Click to upload</div>
        <div className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max. 800x400px)</div>
      </div>
    </div>
  );
}
