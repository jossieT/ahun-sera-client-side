'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, Search, LogOut, User, Settings, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const getUserInitials = () => {
    if (!user?.email) return 'Q'; // Default as requested
    return user.email.substring(0, 2).toUpperCase();
  };

  const navLinks = [
    { name: 'Home Services', href: '/services' },
    { name: 'Browse Categories', href: '/categories' },
    { name: 'Find Pros', href: '/search' },
    { name: 'How It Works', href: '/how-it-works' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-transparent',
        isScrolled ? 'shadow-md border-border py-2' : 'py-4',
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-1 group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-primary-blue">Ahun</span>
                <span className="text-primary-blue relative">
                  Sera
                  <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-action-orange rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-dark-text hover:text-primary-blue transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Actions & Profile */}
          <div className="flex items-center gap-3">
            {!user ? (
              <div className="hidden sm:flex items-center gap-3">
                <Button
                  asChild
                  variant="ghost"
                  className="text-medium-text hover:text-primary-blue hover:bg-primary-blue/5 font-medium"
                >
                  <Link href="/register?type=provider">Become a Provider</Link>
                </Button>
                <Button
                  asChild
                  className="bg-linear-to-r from-action-orange to-[#FF8C5A] hover:brightness-105 text-white shadow-lg shadow-action-orange/20 border-0 rounded-full font-bold px-6"
                >
                  <Link href="/book">Book Now</Link>
                </Button>
                <Button
                  asChild
                  className="bg-primary-blue text-white hover:bg-primary-blue/90 rounded-full transition-colors font-bold px-6"
                >
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button
                  asChild
                  className="bg-linear-to-r from-action-orange to-[#FF8C5A] hover:brightness-105 text-white shadow-lg shadow-action-orange/20 border-0 rounded-full font-bold px-6"
                >
                  <Link href="/book">Book Now</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full p-0 overflow-hidden border-2 border-white shadow-sm hover:border-primary-blue transition-colors"
                    >
                      <Avatar className="h-full w-full">
                        <AvatarImage
                          src={user.user_metadata?.avatar_url}
                          alt={user.email || 'User'}
                        />
                        <AvatarFallback className="bg-linear-to-br from-primary-blue to-deep-teal text-white font-bold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-dark-text">
                          My Account
                        </p>
                        <p className="text-xs leading-none text-medium-text">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="cursor-pointer text-dark-text hover:text-primary-blue hover:bg-light-background"
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard/profile"
                        className="cursor-pointer text-dark-text hover:text-primary-blue hover:bg-light-background"
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/settings"
                        className="cursor-pointer text-dark-text hover:text-primary-blue hover:bg-light-background"
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-dark-text hover:bg-light-background"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-border">
                <SheetTitle className="text-left text-lg font-bold text-primary-blue mb-6">
                  AhunSera
                </SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-medium text-dark-text hover:text-primary-blue py-2 border-b border-border/50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}

                  {!user && (
                    <div className="flex flex-col gap-3 mt-4">
                      <Button
                        asChild
                        className="bg-action-orange text-white hover:bg-[#E55A2B] w-full rounded-full"
                      >
                        <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                          Book Now
                        </Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-primary-blue text-white hover:bg-primary-blue/90 w-full rounded-full"
                      >
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          Log In
                        </Link>
                      </Button>
                      <Link
                        href="/register?type=provider"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-center text-sm font-medium text-medium-text hover:text-primary-blue mt-2"
                      >
                        Become a Provider
                      </Link>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
