import React, { useState } from 'react';
import { MapPin, Mail, Phone, MessageSquare, Send, Clock, Users } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo form submission - would connect to backend in production
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h5 className="text-accent-primary font-semibold tracking-wider">GET IN TOUCH</h5>
        <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
          We'd Love to <span className="gradient-text">Hear From You</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Whether you have a question about our courses, need technical support, or want to explore partnership opportunities, our team is here to help.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <MapPin className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Our Location</h3>
          <p className="text-gray-300">
            123 Learning Street<br />
            Education City, CA 94103<br />
            United States
          </p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Mail className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Email Us</h3>
          <p className="text-gray-300 mb-2">
            <a href="mailto:info@learnhub.com" className="hover:text-accent-primary transition-colors">
              info@learnhub.com
            </a>
          </p>
          <p className="text-gray-300">
            <a href="mailto:support@learnhub.com" className="hover:text-accent-primary transition-colors">
              support@learnhub.com
            </a>
          </p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent-primary/20 flex items-center justify-center">
            <Phone className="w-8 h-8 text-accent-primary" />
          </div>
          <h3 className="text-xl font-bold mb-2">Call Us</h3>
          <p className="text-gray-300 mb-2">
            <a href="tel:+11234567890" className="hover:text-accent-primary transition-colors">
              +1 (123) 456-7890
            </a>
          </p>
          <p className="text-gray-300">
            <a href="tel:+18001234567" className="hover:text-accent-primary transition-colors">
              +1 (800) 123-4567
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-accent-primary" />
            Send Us a Message
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input w-full py-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full py-2"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="glass-input w-full py-2 bg-transparent"
                required
              >
                <option value="" className="bg-dark-bg">Select a subject</option>
                <option value="Course Inquiry" className="bg-dark-bg">Course Inquiry</option>
                <option value="Technical Support" className="bg-dark-bg">Technical Support</option>
                <option value="Partnership" className="bg-dark-bg">Partnership Opportunity</option>
                <option value="Billing" className="bg-dark-bg">Billing & Payments</option>
                <option value="Other" className="bg-dark-bg">Other</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="glass-input w-full py-2 resize-none"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 w-full py-3 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
        
        <div className="glass-card overflow-hidden">
          <div className="h-full w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6305.567098582956!2d-122.41941247600684!3d37.77492043377641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1652396061695!5m2!1sen!2sus" 
              style={{ border: 0, height: '100%', width: '100%' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="LearnHub Location"
              className="min-h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass-card p-8 mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            Find quick answers to common questions about our platform, courses, and services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "How do I enroll in a course?",
              answer: "Browse our course catalog, select the course you're interested in, and click the 'Enroll' button. You'll need to create an account or sign in before completing your purchase."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards, PayPal, and bank transfers. For certain regions, we also offer local payment options."
            },
            {
              question: "Do courses have a time limit?",
              answer: "Most of our courses provide lifetime access, allowing you to learn at your own pace and revisit the material whenever you need to."
            },
            {
              question: "Can I get a refund if I'm not satisfied?",
              answer: "Yes, we offer a 30-day money-back guarantee for most courses. If you're not completely satisfied, you can request a full refund within 30 days of purchase."
            },
            {
              question: "Do you offer certificates of completion?",
              answer: "Yes, upon successful completion of a course, you'll receive a certificate that you can share on your resume or LinkedIn profile."
            },
            {
              question: "How do I become an instructor?",
              answer: "If you're interested in teaching on LearnHub, you can apply through our 'Become an Instructor' page. Our team will review your application and get back to you."
            },
          ].map((faq, index) => (
            <div key={index} className="glass-card p-6">
              <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Support Hours */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-2 text-accent-primary" />
            Support Hours
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span>Monday - Friday</span>
              <span>8:00 AM - 8:00 PM EST</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span>Saturday</span>
              <span>9:00 AM - 5:00 PM EST</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span>Email Support</span>
              <span>24/7</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Users className="w-6 h-6 mr-2 text-accent-primary" />
            Connect With Us
          </h2>
          <p className="text-gray-300 mb-6">
            Stay up-to-date with our latest courses and educational resources by following us on social media.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-3 glass-card hover:text-accent-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="p-3 glass-card hover:text-accent-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
            <a href="#" className="p-3 glass-card hover:text-accent-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="p-3 glass-card hover:text-accent-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd"></path>
              </svg>
            </a>
            <a href="#" className="p-3 glass-card hover:text-accent-primary transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass-card p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Explore our extensive library of courses and start your educational journey today.
        </p>
        <button className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0 px-8 py-3 text-lg">
          Browse Courses
        </button>
      </div>
    </div>
  );
};