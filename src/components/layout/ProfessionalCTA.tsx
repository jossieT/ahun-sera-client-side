'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { TrendingUp, Wallet, Star, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ProfessionalCTA() {
  const benefits = [
    {
      title: 'Get More Customers',
      description: 'Reach thousands seeking your services daily.',
      icon: TrendingUp,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      title: 'Secure Payments',
      description: 'Get paid reliably and on time for every job.',
      icon: Wallet,
      color: 'text-emerald-500',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Build Your Reputation',
      description: 'Earn reviews that grow your service business.',
      icon: Star,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
    },
    {
      title: 'Work Flexibly',
      description: 'Choose when and where you want to work.',
      icon: Clock,
      color: 'text-purple-500',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <section className="py-24 px-6 container mx-auto overflow-hidden">
      <div className="relative rounded-[2.5rem] bg-dark-text overflow-hidden shadow-2xl group">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-action-orange/10 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="flex flex-col lg:flex-row relative z-10">
          {/* Content Left */}
          <div className="flex-1 p-8 md:p-16 lg:p-20">
            <div className="inline-flex items-center gap-2 bg-primary-blue/20 text-primary-blue px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <ShieldCheck className="w-4 h-4" />
              Pro Network
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
              Grow Your Service <span className="text-primary-blue">Business</span>
            </h2>

            <p className="text-lg text-white/70 mb-12 max-w-xl leading-relaxed">
              Join Ethiopia&apos;s most trusted network of home service professionals. Turn your
              expertise into a thriving business with AhunSera&apos;s professional-first platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex gap-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-2xl ${benefit.bg} flex items-center justify-center transition-transform hover:scale-110 hover:rotate-3`}
                  >
                    <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">{benefit.title}</h4>
                    <p className="text-white/50 text-sm leading-tight">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary-blue hover:bg-primary-blue/90 text-white rounded-2xl px-10 py-7 text-lg font-bold shadow-xl shadow-primary-blue/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Link href="/register?type=provider">Join as a Professional</Link>
                </Button>
                <div className="flex items-center gap-2 text-white/40 text-xs justify-center sm:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success-green" />
                  Free registration. No hidden fees.
                </div>
              </div>

              <div className="flex flex-col items-center sm:items-start gap-3">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-dark-text bg-slate-200 overflow-hidden relative"
                    >
                      <Image
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`}
                        alt="Pro"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-dark-text bg-white/10 backdrop-blur-md flex items-center justify-center text-[10px] font-bold text-white">
                    +500
                  </div>
                </div>
                <p className="text-xs text-white/40 text-center sm:text-left">
                  Already <span className="text-white font-medium">500+ professionals</span> earning
                  today
                </p>
              </div>
            </div>
          </div>

          {/* Image Right */}
          <div className="lg:w-[40%] relative min-h-[400px] lg:min-h-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-dark-text via-dark-text/40 to-transparent z-10 hidden lg:block" />
            <div className="absolute inset-0 bg-linear-to-t from-dark-text via-transparent to-transparent z-10 lg:hidden" />
            <Image
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200"
              alt="Professional at work"
              fill
              className="object-cover grayscale-30 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
