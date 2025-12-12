import DashboardSidebar from '@/components/layout/DashboardSidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 md:ml-0">{children}</main>
      </div>
    </ProtectedRoute>
  );
}
