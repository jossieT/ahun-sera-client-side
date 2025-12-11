import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Wrench, Zap, Paintbrush, Home as HomeIcon } from 'lucide-react';
import CategoryCard from '@/components/features/services/CategoryCard';
import ServiceCard from '@/components/features/services/ServiceCard';

export default function Home() {
  const categories = [
    { id: 1, name: 'Plumbing', description: 'Leak repairs, pipe fitting, and more.', icon: Wrench },
    { id: 2, name: 'Electrical', description: 'Wiring, installations, and repairs.', icon: Zap },
    { id: 3, name: 'Cleaning', description: 'Home, office, and deep cleaning.', icon: HomeIcon },
    { id: 4, name: 'Painting', description: 'Interior and exterior painting services.', icon: Paintbrush },
  ];

  const featuredServices = [
    { id: 101, title: 'Emergency Pipe Repair', description: 'Fixing burst pipes and leaks immediately.', price: 500, rating: 4.8, reviewsCount: 120 },
    { id: 102, title: 'Full Home Cleaning', description: 'Comprehensive cleaning for 2-bedroom apartments.', price: 1200, rating: 4.9, reviewsCount: 85 },
    { id: 103, title: 'Electrical Socket Fix', description: 'Repairing or replacing faulty power outlets.', price: 300, rating: 4.7, reviewsCount: 45 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
            Find Trusted Professionals for Every Task
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From home repairs to cleaning, AhunSera connects you with skilled experts in Ethiopia instantly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto mt-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="What do you need help with?" 
                className="pl-10 h-11 bg-white"
              />
            </div>
            <Button size="lg" className="h-11">Search</Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Popular Categories</h2>
            <p className="text-muted-foreground">Browse services by category</p>
          </div>
          <Link href="/categories" className="text-primary font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-16 px-6 container mx-auto bg-slate-50/50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Featured Services</h2>
          <p className="text-muted-foreground">Top-rated services booked by others</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Are you a skilled professional?</h2>
          <p className="text-primary-foreground/90 text-lg">
            Join AhunSera today and start earning by offering your services to thousands of customers.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/register?type=tasker">Become a Tasker</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
