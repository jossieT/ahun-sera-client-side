'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShieldCheck, Star } from 'lucide-react';
import BookingModal from '@/components/features/booking/BookingModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-light-background to-white pb-20 pt-10 md:pt-20 lg:pb-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left pt-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-medium text-primary-blue ring-1 ring-inset ring-blue-100">
              <ShieldCheck className="h-4 w-4" />
              <span>Trusted by 500+ Households in Addis</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-dark-text sm:text-5xl md:text-6xl lg:leading-tight">
              Find Trusted Experts for Every <span className="text-primary-blue">Home Task</span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg text-medium-text lg:mx-0">
              Connect with skilled professionals in your neighborhood for plumbing, cleaning,
              electrical repairs, and more. Quality service, guaranteed.
            </p>

            <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 sm:flex-row lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="w-full sm:w-[180px]">
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="h-12 bg-white border-border text-dark-text focus:ring-primary-blue">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="moving">Moving</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-medium-text" />
                  <Input
                    type="text"
                    placeholder="What do you need help with?"
                    className="h-12 w-full border-border bg-white pl-10 focus:border-primary-blue focus:ring-primary-blue"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <BookingModal
                  trigger={
                    <Button className="h-12 rounded-lg bg-primary-blue px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all w-full sm:w-auto">
                      Find a Pro
                    </Button>
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-8 pt-4 lg:justify-start grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {['JD', 'MK', 'AB'].map((initials, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-xs font-bold text-primary-blue"
                    >
                      {initials}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium text-medium-text">
                  <span className="font-bold text-dark-text">500+</span> Pros
                </div>
              </div>
              <div className="h-4 w-px bg-gray-300" />
              <div className="flex items-center gap-1.5">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-dark-text">4.8</span>
                <span className="text-sm text-medium-text">/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative flex-1 lg:mt-0 w-full max-w-[500px] lg:max-w-none">
            {/* Background decorative blobs */}
            <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-blue-100 mix-blend-multiply blur-3xl opacity-70 animate-blob" />
            <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-orange-100 mix-blend-multiply blur-3xl opacity-70 animate-blob animation-delay-2000" />

            <div className="relative">
              <Image
                src="/images/ethiopian-plumber-hero.png"
                alt="Ethiopian Professional"
                width={600}
                height={600}
                className="relative z-10 mx-auto drop-shadow-2xl"
                priority
              />

              {/* Floating Cards */}
              <div className="absolute -left-4 top-1/4 z-20 animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                  <div className="rounded-full bg-green-100 p-2">
                    <ShieldCheck className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Status</p>
                    <p className="text-sm font-bold text-dark-text">Verified Pro</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 z-20 animate-bounce duration-[4000ms]">
                <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                  <div className="rounded-full bg-yellow-100 p-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Rating</p>
                    <p className="text-sm font-bold text-dark-text">4.9/5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
