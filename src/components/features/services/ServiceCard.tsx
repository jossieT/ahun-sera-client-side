import { Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

interface ServiceCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
}

export default function ServiceCard({ id, title, description, price, rating, reviewsCount }: ServiceCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="h-48 bg-muted rounded-t-lg w-full relative group overflow-hidden">
        {/* Placeholder for Image */}
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gray-200">
          Image Placeholder
        </div>
      </div>
      <CardContent className="flex-1 p-5 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {rating} <span className="text-muted-foreground">({reviewsCount})</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Available Today</span>
        </div>
      </CardContent>
      <CardFooter className="p-5 pt-0 flex items-center justify-between border-t mt-auto pt-4">
        <div>
          <span className="text-sm text-muted-foreground">Starting at</span>
          <p className="font-bold text-lg text-primary">{price} ETB</p>
        </div>
        <Button asChild>
           <Link href={`/book?service=${id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
