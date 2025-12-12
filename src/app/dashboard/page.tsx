'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Activity,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { formatDistanceToNow } from 'date-fns';

interface Booking {
  id: string;
  service_type: string;
  status: string;
  created_at: string;
  scheduled_at?: string;
  total_price?: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0, totalSpent: 0 });
  const [recentActivity, setRecentActivity] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all bookings for the user
        const { data: bookings, error } = await supabase
          .from('bookings')
          .select('id, service_type, status, created_at, scheduled_at, price')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        if (bookings && bookings.length > 0) {
          // Calculate stats from real data
          const total = bookings.length;
          const active = bookings.filter(
            (b) => b.status === 'pending' || b.status === 'assigned' || b.status === 'in_progress',
          ).length;
          const completed = bookings.filter((b) => b.status === 'completed').length;
          const totalSpent = bookings
            .filter((b) => b.status === 'completed')
            .reduce((sum, b) => sum + (Number(b.price) || 0), 0);

          setStats({ total, active, completed, totalSpent });
          setRecentActivity(bookings.slice(0, 3));
        } else {
          // No bookings yet - set to zero
          setStats({ total: 0, active: 0, completed: 0, totalSpent: 0 });
          setRecentActivity([]);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err instanceof Error ? err.message : err);
        // Set empty state on error
        setStats({ total: 0, active: 0, completed: 0, totalSpent: 0 });
        setRecentActivity([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [user]);

  const STATS = [
    {
      label: 'Total Bookings',
      value: stats.total,
      icon: CalendarDays,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Active Requests',
      value: stats.active,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Total Spent',
      value: stats.totalSpent > 0 ? `ETB ${stats.totalSpent.toLocaleString()}` : 'ETB 0',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <Button
          asChild
          className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
        >
          <Link href="/book" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Booking
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <Card
            key={stat.label}
            className="border-none shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <div className={`${stat.bg} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activity
            </h2>
            <Link
              href="/dashboard/requests"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <Card className="border-none shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {recentActivity.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    <p>No recent activity.</p>
                    <p className="text-sm mt-2">Book your first service to get started!</p>
                  </div>
                ) : (
                  recentActivity.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900 capitalize">
                          {item.service_type.replace(/_/g, ' ')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            item.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : item.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Promo / Banner Area */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white p-8 shadow-lg">
          <div className="relative z-10 space-y-4">
            <h3 className="text-2xl font-bold">Get 20% off your next cleaning!</h3>
            <p className="text-primary-foreground/90 max-w-sm">
              Use code{' '}
              <span className="font-mono font-bold bg-white/20 px-2 py-1 rounded">CLEAN20</span>{' '}
              when you book a home cleaning service this week.
            </p>
            <Button variant="secondary" className="mt-4" asChild>
              <Link href="/book">Book Now</Link>
            </Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-black/10 blur-xl" />
        </div>
      </div>
    </div>
  );
}
