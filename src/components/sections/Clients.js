import React from 'react';
import useData from '../../hooks/useData';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const Clients = () => {
  const { data: clientsData, loading, error } = useData('clients');

  if (loading) {
    return (
      <section id="clients" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  if (error || !clientsData) {
    return null;
  }

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Client Terpercaya
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Dipercaya Oleh
            <span className="block text-primary-600">Perusahaan Terbaik</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saya bangga telah bekerja sama dengan berbagai organisasi dan perusahaan 
            terkemuka dalam mengembangkan solusi digital yang inovatif.
          </p>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mb-16">
          {clientsData.map((client, index) => (
            <Card 
              key={index} 
              className="group flex items-center justify-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gray-50 hover:bg-white"
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                className="max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="hidden items-center justify-center w-full h-16 bg-primary-100 rounded-lg"
                style={{ display: 'none' }}
              >
                <span className="text-primary-600 font-semibold text-sm text-center">
                  {client.name}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="text-center">
          <Card className="max-w-4xl mx-auto bg-gradient-primary text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">
                  {clientsData.length}+
                </div>
                <div className="text-lg opacity-90">Klien Terpercaya</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {clientsData.filter(client => client.category === 'Government').length}+
                </div>
                <div className="text-lg opacity-90">Instansi Pemerintah</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">
                  {clientsData.filter(client => client.category === 'Corporate').length}+
                </div>
                <div className="text-lg opacity-90">Perusahaan Swasta</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Clients;
