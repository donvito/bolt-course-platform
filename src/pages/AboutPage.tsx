import React from 'react';
import { BookOpen, Users, Award, Clock, MapPin, Mail, Phone, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h5 className="text-accent-primary font-semibold tracking-wider">ABOUT US</h5>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
          Empowering Lives Through <span className="gradient-text">Quality Education</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          LearnHub is a leading online education platform committed to making high-quality learning accessible to everyone. 
          Our mission is to transform lives through education and help learners achieve their full potential.
        </p>
      </div>

      {/* Our Story */}
      <div className="glass-card p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-300 mb-4">
              Founded in 2020, LearnHub was born from a simple idea: quality education should be accessible to everyone, regardless of their location or background. What started as a small collection of web development courses has grown into a comprehensive platform offering hundreds of courses across multiple disciplines.
            </p>
            <p className="text-gray-300 mb-4">
              Our journey has been driven by the success stories of our students – professionals advancing their careers, entrepreneurs launching businesses, and curious minds expanding their knowledge. We take pride in creating an environment where learning is engaging, practical, and transformative.
            </p>
            <p className="text-gray-300">
              Today, LearnHub serves a global community of over 100,000 learners and continues to grow with a commitment to educational excellence and innovation.
            </p>
          </div>
          <div className="glass-card p-3">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Team collaborating"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Users className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">100K+</h3>
          <p className="text-gray-400">Active Students</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">500+</h3>
          <p className="text-gray-400">Quality Courses</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Award className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">50+</h3>
          <p className="text-gray-400">Expert Instructors</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Clock className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-2">15K+</h3>
          <p className="text-gray-400">Hours of Content</p>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            At LearnHub, our values guide everything we do. They reflect our commitment to providing an exceptional learning experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Excellence</h3>
            <p className="text-gray-300">
              We are committed to maintaining the highest standards in educational content and delivery, ensuring our students receive the best learning experience possible.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Accessibility</h3>
            <p className="text-gray-300">
              We believe education should be accessible to everyone, regardless of their background, location, or financial situation.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Innovation</h3>
            <p className="text-gray-300">
              We continuously seek new ways to improve our teaching methods, platform features, and content delivery to enhance the learning experience.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Community</h3>
            <p className="text-gray-300">
              We foster a supportive community where students and instructors can connect, collaborate, and grow together.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Practicality</h3>
            <p className="text-gray-300">
              We focus on practical, real-world applications that prepare our students for success in their careers and personal projects.
            </p>
          </div>
          <div className="glass-card p-6">
            <div className="w-12 h-12 mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Integrity</h3>
            <p className="text-gray-300">
              We operate with honesty and transparency in all our interactions with students, instructors, and partners.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Meet the passionate individuals leading LearnHub's mission to transform online education.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Alex Morgan",
              role: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "Former EdTech executive with a passion for democratizing education. Alex founded LearnHub with a vision to create a global classroom without barriers."
            },
            {
              name: "Samantha Lee",
              role: "Chief Learning Officer",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "With a PhD in Educational Technology and decades of teaching experience, Samantha leads our curriculum development and instructional design teams."
            },
            {
              name: "Marcus Johnson",
              role: "CTO",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
              bio: "A tech innovator who's passionate about creating seamless digital learning experiences. Marcus oversees our platform development and technological advances."
            },
          ].map((member, index) => (
            <div key={index} className="glass-card overflow-hidden">
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-accent-secondary mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners */}
      <div className="glass-card p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            We collaborate with leading companies and institutions to deliver cutting-edge content and create career opportunities for our students.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-center h-24">
              <div className="text-xl font-bold text-gray-400 opacity-70">PARTNER {i}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Learning Community</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Become a part of LearnHub today and start your journey toward mastering new skills and achieving your goals.
        </p>
        <button className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 px-8 py-3 text-lg">
          Explore Courses
        </button>
      </div>
    </div>
  );
};