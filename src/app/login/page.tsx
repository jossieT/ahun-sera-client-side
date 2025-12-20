'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Eye, EyeOff, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginValues = z.infer<typeof loginSchema>;

function LoginContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const redirectTo = searchParams.get('redirect') || '/dashboard';

  useEffect(() => {
    if (user) {
      router.replace('/dashboard');
    }
  }, [user, router]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast.success('Welcome back to AhunSera!');
      router.push(redirectTo);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Invalid email or password';
      toast.error('Login failed', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Google login failed', { description: errorMessage });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side: Brand Visual (Desktop only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary text-primary-foreground p-12 flex-col justify-between">
        {/* Abstract Background Design */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-white blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400 blur-[100px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">AhunSera</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-8">
          <h1 className="text-5xl font-extrabold leading-tight">
            Connecting Ethiopia with Skill & Trust.
          </h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed font-light">
            Access the best service providers for your home and office in minutes. Quality
            guaranteed, every time.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Verified Taskers</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium">Fast Booking</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/50">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
            <div>
              <p className="font-medium italic text-lg leading-snug">
                "AhunSera changed how I manage my repairs. It's so efficient!"
              </p>
              <p className="text-sm text-primary-foreground/60 mt-1">— Yohannes K.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
            <p className="text-muted-foreground">Please enter your details to sign in</p>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              type="button"
              className="w-full h-12 border-2 hover:bg-slate-50 relative group"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </>
              )}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-4 text-slate-400 font-medium tracking-widest">
                  OR EMAIL
                </span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="name@company.com"
                          className="h-12 border-slate-200 focus:border-primary focus:ring-primary/20 transition-all rounded-xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-semibold text-slate-700">
                          Password
                        </FormLabel>
                        <Link
                          href="/login/forgot-password"
                          className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative mt-1">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary/20 transition-all rounded-xl pr-12"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5" />
                            ) : (
                              <Eye className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="w-full h-12 text-md font-bold rounded-xl shadow-lg shadow-primary/20 group relative overflow-hidden"
                  disabled={isLoading}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-primary-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
              </form>
            </Form>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">
              New to AhunSera?{' '}
              <Link
                href="/register"
                className="font-bold text-primary hover:underline hover:text-primary/80 transition-all"
              >
                Create an account
              </Link>
            </p>
          </div>

          <div className="pt-8 border-t border-slate-100 grid grid-cols-2 gap-4 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-primary/40" />
              Secure Data
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-primary/40" />
              Ethiopian Platform
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="text-slate-500 font-medium">Loading session...</p>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
