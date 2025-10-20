/*
  # Create User Profiles Table

  ## Overview
  This migration creates a user profiles table to store additional user information
  beyond the built-in auth.users table. It establishes a secure foundation for
  user data management with proper Row Level Security.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key) - Links to auth.users.id
  - `email` (text, not null) - User's email address
  - `full_name` (text) - User's full name
  - `avatar_url` (text) - URL to user's avatar image
  - `created_at` (timestamptz) - Timestamp of profile creation
  - `updated_at` (timestamptz) - Timestamp of last profile update

  ## Security

  ### Row Level Security (RLS)
  - Enable RLS on profiles table
  - Users can view their own profile data
  - Users can update their own profile data
  - New profiles are automatically created when users sign up

  ## Important Notes
  1. This table extends the built-in Supabase auth.users table
  2. The `id` column is a foreign key to auth.users.id with CASCADE delete
  3. A trigger automatically creates a profile entry when a new user signs up
  4. All user data is protected by RLS policies
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW
      EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;
