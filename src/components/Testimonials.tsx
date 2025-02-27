import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ content, author, role, image }) => {
  return (
    <div className="glass-card p-6 md:p-8">
      <Quote className="w-10 h-10 text-accent-primary opacity-50 mb-4" />
      <p className="text-lg md:text-xl mb-6">{content}</p>
      <div className="flex items-center gap-4">
        <img 
          src={image} 
          alt={author} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{author}</h4>
          <p className="text-sm text-gray-400">{role}</p>
        </div>
      </div>
    </div>
  );
};

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      content: "The courses are incredibly well-structured and comprehensive. I went from a complete beginner to landing my dream job in just 6 months!",
      author: "Emma Thompson",
      role: "Frontend Developer at Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      content: "The instructors are amazing and the community support is unmatched. LearnHub has completely transformed my career path.",
      author: "James Rodriguez",
      role: "Data Scientist at Amazon",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    },
    {
      content: "The UI/UX Design course was exactly what I needed to refresh my skills and keep up with modern design trends. Highly recommended!",
      author: "Sophia Chen",
      role: "Senior Designer at Adobe",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-primary/5 pointer-events-none"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h5 className="text-accent-primary font-semibold tracking-wider">TESTIMONIALS</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">What Our Students Say</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Discover how LearnHub has helped thousands of students achieve their personal and professional goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};