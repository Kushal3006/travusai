import { IConversation } from "@/types";
import { InterviewSettings } from "@/types/interview";
import { generateInterviewQuestions, getLanguageOptions } from "./interviewQuestions";
import { updateInterviewStatus } from "@/lib/supabase";

export const createInterviewConversation = async (
  token: string,
  interviewSettings: InterviewSettings,
  candidateName: string
): Promise<IConversation> => {
  
  const questions = generateInterviewQuestions(
    interviewSettings.categories,
    interviewSettings.difficulty,
    Math.floor(interviewSettings.duration / 5), // Roughly 5 minutes per question
    interviewSettings.language
  );
  
  const languageOptions = getLanguageOptions();
  const selectedLanguage = languageOptions.find(lang => lang.code === interviewSettings.language);
  const languageName = selectedLanguage?.name || "English";
  
  const interviewContext = `
You are conducting a professional job interview for the position of ${interviewSettings.position}. 
The candidate's name is ${candidateName}.
The interview will be conducted in ${languageName}.

Interview Guidelines:
- Conduct the entire interview in ${languageName}
- Be professional, friendly, and encouraging
- Ask one question at a time from the provided list
- Listen carefully to responses and ask follow-up questions when appropriate
- Provide brief positive feedback before moving to the next question
- Keep track of time and pace the interview appropriately
- At the end, thank the candidate and explain next steps
- Adapt your communication style to the selected language and cultural context

Questions to ask:
${questions.map((q, index) => `${index + 1}. ${q.question}`).join('\n')}

Start by greeting the candidate warmly in ${languageName} and asking the first question.
`;

  const greetings = {
    en: `Hello ${candidateName}! Welcome to your interview for the ${interviewSettings.position} position. I'm excited to learn more about you today. Are you ready to begin?`,
    es: `¡Hola ${candidateName}! Bienvenido a tu entrevista para el puesto de ${interviewSettings.position}. Estoy emocionado de conocerte mejor hoy. ¿Estás listo para comenzar?`,
    fr: `Bonjour ${candidateName}! Bienvenue à votre entretien pour le poste de ${interviewSettings.position}. Je suis ravi d'en apprendre plus sur vous aujourd'hui. Êtes-vous prêt à commencer?`,
    de: `Hallo ${candidateName}! Willkommen zu Ihrem Interview für die Position ${interviewSettings.position}. Ich freue mich darauf, Sie heute besser kennenzulernen. Sind Sie bereit anzufangen?`,
    it: `Ciao ${candidateName}! Benvenuto al tuo colloquio per la posizione di ${interviewSettings.position}. Sono entusiasta di conoscerti meglio oggi. Sei pronto per iniziare?`,
    pt: `Olá ${candidateName}! Bem-vindo à sua entrevista para a posição de ${interviewSettings.position}. Estou animado para conhecê-lo melhor hoje. Você está pronto para começar?`,
    zh: `你好 ${candidateName}！欢迎参加 ${interviewSettings.position} 职位的面试。我很兴奋今天能更好地了解你。你准备好开始了吗？`,
    ja: `こんにちは ${candidateName}さん！${interviewSettings.position} のポジションの面接へようこそ。今日あなたのことをもっと知ることができて嬉しいです。始める準備はできていますか？`,
    ko: `안녕하세요 ${candidateName}님! ${interviewSettings.position} 포지션 면접에 오신 것을 환영합니다. 오늘 당신에 대해 더 알아볼 수 있어서 기쁩니다. 시작할 준비가 되셨나요?`,
    ar: `مرحباً ${candidateName}! أهلاً بك في مقابلة العمل لمنصب ${interviewSettings.position}. أنا متحمس للتعرف عليك أكثر اليوم. هل أنت مستعد للبدء؟`
  };

  const payload = {
    persona_id: "pd43ffef", // Use interview-specific persona
    custom_greeting: greetings[interviewSettings.language as keyof typeof greetings] || greetings.en,
    conversational_context: interviewContext
  };
  
  console.log('Creating interview conversation with payload:', payload);
  
  const response = await fetch("https://tavusapi.com/v2/conversations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": token ?? "",
    },
    body: JSON.stringify(payload),
  });

  if (!response?.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  // Update interview status in database
  const interviewId = localStorage.getItem('interview-id');
  if (interviewId) {
    try {
      await updateInterviewStatus(interviewId, 'active', data.conversation_id);
    } catch (error) {
      console.error('Failed to update interview status:', error);
    }
  }
  
  return data;
};