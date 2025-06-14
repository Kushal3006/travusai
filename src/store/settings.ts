import { atom } from "jotai";

interface Settings {
  name: string;
  language: string;
  interruptSensitivity: string;
  greeting: string;
  context: string;
  persona: string;
  replica: string;
}

const getInitialSettings = (): Settings => {
  try {
    const savedSettings = localStorage.getItem('tavus-settings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  } catch (error) {
    console.error('Error loading settings:', error);
  }
  
  return {
    name: "",
    language: "en",
    interruptSensitivity: "medium",
    greeting: "",
    context: "",
    persona: "",
    replica: "",
  };
};

export const settingsAtom = atom<Settings>(getInitialSettings());
export const settingsSavedAtom = atom<boolean>(false);