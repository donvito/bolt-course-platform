import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, CreditCard, Trash2, AlertCircle } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { coursesData } from '../data/courses';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartTotal, clearCart, cartCount } = useShoppingContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setCheckoutSuccess(true);
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const handleRemoveFromCart = (courseId: number) => {
    removeFromCart(courseId);
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
            <ShoppingCart className="w-5 h-5" />
            {checkoutSuccess ? "Order Complete" : "Your Cart"}
            {!checkoutSuccess && cartCount > 0 && (
              <span className="text-sm bg-accent-primary/80 text-white px-2 py-0.5 rounded-full">{cartCount}</span>
            )}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {checkoutSuccess ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Thank You for Your Purchase!</h3>
            <p className="text-gray-300 mb-8">
              Your order has been processed successfully. You can now access your courses from your dashboard.
            </p>
            <button 
              onClick={onClose}
              className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 w-full"
            >
              Continue Shopping
            </button>
          </div>
        ) : cart.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Your Cart is Empty</h3>
            <p className="text-gray-300 mb-8">
              Looks like you haven't added any courses to your cart yet.
            </p>
            <button 
              onClick={onClose}
              className="glass-button w-full"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="divide-y divide-white/10">
              {cart.map((course, index) => {
                const courseId = coursesData.indexOf(course);
                return (
                  <div key={index} className="p-4 flex gap-4">
                    <Link to={`/courses/${courseId}`} className="shrink-0">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link to={`/courses/${courseId}`} className="font-medium hover:text-accent-primary transition-colors">
                        {course.title}
                      </Link>
                      <p className="text-sm text-gray-400 mb-2">by {course.instructor}</p>
                      <div className="flex justify-between items-center">
                        <p className="font-bold">${course.price}</p>
                        <button 
                          onClick={() => handleRemoveFromCart(courseId)}
                          className="p-1.5 glass-card hover:text-red-500 transition-colors"
                          aria-label="Remove course from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-300">Tax:</span>
                <span className="font-bold">${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mb-6 text-lg">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${(cartTotal * 1.1).toFixed(2)}</span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={clearCart}
                  className="glass-button flex-grow"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="glass-button flex-grow bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex justify-center items-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Checkout</span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>This is a demo checkout. No actual payment will be processed.</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};