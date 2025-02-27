import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Menu, X, Search, User, ShoppingCart, Heart } from 'lucide-react';
import { useShoppingContext } from '../contexts/ShoppingContext';
import { Cart } from './Cart';
import { Wishlist } from './Wishlist';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { cartCount, wishlistCount } = useShoppingContext();

  return (
    <header className="glass-card sticky top-4 mx-4 mt-4 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-accent-primary" />
            <Link to="/" className="font-bold text-xl">LearnHub</Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="font-medium hover:text-accent-primary transition-colors">Home</Link>
            <Link to="/courses" className="font-medium hover:text-accent-primary transition-colors">Courses</Link>
            <Link to="/instructors" className="font-medium hover:text-accent-primary transition-colors">Instructors</Link>
            <Link to="/about" className="font-medium hover:text-accent-primary transition-colors">About</Link>
            <Link to="/contact" className="font-medium hover:text-accent-primary transition-colors">Contact</Link>
          </nav>

          {/* User actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button aria-label="Search" className="p-2 hover:text-accent-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <div className="relative">
              <button 
                aria-label="Wishlist" 
                className="p-2 hover:text-accent-primary transition-colors relative"
                onClick={() => setIsWishlistOpen(true)}
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary rounded-full text-xs flex items-center justify-center">{wishlistCount}</span>
                )}
              </button>
              <Link
                to="/wishlist"
                className="absolute inset-0"
                aria-hidden="true"
              ></Link>
            </div>
            <div className="relative">
              <button 
                aria-label="Cart" 
                className="p-2 hover:text-accent-primary transition-colors relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary rounded-full text-xs flex items-center justify-center">{cartCount}</span>
                )}
              </button>
              <Link
                to="/cart"
                className="absolute inset-0"
                aria-hidden="true"
              ></Link>
            </div>
            <Link to="/signin" className="glass-button flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 hover:text-accent-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3">
            <Link to="/" className="block py-2 hover:text-accent-primary transition-colors">Home</Link>
            <Link to="/courses" className="block py-2 hover:text-accent-primary transition-colors">Courses</Link>
            <Link to="/instructors" className="block py-2 hover:text-accent-primary transition-colors">Instructors</Link>
            <Link to="/about" className="block py-2 hover:text-accent-primary transition-colors">About</Link>
            <Link to="/contact" className="block py-2 hover:text-accent-primary transition-colors">Contact</Link>
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <Link to="/signin" className="glass-button mt-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
              <div className="flex gap-4">
                <button aria-label="Search" className="p-2 hover:text-accent-primary transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <div className="relative">
                  <button 
                    aria-label="Wishlist" 
                    className="p-2 hover:text-accent-primary transition-colors relative"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsWishlistOpen(true);
                    }}
                  >
                    <Heart className="w-5 h-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary rounded-full text-xs flex items-center justify-center">{wishlistCount}</span>
                    )}
                  </button>
                  <Link 
                    to="/wishlist" 
                    className="absolute inset-0"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                  ></Link>
                </div>
                <div className="relative">
                  <button 
                    aria-label="Cart" 
                    className="p-2 hover:text-accent-primary transition-colors relative"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsCartOpen(true);
                    }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-primary rounded-full text-xs flex items-center justify-center">{cartCount}</span>
                    )}
                  </button>
                  <Link 
                    to="/cart"
                    className="absolute inset-0"
                    onClick={() => setIsMenuOpen(false)}
                    aria-hidden="true"
                  ></Link>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Cart and Wishlist modals */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Wishlist isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </header>
  );
};