import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wrench, Zap, Paintbrush, Home as HomeIcon, ArrowRight } from 'lucide-react';
import CategoryCard from '@/components/features/services/CategoryCard';
import ServiceCard from '@/components/features/services/ServiceCard';
import Hero from '@/components/layout/Hero';

export default function Home() {
  const categories = [
    {
      id: 1,
      name: 'Plumbing',
      description: 'Expert leak repairs, pipe fitting, and bathroom installations.',
      icon: Wrench,
      colorVariant: 'blue' as const,
      count: 124,
    },
    {
      id: 2,
      name: 'Electrical',
      description: 'Professional wiring, safe installations, and circuit repairs.',
      icon: Zap,
      colorVariant: 'orange' as const,
      count: 86,
    },
    {
      id: 3,
      name: 'Cleaning',
      description: 'Complete home, office, and specialized deep cleaning services.',
      icon: HomeIcon,
      colorVariant: 'green' as const,
      count: 242,
    },
    {
      id: 4,
      name: 'Painting',
      description: 'High-quality interior, exterior, and decorative painting.',
      icon: Paintbrush,
      colorVariant: 'purple' as const,
      count: 65,
    },
  ];

  const featuredServices = [
    {
      id: 101,
      title: 'Emergency Pipe Repair',
      description:
        'Expert fixing of burst pipes, leaks, and urgent plumbing issues with 1-hour response time.',
      price: 500,
      rating: 4.8,
      reviewsCount: 124,
      imageUrl: '/images/ethiopian-plumber-hero.png', // Using existing asset
      isPopular: true,
      bookedThisWeek: 42,
    },
    {
      id: 102,
      title: 'Post-Construction Cleaning',
      description: 'Deep, comprehensive cleaning for newly built or renovated homes and offices.',
      price: 1500,
      rating: 4.9,
      reviewsCount: 96,
      imageUrl:
        'https://images.unsplash.com/photo-1581578731548-c64695cc6954?auto=format&fit=crop&q=80&w=800',
      bookedThisWeek: 28,
    },
    {
      id: 103,
      title: 'Full Home Electrical Audit',
      description:
        'Comprehensive safety check and repair of all electrical points and wiring systems.',
      price: 800,
      rating: 4.7,
      reviewsCount: 65,
      imageUrl:
        'https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=800',
      isPopular: true,
      bookedThisWeek: 15,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Categories Section */}
      <section className="py-24 px-6 container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 underline-offset-8">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-text tracking-tight">
            Popular <span className="text-primary-blue">Categories</span>
          </h2>
          <p className="text-lg text-medium-text">
            Connect with the best home service professionals in your area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}

          {/* View All / Explore More Card */}
          <Link
            href="/categories"
            className="md:col-span-2 group relative overflow-hidden rounded-3xl bg-dark-text p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-blue/20"
          >
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Need something else?
              </h3>
              <p className="text-white/70 text-lg">
                Explore our full list of 50+ service categories and find exactly what you need.
              </p>
            </div>
            <Button
              size="lg"
              className="relative z-10 bg-primary-blue text-white rounded-full px-8 py-6 text-lg font-bold group-hover:scale-105 transition-transform"
            >
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Dark background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue/10 rounded-full blur-3xl -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-deep-teal/10 rounded-full blur-3xl -ml-20 -mb-20" />
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-dark-text tracking-tight">
              Featured <span className="text-action-orange">Services</span>
            </h2>
            <p className="text-lg text-medium-text">
              Top-rated experts recommended by the community for quality and reliability.
            </p>
          </div>
          <Button
            variant="outline"
            asChild
            className="rounded-full px-8 py-6 border-slate-200 text-slate-600 hover:text-primary-blue hover:border-primary-blue font-bold"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
