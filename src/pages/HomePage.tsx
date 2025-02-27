import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCourses } from '../components/FeaturedCourses';
import { Testimonials } from '../components/Testimonials';
import { Instructors } from '../components/Instructors';
import { Newsletter } from '../components/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <Testimonials />
      <Instructors />
      <Newsletter />
    </>
  );
};