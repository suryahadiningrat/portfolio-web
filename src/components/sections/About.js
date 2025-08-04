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
      title: 'Frontend Development',
      description: 'Creating responsive and interactive user interfaces using modern frameworks like React, Vue.js, and Next.js.'
    },
    {
      icon: Zap,
      title: 'Backend Development',
      description: 'Building robust server-side applications with Node.js, Express, and database management.'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Designing intuitive and beautiful user experiences with tools like Figma and Adobe Creative Suite.'
    },
    {
      icon: Users,
      title: 'Consulting',
      description: 'Providing technical guidance and strategic advice for your digital transformation projects.'
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
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Passionate About Creating
            <span className="block text-primary-600">Digital Experiences</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I'm a dedicated developer who loves turning complex problems into simple, 
            beautiful solutions. I enjoy working with ambitious teams and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Building the future, one line of code at a time
            </h3>
            
            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                With over {profileData.experience.replace('+', '')} of experience in web development, 
                I've had the privilege of working with diverse clients ranging from startups to 
                established enterprises. My journey began with a simple curiosity about how 
                websites work, and it has evolved into a passion for creating digital solutions 
                that make a real impact.
              </p>
              
              <p>
                I believe in writing clean, maintainable code and creating user experiences 
                that are not just functional, but delightful. Whether it's a complex web 
                application or a simple landing page, I approach every project with the same 
                level of enthusiasm and attention to detail.
              </p>
              
              <p>
                When I'm not coding, you can find me exploring new technologies, contributing 
                to open-source projects, or sharing my knowledge with the developer community 
                through blogs and mentoring.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {profileData.projectsCompleted}
                </div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-2">
                  {profileData.happyClients}
                </div>
                <div className="text-sm text-gray-600">Happy Clients</div>
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
