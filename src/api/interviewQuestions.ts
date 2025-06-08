import { InterviewQuestion } from "@/types/interview";

const questionBank: Record<string, InterviewQuestion[]> = {
  technical: [
    {
      id: "tech-1",
      question: "Explain the difference between let, const, and var in JavaScript.",
      category: "technical",
      difficulty: "easy",
      expectedDuration: 120
    },
    {
      id: "tech-2", 
      question: "How would you optimize a slow-performing database query?",
      category: "technical",
      difficulty: "medium",
      expectedDuration: 180
    },
    {
      id: "tech-3",
      question: "Design a scalable system for handling millions of concurrent users.",
      category: "technical", 
      difficulty: "hard",
      expectedDuration: 300
    }
  ],
  behavioral: [
    {
      id: "behav-1",
      question: "Tell me about a time when you had to work with a difficult team member.",
      category: "behavioral",
      difficulty: "easy",
      expectedDuration: 180
    },
    {
      id: "behav-2",
      question: "Describe a situation where you had to learn a new technology quickly.",
      category: "behavioral", 
      difficulty: "medium",
      expectedDuration: 200
    },
    {
      id: "behav-3",
      question: "How do you handle conflicting priorities and tight deadlines?",
      category: "behavioral",
      difficulty: "medium", 
      expectedDuration: 180
    }
  ],
  "problem-solving": [
    {
      id: "prob-1",
      question: "How would you approach debugging a production issue that you've never seen before?",
      category: "problem-solving",
      difficulty: "medium",
      expectedDuration: 240
    },
    {
      id: "prob-2",
      question: "Walk me through how you would design a URL shortener like bit.ly.",
      category: "problem-solving",
      difficulty: "hard", 
      expectedDuration: 360
    }
  ]
};

export const generateInterviewQuestions = (
  categories: string[],
  difficulty: string,
  count: number = 5
): InterviewQuestion[] => {
  const questions: InterviewQuestion[] = [];
  
  categories.forEach(category => {
    const categoryQuestions = questionBank[category] || [];
    const filteredQuestions = categoryQuestions.filter(q => 
      difficulty === 'easy' ? true : 
      difficulty === 'medium' ? q.difficulty !== 'easy' :
      q.difficulty === 'hard'
    );
    
    questions.push(...filteredQuestions);
  });
  
  // Shuffle and return requested count
  const shuffled = questions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};