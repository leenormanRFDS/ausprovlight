import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { label: 'The Project', path: '/project' },
    { label: 'Provenance', path: '/provenance' },
    { label: 'Andamooka', path: '/andamooka' },
    { label: 'Get Involved', path: '/get-involved' },
  ];

  // For light pages we want dark text, for dark pages we want light text.
  const isLightPage = false;
  
  const navBg = isLightPage ? 'bg-[#f5f2ed]/90' : 'bg-[#0C0B0A]/85';
  const textColor = isLightPage ? 'text-[#1a1a1a]' : 'text-[#f5f2ed]';
  const idleColor = isLightPage ? 'text-[#6E6250]' : 'text-[#8E8A82]';
  const hoverColor = isLightPage ? 'hover:text-[#1a1a1a]' : 'hover:text-[#f5f2ed]';

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono-tech border-b border-hairline transition-colors duration-500 ${navBg} backdrop-blur-sm`}>
      {/* Left: Logo */}
      <Link
        to="/"
        className="flex items-center group"
      >
        <img 
          src="/images/APP_Logo.svg" 
          alt="Australian Provenance Project" 
          className={`h-9 sm:h-11 w-auto transition-all duration-500 ${isLightPage ? 'invert' : ''}`}
        />
      </Link>

      {/* Right: Primary Nav Links */}
      <div className="flex items-center overflow-x-auto no-scrollbar">
        <ul className="flex items-center gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <li key={item.path} className="shrink-0">
                <Link
                  to={item.path}
                  className={`text-[8.5px] sm:text-[9.5px] tracking-[0.22em] uppercase transition-colors duration-200 ${
                    isActive
                      ? `${textColor} font-medium`
                      : `${idleColor} ${hoverColor}`
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
