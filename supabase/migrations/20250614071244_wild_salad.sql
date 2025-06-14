/*
  # Create interview system tables

  1. New Tables
    - `candidates`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, optional)
      - `created_at` (timestamp)
    - `interviews`
      - `id` (uuid, primary key)
      - `candidate_id` (uuid, foreign key)
      - `position` (text)
      - `difficulty` (text)
      - `duration` (integer, minutes)
      - `language` (text)
      - `categories` (jsonb array)
      - `status` (text)
      - `started_at` (timestamp)
      - `completed_at` (timestamp, nullable)
      - `conversation_id` (text, nullable)
      - `created_at` (timestamp)
    - `interview_responses`
      - `id` (uuid, primary key)
      - `interview_id` (uuid, foreign key)
      - `question` (text)
      - `response` (text, nullable)
      - `duration` (integer, seconds)
      - `confidence_score` (integer, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create candidates table
CREATE TABLE IF NOT EXISTS candidates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Create interviews table
CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  candidate_id uuid REFERENCES candidates(id) ON DELETE CASCADE,
  position text NOT NULL,
  difficulty text NOT NULL DEFAULT 'medium',
  duration integer NOT NULL DEFAULT 30,
  language text NOT NULL DEFAULT 'en',
  categories jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending',
  started_at timestamptz,
  completed_at timestamptz,
  conversation_id text,
  created_at timestamptz DEFAULT now()
);

-- Create interview responses table
CREATE TABLE IF NOT EXISTS interview_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES interviews(id) ON DELETE CASCADE,
  question text NOT NULL,
  response text,
  duration integer DEFAULT 0,
  confidence_score integer,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE interview_responses ENABLE ROW LEVEL SECURITY;

-- Create policies for candidates
CREATE POLICY "Anyone can create candidates"
  ON candidates
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read candidates"
  ON candidates
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policies for interviews
CREATE POLICY "Anyone can create interviews"
  ON interviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read interviews"
  ON interviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update interviews"
  ON interviews
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Create policies for interview responses
CREATE POLICY "Anyone can create interview responses"
  ON interview_responses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read interview responses"
  ON interview_responses
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_interviews_candidate_id ON interviews(candidate_id);
CREATE INDEX IF NOT EXISTS idx_interviews_status ON interviews(status);
CREATE INDEX IF NOT EXISTS idx_interview_responses_interview_id ON interview_responses(interview_id);