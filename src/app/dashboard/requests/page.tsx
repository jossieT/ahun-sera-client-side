'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search, Filter, Eye, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';

interface Booking {
  id: string;
  service_type: string;
  status: string;
  created_at: string;
  scheduled_at?: string;
  price?: number;
  location?: string;
  provider_name?: string;
}

export default function RequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchRequests() {
      if (!user) {
        setLoading(false);
        return;
      }

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

  const filteredRequests = requests.filter(
    (req) =>
      req.service_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.status.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Requests</h1>
          <p className="text-muted-foreground mt-1">Manage and track your service history.</p>
        </div>
        <Button asChild>
          <Link href="/book">New Booking</Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search requests..."
            className="pl-8 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {filteredRequests.length === 0 ? (
        <Card className="border-none shadow-sm">
          <div className="p-12 text-center text-muted-foreground">
            <p className="text-lg font-medium">No requests found</p>
            <p className="text-sm mt-2">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Book your first service to get started!'}
            </p>
            {!searchQuery && (
              <Button asChild className="mt-4">
                <Link href="/book">Book a Service</Link>
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          <Card className="border-none shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-medium">Service Type</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                    <th className="px-6 py-4 font-medium text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex flex-col">
                          <span className="capitalize">{req.service_type.replace(/_/g, ' ')}</span>
                          {req.location && (
                            <span className="text-xs text-muted-foreground font-normal">
                              {req.location}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            req.status === 'completed'
                              ? 'default'
                              : req.status === 'pending'
                              ? 'secondary'
                              : req.status === 'assigned'
                              ? 'outline'
                              : 'destructive'
                          }
                          className={`
                            capitalize font-normal
                            ${
                              req.status === 'completed' &&
                              'bg-green-100 text-green-700 hover:bg-green-100 border-green-200'
                            }
                            ${
                              req.status === 'pending' &&
                              'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200'
                            }
                            ${
                              req.status === 'assigned' &&
                              'bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200'
                            }
                            ${
                              req.status === 'cancelled' &&
                              'bg-red-100 text-red-700 hover:bg-red-100 border-red-200'
                            }
                          `}
                        >
                          {req.status.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(req.scheduled_at || req.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-900">
                        {req.price ? `ETB ${Number(req.price).toLocaleString()}` : 'Pending'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-gray-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/request/${req.id}`}
                                className="flex items-center gap-2 cursor-pointer w-full"
                              >
                                <Eye className="h-4 w-4" /> View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Report Issue</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {filteredRequests.length} of {requests.length} requests
            </div>
          </div>
        </>
      )}
    </div>
  );
}
