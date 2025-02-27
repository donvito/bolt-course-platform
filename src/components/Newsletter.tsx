import React from 'react';
import { Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-secondary/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated With Our Newsletter</h2>
            <p className="text-gray-300 mb-8">
              Subscribe to our newsletter to receive updates on new courses, special offers, and educational resources.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="glass-input flex-grow"
                required
              />
              <button 
                type="submit" 
                className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex items-center gap-2 justify-center"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            
            <p className="text-xs text-gray-400 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from LearnHub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};