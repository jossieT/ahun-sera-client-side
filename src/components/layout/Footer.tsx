import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">AhunSera</h3>
          <p className="text-sm text-slate-400">
            Connecting you with trusted professionals for all your home service needs in Ethiopia.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/plumbing" className="hover:text-white transition">Plumbing</Link></li>
            <li><Link href="/services/electrical" className="hover:text-white transition">Electrical</Link></li>
            <li><Link href="/services/cleaning" className="hover:text-white transition">Cleaning</Link></li>
            <li><Link href="/services/painting" className="hover:text-white transition">Painting</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>Addis Ababa, Ethiopia</li>
            <li>support@ahunsera.com</li>
            <li>+251 911 000 000</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AhunSera. All rights reserved.
      </div>
    </footer>
  );
}
