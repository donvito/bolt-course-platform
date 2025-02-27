import React from 'react';
import { Play, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h5 className="text-accent-primary font-semibold tracking-wider">TRANSFORM YOUR SKILLS</h5>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover the <span className="gradient-text">Future</span> of Online Learning
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Unlock your potential with our cutting-edge courses taught by industry experts. Learn at your own pace and take your career to new heights.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 flex items-center gap-2">
                <span>Explore Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="glass-button flex items-center gap-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>
            <div className="flex items-center gap-6 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-dark-bg object-cover" 
                    src={`https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=120&q=80&${i}`}
                    alt="Student avatar" 
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold">2,500+ students</p>
                <p className="text-sm text-gray-400">joined this month</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="glass-card p-2 md:p-3">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Modern learning environment with technology"
                className="rounded-lg w-full h-auto"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="glass-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-primary/20 flex items-center justify-center">
                  <span className="text-accent-primary font-bold">50+</span>
                </div>
                <div>
                  <p className="font-semibold">Expert Instructors</p>
                  <p className="text-xs text-gray-400">Learn from the best</p>
                </div>
              </div>
              <div className="glass-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-secondary/20 flex items-center justify-center">
                  <span className="text-accent-secondary font-bold">100+</span>
                </div>
                <div>
                  <p className="font-semibold">Premium Courses</p>
                  <p className="text-xs text-gray-400">High-quality content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};