import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Linkedin, Twitter, Globe, Users, BookOpen, Filter, X, Star } from 'lucide-react';
import { instructorsData } from '../data/instructors';

export const InstructorsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique expertise areas from all instructors
  const allExpertiseAreas = Array.from(
    new Set(
      instructorsData.flatMap(instructor => instructor.expertise)
    )
  ).sort();

  // Filter instructors based on search term and selected expertise
  const filteredInstructors = instructorsData.filter(instructor => {
    const matchesSearch = searchTerm === '' || 
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExpertise = selectedExpertise === null || 
      instructor.expertise.some(skill => 
        skill.toLowerCase().includes(selectedExpertise.toLowerCase())
      );
    
    return matchesSearch && matchesExpertise;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedExpertise(null);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h5 className="text-accent-primary font-semibold tracking-wider">MEET OUR TEAM</h5>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
          Learn From <span className="gradient-text">Expert</span> Instructors
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Our instructors are industry leaders and professionals who bring real-world experience
          to every course. Discover your next mentor.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search instructors by name, role, or expertise..."
                className="glass-input w-full pl-10 py-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="glass-button flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              <span>Filter by Expertise</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="glass-card p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Areas of Expertise</h3>
              {(searchTerm || selectedExpertise) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-400 hover:text-accent-primary transition-colors flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>Clear Filters</span>
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allExpertiseAreas.map((expertise, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedExpertise(selectedExpertise === expertise ? null : expertise)}
                  className={`glass-card px-3 py-1 text-sm transition-all ${selectedExpertise === expertise ? 'bg-accent-primary/20 border-accent-primary' : ''}`}
                >
                  {expertise}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results summary */}
        {(searchTerm || selectedExpertise) && (
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-300">
              Showing <span className="font-medium">{filteredInstructors.length}</span> instructors
            </p>
            
            {/* Active filters */}
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <div className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                  <span>"{searchTerm}"</span>
                  <button onClick={() => setSearchTerm('')}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              {selectedExpertise && (
                <div className="glass-card px-3 py-1 text-sm flex items-center gap-1">
                  <span>{selectedExpertise}</span>
                  <button onClick={() => setSelectedExpertise(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Instructors Grid */}
      {filteredInstructors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredInstructors.map((instructor, index) => (
            <div key={index} className="glass-card overflow-hidden group transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <Link to={`/instructors/${instructor.id}`}>
                  <img 
                    src={instructor.image} 
                    alt={instructor.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-bold text-xl">{instructor.name}</h3>
                    <p className="text-accent-secondary">{instructor.role}</p>
                  </div>
                </Link>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{instructor.rating}</span>
                  <span className="text-gray-400 text-sm">({instructor.reviews} reviews)</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-semibold">{instructor.courses}</p>
                      <p className="text-gray-400">Courses</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="font-semibold">{instructor.students.toLocaleString()}</p>
                      <p className="text-gray-400">Students</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm line-clamp-3">{instructor.bio}</p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {instructor.expertise.slice(0, 3).map((skill, i) => (
                    <span key={i} className="text-xs glass-card px-2 py-1">{skill}</span>
                  ))}
                  {instructor.expertise.length > 3 && (
                    <span className="text-xs glass-card px-2 py-1">+{instructor.expertise.length - 3} more</span>
                  )}
                </div>
                
                <div className="pt-4 flex justify-between items-center">
                  <div className="flex space-x-3">
                    {instructor.socialLinks.twitter && (
                      <a href={instructor.socialLinks.twitter} className="p-2 hover:text-accent-primary transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {instructor.socialLinks.linkedin && (
                      <a href={instructor.socialLinks.linkedin} className="p-2 hover:text-accent-primary transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {instructor.socialLinks.website && (
                      <a href={instructor.socialLinks.website} className="p-2 hover:text-accent-primary transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <Link 
                    to={`/instructors/${instructor.id}`}
                    className="glass-button text-sm hover:bg-accent-primary/10"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <div className="flex justify-center mb-4">
            <Search className="w-12 h-12 text-accent-primary opacity-50" />
          </div>
          <h3 className="text-xl font-bold mb-2">No Instructors Found</h3>
          <p className="text-gray-300 mb-6">
            We couldn't find any instructors matching your current filters.
          </p>
          <button 
            onClick={clearFilters}
            className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="glass-card p-8 mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Teaching with Us?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Join our team of expert instructors and share your knowledge with students worldwide. 
          We're always looking for passionate educators to help others learn and grow.
        </p>
        <button className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 px-8 py-3">
          Become an Instructor
        </button>
      </div>
    </div>
  );
};