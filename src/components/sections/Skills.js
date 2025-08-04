import React, { useState, useEffect } from 'react';
import useData from '../../hooks/useData';
import Card from '../ui/Card';
import LoadingSpinner from '../ui/LoadingSpinner';

const Skills = () => {
  const { data: skillsData, loading, error } = useData('skills');
  const [activeCategory, setActiveCategory] = useState(0);
  const [animatedSkills, setAnimatedSkills] = useState({});

  useEffect(() => {
    if (skillsData && skillsData.categories.length > 0) {
      // Animate skill bars when component mounts or category changes
      const timer = setTimeout(() => {
        skillsData.categories[activeCategory].skills.forEach((skill, index) => {
          setTimeout(() => {
            setAnimatedSkills(prev => ({
              ...prev,
              [`${activeCategory}-${index}`]: skill.level
            }));
          }, index * 200);
        });
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [skillsData, activeCategory]);

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="lg" className="py-20" />
        </div>
      </section>
    );
  }

  if (error || !skillsData) {
    return null;
  }

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-600 rounded-full text-sm font-medium mb-4">
            Skill & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Teknologi yang
            <span className="block text-primary-600">Saya Kuasai</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Saya terus belajar dan mengembangkan skill untuk mengikuti 
            teknologi terbaru dan praktik terbaik dalam pengembangan web.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {skillsData.categories.map((category, index) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === index
                  ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.categories[activeCategory].skills.map((skill, index) => (
            <Card key={skill.name} className="group">
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 bg-gray-50 overflow-hidden"
                >
                  <img
                    src={skill.icon}
                    alt={`${skill.name} icon`}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      // Fallback ke color background jika icon tidak ada
                      e.target.style.display = 'none';
                      e.target.parentNode.style.backgroundColor = `${skill.color}20`;
                      e.target.parentNode.innerHTML = `<div class="w-8 h-8 rounded-md" style="background-color: ${skill.color}"></div>`;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {skill.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-600">Kemahiran</span>
                    <span className="text-sm font-medium text-primary-600">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    backgroundColor: skill.color,
                    width: `${animatedSkills[`${activeCategory}-${index}`] || 0}%`,
                  }}
                ></div>
              </div>

              {/* Skill Level Badge */}
              <div className="mt-4 flex justify-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  skill.level >= 90 
                    ? 'bg-green-100 text-green-800'
                    : skill.level >= 75
                    ? 'bg-blue-100 text-blue-800'
                    : skill.level >= 60
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {skill.level >= 90 
                    ? 'Expert'
                    : skill.level >= 75
                    ? 'Advanced'
                    : skill.level >= 60
                    ? 'Intermediate'
                    : 'Beginner'
                  }
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {skillsData.categories.map((category) => (
                <div key={category.name} className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">
                    {category.skills.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    {category.name} Skills
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
