'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Menu, Search, LogOut, User, Settings, LayoutDashboard, ChevronDown } from 'lucide-react';
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
                    <button className="flex items-center gap-2.5 py-1.5 px-2 rounded-full hover:bg-light-background/80 transition-all duration-300 group focus:outline-none">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 ring-1 ring-border/50 group-hover:ring-primary-blue/30 transition-all">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url}
                            alt={user.email || 'User'}
                          />
                          <AvatarFallback className="bg-slate-100 text-slate-500 text-[10px] font-bold">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:flex flex-col items-start leading-none gap-0.5">
                          <span className="text-[10px] font-bold text-medium-text/50 uppercase tracking-widest">
                            Account
                          </span>
                          <span className="text-sm font-medium text-medium-text group-hover:text-dark-text transition-colors">
                            {user.user_metadata?.full_name || user.email?.split('@')[0]}
                          </span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-medium-text/40 group-hover:text-primary-blue transition-colors ml-0.5" />
                      </div>
                    </button>
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

                  {user && (
                    <div className="flex flex-col gap-4 mt-6 border-t border-border pt-6">
                      <div className="flex items-center gap-3 px-3 py-3 bg-light-background rounded-2xl border border-border/50">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                          <AvatarImage src={user.user_metadata?.avatar_url} />
                          <AvatarFallback className="bg-primary-blue/10 text-primary-blue font-bold text-lg">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-dark-text">Account Settings</span>
                          <span className="text-xs text-medium-text truncate max-w-[180px]">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-dark-text hover:text-primary-blue py-3 px-2 rounded-xl hover:bg-light-background transition-colors"
                        >
                          <LayoutDashboard className="h-5 w-5 text-medium-text" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-dark-text hover:text-primary-blue py-3 px-2 rounded-xl hover:bg-light-background transition-colors"
                        >
                          <User className="h-5 w-5 text-medium-text" />
                          My Profile
                        </Link>
                        <Link
                          href="/settings"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-lg font-medium text-dark-text hover:text-primary-blue py-3 px-2 rounded-xl hover:bg-light-background transition-colors"
                        >
                          <Settings className="h-5 w-5 text-medium-text" />
                          Settings
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 text-lg font-medium text-red-600 py-3 px-2 hover:bg-red-50 rounded-xl transition-colors text-left w-full mt-2"
                        >
                          <LogOut className="h-5 w-5" />
                          Log Out
                        </button>
                      </div>
                    </div>
                  )}
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
