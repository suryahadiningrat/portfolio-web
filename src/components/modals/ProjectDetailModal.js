import React from 'react';
import { ExternalLink, Github, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import { formatDate } from '../../utils/helpers';

const ProjectDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl">
      <div className="py-4">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onClose} className="mb-4">
            <ArrowLeft className="mr-2" size={20} />
            Kembali ke Projects
          </Button>
        </div>

        {/* Project Header */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {project.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                    ⭐ Unggulan
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Selesai'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'Sedang Dikerjakan'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">
                {project.longDescription || project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Teknologi yang Digunakan
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-primary-100 text-primary-600 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {project.links.demo && (
                  <Button
                    onClick={() => window.open(project.links.demo, '_blank')}
                    size="lg"
                  >
                    <ExternalLink className="mr-2" size={20} />
                    Lihat Demo Live
                  </Button>
                )}
                {project.links.github && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(project.links.github, '_blank')}
                    size="lg"
                  >
                    <Github className="mr-2" size={20} />
                    Lihat Source Code
                  </Button>
                )}
              </div>
            </div>

            {/* Project Meta */}
            <div>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Detail Project
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Tanggal</div>
                      <div className="font-medium">{formatDate(project.date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Durasi</div>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Klien</div>
                      <div className="font-medium">{project.client}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        {project.images?.gallery && project.images.gallery.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Galeri Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.images.gallery.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full object-contain rounded-lg shadow-md group-hover:shadow-xl transition-shadow bg-gray-50"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QUk9KRUNUPC90ZXh0Pgo8L3N2Zz4=`;
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Fitur Utama</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl text-primary-600">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature}</h3>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-primary text-white">
            <h3 className="text-2xl font-bold mb-4">
              Tertarik dengan project serupa?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Saya senang membantu mewujudkan ide Anda. Mari diskusikan kebutuhan project Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-primary-600 hover:bg-gray-100"
                onClick={() => {
                  onClose();
                  const contactElement = document.getElementById('contact');
                  if (contactElement) {
                    const headerOffset = 80;
                    const elementPosition = contactElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Hubungi Saya
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary-600"
                onClick={onClose}
              >
                Lihat Project Lainnya
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectDetailModal;
