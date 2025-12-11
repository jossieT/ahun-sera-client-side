'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Schedule Your Service</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Input type="time" id="time" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="Enter your full address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="details">Job Details</Label>
          <Textarea 
            id="details" 
            placeholder="Describe the issue in detail..." 
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size="lg">Review Booking</Button>
      </CardFooter>
    </Card>
  );
}
