'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  User, 
  Phone, 
  Star, 
  MapPin, 
  Loader2 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Types
interface Worker {
  name: string;
  phone: string;
  rating: number;
  avatar?: string;
}

interface JobStatus {
  id: string;
  status: 'REQUESTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  serviceType: string;
  createdAt: string;
  worker: Worker | null;
}

const STEPS = [
  { id: 'REQUESTED', label: 'Request Received', description: 'We are looking for a professional.' },
  { id: 'ASSIGNED', label: 'Tasker Assigned', description: 'A professional has accepted your request.' },
  { id: 'IN_PROGRESS', label: 'Work In Progress', description: 'The task is currently being performed.' },
  { id: 'COMPLETED', label: 'Job Completed', description: 'The service has been successfully completed.' },
];

const getStepIndex = (status: string) => {
  return STEPS.findIndex(step => step.id === status);
};

import { use } from 'react';

export default function JobStatusPage({ params }: { params: Promise<{ jobId: string }> }) {
  const resolvedParams = use(params);
  const { data: job, isLoading, error } = useQuery<JobStatus>({
    queryKey: ['jobStatus', resolvedParams.jobId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/bookings/${resolvedParams.jobId}`);
      return data;
    },
    refetchInterval: 10000,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading booking details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center text-red-600">
          <Clock className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-semibold">Failed to load booking</h2>
        <p className="text-muted-foreground">We couldn't retrieve the status for this job.</p>
        <Button asChild variant="outline">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const currentStepIndex = getStepIndex(job.status);

  return (
    <div className="container mx-auto max-w-3xl p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking #{job.id}</h1>
          <p className="text-muted-foreground">Service: {job.serviceType}</p>
        </div>
        <Badge variant={job.status === 'COMPLETED' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
          {job.status.replace('_', ' ')}
        </Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
          <div className="flex items-center gap-4">
            <Progress value={job.progress} className="h-2 flex-grow" />
            <span className="font-bold text-lg">{job.progress}%</span>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Timeline Section */}
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-muted before:to-transparent">
                {STEPS.map((step, index) => {
                  const isCompleted = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div key={step.id} className="relative flex gap-6 pb-2">
                      <div className={`absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full border bg-background shadow-sm transition-colors ${isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-muted text-muted-foreground'}`}>
                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                      </div>
                      <div className="pt-1.5 pl-12">
                        <h3 className={`font-semibold leading-none mb-1 ${isCurrent ? 'text-primary' : ''}`}>
                          {step.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Worker Info & Actions Sidebar */}
        <div className="space-y-6">
          {job.worker ? (
            <Card>
              <CardHeader>
                <CardTitle>Assigned Professional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={job.worker.avatar} />
                    <AvatarFallback>{job.worker.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{job.worker.name}</p>
                    <div className="flex items-center text-sm text-yellow-600">
                      <Star className="h-3 w-3 fill-current mr-1" />
                      {job.worker.rating} Rating
                    </div>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Phone className="h-4 w-4" />
                    Call Tasker
                  </Button>
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <User className="h-4 w-4" />
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
             <Card className="bg-muted/50 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="font-medium">Finding the best match...</p>
                <p className="text-xs text-muted-foreground">We are contacting nearby professionals.</p>
              </CardContent>
             </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>Bole, Addis Ababa</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span>{new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
          
          <Button variant="destructive" className="w-full" disabled={job.status === 'COMPLETED'}>
            Cancel Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
