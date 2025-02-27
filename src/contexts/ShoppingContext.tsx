import React, { createContext, useContext, useState, useEffect } from 'react';
import { coursesData } from '../data/courses';

// Define the Course type
type Course = typeof coursesData[0];

// Define the shopping context type
interface ShoppingContextType {
  wishlist: Course[];
  cart: Course[];
  addToWishlist: (course: Course) => void;
  removeFromWishlist: (courseId: number) => void;
  isInWishlist: (courseId: number) => boolean;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: number) => void;
  isInCart: (courseId: number) => boolean;
  cartTotal: number;
  clearCart: () => void;
  wishlistCount: number;
  cartCount: number;
}

// Create the context
const ShoppingContext = createContext<ShoppingContextType | null>(null);

// Custom hook for using the shopping context
export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShoppingContext must be used within a ShoppingProvider');
  }
  return context;
};

// Shopping provider component
export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [wishlist, setWishlist] = useState<Course[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch (e) {
        console.error('Error parsing wishlist from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  const [cart, setCart] = useState<Course[]>(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever wishlist or cart changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist operations
  const addToWishlist = (course: Course) => {
    if (!isInWishlist(coursesData.indexOf(course))) {
      setWishlist([...wishlist, course]);
    }
  };

  const removeFromWishlist = (courseId: number) => {
    setWishlist(wishlist.filter(item => coursesData.indexOf(item) !== courseId));
  };

  const isInWishlist = (courseId: number) => {
    return wishlist.some((course) => coursesData.indexOf(course) === courseId);
  };

  // Cart operations
  const addToCart = (course: Course) => {
    if (!isInCart(coursesData.indexOf(course))) {
      setCart([...cart, course]);
    }
  };

  const removeFromCart = (courseId: number) => {
    setCart(cart.filter(item => coursesData.indexOf(item) !== courseId));
  };

  const isInCart = (courseId: number) => {
    return cart.some((course) => coursesData.indexOf(course) === courseId);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, course) => total + course.price, 0);

  // Get counts
  const wishlistCount = wishlist.length;
  const cartCount = cart.length;

  // Context value
  const value: ShoppingContextType = {
    wishlist,
    cart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
    removeFromCart,
    isInCart,
    cartTotal,
    clearCart,
    wishlistCount,
    cartCount
  };

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};