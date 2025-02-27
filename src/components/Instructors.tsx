import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import { instructorsData } from '../data/instructors';

interface InstructorCardProps {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  courses: number;
  students: number;
}

const InstructorCard: React.FC<InstructorCardProps> = ({
  id,
  name,
  role,
  image,
  bio,
  courses,
  students
}) => {
  return (
    <div className="glass-card overflow-hidden group">
      <div className="relative">
        <Link to={`/instructors/${id}`}>
          <img 
            src={image} 
            alt={name}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-accent-secondary">{role}</p>
          </div>
        </Link>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-gray-300 text-sm">{bio}</p>
        <div className="flex justify-between text-sm">
          <div>
            <p className="font-semibold">{courses}</p>
            <p className="text-gray-400">Courses</p>
          </div>
          <div>
            <p className="font-semibold">{students.toLocaleString()}</p>
            <p className="text-gray-400">Students</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4 pt-2">
          <a href="#" className="p-2 hover:text-accent-primary transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 hover:text-accent-primary transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="p-2 hover:text-accent-primary transition-colors">
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export const Instructors: React.FC = () => {
  return (
    <section id="instructors" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-accent-primary font-semibold tracking-wider">MEET OUR INSTRUCTORS</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Learn From The Experts</h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            Our instructors are industry professionals with years of real-world experience and a passion for teaching.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {instructorsData.map((instructor, index) => (
            <InstructorCard 
              key={index} 
              id={instructor.id}
              name={instructor.name}
              role={instructor.role}
              image={instructor.image}
              bio={instructor.bio}
              courses={instructor.courses}
              students={instructor.students}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/instructors" className="glass-button bg-gradient-to-r from-accent-primary to-accent-secondary text-white border-0">
            View All Instructors
          </Link>
        </div>
      </div>
    </section>
  );
};