import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, BarChart3, Users, Award, CheckCircle, Download, Play, BookOpen, ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import { coursesData } from '../data/courses';
import { getInstructorByName } from '../data/instructors';
import { useShoppingContext } from '../contexts/ShoppingContext';

export const CourseDetailPage: React.FC = () => {
  const { courseId } = useParams();
  const courseIdNum = courseId ? parseInt(courseId) : -1;
  
  // Find the course by ID
  const course = coursesData.find((c, index) => index.toString() === courseId);
  
  // Get instructor data if available
  const instructor = course ? getInstructorByName(course.instructor) : undefined;
  
  // Get shopping context
  const { 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist, 
    addToCart, 
    isInCart 
  } = useShoppingContext();

  // Check if course is in wishlist or cart
  const inWishlist = courseIdNum >= 0 ? isInWishlist(courseIdNum) : false;
  const inCart = courseIdNum >= 0 ? isInCart(courseIdNum) : false;

  // Handlers for wishlist and cart
  const handleWishlistToggle = () => {
    if (!course) return;
    
    if (inWishlist) {
      removeFromWishlist(courseIdNum);
    } else {
      addToWishlist(course);
    }
  };

  const handleAddToCart = () => {
    if (!course || inCart) return;
    addToCart(course);
  };
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="mb-8">The course you are looking for does not exist.</p>
        <Link to="/" className="glass-button inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    );
  }

  // Sample curriculum data
  const curriculum = course.curriculum || [
    { title: "Introduction to the Course", duration: "10:25" },
    { title: "Setting Up Your Environment", duration: "15:40" },
    { title: "Core Concepts Overview", duration: "22:15" },
    { title: "Building Your First Project", duration: "45:30" },
    { title: "Advanced Techniques", duration: "38:20" },
  ];

  // Sample requirements
  const requirements = [
    "Basic understanding of programming concepts",
    "Computer with internet connection",
    "No prior experience with this specific technology required",
    "Willingness to learn and practice regularly"
  ];

  // Sample learning objectives
  const learningObjectives = [
    "Master fundamental concepts and best practices",
    "Build real-world projects from scratch",
    "Implement advanced techniques and optimize performance",
    "Troubleshoot common issues and debug efficiently",
    "Deploy your projects to production environments",
    "Stay updated with the latest industry standards"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-accent-primary hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Courses</span>
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="glass-card overflow-hidden mb-8">
            <div className="relative h-[300px] md:h-[400px]">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-accent-primary/90 hover:bg-accent-primary rounded-full flex items-center justify-center transition-colors">
                  <Play className="w-10 h-10 fill-white text-white" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <div className="bg-accent-primary/90 text-white text-xs px-3 py-1 rounded-full inline-block">
                  {course.category}
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-300 text-lg mb-6">{course.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent-primary" />
                <span>{course.hours} hours total</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent-primary" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent-primary" />
                <span>10,500+ students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-accent-primary" />
                <span>Last updated: June 2025</span>
              </div>
            </div>
            
            <div className="mb-6">
              {instructor ? (
                <Link to={`/instructors/${instructor.id}`} className="flex items-center gap-2 mb-4 group">
                  <img 
                    src={instructor.image}
                    alt={instructor.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent-primary group-hover:border-accent-secondary transition-colors"
                  />
                  <div>
                    <p className="font-medium text-lg group-hover:text-accent-primary transition-colors">
                      Instructor: {instructor.name}
                    </p>
                    <p className="text-gray-400">{instructor.role}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-2 mb-4">
                  <img 
                    src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80`}
                    alt={course.instructor} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-accent-primary"
                  />
                  <div>
                    <p className="font-medium text-lg">Instructor: {course.instructor}</p>
                    <p className="text-gray-400">Verified Expert & Educator</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {learningObjectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                    <span>{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Course Content</h3>
            <div className="mb-4 flex justify-between">
              <p>{curriculum.length} sections • 42 lectures • {course.hours} total hours</p>
              <button className="text-accent-primary hover:underline">Expand All Sections</button>
            </div>
            
            <div className="divide-y divide-white/10">
              {curriculum.map((lesson, index) => (
                <div key={index} className="py-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-accent-primary/20 text-accent-primary flex items-center justify-center">
                        {index + 1}
                      </span>
                      {lesson.title}
                      {index === 0 && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Free Preview</span>}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{lesson.duration}</span>
                      {index === 0 ? (
                        <button className="p-1.5 bg-accent-primary/20 text-accent-primary rounded-full">
                          <Play className="w-4 h-4 fill-accent-primary" />
                        </button>
                      ) : (
                        <div className="p-1.5 glass-card rounded-full opacity-60">
                          <BookOpen className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 pl-10">
                    {index === 0 ? 'Free preview available' : 'Unlock this lesson with enrollment'}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6 md:p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Requirements</h3>
            <ul className="space-y-2">
              {requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-2"></div>
                  <span>{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <p className="text-3xl font-bold">${course.price}</p>
                <p className="text-lg text-gray-400 line-through">${course.originalPrice}</p>
              </div>
              <p className="text-sm text-gray-400 mb-4">75% off - Offer ends in 2 days</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <button 
                className 
                onClick={handleAddToCart}
                disabled={inCart}
                className={`w-full glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 py-3 font-medium flex items-center justify-center gap-2 ${inCart ? 'opacity-80' : ''}`}
              >
                <ShoppingCart className="w-4 h-4" />
                {inCart ? "Added to Cart" : "Enroll Now"}
              </button>
              <button 
                onClick={handleWishlistToggle}
                className={`w-full glass-button py-3 font-medium flex items-center justify-center gap-2 ${inWishlist ? 'text-accent-primary' : ''}`}
              >
                <Heart className={`w-4 h-4 ${inWishlist ? 'fill-accent-primary' : ''}`} />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-center text-sm text-gray-400 mb-4">30-Day Money-Back Guarantee</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-bold">This Course Includes:</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{course.hours} hours on-demand video</span>
                </div>
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-400" />
                  <span>15 downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-gray-400" />
                  <span>42 lessons</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span>Community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-gray-400" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex justify-between mb-2">
                <span>Share this course:</span>
              </div>
              <div className="flex gap-2">
                <button className="glass-card p-2 hover:text-accent-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <button className="glass-card p-2 hover:text-accent-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </button>
                <button className="glass-card p-2 hover:text-accent-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </button>
                <button className="glass-card p-2 hover:text-accent-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};