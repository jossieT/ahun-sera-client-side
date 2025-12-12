'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ChatAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button 
          size="icon" 
          className="h-12 w-12 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 shadow-xl border-primary/20">
          <CardHeader className="p-4 border-b flex flex-row items-center justify-between bg-primary text-primary-foreground rounded-t-lg">
            <h3 className="font-semibold">Support Assistant</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-80 p-4 overflow-y-auto bg-slate-50">
             <div className="flex justify-start">
               <div className="bg-white border p-3 rounded-lg rounded-tl-none text-sm max-w-[80%] shadow-sm">
                 Hello! How can I help you find a service today?
               </div>
             </div>
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form className="flex w-full gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon" type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
