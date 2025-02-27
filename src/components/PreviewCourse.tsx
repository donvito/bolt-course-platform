import React from 'react';
import { X, Play, BookOpen, List, BarChart3, Clock, Heart, ShoppingCart } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { coursesData } from '../data/courses';

interface PreviewCourseProps {
  isOpen: boolean;
  onClose: () => void;
  course: {
    title: string;
    category: string;
    image: string;
    instructor: string;
    description?: string;
    curriculum?: {
      title: string;
      duration: string;
    }[];
  } | null;
}

export const PreviewCourse: React.FC<PreviewCourseProps> = ({
  isOpen,
  onClose,
  course,
}) => {
  const { addToWishlist, isInWishlist, addToCart, isInCart } = useShoppingContext();

  if (!isOpen || !course) return null;

  // Find the course index in coursesData
  const courseIndex = coursesData.findIndex(c => c.title === course.title);
  const inWishlist = courseIndex >= 0 ? isInWishlist(courseIndex) : false;
  const inCart = courseIndex >= 0 ? isInCart(courseIndex) : false;

  // Handle wishlist and cart actions
  const handleAddToWishlist = () => {
    if (courseIndex >= 0) {
      addToWishlist(coursesData[courseIndex]);
    }
  };

  const handleAddToCart = () => {
    if (courseIndex >= 0 && !inCart) {
      addToCart(coursesData[courseIndex]);
    }
  };

  // Sample curriculum data (normally would come from the course data)
  const curriculum = course.curriculum || [
    { title: "Introduction to the Course", duration: "10:25" },
    { title: "Setting Up Your Environment", duration: "15:40" },
    { title: "Core Concepts Overview", duration: "22:15" },
    { title: "Building Your First Project", duration: "45:30" },
    { title: "Advanced Techniques", duration: "38:20" },
  ];

  const description = course.description || 
    "This comprehensive course will take you from beginner to professional. Learn through real-world projects, quizzes, and assignments designed to reinforce your knowledge and skills. Get access to exclusive resources and join a community of learners.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close preview"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative h-64 md:h-80">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-accent-primary/90 hover:bg-accent-primary rounded-full flex items-center justify-center transition-colors">
              <Play className="w-8 h-8 fill-white text-white" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="bg-accent-primary/90 text-white text-xs px-3 py-1 rounded-full inline-block mb-2">
              {course.category}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{course.title}</h2>
            <p className="text-gray-300">by {course.instructor}</p>
          </div>
        </div>
        
        <div className="p-6 md:p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">About This Course</h3>
            <p className="text-gray-300">{description}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="p-2 glass-card rounded-lg">
                  <BookOpen className="w-5 h-5 text-accent-primary" />
                </div>
                <p>Comprehensive curriculum designed by industry experts</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 glass-card rounded-lg">
                  <BarChart3 className="w-5 h-5 text-accent-primary" />
                </div>
                <p>Master advanced concepts through practical examples</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 glass-card rounded-lg">
                  <Clock className="w-5 h-5 text-accent-primary" />
                </div>
                <p>Learn at your own pace with lifetime access</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 glass-card rounded-lg">
                  <List className="w-5 h-5 text-accent-primary" />
                </div>
                <p>Access to quizzes, assignments, and downloadable resources</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Course Preview</h3>
              <p className="text-sm text-gray-400">5 of 42 lessons</p>
            </div>
            <div className="glass-card divide-y divide-white/10">
              {curriculum.map((lesson, index) => (
                <div key={index} className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-accent-primary/20 text-accent-primary' : 'glass-card'}`}>
                      {index + 1}
                    </div>
                    <p className="font-medium">{lesson.title}</p>
                    {index === 0 && <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">Free</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{lesson.duration}</span>
                    {index === 0 ? (
                      <button className="p-1.5 bg-accent-primary/20 text-accent-primary rounded-full">
                        <Play className="w-4 h-4 fill-accent-primary" />
                      </button>
                    ) : (
                      <div className="p-1.5 glass-card rounded-full opacity-60">
                        <Play className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleAddToCart}
              disabled={inCart}
              className={`glass-button flex items-center justify-center gap-2 ${
                inCart 
                  ? 'bg-green-500/20 text-green-500 border-green-500/50' 
                  : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {inCart ? "Added to Cart" : "Enroll Now"}
            </button>
            <button 
              onClick={handleAddToWishlist}
              className={`glass-button flex items-center justify-center gap-2 ${inWishlist ? 'text-accent-primary' : ''}`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-accent-primary' : ''}`} />
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};