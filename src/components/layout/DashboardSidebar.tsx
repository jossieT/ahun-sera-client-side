'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ListOrdered, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: ListOrdered, label: 'My Requests', href: '/dashboard/requests' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'w-64 bg-white border-r min-h-screen flex flex-col fixed md:static z-40 transition-transform duration-300',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        )}
      >
        <div className="p-6 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl">AhunSera</span>
          </Link>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive ? 'bg-primary text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg w-full transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
