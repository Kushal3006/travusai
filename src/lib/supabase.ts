import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a mock client if environment variables are not set
let supabase: any;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase environment variables not found. Using mock client.');
  // Mock client for development
  supabase = {
    from: () => ({
      insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: 'mock-id' }, error: null }) }) }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
      select: () => ({ eq: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }),
    }),
  };
}

export { supabase };

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

// Database operations with error handling
export const createCandidate = async (name: string, email?: string): Promise<Candidate> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Return mock data if Supabase is not configured
      return {
        id: `mock-candidate-${Date.now()}`,
        name,
        email,
        created_at: new Date().toISOString(),
      };
    }

    const { data, error } = await supabase
      .from('candidates')
      .insert({ name, email })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating candidate:', error);
    // Return mock data on error
    return {
      id: `mock-candidate-${Date.now()}`,
      name,
      email,
      created_at: new Date().toISOString(),
    };
  }
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
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      // Return mock data if Supabase is not configured
      return {
        id: `mock-interview-${Date.now()}`,
        candidate_id: candidateId,
        ...interviewData,
        status: 'pending' as const,
        created_at: new Date().toISOString(),
      };
    }

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
  } catch (error) {
    console.error('Error creating interview:', error);
    // Return mock data on error
    return {
      id: `mock-interview-${Date.now()}`,
      candidate_id: candidateId,
      ...interviewData,
      status: 'pending' as const,
      created_at: new Date().toISOString(),
    };
  }
};

export const updateInterviewStatus = async (
  interviewId: string,
  status: Interview['status'],
  conversationId?: string
): Promise<void> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Mock: Interview status updated to', status);
      return;
    }

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
  } catch (error) {
    console.error('Error updating interview status:', error);
    // Fail silently for now
  }
};

export const saveInterviewResponse = async (
  interviewId: string,
  question: string,
  response?: string,
  duration: number = 0,
  confidenceScore?: number
): Promise<void> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('Mock: Interview response saved');
      return;
    }

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
  } catch (error) {
    console.error('Error saving interview response:', error);
    // Fail silently for now
  }
};

export const getInterviewById = async (interviewId: string): Promise<Interview | null> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return null;
    }

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
  } catch (error) {
    console.error('Error getting interview:', error);
    return null;
  }
};

export const getInterviewResponses = async (interviewId: string): Promise<InterviewResponse[]> => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return [];
    }

    const { data, error } = await supabase
      .from('interview_responses')
      .select('*')
      .eq('interview_id', interviewId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting interview responses:', error);
    return [];
  }
};