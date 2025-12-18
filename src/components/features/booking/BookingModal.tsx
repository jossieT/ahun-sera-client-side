'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import BookingForm from './BookingForm';

interface BookingModalProps {
  trigger: React.ReactNode;
  onSuccess?: () => void;
  title?: string;
}

export default function BookingModal({
  trigger,
  onSuccess,
  title = 'Book a Service',
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Wait for mount to avoid hydration mismatch on generated IDs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{trigger}</>;
  }

  const handleSuccess = () => {
    setIsOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <BookingForm onSuccess={handleSuccess} isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
