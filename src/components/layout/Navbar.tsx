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

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-avatar.jpg" alt={user.email || 'User'} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <UserCircle className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
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

                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder-avatar.jpg" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">My Account</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
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
