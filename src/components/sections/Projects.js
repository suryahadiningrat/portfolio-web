import React, { useState, useMemo } from 'react';
import { ExternalLink, Github, Calendar, Star, Filter } from 'lucide-react';
import useData from '../../hooks/useData';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';
import ProjectDetailModal from '../modals/ProjectDetailModal';
import { formatDate } from '../../utils/helpers';

const Projects = () => {
  const { data: projectsData, loading, error } = useData('projects');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Get all unique tech stack items for filtering
  const techFilters = useMemo(() => {
    if (!projectsData) return ['All'];
    
    const allTech = projectsData.flatMap(project => project.techStack);
    const uniqueTech = [...new Set(allTech)];
    return ['All', ...uniqueTech.sort()];
  }, [projectsData]);

  // Filter projects based on selected tech
  const filteredProjects = useMemo(() => {
    if (!projectsData) return [];
    
    let filtered = selectedFilter === 'All' 
      ? projectsData 
      : projectsData.filter(project => 
          project.techStack.includes(selectedFilter)
        );
    
    // Show featured projects first, then others
    filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.date) - new Date(a.date);
    });
    
    return showAll ? filtered : filtered.slice(0, 6);
  }, [projectsData, selectedFilter, showAll]);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  if (error || !projectsData) {
    return null;
  }

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            My Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Karya Yang
            <span className="block text-primary-600">Saya Kerjakan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Koleksi proyek yang menunjukkan keterampilan dan hasrat saya untuk menciptakan
            pengalaman digital yang luar biasa.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-500" />
            <span className="text-sm text-gray-500">Filter berdasarkan teknologi:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {techFilters.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedFilter(tech)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === tech
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img
                  src={project.images.thumbnail}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QUk9KRUNUPC90ZXh0Pgo8L3N2Zz4=`;
                  }}
                />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="flex items-center px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium">
                      <Star size={12} className="mr-1" />
                      Featured
                    </span>
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Completed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {formatDate(project.date)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary-100 text-primary-600 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      +{project.techStack.length - 3} more
                    </span>
                  )}
                </div>

                {/* Client Info */}
                <div className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Client:</span> {project.client}
                  <span className="mx-2">•</span>
                  <span className="font-medium">Duration:</span> {project.duration}
                </div>

                {/* Action Links */}
                <div className="flex gap-2">
                  {project.links.demo && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.links.demo, '_blank');
                      }}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Demo
                    </Button>
                  )}
                  {project.links.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.links.github, '_blank');
                      }}
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {!showAll && projectsData && filteredProjects.length < projectsData.length && (
          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(true)}
            >
              Lihat Lebih Banyak Project
            </Button>
          </div>
        )}

        {/* Projects Stats */}
        <div className="mt-16">
          <Card className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {projectsData.length}
                </div>
                <div className="text-sm text-gray-600">Total Projects</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {projectsData.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {techFilters.length - 1}
                </div>
                <div className="text-sm text-gray-600">Category</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {projectsData.filter(p => p.status === 'Completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          isOpen={isModalOpen}
          onClose={closeProjectModal}
          project={selectedProject}
        />
      </div>
    </section>
  );
};

export default Projects;
