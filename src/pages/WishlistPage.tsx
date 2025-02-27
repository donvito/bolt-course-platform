import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, BarChart3, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { coursesData } from '../data/courses';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist, addToCart, isInCart, wishlistCount } = useShoppingContext();
  
  const handleRemoveFromWishlist = (courseId: number) => {
    removeFromWishlist(courseId);
  };

  const handleAddToCart = (courseId: number) => {
    const course = coursesData[courseId];
    addToCart(course);
  };

  if (wishlistCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Save courses you're interested in and come back to them later.
          </p>
        </div>
        
        <div className="glass-card p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-300 mb-8">
            You haven't added any courses to your wishlist yet. Browse our courses and click the heart icon to save courses you're interested in.
          </p>
          <Link to="/courses" className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 inline-flex items-center gap-2">
            <span>Browse Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Wishlist</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Review and manage courses you've saved for later. Add them to your cart when you're ready to enroll.
        </p>
      </div>
      
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-300">{wishlistCount} {wishlistCount === 1 ? 'course' : 'courses'} in your wishlist</p>
        <Link 
          to="/cart" 
          className="glass-button inline-flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>View Cart</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {wishlist.map((course, index) => {
          const courseId = coursesData.indexOf(course);
          const inCart = isInCart(courseId);
          
          return (
            <div key={index} className="glass-card p-6 flex flex-col md:flex-row gap-6">
              <Link to={`/courses/${courseId}`} className="shrink-0">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full md:w-64 h-48 object-cover rounded-lg"
                />
              </Link>
              
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                  <div>
                    <Link to={`/courses/${courseId}`} className="block">
                      <h2 className="text-2xl font-bold hover:text-accent-primary transition-colors">{course.title}</h2>
                    </Link>
                    <p className="text-gray-400 mb-2">by {course.instructor}</p>
                    
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{course.rating}</span>
                      <span className="text-gray-400 text-sm">(120+ reviews)</span>
                    </div>
                    
                    <div className="flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.hours} hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart3 className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold">${course.price}</p>
                    <p className="text-gray-400 line-through">${course.originalPrice}</p>
                    <p className="text-sm text-accent-primary">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% off
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">
                  {course.description || "This comprehensive course will take you from beginner to professional. Learn through real-world projects designed to reinforce your skills."}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  <button
                    onClick={() => handleRemoveFromWishlist(courseId)}
                    className="glass-button flex items-center gap-2"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(courseId)}
                    disabled={inCart}
                    className={`glass-button flex items-center gap-2 ${
                      inCart 
                        ? 'bg-green-500/20 text-green-500 border-green-500/50' 
                        : 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
                  </button>
                  
                  <Link 
                    to={`/courses/${courseId}`}
                    className="glass-button"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center mt-12">
        <Link to="/courses" className="glass-button inline-flex items-center gap-2">
          <ArrowRight className="w-4 h-4 rotate-180" />
          <span>Continue Shopping</span>
        </Link>
        
        <Link 
          to="/cart" 
          className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 inline-flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Go to Cart</span>
        </Link>
      </div>
    </div>
  );
};