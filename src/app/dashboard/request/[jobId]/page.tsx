import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Request Details | AhunSera',
  description: 'View request details',
};

import { use } from 'react';

export default function RequestDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
         <Button variant="ghost" asChild>
          <Link href="/dashboard/requests">← Back</Link>
        </Button>
        <h1 className="text-2xl font-bold">Request #{jobId}</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Type</label>
              <p className="text-lg">Home Cleaning</p>
            </div>
             <div>
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <p className="text-lg font-semibold text-green-600">Confirmed</p>
            </div>
             <div>
              <label className="text-sm font-medium text-muted-foreground">Scheduled For</label>
              <p className="text-lg">Oct 25, 2025 - 10:00 AM</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasker Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200" />
              <div>
                <p className="font-semibold">Abebe B.</p>
                <p className="text-sm text-muted-foreground">Professional Plumber</p>
              </div>
            </div>
            <Button className="w-full" variant="outline">Message Tasker</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
