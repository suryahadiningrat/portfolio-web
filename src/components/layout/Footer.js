import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Heart } from 'lucide-react';
import useData from '../../hooks/useData';

const Footer = () => {
  const { data: socialData } = useData('social');
  const currentYear = new Date().getFullYear();

  const iconMap = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
  };

  // Mapping menu ke section ID yang benar
  const menuMapping = {
    'Beranda': 'hero',
    'Tentang': 'about', 
    'Keahlian': 'skills',
    'Project': 'projects',
    'Kontak': 'contact'
  };

  const handleNavClick = (menuItem) => {
    const sectionId = menuMapping[menuItem];
    const element = document.getElementById(sectionId);
    
    if (element) {
      // Scroll dengan offset untuk header yang fixed
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-white mb-4">
              Suryahadiningrat
            </div>
            <p className="text-gray-300 mb-4">
              Full Stack Developer bersemangat untuk menciptakan pengalaman digital yang luar biasa
            </p>
            {socialData && (
              <div className="flex space-x-4">
                {socialData.socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Menu</h3>
            <ul className="space-y-2">
              {['Beranda', 'Tentang', 'Keahlian', 'Project', 'Kontak'].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => handleNavClick(link)}
                    className="text-gray-300 hover:text-white transition-colors hover:underline"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontak Saya</h3>
            {socialData && (
              <div className="space-y-2 text-gray-300">
                <p>{socialData.contactInfo.address}</p>
                <p>{socialData.contactInfo.workingHours}</p>
                <p className="text-sm text-accent-green">
                  {socialData.contactInfo.responseTime}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Suryahadiningrat. Seluruh hak cipta dilindungi.
          </p>
          <p className="text-gray-400 text-sm flex items-center mt-2 sm:mt-0">
            Dibuat dengan <Heart size={16} className="mx-1 text-red-500" /> menggunakan React & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
