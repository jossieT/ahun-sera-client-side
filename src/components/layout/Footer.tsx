import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { name: 'Plumbing Services', href: '/services/plumbing' },
    { name: 'Electrical Work', href: '/services/electrical' },
    { name: 'Home Cleaning', href: '/services/cleaning' },
    { name: 'Interior Painting', href: '/services/painting' },
    { name: 'Appliance Repair', href: '/services/appliance' },
    { name: 'Furniture Assembly', href: '/services/assembly' },
  ];

  const companyLinks = [
    { name: 'About AhunSera', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Careers', href: '/careers' },
    { name: 'Become a Partner', href: '/register?type=provider' },
    { name: 'Press & Media', href: '/press' },
    { name: 'Contact Support', href: '/contact' },
  ];

  const supportLinks = [
    { name: 'Help Center', href: '/help' },
    { name: 'Safety & Trust', href: '/safety' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Community Guidelines', href: '/guidelines' },
  ];

  return (
    <footer className="bg-footer-dark text-[#94A3B8] pt-24 pb-12 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-blue/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 pb-16 border-b border-white/5">
          <div>
            <h3 className="text-3xl font-black text-white mb-4 tracking-tight">
              Ready to grow your service business?
            </h3>
            <p className="text-lg text-[#94A3B8]/80 max-w-md">
              Join thousands of professionals in Ethiopia already earning on AhunSera.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md lg:ml-auto w-full">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]/50" />
              <Input
                placeholder="Enter your email"
                className="bg-white/5 border-white/10 text-white pl-12 h-14 rounded-2xl focus:border-primary-blue focus:ring-1 focus:ring-primary-blue transition-all"
              />
            </div>
            <Button
              size="lg"
              className="h-14 px-8 rounded-2xl bg-primary-blue hover:bg-primary-blue/90 text-white font-bold group"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white mb-2">
                Ahun<span className="text-primary-blue">Sera</span>
              </span>
              <p className="text-sm leading-relaxed max-w-xs">
                Ethiopia&apos;s leading marketplace for trusted home services. We connect skilled
                professionals with customers who need work done quickly and reliably.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#94A3B8] hover:bg-primary-blue hover:text-white hover:border-primary-blue transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
              Trusted Network
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
              Services
            </h4>
            <ul className="space-y-4">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-blue transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-blue mr-0 transition-all duration-300 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
              Company
            </h4>
            <ul className="space-y-4">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-primary-blue transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary-blue mr-0 transition-all duration-300 group-hover:mr-2"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-white font-bold mb-8 uppercase text-xs tracking-[0.2em]">
              Support
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]/60 uppercase tracking-widest font-bold mb-1">
                    Visit Us
                  </p>
                  <p className="text-sm text-white">Addis Ababa, Ethiopia</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]/60 uppercase tracking-widest font-bold mb-1">
                    Email Us
                  </p>
                  <p className="text-sm text-white">support@ahunsera.com</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-blue">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#94A3B8]/60 uppercase tracking-widest font-bold mb-1">
                    Call Us
                  </p>
                  <p className="text-sm text-white">+251 977 784 658</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="flex flex-col md:flex-row justify-between items-center py-10 border-t border-white/5 gap-6">
          <div className="text-xs font-medium">
            © {currentYear} <span className="text-white font-bold">AhunSera</span>. All rights
            reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {supportLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-medium hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-white/40 uppercase tracking-tighter">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            ISO 27001 CERTIFIED
          </div>
        </div>
      </div>
    </footer>
  );
}
