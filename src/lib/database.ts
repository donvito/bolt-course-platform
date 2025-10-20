import { supabase } from './supabase';

export interface Course {
  id: string;
  title: string;
  category: string;
  image: string;
  instructor_id: string;
  instructor?: Instructor;
  rating: number;
  hours: number;
  level: string;
  price: number;
  original_price: number;
  description: string;
  curriculum: { title: string; duration: string }[];
}

export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  full_bio: string;
  courses_count: number;
  students_count: number;
  rating: number;
  reviews_count: number;
  expertise: string[];
  twitter?: string;
  linkedin?: string;
  website?: string;
}

export async function getCourses(): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }

  return data || [];
}

export async function getCourseById(id: string): Promise<Course | null> {
  const { data, error } = await supabase
    .from('courses')
    .select('*, instructor:instructors(*)')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }

  return data;
}

export async function getInstructors(): Promise<Instructor[]> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching instructors:', error);
    return [];
  }

  return data || [];
}

export async function getInstructorById(id: string): Promise<Instructor | null> {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching instructor:', error);
    return null;
  }

  return data;
}

export async function getCoursesByInstructor(instructorId: string): Promise<Course[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('instructor_id', instructorId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching courses by instructor:', error);
    return [];
  }

  return data || [];
}
