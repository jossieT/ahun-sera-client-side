import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Requests | AhunSera',
  description: 'View all your service requests',
};

export default function RequestsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Requests</h1>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">Electrical Maintenance</h3>
                <p className="text-sm text-muted-foreground">Status: <span className="text-yellow-600 font-medium">In Progress</span></p>
                <p className="text-sm text-muted-foreground">Date: Oct 24, 2024</p>
              </div>
              <Button asChild>
                <Link href={`/dashboard/request/${i}`}>Details</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
