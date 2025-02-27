import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-16 pb-8 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/90 to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-accent-primary" />
              <span className="font-bold text-xl">LearnHub</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering learners worldwide with cutting-edge education and expert-led courses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 glass-card hover:text-accent-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:text-accent-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:text-accent-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:text-accent-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 glass-card hover:text-accent-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-accent-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-gray-400 hover:text-accent-primary transition-colors">Courses</Link></li>
              <li><Link to="/instructors" className="text-gray-400 hover:text-accent-primary transition-colors">Instructors</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-accent-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-accent-primary transition-colors">Contact</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">Web Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">Data Science</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">UI/UX Design</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">AI & Machine Learning</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">Marketing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-primary transition-colors">Business</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Learning Street, Education City, CA 94103</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-primary" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-accent-primary transition-colors">+1 (123) 456-7890</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-primary" />
                <a href="mailto:info@learnhub.com" className="text-gray-400 hover:text-accent-primary transition-colors">info@learnhub.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 LearnHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-400 hover:text-accent-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-gray-400 hover:text-accent-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};