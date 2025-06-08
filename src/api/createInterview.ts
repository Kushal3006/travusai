import { IConversation } from "@/types";
import { InterviewSettings } from "@/types/interview";
import { generateInterviewQuestions } from "./interviewQuestions";

export const createInterviewConversation = async (
  token: string,
  interviewSettings: InterviewSettings,
  candidateName: string
): Promise<IConversation> => {
  
  const questions = generateInterviewQuestions(
    interviewSettings.categories,
    interviewSettings.difficulty,
    Math.floor(interviewSettings.duration / 5) // Roughly 5 minutes per question
  );
  
  const interviewContext = `
You are conducting a professional job interview for the position of ${interviewSettings.position}. 
The candidate's name is ${candidateName}.

Interview Guidelines:
- Be professional, friendly, and encouraging
- Ask one question at a time from the provided list
- Listen carefully to responses and ask follow-up questions when appropriate
- Provide brief positive feedback before moving to the next question
- Keep track of time and pace the interview appropriately
- At the end, thank the candidate and explain next steps

Questions to ask:
${questions.map((q, index) => `${index + 1}. ${q.question}`).join('\n')}

Start by greeting the candidate warmly and asking the first question.
`;

  const payload = {
    persona_id: "pd43ffef", // Use interview-specific persona
    custom_greeting: `Hello ${candidateName}! Welcome to your interview for the ${interviewSettings.position} position. I'm excited to learn more about you today. Are you ready to begin?`,
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
  return data;
};