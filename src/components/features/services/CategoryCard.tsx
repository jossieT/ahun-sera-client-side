import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: string | number;
  name: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  colorVariant?: 'blue' | 'orange' | 'green' | 'purple';
  count?: number;
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50/50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    border: 'hover:border-blue-400',
    accent: 'bg-blue-600',
    shadow: 'hover:shadow-blue-500/10',
    gradient: 'from-blue-500/5 to-transparent',
  },
  orange: {
    bg: 'bg-orange-50/50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    border: 'hover:border-orange-400',
    accent: 'bg-orange-600',
    shadow: 'hover:shadow-orange-500/10',
    gradient: 'from-orange-500/5 to-transparent',
  },
  green: {
    bg: 'bg-emerald-50/50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    border: 'hover:border-emerald-400',
    accent: 'bg-emerald-600',
    shadow: 'hover:shadow-emerald-500/10',
    gradient: 'from-emerald-500/5 to-transparent',
  },
  purple: {
    bg: 'bg-purple-50/50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    border: 'hover:border-purple-400',
    accent: 'bg-purple-600',
    shadow: 'hover:shadow-purple-500/10',
    gradient: 'from-purple-500/5 to-transparent',
  },
};

export default function CategoryCard({
  id,
  name,
  description,
  icon: Icon,
  href,
  colorVariant = 'blue',
  count,
}: CategoryCardProps) {
  const linkHref = href || `/categories/${id}`;
  const theme = colorVariants[colorVariant];

  return (
    <Link href={linkHref} className="block group h-full">
      <Card
        className={cn(
          'relative overflow-hidden transition-all duration-300 h-full border-border/50',
          'hover:-translate-y-2 hover:shadow-xl',
          theme.bg,
          theme.border,
          theme.shadow,
        )}
      >
        {/* Abstract Background Pattern */}
        <div
          className={cn(
            'absolute top-0 right-0 w-32 h-32 bg-linear-to-br rounded-bl-full transition-opacity duration-300 opacity-20 group-hover:opacity-40',
            theme.gradient,
          )}
        />

        <CardContent className="p-8 flex flex-col h-full relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div
              className={cn(
                'h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm',
                theme.iconBg,
                theme.iconColor,
              )}
            >
              <Icon className="h-7 w-7 transition-transform duration-500 group-hover:rotate-360" />
            </div>

            {count !== undefined && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-medium-text/60 bg-white/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/50">
                {count} Pros
              </span>
            )}
          </div>

          <div className="space-y-3 grow">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xl text-dark-text group-hover:text-primary-blue transition-colors">
                {name}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-medium-text group-hover:text-dark-text/80 transition-colors">
              {description}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-border/10 flex items-center justify-between text-primary-blue font-bold text-sm">
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              Browse Services
            </span>
            <div
              className={cn(
                'p-2 rounded-full transition-all duration-300 group-hover:translate-x-1',
                theme.iconColor,
                'group-hover:bg-white/80',
              )}
            >
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
