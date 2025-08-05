import React, { useState, useEffect, useMemo } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToElement } from '../../utils/helpers';
import Button from '../ui/Button';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navigationItems = useMemo(() => [
    { name: 'Beranda', href: 'hero' },
    { name: 'Tentang', href: 'about' },
    { name: 'Keahlian', href: 'skills' },
    { name: 'Project', href: 'projects' },
    { name: 'Client', href: 'clients' },
    { name: 'Kontak', href: 'contact' },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = navigationItems.map(item => item.href);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigationItems]);

  const handleNavClick = (href) => {
    scrollToElement(href);
    setIsOpen(false);
  };

  const handleContactClick = () => {
    scrollToElement('contact');
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center hover:scale-105 transition-transform"
            >
              <img
                src="/logo192.png"
                alt="Rifky Suryakusuma Rachmat Logo"
                className={`object-contain transition-all duration-300 ${
                  isScrolled ? 'h-8 w-8' : 'h-10 w-10'
                }`}
                onError={(e) => {
                  // Fallback ke logo512.png jika logo192.png tidak ada
                  e.target.src = '/logo512.png';
                  e.target.onError = () => {
                    // Fallback ke teks jika kedua logo tidak ada
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = `<span class="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent ${isScrolled ? 'text-xl' : 'text-2xl'}">RS</span>`;
                  };
                }}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                    activeSection === item.href
                      ? 'text-primary-600'
                      : isScrolled
                      ? 'text-gray-700'
                      : 'text-white'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={handleContactClick} size="sm">
              Mari Bicara
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:text-gray-900'
                  : 'text-white hover:text-gray-200'
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeSection === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-2">
                <Button onClick={handleContactClick} className="w-full">
                  Mari Bicara
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
