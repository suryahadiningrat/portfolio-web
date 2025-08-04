import React, { useState } from 'react';
import { Phone, MapPin, MessageCircle, Send } from 'lucide-react';
import useData from '../../hooks/useData';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const Contact = () => {
  const { data: profileData, loading: profileLoading } = useData('profile');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const loading = profileLoading;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      alert('Mohon isi nama dan pesan terlebih dahulu');
      return;
    }

    // Format pesan WhatsApp
    const whatsappMessage = `Halo, saya ${formData.name}.

${formData.subject ? `Subjek: ${formData.subject}` : ''}

${formData.message}

${formData.email ? `Email saya: ${formData.email}` : ''}`;

    // Nomor WhatsApp (tanpa + dan spasi)
    const whatsappNumber = profileData?.phone?.replace(/[^0-9]/g, '') || '6289526039436';
    
    // URL WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Buka WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Hubungi Saya
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mari Bekerja
            <span className="block text-primary-600">Sama</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Punya rencana project ? Saya ingin mendengarnya. 
            Mari diskusikan bagaimana kita bisa mewujudkan ide Anda melalui WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Quick Contact */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Kontak Cepat
                </h3>
                
                {profileData && (
                  <div className="space-y-4">
                    <a
                      href={`https://wa.me/${profileData.phone?.replace(/[^0-9]/g, '') || '6289526039436'}?text=Halo! Saya tertarik dengan layanan web development Anda.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
                    >
                      <MessageCircle className="text-green-600 mr-3 group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">WhatsApp</div>
                        <div className="text-sm text-gray-600">{profileData.phone}</div>
                      </div>
                    </a>

                    <a
                      href={`tel:${profileData.phone}`}
                      className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
                    >
                      <Phone className="text-blue-600 mr-3 group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Phone</div>
                        <div className="text-sm text-gray-600">{profileData.phone}</div>
                      </div>
                    </a>

                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <MapPin className="text-gray-600 mr-3" size={20} />
                      <div>
                        <div className="font-medium text-gray-900">Lokasi</div>
                        <div className="text-sm text-gray-600">{profileData.location}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Availability */}
              {profileData && (
                <Card>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Ketersediaan
                  </h3>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-accent-green rounded-full mr-3 animate-pulse"></div>
                    <div>
                      <div className="font-medium text-gray-900">Saat Ini Tersedia</div>
                      <div className="text-sm text-gray-600">{profileData.availability}</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* WhatsApp Quick Button */}
              <Card>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Pesan Cepat
                </h3>
                <p className="text-gray-600 mb-4">
                  Ingin lewati formulir? Kirim saya pesan langsung di WhatsApp!
                </p>
                <a
                  href={`https://wa.me/${profileData?.phone?.replace(/[^0-9]/g, '') || '6289526039436'}?text=Halo! Saya tertarik dengan layanan web development Anda.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center w-full justify-center px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Chat dengan saya
              </h3>
              <p className="text-gray-600 mb-8">
                Isi formulir di bawah ini dan saya akan membuka WhatsApp dengan pesan Anda siap untuk dikirim.
              </p>
              
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Nama lengkap Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="email.anda@contoh.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Ceritakan tentang project Anda atau sekedar say hello..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <Send className="w-5 h-5" />
                  <span>Kirim via WhatsApp</span>
                </button>

                <p className="text-sm text-gray-500 text-center">
                  Ini akan membuka WhatsApp dengan pesan Anda siap dikirim
                </p>
              </form>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-white">
            <div className="flex items-center justify-center mb-4">
              <MessageCircle size={40} />
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Siap memulai project Anda?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Mari wujudkan ide Anda menjadi kenyataan. Saya senang mendengar tentang project Anda 
              dan diskusikan bagaimana kita bisa bekerja sama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {profileData && (
                <>
                  <a
                    href={`https://wa.me/${profileData.phone?.replace(/[^0-9]/g, '') || '6289526039436'}?text=Halo! Saya tertarik untuk memulai project dengan Anda.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <MessageCircle className="mr-2" size={20} />
                    WhatsApp Saya
                  </a>
                  <a
                    href={`tel:${profileData.phone}`}
                    className="inline-flex items-center px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
                  >
                    <Phone className="mr-2" size={20} />
                    Telpon Saya
                  </a>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
