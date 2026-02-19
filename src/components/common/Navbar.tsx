'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';


// ✅ Define Link type
type NavLink = {
  name: string;
  path: string;
};


const Navbar = () => {

  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);


  // ✅ Fix: explicitly typed
  const authLinks: NavLink[] = [
    // { name: 'Dashboard', path: '/dashboard' },
    // { name: 'Subjects', path: '/subjects' },
    // { name: 'Progress', path: '/progress' },
    // { name: 'Resources', path: '/resources' },
  ];


  // ✅ Fix: explicitly typed
  const publicLinks: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Pricing', path: '/#pricing' },
  ];


  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };


  return (

    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between h-16">

          {/* Logo */}
          <Link
            href="/"
            className="
              flex items-center
              text-xl font-bold
              bg-gradient-to-r
              from-green-600 to-blue-600
              bg-clip-text text-transparent
            "
          >
            SGA AI Tutor
          </Link>


          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">

            {(pathname === '/' || pathname.startsWith('/auth'))
              ? publicLinks.map((link) => (

                <Link
                  key={link.path}
                  href={link.path}
                  className="
                    px-3 py-2
                    rounded-md
                    text-sm font-medium
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  {link.name}
                </Link>

              ))
              : authLinks.map((link) => (

                <Link
                  key={link.path}
                  href={link.path}
                  className="
                    px-3 py-2
                    rounded-md
                    text-sm font-medium
                    text-gray-700
                    hover:bg-gray-100
                  "
                >
                  {link.name}
                </Link>

              ))
            }

          </div>


          {/* Right side */}
          <div className="flex items-center gap-4">

            {(pathname === '/' || pathname.startsWith('/auth')) ? (

              <div className="hidden md:flex gap-2">

                <Link
                  href="/auth/login"
                  className="
                    px-4 py-2
                    border rounded-lg
                    text-sm font-medium
                  "
                >
                  Sign In
                </Link>


                <Link
                  href="/auth/signup"
                  className="
                    px-4 py-2
                    bg-gradient-to-r
                    from-emerald-500 to-blue-600
                    text-white
                    rounded-lg
                    text-sm font-medium
                  "
                >
                  Sign Up
                </Link>

              </div>

            ) : (

              <UserButton afterSignOutUrl="/" />

            )}


            {/* Mobile button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden"
            >

              {mobileMenuOpen ? "✕" : "☰"}

            </button>

          </div>

        </div>

      </div>


      {/* Mobile Menu */}
      {mobileMenuOpen && (

        <div className="md:hidden bg-white border-t">

          {(pathname === '/' || pathname.startsWith('/auth'))
            ? publicLinks.map((link) => (

              <Link
                key={link.path}
                href={link.path}
                className="block px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>

            ))
            : authLinks.map((link) => (

              <Link
                key={link.path}
                href={link.path}
                className="block px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>

            ))
          }

        </div>

      )}

    </nav>

  );

};


export default Navbar;
