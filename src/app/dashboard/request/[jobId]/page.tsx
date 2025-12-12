import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Clock, MessageSquare, ShieldCheck, Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Request Details | AhunSera',
  description: 'View request details',
};

import { use } from 'react';

export default function RequestDetailPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/dashboard/requests">
            <ArrowLeft className="h-4 w-4" /> Back to Requests
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight">Request #{jobId}</h1>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 uppercase">
              Assigned
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1">Created on Oct 24, 2023</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          >
            Cancel Request
          </Button>
          <Button>Contact Support</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Service Type</span>
                  <div className="font-medium text-lg">Home Cleaning</div>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-medium text-muted-foreground">Category</span>
                  <div className="font-medium">Cleaning & Housekeeping</div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="block text-sm font-medium text-muted-foreground">Date</span>
                    <span className="font-medium">Oct 25, 2025</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="block text-sm font-medium text-muted-foreground">Time</span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <span className="block text-sm font-medium text-muted-foreground">
                      Location
                    </span>
                    <span className="font-medium">Bole, Addis Ababa</span>
                    <span className="block text-xs text-muted-foreground">
                      Near Friendship Park
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="h-5 w-5 text-muted-foreground mt-0.5 font-bold text-sm">
                    ETB
                  </span>
                  <div>
                    <span className="block text-sm font-medium text-muted-foreground">
                      Total Price
                    </span>
                    <span className="font-medium text-lg">ETB 500.00</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <span className="text-sm font-medium text-muted-foreground mb-2 block">
                  Task Description
                </span>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg text-sm">
                  I need a full deep clean for a 2 bedroom apartment. Please focus on the kitchen
                  and bathroom explicitly. There is a small dog in the house, so please use pet-safe
                  products if possible.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Assigned Tasker</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400">
                  AB
                </div>
                <div>
                  <div className="font-bold text-lg">Abebe B.</div>
                  <div className="flex items-center text-sm text-yellow-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="ml-1 font-medium text-gray-700">4.9</span>
                    <span className="text-muted-foreground ml-1">(124 jobs)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Identity Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-2 rounded">
                  <Star className="h-4 w-4" />
                  <span>Top Rated Tasker</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Button className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" /> Message
                </Button>
                <Button variant="outline" className="w-full">
                  Call Tasker
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/10 shadow-none">
            <CardContent className="p-4">
              <h4 className="font-semibold text-primary mb-1">Safety First</h4>
              <p className="text-xs text-muted-foreground">
                Always keep communications within the AhunSera platform for your safety and
                protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
