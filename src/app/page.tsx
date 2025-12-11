import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex flex-col">
        <h1 className="text-4xl font-bold mb-4">Ethiopia TaskRabbit Clone</h1>
        <p className="mb-8 text-lg">
          Welcome to the service booking platform. Find trusted professionals near you.
        </p>
        <div className="flex gap-4">
          <Link href="/services" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Browse Services
          </Link>
          <Link href="/login" className="px-6 py-3 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
