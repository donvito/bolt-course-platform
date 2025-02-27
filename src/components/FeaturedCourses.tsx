import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ArrowRight, BarChart3, Play, Heart, ShoppingCart } from 'lucide-react';
import { PreviewCourse } from './PreviewCourse';
import { coursesData } from '../data/courses';
import { useShoppingContext } from '../contexts/ShoppingContext';

interface CourseCardProps {
  courseId: string;
  title: string;
  category: string;
  image: string;
  instructor: string;
  rating: number;
  hours: number;
  level: string;
  price: number;
  originalPrice: number;
  onPreview: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  title,
  category,
  image,
  instructor,
  rating,
  hours,
  level,
  price,
  originalPrice,
  onPreview
}) => {
  const { addToWishlist, isInWishlist, addToCart, isInCart } = useShoppingContext();
  const courseIdNum = parseInt(courseId);
  const inWishlist = isInWishlist(courseIdNum);
  const inCart = isInCart(courseIdNum);

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(coursesData[courseIdNum]);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(coursesData[courseIdNum]);
  };

  return (
    <div className="glass-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative">
        <Link to={`/courses/${courseId}`}>
          <img src={image} alt={title} className="w-full h-48 object-cover" />
        </Link>
        <div className="absolute top-3 left-3 bg-accent-primary/90 text-white text-xs px-2 py-1 rounded-full">
          {category}
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={handleAddToWishlist}
            className={`w-8 h-8 ${inWishlist ? 'bg-accent-primary/90' : 'bg-dark-bg/70 hover:bg-accent-primary/90'} text-white rounded-full flex items-center justify-center transition-colors`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
          </button>
          <button 
            onClick={onPreview}
            className="w-8 h-8 bg-dark-bg/70 hover:bg-accent-primary/90 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Preview course"
          >
            <Play className="w-4 h-4 fill-white" />
          </button>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <Link to={`/courses/${courseId}`} className="block">
          <h3 className="font-bold text-lg hover:text-accent-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-sm text-gray-400">by {instructor}</p>
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400 text-sm">(120+ reviews)</span>
        </div>
        
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{hours} hours</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4" />
            <span>{level}</span>
          </div>
        </div>
        
        <div className="pt-2 border-t border-white/10 flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">${price}</p>
            <p className="text-sm text-gray-400 line-through">${originalPrice}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className={`glass-button text-sm ${
                inCart 
                  ? 'bg-green-500/20 text-green-500 border-green-500/50' 
                  : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0'
              }`}
              disabled={inCart}
            >
              {inCart ? (
                <div className="flex items-center gap-1">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Added</span>
                </div>
              ) : "Enroll"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCourses: React.FC = () => {
  const [previewCourse, setPreviewCourse] = useState<any>(null);

  return (
    <section id="courses" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h5 className="text-accent-primary font-semibold tracking-wider">OUR COURSES</h5>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Featured Courses</h2>
            <p className="text-gray-400 mt-3 max-w-lg">
              Explore our most popular courses chosen by thousands of students worldwide.
            </p>
          </div>
          <Link to="/courses" className="hidden md:flex items-center gap-2 text-accent-primary hover:underline">
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursesData.map((course, index) => (
            <CourseCard 
              key={index} 
              courseId={index.toString()}
              {...course} 
              onPreview={() => setPreviewCourse(course)}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center md:hidden">
          <Link to="/courses" className="glass-button inline-flex items-center gap-2">
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <PreviewCourse 
        isOpen={previewCourse !== null} 
        onClose={() => setPreviewCourse(null)} 
        course={previewCourse}
      />
    </section>
  );
};