import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Home,
  Wrench,
  Zap,
  Paintbrush,
  Truck,
  Droplet,
  Hammer,
  Scissors,
  Package,
  ArrowRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services | AhunSera',
  description: 'Browse all available services on AhunSera',
};

const SERVICES = [
  {
    id: 'home-cleaning',
    name: 'Home Cleaning',
    icon: Home,
    description: 'Professional cleaning services for your home',
    features: ['Deep cleaning', 'Regular maintenance', 'Eco-friendly products'],
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'plumbing',
    name: 'Plumbing',
    icon: Wrench,
    description: 'Expert plumbing repairs and installations',
    features: ['Leak repairs', 'Pipe installation', 'Emergency service'],
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    id: 'electrical',
    name: 'Electrical Work',
    icon: Zap,
    description: 'Licensed electricians for all your electrical needs',
    features: ['Wiring', 'Fixture installation', 'Safety inspections'],
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    id: 'painting',
    name: 'Painting',
    icon: Paintbrush,
    description: 'Interior and exterior painting services',
    features: ['Wall painting', 'Ceiling work', 'Color consultation'],
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'moving',
    name: 'Moving & Delivery',
    icon: Truck,
    description: 'Reliable moving and delivery assistance',
    features: ['Packing help', 'Heavy lifting', 'Local delivery'],
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'plumbing-install',
    name: 'Plumbing Installation',
    icon: Droplet,
    description: 'New plumbing installations and upgrades',
    features: ['Bathroom fixtures', 'Kitchen sinks', 'Water heaters'],
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    icon: Hammer,
    description: 'Custom woodwork and furniture assembly',
    features: ['Furniture assembly', 'Custom builds', 'Repairs'],
    color: 'bg-amber-100 text-amber-600',
  },
  {
    id: 'gardening',
    name: 'Gardening',
    icon: Scissors,
    description: 'Lawn care and garden maintenance',
    features: ['Lawn mowing', 'Trimming', 'Landscaping'],
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    id: 'assembly',
    name: 'Furniture Assembly',
    icon: Package,
    description: 'Professional furniture assembly service',
    features: ['IKEA assembly', 'Office furniture', 'Custom pieces'],
    color: 'bg-orange-100 text-orange-600',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-primary-foreground/90">
              Professional services delivered by verified taskers. Book with confidence.
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              key={service.id}
              className="border-none shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <CardHeader>
                <div
                  className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full group-hover:bg-primary/90">
                  <Link
                    href={`/book?service=${service.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm text-center">
          <h2 className="text-3xl font-bold mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We offer many more services! Contact us to discuss your specific needs and we&apos;ll
            connect you with the right professional.
          </p>
          <Button size="lg" asChild>
            <Link href="/book">Request Custom Service</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
