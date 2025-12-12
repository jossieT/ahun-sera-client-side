import { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Service Categories | AhunSera',
  description: 'Browse available service categories',
};

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Service Categories</h1>
        <p className="text-muted-foreground">Find the right professional for your needs</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Category {i}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-24 bg-muted rounded-md w-full flex items-center justify-center">
                Icon Placeholder
              </div>
              <p className="text-sm text-muted-foreground">
                Description for category {i}. Cleaning, repairs, and more.
              </p>
              <Button asChild className="w-full">
                <Link href={`/categories/${i}`}>View Services</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
