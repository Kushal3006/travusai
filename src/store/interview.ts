import { atom } from "jotai";
import { InterviewSession, InterviewSettings, InterviewQuestion } from "@/types/interview";

const defaultInterviewSettings: InterviewSettings = {
  position: "",
  difficulty: "medium",
  duration: 30,
  categories: [],
  customQuestions: [],
  language: "en"
};

const getInitialInterviewSettings = (): InterviewSettings => {
  try {
    const savedSettings = localStorage.getItem('interview-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      return { ...defaultInterviewSettings, ...parsed };
    }
  } catch (error) {
    console.error('Error loading interview settings:', error);
  }
  return defaultInterviewSettings;
};

export const interviewSettingsAtom = atom<InterviewSettings>(getInitialInterviewSettings());
export const currentInterviewAtom = atom<InterviewSession | null>(null);
export const interviewQuestionsAtom = atom<InterviewQuestion[]>([]);
export const currentQuestionIndexAtom = atom<number>(0);
export const isInterviewActiveAtom = atom<boolean>(false);