import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Users, BookOpen, Award, GraduationCap, Globe, Twitter, Linkedin, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { getInstructorById } from '../data/instructors';
import { coursesData } from '../data/courses';

export const InstructorPage: React.FC = () => {
  const { instructorId } = useParams<{ instructorId: string }>();
  const instructor = instructorId ? getInstructorById(instructorId) : undefined;
  
  // Filter courses taught by this instructor
  const instructorCourses = coursesData.filter(
    course => course.instructor.toLowerCase() === instructor?.name.toLowerCase()
  );
  
  if (!instructor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Instructor Not Found</h2>
        <p className="mb-8">The instructor you are looking for does not exist.</p>
        <Link to="/" className="glass-button inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-accent-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Instructors</span>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar - Instructor Profile */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <div className="flex flex-col items-center text-center mb-6">
              <img 
                src={instructor.image} 
                alt={instructor.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-accent-primary mb-4" 
              />
              <h1 className="text-2xl font-bold">{instructor.name}</h1>
              <p className="text-accent-secondary font-medium">{instructor.role}</p>
              
              <div className="flex items-center gap-1 mt-3">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{instructor.rating}</span>
                <span className="text-gray-400">({instructor.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Students</p>
                  <p className="font-semibold">{instructor.students.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Courses</p>
                  <p className="font-semibold">{instructor.courses}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Experience</p>
                  <p className="font-semibold">15+ Years</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Member Since</p>
                  <p className="font-semibold">Jan 2022</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="font-bold mb-4">Connect with {instructor.name.split(' ')[0]}</h3>
              <div className="flex justify-center space-x-4">
                {instructor.socialLinks.twitter && (
                  <a 
                    href={instructor.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 glass-card hover:text-accent-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {instructor.socialLinks.linkedin && (
                  <a 
                    href={instructor.socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 glass-card hover:text-accent-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {instructor.socialLinks.website && (
                  <a 
                    href={instructor.socialLinks.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 glass-card hover:text-accent-primary transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                <a 
                  href={`mailto:${instructor.name.toLowerCase().replace(' ', '.')}@learnhub.com`} 
                  className="p-2 glass-card hover:text-accent-primary transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
              
              <button className="glass-button w-full mt-6 bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0">
                Send Message
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* About */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">About the Instructor</h2>
            <p className="text-gray-300 mb-6 whitespace-pre-line">
              {instructor.fullBio}
            </p>
            
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.expertise.map((skill, index) => (
                  <span 
                    key={index} 
                    className="glass-card px-3 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Courses */}
          <div className="glass-card p-6 md:p-8 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Courses by {instructor.name.split(' ')[0]}</h2>
              <span className="glass-card px-3 py-1">{instructorCourses.length} courses</span>
            </div>
            
            <div className="space-y-6">
              {instructorCourses.map((course, index) => (
                <div 
                  key={index} 
                  className="glass-card p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-shadow"
                >
                  <Link to={`/courses/${index}`} className="md:w-1/3">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="md:w-2/3">
                    <Link to={`/courses/${index}`} className="block">
                      <h3 className="text-xl font-bold mb-2 hover:text-accent-primary transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-6 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>
                          {Math.floor(Math.random() * 10000) + 5000} students
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{course.hours} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4 text-gray-400" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold text-lg">${course.price}</span>
                        <span className="text-sm text-gray-400 line-through ml-2">${course.originalPrice}</span>
                      </div>
                      <Link 
                        to={`/courses/${index}`}
                        className="glass-button text-sm bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Student Reviews */}
          <div className="glass-card p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-lg">{instructor.rating}</span>
                <span className="text-gray-400">({instructor.reviews} reviews)</span>
              </div>
            </div>
            
            <div className="space-y-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={`https://images.unsplash.com/photo-1${500 + index}1288749519-02379086bd7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=50&q=80`} 
                      alt="Student" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">
                        {["Alex Thompson", "Jamie Smith", "Morgan Lee"][index]}
                      </h4>
                      <div className="flex items-center gap-1">
                        {Array(5).fill(0).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < 5 - (index % 2) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-400 ml-1">3 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">
                    {[
                      "Incredible instructor! The way they explain complex concepts made everything so much clearer. I've tried other courses before, but this one really helped me understand the fundamentals in a practical way.",
                      "This instructor's course completely changed my career trajectory. The curriculum is well-structured and the projects are challenging but rewarding. I landed a job within a month of completing the course.",
                      "I appreciate how responsive the instructor is in the Q&A sections. They took time to address all my questions and provided additional resources when needed. Highly recommend any course taught by them."
                    ][index]}
                  </p>
                </div>
              ))}
            </div>
            
            <button className="glass-button w-full mt-6">
              View All Reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Required import for the component
import { Clock } from 'lucide-react';