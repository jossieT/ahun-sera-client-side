import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Category Details | AhunSera',
  description: 'View services within this category',
};

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Category {params.id} Services</h1>
        <Button variant="outline" asChild>
          <Link href="/categories">Back to Categories</Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {[1, 2, 3].map((service) => (
          <Card key={service}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Service Type {service}</span>
                <span className="text-sm font-normal text-muted-foreground">Starting at 500 ETB</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <p className="text-muted-foreground">Detailed description of service type {service}.</p>
              <Button asChild>
                <Link href="/book">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
