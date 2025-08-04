import React from 'react';
import { Code, Palette, Zap, Users } from 'lucide-react';
import useData from '../../hooks/useData';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const About = () => {
  const { data: profileData, loading, error } = useData('profile');

  const services = [
    {
      icon: Code,
      title: 'Pengembangan Frontend',
      description: 'Membuat antarmuka pengguna yang responsif dan interaktif menggunakan framework modern seperti React, Vue.js, dan Next.js.'
    },
    {
      icon: Zap,
      title: 'Pengembangan Backend',
      description: 'Membangun aplikasi server-side yang robust dengan Node.js, Express, dan manajemen database.'
    },
    {
      icon: Palette,
      title: 'Desain UI/UX',
      description: 'Mendesain pengalaman pengguna yang intuitif dan indah dengan tools seperti Figma dan Adobe Creative Suite.'
    },
    {
      icon: Users,
      title: 'Konsultasi',
      description: 'Memberikan panduan teknis dan saran strategis untuk proyek transformasi digital Anda.'
    }
  ];

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  if (error || !profileData) {
    return null;
  }

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Tentang Saya
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Passionate Menciptakan
            <span className="block text-primary-600">Pengalaman Digital</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saya seorang developer yang berdedikasi yang senang mengubah masalah kompleks menjadi 
            solusi yang sederhana dan indah. Saya senang bekerja dengan tim dan klien yang ambisius.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Membangun masa depan, satu baris kode setiap waktu
            </h3>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                Dengan pengalaman lebih dari {profileData.experience.replace('+', '')} dalam pengembangan web, 
                saya mendapat kesempatan untuk bekerja dengan klien yang beragam mulai dari startup hingga 
                perusahaan yang sudah mapan. Perjalanan saya dimulai dengan rasa ingin tahu sederhana tentang bagaimana 
                website bekerja, dan telah berkembang menjadi passion untuk menciptakan solusi digital 
                yang memberikan dampak nyata.
              </p>
              
              <p>
                Saya percaya pada penulisan kode yang bersih dan mudah dipelihara serta menciptakan pengalaman pengguna 
                yang tidak hanya fungsional, tetapi juga menyenangkan. Baik itu aplikasi web yang kompleks 
                atau halaman landing sederhana, saya mendekati setiap project dengan tingkat 
                antusiasme dan perhatian detail yang sama.
              </p>
              
              <p>
                Ketika tidak sedang coding, Anda bisa menemukan saya mengeksplorasi teknologi baru, berkontribusi 
                pada project open-source, atau berbagi pengetahuan dengan komunitas developer 
                through blogs and mentoring.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {profileData.projectsCompleted}
                </div>
                <div className="text-sm text-gray-600">Project Selesai</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {profileData.happyClients}
                </div>
                <div className="text-sm text-gray-600">Klien Puas</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="/images/about-illustration.png"
                alt="About illustration"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div 
                className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center"
                style={{ display: 'none' }}
              >
                <div className="text-center text-primary-600">
                  <Code size={80} className="mx-auto mb-4" />
                  <p className="text-lg font-medium">Coding Illustration</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xl">🎯</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            What I Do
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center group">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary-600 transition-colors duration-300">
                    <service.icon 
                      size={32} 
                      className="text-primary-600 group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {service.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
