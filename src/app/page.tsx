import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wrench, Zap, Paintbrush, Home as HomeIcon } from 'lucide-react';
import CategoryCard from '@/components/features/services/CategoryCard';
import ServiceCard from '@/components/features/services/ServiceCard';
import Hero from '@/components/layout/Hero';

export default function Home() {
  const categories = [
    { id: 1, name: 'Plumbing', description: 'Leak repairs, pipe fitting, and more.', icon: Wrench },
    { id: 2, name: 'Electrical', description: 'Wiring, installations, and repairs.', icon: Zap },
    { id: 3, name: 'Cleaning', description: 'Home, office, and deep cleaning.', icon: HomeIcon },
    {
      id: 4,
      name: 'Painting',
      description: 'Interior and exterior painting services.',
      icon: Paintbrush,
    },
  ];

  const featuredServices = [
    {
      id: 101,
      title: 'Emergency Pipe Repair',
      description: 'Fixing burst pipes and leaks immediately.',
      price: 500,
      rating: 4.8,
      reviewsCount: 120,
    },
    {
      id: 102,
      title: 'Full Home Cleaning',
      description: 'Comprehensive cleaning for 2-bedroom apartments.',
      price: 1200,
      rating: 4.9,
      reviewsCount: 85,
    },
    {
      id: 103,
      title: 'Electrical Socket Fix',
      description: 'Repairing or replacing faulty power outlets.',
      price: 300,
      rating: 4.7,
      reviewsCount: 45,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 px-6 container mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-dark-text">Popular Categories</h2>
            <p className="text-medium-text">Browse services by category</p>
          </div>
          <Link href="/categories" className="text-primary-blue font-medium hover:underline">
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
      <section className="py-16 px-6 container mx-auto bg-light-background/50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 text-dark-text">Featured Services</h2>
          <p className="text-medium-text">Top-rated services booked by others</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary-blue text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Are you a skilled professional?</h2>
          <p className="text-white/90 text-lg">
            Join AhunSera today and start earning by offering your services to thousands of
            customers.
          </p>
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="bg-white text-primary-blue hover:bg-gray-100"
          >
            <Link href="/register?type=tasker">Become a Tasker</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
