import { GraduationCap, Home, BookOpen, Briefcase, Info, Phone } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
  const navItems = [
    { label: 'HOME', icon: <Home className="h-5 w-5" />, href: '/' },
    { label: 'COURSES', icon: <BookOpen className="h-5 w-5" />, href: '/courses' },
    // { label: 'Careers', icon: <Briefcase className="h-5 w-5" />, href: '/careers' },
    // { label: 'About', icon: <Info className="h-5 w-5" />, href: '/about' },
    // { label: 'Contact', icon: <Phone className="h-5 w-5" />, href: '/contact' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className=" bg-white sticky top-0 w-full z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <img src="https://bepractical.s3.us-east-2.amazonaws.com/brand-logo.cc6e3cf088a8fd3005b1.jpg" width={150} alt="" />
          <div className="flex space-x-6 hidden  md:block">
            {navItems.map((item, idx) => (
              <a key={idx} href={item.href} className="hover:text-blue-300 text-md text-blue-950">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-blue-950 text-white z-10 border-t border-blue-800">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item, idx) => (
            <a key={idx} href={item.href} className="flex flex-col items-center text-xs hover:text-blue-300">
              {item.icon}
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
