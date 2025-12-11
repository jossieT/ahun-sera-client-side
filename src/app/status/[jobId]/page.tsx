import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Job Status | AhunSera',
  description: 'Track your service request status',
};

export default function JobStatusPage({ params }: { params: { jobId: string } }) {
  return (
    <div className="container mx-auto max-w-xl p-6 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Booking Status</h1>
        <p className="text-muted-foreground">Job ID: {params.jobId}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-600">Pending Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            We are currently finding the best professional for your request. You will be notified once a tasker accepts.
          </p>
          <Button variant="destructive" className="w-full">Cancel Request</Button>
        </CardContent>
      </Card>
    </div>
  );
}
