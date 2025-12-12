

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        setRequests(data || []);
      } catch (err) {
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [user]);

  if (loading) return <div className="flex h-96 items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="container mx-auto p-6 space-y-6">
       <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Requests</h1>
      </div>
      
      <div className="space-y-4">
        {requests.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">You haven't made any requests yet.</p>
        ) : (
          requests.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg capitalize">{booking.service_type}</h3>
                  <p className="text-sm text-muted-foreground">Status: <span className="font-medium capitalize">{booking.status.replace('_', ' ')}</span></p>
                  <p className="text-sm text-muted-foreground">Scheduled: {new Date(booking.scheduled_at).toLocaleDateString()}</p>
                </div>
                <Button asChild>
                  <Link href={`/status/${booking.id}`}>Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
