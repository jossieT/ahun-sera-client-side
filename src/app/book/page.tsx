import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const metadata: Metadata = {
  title: 'Book a Service | AhunSera',
  description: 'Schedule your service appointment',
};

export default function BookingPage() {
  return (
    <div className="container mx-auto max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Service Details</label>
            <div className="p-4 bg-muted rounded-md text-sm">
              Selected: Plumbing Repair
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date & Time</label>
              <Input type="datetime-local" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="Enter your address" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Describe the issue..." />
            </div>
          </div>

          <Button className="w-full" size="lg">Confirm Booking</Button>
        </CardContent>
      </Card>
    </div>
  );
}
