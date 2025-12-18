'use client';

import Link from 'next/link';
import { Menu, Search, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <nav className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-primary-blue">
            AhunSera
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/services"
              className="text-dark-text hover:text-primary-blue transition-colors"
            >
              Services
            </Link>
            <Link
              href="/categories"
              className="text-dark-text hover:text-primary-blue transition-colors"
            >
              Categories
            </Link>
            <Link href="/book" className="text-dark-text hover:text-primary-blue transition-colors">
              Book Now
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-medium-text" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={user.email || 'User'} />
                      <AvatarFallback className="bg-primary-blue/10 text-primary-blue">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-dark-text">My Account</p>
                      <p className="text-xs leading-none text-medium-text">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="cursor-pointer text-dark-text hover:text-primary-blue"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/profile"
                      className="cursor-pointer text-dark-text hover:text-primary-blue"
                    >
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-dark-text hover:text-primary-blue">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-action-orange text-white hover:bg-[#E55A2B]">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5 text-dark-text" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-8">
                <Link
                  href="/services"
                  className="text-lg font-medium text-dark-text hover:text-primary-blue"
                >
                  Services
                </Link>
                <Link
                  href="/categories"
                  className="text-lg font-medium text-dark-text hover:text-primary-blue"
                >
                  Categories
                </Link>
                <Link
                  href="/book"
                  className="text-lg font-medium text-dark-text hover:text-primary-blue"
                >
                  Book Now
                </Link>
                <hr className="my-2 border-border" />

                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-2 bg-light-background rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-primary-blue/10 text-primary-blue">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-dark-text">My Account</span>
                        <span className="text-xs text-medium-text">{user.email}</span>
                      </div>
                    </div>
                    <Link href="/dashboard" className="text-lg font-medium">
                      Dashboard
                    </Link>
                    <Link href="/dashboard/profile" className="text-lg font-medium">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-lg font-medium text-red-600 text-left"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-lg font-medium">
                      Log In
                    </Link>
                    <Link href="/register" className="text-lg font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
