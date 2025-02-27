import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingCart, Trash2, ArrowRight, CreditCard } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { coursesData } from '../data/courses';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart, cartTotal, cartCount } = useShoppingContext();
  
  const handleRemoveFromCart = (courseId: number) => {
    removeFromCart(courseId);
  };

  const tax = cartTotal * 0.1;
  const total = cartTotal + tax;

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Shopping Cart</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Add courses to your cart to purchase them and start learning.
          </p>
        </div>
        
        <div className="glass-card p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-300 mb-8">
            You haven't added any courses to your cart yet. Browse our catalog to find courses that interest you.
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
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Shopping Cart</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Review your selected courses and proceed to checkout when you're ready.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-300">{cartCount} {cartCount === 1 ? 'course' : 'courses'} in your cart</p>
            <button 
              onClick={clearCart}
              className="glass-button text-sm"
            >
              Clear Cart
            </button>
          </div>
          
          <div className="space-y-6">
            {cart.map((course, index) => {
              const courseId = coursesData.indexOf(course);
              
              return (
                <div key={index} className="glass-card p-6 flex flex-col md:flex-row gap-6">
                  <Link to={`/courses/${courseId}`} className="shrink-0">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full md:w-48 h-36 object-cover rounded-lg"
                    />
                  </Link>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row justify-between gap-4 mb-3">
                      <div>
                        <Link to={`/courses/${courseId}`} className="block">
                          <h2 className="text-xl font-bold hover:text-accent-primary transition-colors">{course.title}</h2>
                        </Link>
                        <p className="text-gray-400 mb-2">by {course.instructor}</p>
                        
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{course.rating}</span>
                        </div>
                        
                        <div className="flex gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.hours} hours</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xl font-bold">${course.price}</p>
                        <p className="text-gray-400 line-through">${course.originalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => handleRemoveFromCart(courseId)}
                        className="glass-button text-sm flex items-center gap-2"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12">
            <Link to="/courses" className="glass-button inline-flex items-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-300">Original Price:</span>
                <span className="font-medium">${cart.reduce((sum, course) => sum + course.originalPrice, 0).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Discounts:</span>
                <span className="font-medium text-green-500">-${(cart.reduce((sum, course) => sum + course.originalPrice, 0) - cartTotal).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal:</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-300">Tax (10%):</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total:</span>
                  <span className="font-bold text-lg">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="glass-button w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex justify-center items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Checkout</span>
            </Link>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 flex justify-center items-center gap-1">
                <span>Secure Checkout</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </p>
            </div>
            
            <div className="flex justify-center gap-2 mt-4">
              <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#016FD0" width="36" height="24" rx="4"></rect>
                <path d="M18.265 9.656h-3.421v5.688h3.421V9.656z" fill="#EEEEEE"></path>
                <path d="M15.432 12.5c0-1.093.543-2.062 1.372-2.665a3.365 3.365 0 00-2.07-.706c-1.853 0-3.354 1.496-3.354 3.342 0 1.845 1.501 3.342 3.354 3.342.763 0 1.464-.253 2.07-.706A3.347 3.347 0 0115.432 12.5z" fill="#EEEEEE"></path>
                <path d="M24.555 12.5c0 1.845-1.5 3.342-3.353 3.342-.762 0-1.464-.253-2.07-.706.83-.603 1.372-1.572 1.372-2.665 0-1.092-.543-2.062-1.372-2.665a3.365 3.365 0 012.07-.706c1.853 0 3.354 1.496 3.354 3.342v.058z" fill="#EEEEEE"></path>
              </svg>
              <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                <rect fill="#F3F4F5" width="36" height="24" rx="4"></rect>
                <path d="M15.277 15.29h-2.488L14.387 8h2.488l-1.598 7.29zm8.907-7.03c-.99-.385-2.288-.686-3.717-.686-2.342 0-4.496 1.22-4.496 2.97 0 1.296 1.32 2.032 2.355 2.473 1.034.441 1.38.743 1.38 1.142 0 .614-.825.892-1.597.892-.987 0-1.667-.232-2.492-.685l-.386-.172-.386 2.366c.77.336 2.168.597 3.676.634 2.453 0 4.537-1.146 4.57-2.93.033-.957-.605-1.683-1.936-2.29-.813-.387-1.32-.628-1.32-1.031.018-.331.407-.692 1.255-.707.716-.085 1.299.05 1.716.205l.22.1.33-2.19v-.001zm5.448-.26h-1.936c-.601 0-1.048.172-1.32.8l-3.716 8.75h2.63l.55-1.371h3.205l.275 1.37h2.322l-2.01-9.55zm-2.96 6.2l.99-2.498c-.016.031.22-.562.352-.93l.165.82.575 2.607H26.67v.001zM13.512 8l-2.453 6.498-.275-1.37c-.44-1.518-1.87-3.174-3.454-4l2.2 7.76 2.63-.001L16.142 8h-2.63z" fill="#2A2A6C"></path>
              </svg>
              <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <rect fill="#F3F4F5" width="36" height="24" rx="4"></rect>
                  <circle fill="#F79E1B" cx="23.1" cy="12" r="6.5"></circle>
                  <circle fill="#EB001B" cx="13.1" cy="12" r="6.5"></circle>
                  <path d="M18.1 17.8a6.5 6.5 0 010-11.6 6.5 6.5 0 000 11.6z" fill="#FF5F00"></path>
                </g>
              </svg>
              <svg className="h-6" viewBox="0 0 36 24" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" fillRule="evenodd">
                  <rect fill="#016FD0" width="36" height="24" rx="4"></rect>
                  <path d="M19.6 11.1l-.1-2.1h2.6v-.5c0-3-2-5.2-5.2-5.2-3 0-5.2 2.2-5.2 5.2v.5h2.5l.1 2.1H7.5c0 5.8 4.6 10.5 10.4 10.5 5.7 0 10.4-4.7 10.4-10.5h-8.7z" fill="#EEEEEE"></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};