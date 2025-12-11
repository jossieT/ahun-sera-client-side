import Link from 'next/link';
import { Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function Navbar() {
  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-primary">
            AhunSera
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="/categories" className="hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/book" className="hover:text-primary transition-colors">
              Book Now
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" asChild>
                <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
                <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                 <Link href="/services" className="text-lg font-medium">
                  Services
                </Link>
                <Link href="/categories" className="text-lg font-medium">
                  Categories
                </Link>
                 <Link href="/book" className="text-lg font-medium">
                  Book Now
                </Link>
                <hr className="my-2" />
                 <Link href="/login" className="text-lg font-medium">
                  Log In
                </Link>
                 <Link href="/register" className="text-lg font-medium">
                  Sign Up
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
