import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Clock, User } from 'lucide-react';
import useData from '../hooks/useData';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { formatDate } from '../utils/helpers';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: projectsData, loading, error } = useData('projects');
  
  const project = projectsData?.find(p => p.id === parseInt(id));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="xl" className="py-20" />
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="mr-2" size={20} />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2" size={20} />
              Back to Projects
            </Button>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Project Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                {project.featured && (
                  <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                {project.longDescription}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Technologies Used
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
                    View Live Demo
                  </Button>
                )}
                {project.links.github && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(project.links.github, '_blank')}
                    size="lg"
                  >
                    <Github className="mr-2" size={20} />
                    View Source Code
                  </Button>
                )}
              </div>
            </div>

            {/* Project Meta */}
            <div>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Date</div>
                      <div className="font-medium">{formatDate(project.date)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">{project.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="text-gray-400 mr-3" size={18} />
                    <div>
                      <div className="text-sm text-gray-500">Client</div>
                      <div className="font-medium">{project.client}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.gallery.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjM0I4MkY2Ii8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIzMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5QUk9KRUNUPC90ZXh0Pgo8L3N2Zz4=`;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Key Features</h2>
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

        {/* Call to Action */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-primary text-white">
            <h3 className="text-2xl font-bold mb-4">
              Interested in a similar project?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              I'd love to help bring your ideas to life. Let's discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <Button className="bg-white text-primary-600 hover:bg-gray-100">
                  Get In Touch
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                  View More Projects
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
