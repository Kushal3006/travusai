import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Candidate {
  id: string;
  name: string;
  email?: string;
  created_at: string;
}

export interface Interview {
  id: string;
  candidate_id: string;
  position: string;
  difficulty: string;
  duration: number;
  language: string;
  categories: string[];
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  started_at?: string;
  completed_at?: string;
  conversation_id?: string;
  created_at: string;
}

export interface InterviewResponse {
  id: string;
  interview_id: string;
  question: string;
  response?: string;
  duration: number;
  confidence_score?: number;
  created_at: string;
}

// Database operations
export const createCandidate = async (name: string, email?: string): Promise<Candidate> => {
  const { data, error } = await supabase
    .from('candidates')
    .insert({ name, email })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createInterview = async (
  candidateId: string,
  interviewData: {
    position: string;
    difficulty: string;
    duration: number;
    language: string;
    categories: string[];
  }
): Promise<Interview> => {
  const { data, error } = await supabase
    .from('interviews')
    .insert({
      candidate_id: candidateId,
      ...interviewData,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateInterviewStatus = async (
  interviewId: string,
  status: Interview['status'],
  conversationId?: string
): Promise<void> => {
  const updateData: any = { status };
  
  if (status === 'active') {
    updateData.started_at = new Date().toISOString();
  } else if (status === 'completed') {
    updateData.completed_at = new Date().toISOString();
  }
  
  if (conversationId) {
    updateData.conversation_id = conversationId;
  }

  const { error } = await supabase
    .from('interviews')
    .update(updateData)
    .eq('id', interviewId);

  if (error) throw error;
};

export const saveInterviewResponse = async (
  interviewId: string,
  question: string,
  response?: string,
  duration: number = 0,
  confidenceScore?: number
): Promise<void> => {
  const { error } = await supabase
    .from('interview_responses')
    .insert({
      interview_id: interviewId,
      question,
      response,
      duration,
      confidence_score: confidenceScore,
    });

  if (error) throw error;
};

export const getInterviewById = async (interviewId: string): Promise<Interview | null> => {
  const { data, error } = await supabase
    .from('interviews')
    .select('*')
    .eq('id', interviewId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
};

export const getInterviewResponses = async (interviewId: string): Promise<InterviewResponse[]> => {
  const { data, error } = await supabase
    .from('interview_responses')
    .select('*')
    .eq('interview_id', interviewId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};