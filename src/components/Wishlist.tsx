import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingCart, Star, Clock, BarChart3, Trash2 } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { coursesData } from '../data/courses';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, addToCart, isInCart, wishlistCount } = useShoppingContext();

  if (!isOpen) return null;

  const handleRemoveFromWishlist = (courseId: number) => {
    removeFromWishlist(courseId);
  };

  const handleAddToCart = (courseId: number) => {
    const course = coursesData[courseId];
    addToCart(course);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:justify-end">
      <div 
        className="absolute inset-0 bg-dark-bg/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className="glass-card w-full max-w-md md:h-screen md:max-h-screen overflow-y-auto relative z-10 md:mr-0">
        <div className="sticky top-0 bg-dark-card/90 backdrop-blur-md z-10 p-4 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Heart className="w-5 h-5 text-accent-primary fill-accent-primary" />
            Your Wishlist
            {wishlistCount > 0 && (
              <span className="text-sm bg-accent-primary/80 text-white px-2 py-0.5 rounded-full">{wishlistCount}</span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {wishlist.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
            <p className="text-gray-300 mb-8">
              Save courses you're interested in by clicking the heart icon.
            </p>
            <button 
              onClick={onClose}
              className="glass-button w-full"
            >
              Browse Courses
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {wishlist.map((course, index) => {
              const courseId = coursesData.indexOf(course);
              const inCart = isInCart(courseId);
              
              return (
                <div key={index} className="p-4">
                  <div className="flex gap-4 mb-3">
                    <Link to={`/courses/${courseId}`} className="shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/courses/${courseId}`} className="font-medium hover:text-accent-primary transition-colors">
                        {course.title}
                      </Link>
                      <p className="text-sm text-gray-400">by {course.instructor}</p>
                      
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                      
                      <div className="flex gap-4 text-xs text-gray-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.hours} hours</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-3 h-3" />
                          <span>{course.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-bold text-lg">${course.price}</p>
                      <p className="text-sm text-gray-400 line-through">${course.originalPrice}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleRemoveFromWishlist(courseId)}
                      className="glass-button flex-1 flex items-center justify-center gap-1 text-sm"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                    <button
                      onClick={() => handleAddToCart(courseId)}
                      disabled={inCart}
                      className={`glass-button flex-1 flex items-center justify-center gap-1 text-sm ${
                        inCart ? 'bg-green-500/20 text-green-500' : 'bg-accent-primary/20 text-accent-primary'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{inCart ? 'Added to Cart' : 'Add to Cart'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
            
            <div className="p-4">
              <Link
                to="/cart"
                onClick={onClose}
                className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 w-full flex justify-center items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>View Cart</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};