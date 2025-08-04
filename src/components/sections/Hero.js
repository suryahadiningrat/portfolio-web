import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Github, Linkedin, MessageCircle } from 'lucide-react';
import useData from '../../hooks/useData';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import { scrollToElement } from '../../utils/helpers';

const Hero = () => {
  const { data: profileData, loading, error } = useData('profile');
  const { data: socialData } = useData('social');
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typing animation effect
  useEffect(() => {
    if (!profileData) return;
    
    const text = profileData.tagline;
    let index = 0;
    
    const timer = setInterval(() => {
      setTypedText(text.slice(0, index));
      index++;
      
      if (index > text.length) {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [profileData]);

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <LoadingSpinner size="xl" />
      </section>
    );
  }

  if (error || !profileData) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="text-white text-center">
          <p className="text-xl">Error loading profile data</p>
        </div>
      </section>
    );
  }

  const handleContactClick = () => {
    // Buka WhatsApp dengan pesan default
    const whatsappNumber = profileData?.phone?.replace(/[^0-9]/g, '') || '6289526039436';
    const whatsappMessage = `Halo! Saya tertarik dengan layanan web development Anda.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleProjectsClick = () => {
    scrollToElement('projects');
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            {/* Greeting */}
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                👋 Halo semua!
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Saya{' '}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  {profileData.name}
                </span>
              </h1>
              <div className="h-16 mb-6">
                <p className="text-xl sm:text-2xl text-gray-200">
                  {typedText}
                  {isTyping && <span className="animate-pulse">|</span>}
                </p>
              </div>
            </div>

            {/* Bio */}
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              {profileData.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {profileData.experience}
                </div>
                <div className="text-sm text-gray-300">Pengalaman</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {profileData.projectsCompleted}
                </div>
                <div className="text-sm text-gray-300">Proyek</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {profileData.happyClients}
                </div>
                <div className="text-sm text-gray-300">Klien Senang</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={handleContactClick}
                className="bg-green-500 text-white hover:bg-green-600"
              >
                <MessageCircle className="mr-2" size={20} />
                Chat WhatsApp
              </Button>
              <Button 
                variant="outline" 
                onClick={handleProjectsClick}
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Lihat Karya Saya
              </Button>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-sm text-gray-300">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                {profileData.location}
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                {profileData.phone}
              </div>
              <div className="flex items-center text-accent-green">
                ● {profileData.availability}
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-80 h-80 mx-auto relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50"></div>
                
                {/* Image container */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QPC90ZXh0Pgo8L3N2Zz4=';
                    }}
                  />
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-2xl">💼</span>
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce delay-1000">
                  <span className="text-2xl">🚀</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {socialData && (
              <div className="flex justify-center mt-8 space-x-4">
                {socialData.socialLinks.slice(0, 2).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary-600 transition-all duration-300 hover:scale-110"
                  >
                    {social.icon === 'github' && <Github size={20} />}
                    {social.icon === 'linkedin' && <Linkedin size={20} />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Gulir ke Bawah</span>
            <div className="w-0.5 h-8 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
