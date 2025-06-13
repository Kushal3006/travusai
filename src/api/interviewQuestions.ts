import { InterviewQuestion } from "@/types/interview";

const questionBank: Record<string, Record<string, InterviewQuestion[]>> = {
  en: {
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
  },
  es: {
    technical: [
      {
        id: "tech-1-es",
        question: "Explica la diferencia entre let, const y var en JavaScript.",
        category: "technical",
        difficulty: "easy",
        expectedDuration: 120
      },
      {
        id: "tech-2-es", 
        question: "¿Cómo optimizarías una consulta de base de datos con bajo rendimiento?",
        category: "technical",
        difficulty: "medium",
        expectedDuration: 180
      },
      {
        id: "tech-3-es",
        question: "Diseña un sistema escalable para manejar millones de usuarios concurrentes.",
        category: "technical", 
        difficulty: "hard",
        expectedDuration: 300
      }
    ],
    behavioral: [
      {
        id: "behav-1-es",
        question: "Cuéntame sobre una ocasión en la que tuviste que trabajar con un miembro del equipo difícil.",
        category: "behavioral",
        difficulty: "easy",
        expectedDuration: 180
      },
      {
        id: "behav-2-es",
        question: "Describe una situación donde tuviste que aprender una nueva tecnología rápidamente.",
        category: "behavioral", 
        difficulty: "medium",
        expectedDuration: 200
      },
      {
        id: "behav-3-es",
        question: "¿Cómo manejas las prioridades conflictivas y los plazos ajustados?",
        category: "behavioral",
        difficulty: "medium", 
        expectedDuration: 180
      }
    ],
    "problem-solving": [
      {
        id: "prob-1-es",
        question: "¿Cómo abordarías la depuración de un problema de producción que nunca has visto antes?",
        category: "problem-solving",
        difficulty: "medium",
        expectedDuration: 240
      },
      {
        id: "prob-2-es",
        question: "Explícame cómo diseñarías un acortador de URLs como bit.ly.",
        category: "problem-solving",
        difficulty: "hard", 
        expectedDuration: 360
      }
    ]
  },
  fr: {
    technical: [
      {
        id: "tech-1-fr",
        question: "Expliquez la différence entre let, const et var en JavaScript.",
        category: "technical",
        difficulty: "easy",
        expectedDuration: 120
      },
      {
        id: "tech-2-fr", 
        question: "Comment optimiseriez-vous une requête de base de données lente?",
        category: "technical",
        difficulty: "medium",
        expectedDuration: 180
      },
      {
        id: "tech-3-fr",
        question: "Concevez un système évolutif pour gérer des millions d'utilisateurs simultanés.",
        category: "technical", 
        difficulty: "hard",
        expectedDuration: 300
      }
    ],
    behavioral: [
      {
        id: "behav-1-fr",
        question: "Parlez-moi d'une fois où vous avez dû travailler avec un membre d'équipe difficile.",
        category: "behavioral",
        difficulty: "easy",
        expectedDuration: 180
      },
      {
        id: "behav-2-fr",
        question: "Décrivez une situation où vous avez dû apprendre rapidement une nouvelle technologie.",
        category: "behavioral", 
        difficulty: "medium",
        expectedDuration: 200
      },
      {
        id: "behav-3-fr",
        question: "Comment gérez-vous les priorités conflictuelles et les délais serrés?",
        category: "behavioral",
        difficulty: "medium", 
        expectedDuration: 180
      }
    ],
    "problem-solving": [
      {
        id: "prob-1-fr",
        question: "Comment aborderiez-vous le débogage d'un problème de production que vous n'avez jamais vu?",
        category: "problem-solving",
        difficulty: "medium",
        expectedDuration: 240
      },
      {
        id: "prob-2-fr",
        question: "Expliquez-moi comment vous concevriez un raccourcisseur d'URL comme bit.ly.",
        category: "problem-solving",
        difficulty: "hard", 
        expectedDuration: 360
      }
    ]
  },
  de: {
    technical: [
      {
        id: "tech-1-de",
        question: "Erklären Sie den Unterschied zwischen let, const und var in JavaScript.",
        category: "technical",
        difficulty: "easy",
        expectedDuration: 120
      },
      {
        id: "tech-2-de", 
        question: "Wie würden Sie eine langsame Datenbankabfrage optimieren?",
        category: "technical",
        difficulty: "medium",
        expectedDuration: 180
      },
      {
        id: "tech-3-de",
        question: "Entwerfen Sie ein skalierbares System für Millionen gleichzeitiger Benutzer.",
        category: "technical", 
        difficulty: "hard",
        expectedDuration: 300
      }
    ],
    behavioral: [
      {
        id: "behav-1-de",
        question: "Erzählen Sie mir von einer Zeit, als Sie mit einem schwierigen Teammitglied arbeiten mussten.",
        category: "behavioral",
        difficulty: "easy",
        expectedDuration: 180
      },
      {
        id: "behav-2-de",
        question: "Beschreiben Sie eine Situation, in der Sie schnell eine neue Technologie lernen mussten.",
        category: "behavioral", 
        difficulty: "medium",
        expectedDuration: 200
      },
      {
        id: "behav-3-de",
        question: "Wie gehen Sie mit widersprüchlichen Prioritäten und engen Fristen um?",
        category: "behavioral",
        difficulty: "medium", 
        expectedDuration: 180
      }
    ],
    "problem-solving": [
      {
        id: "prob-1-de",
        question: "Wie würden Sie das Debugging eines Produktionsproblems angehen, das Sie noch nie gesehen haben?",
        category: "problem-solving",
        difficulty: "medium",
        expectedDuration: 240
      },
      {
        id: "prob-2-de",
        question: "Erklären Sie mir, wie Sie einen URL-Verkürzer wie bit.ly entwerfen würden.",
        category: "problem-solving",
        difficulty: "hard", 
        expectedDuration: 360
      }
    ]
  }
};

export const generateInterviewQuestions = (
  categories: string[],
  difficulty: string,
  count: number = 5,
  language: string = "en"
): InterviewQuestion[] => {
  const questions: InterviewQuestion[] = [];
  const langQuestions = questionBank[language] || questionBank.en;
  
  categories.forEach(category => {
    const categoryQuestions = langQuestions[category] || [];
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

export const getLanguageOptions = () => [
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" }
];