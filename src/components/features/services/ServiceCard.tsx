import { Star, Clock, Heart, ShieldCheck, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  id: string | number;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  imageUrl?: string;
  isPopular?: boolean;
  bookedThisWeek?: number;
  isVerified?: boolean;
}

export default function ServiceCard({
  id,
  title,
  description,
  price,
  rating,
  reviewsCount,
  imageUrl,
  isPopular,
  bookedThisWeek,
  isVerified = true,
}: ServiceCardProps) {
  return (
    <div className="group relative h-full">
      <Card className="flex flex-col h-full bg-white border-none shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary-blue/10 transition-all duration-500 overflow-hidden rounded-3xl group-hover:-translate-y-2">
        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-slate-400 font-medium">No Image Available</div>
            </div>
          )}

          {/* Overlays & Badges */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isPopular && (
              <span className="bg-action-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Popular
              </span>
            )}
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-success-green px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm">
              <Clock className="h-3 w-3" /> Available Today
            </div>
          </div>

          <button className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all duration-300 shadow-lg">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        {/* Content Section */}
        <CardContent className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 min-h-[20px]">
                {isVerified && <ShieldCheck className="h-4 w-4 text-primary-blue" />}
                <span className="text-[10px] font-bold text-primary-blue uppercase tracking-widest">
                  {isVerified ? 'Verified Pro' : 'Service'}
                </span>
              </div>
              <h3 className="font-bold text-xl text-dark-text group-hover:text-primary-blue transition-colors line-clamp-1">
                {title}
              </h3>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-dark-text font-bold">
                <Star className="h-4 w-4 fill-warning-amber text-warning-amber" />
                {rating}
              </div>
              <span className="text-[10px] text-medium-text font-medium">
                ({reviewsCount} reviews)
              </span>
            </div>
          </div>

          <p className="text-sm text-medium-text line-clamp-2 mb-6 leading-relaxed">
            {description}
          </p>

          {bookedThisWeek && (
            <div className="mb-6 p-2.5 rounded-2xl bg-slate-50 border border-slate-100/50 flex items-center justify-center gap-2">
              <span className="text-[11px] font-medium text-medium-text">
                Booked <span className="text-dark-text font-bold">{bookedThisWeek} times</span> this
                week
              </span>
            </div>
          )}

          <div className="mt-auto space-y-4">
            <div className="flex items-baseline justify-between gap-2 border-t border-slate-100 pt-4">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-medium-text/60 leading-none mb-1">
                  Price starts at
                </span>
                <span className="text-2xl font-black text-dark-text tracking-tight">
                  {price}
                  <span className="text-sm font-bold text-medium-text ml-1">ETB</span>
                </span>
              </div>

              <Button
                asChild
                className="rounded-2xl bg-primary-blue hover:bg-primary-blue/90 text-white font-bold h-12 px-6 shadow-lg shadow-primary-blue/20"
              >
                <Link href={`/book?service=${id}`} className="flex items-center gap-2">
                  Book Now
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
