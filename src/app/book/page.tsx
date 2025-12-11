import { Metadata } from 'next';
import BookingForm from '@/components/features/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Service | AhunSera',
  description: 'Schedule your service appointment',
};

export default function BookingPage() {
  return (
    <div className="container mx-auto max-w-4xl p-6 py-12">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-3xl font-bold">Complete Your Booking</h1>
        <p className="text-muted-foreground">Fill in the details below to schedule your service.</p>
      </div>
      <BookingForm />
    </div>
  );
}
