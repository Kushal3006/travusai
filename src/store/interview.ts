import { atom } from "jotai";
import { InterviewSession, InterviewSettings, InterviewQuestion } from "@/types/interview";

const defaultInterviewSettings: InterviewSettings = {
  position: "",
  difficulty: "medium",
  duration: 30,
  categories: ["technical", "behavioral", "problem-solving"],
  customQuestions: []
};

const getInitialInterviewSettings = (): InterviewSettings => {
  const savedSettings = localStorage.getItem('interview-settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  return defaultInterviewSettings;
};

export const interviewSettingsAtom = atom<InterviewSettings>(getInitialInterviewSettings());
export const currentInterviewAtom = atom<InterviewSession | null>(null);
export const interviewQuestionsAtom = atom<InterviewQuestion[]>([]);
export const currentQuestionIndexAtom = atom<number>(0);
export const isInterviewActiveAtom = atom<boolean>(false);