import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  id: string | number;
  name: string;
  description: string;
  icon?: LucideIcon;
  href?: string;
}

export default function CategoryCard({
  id,
  name,
  description,
  icon: Icon,
  href,
}: CategoryCardProps) {
  const linkHref = href || `/categories/${id}`;

  return (
    <Link href={linkHref}>
      <Card className="hover:shadow-md transition-all hover:border-primary-blue cursor-pointer h-full">
        <CardContent className="p-6 space-y-4">
          <div className="h-12 w-12 rounded-lg bg-[#F1F8FF] flex items-center justify-center text-primary-blue">
            {Icon ? (
              <Icon className="h-6 w-6" />
            ) : (
              <span className="text-xl font-bold">{name[0]}</span>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-dark-text">{name}</h3>
            <p className="text-sm text-medium-text line-clamp-2">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
