import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { useAtom } from "jotai";
import { interviewSettingsAtom } from "@/store/interview";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Briefcase, Users, Clock, Target, Brain, CheckCircle } from "lucide-react";

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
  <label htmlFor={htmlFor} className="text-sm font-semibold text-white mb-3 block tracking-wide">
    {children}
  </label>
);

const Select = ({ children, value, onChange, className }: {
  children: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`flex h-12 w-full rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-base text-white font-medium transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${className}`}
    style={{ fontFamily: "'Inter', sans-serif" }}
  >
    {children}
  </select>
);

export const InterviewSetup: React.FC = () => {
  const [settings, setSettings] = useAtom(interviewSettingsAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const [candidateName, setCandidateName] = useState("");

  const positions = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Software Engineer"
  ];

  const difficulties = [
    { value: "easy", label: "Junior Level", icon: "🌱" },
    { value: "medium", label: "Mid Level", icon: "🚀" },
    { value: "hard", label: "Senior Level", icon: "⭐" }
  ];

  const durations = [
    { value: 15, label: "15 minutes", icon: "⚡" },
    { value: 30, label: "30 minutes", icon: "⏰" },
    { value: 45, label: "45 minutes", icon: "📅" },
    { value: 60, label: "60 minutes", icon: "🎯" }
  ];

  const categories = [
    { id: "technical", label: "Technical Skills", icon: Brain, color: "text-blue-400" },
    { id: "behavioral", label: "Behavioral", icon: Users, color: "text-green-400" },
    { id: "problem-solving", label: "Problem Solving", icon: Target, color: "text-purple-400" }
  ];

  const handleStartInterview = () => {
    if (!candidateName.trim() || !settings.position) {
      alert("Please fill in all required fields");
      return;
    }

    localStorage.setItem('interview-settings', JSON.stringify(settings));
    localStorage.setItem('candidate-name', candidateName);
    
    setScreenState({ currentScreen: "instructions" });
  };

  const handleBack = () => {
    setScreenState({ currentScreen: "intro" });
  };

  return (
    <DialogWrapper>
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-5xl h-[90vh] bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="text-center p-6 pb-4 border-b border-white/10 flex-shrink-0">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/40 rounded-2xl mb-4">
              <Briefcase className="size-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Interview Setup</h1>
            <p className="text-gray-300 text-lg">Configure your AI-powered interview session</p>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-hidden">
            <div 
              className="h-full overflow-y-auto px-6 py-4"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(34, 197, 254, 0.5) transparent'
              }}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  width: 8px;
                }
                div::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.1);
                  border-radius: 10px;
                }
                div::-webkit-scrollbar-thumb {
                  background: linear-gradient(180deg, #22C5FE 0%, #1E90FF 100%);
                  border-radius: 10px;
                  border: 2px solid transparent;
                  background-clip: content-box;
                }
                div::-webkit-scrollbar-thumb:hover {
                  background: linear-gradient(180deg, #1E90FF 0%, #22C5FE 100%);
                  background-clip: content-box;
                }
              `}</style>

              <div className="space-y-6 pb-4">
                {/* Candidate Information */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Users className="size-6 text-primary" />
                    Candidate Information
                  </h3>
                  <div>
                    <Label htmlFor="candidateName">Full Name *</Label>
                    <Input
                      id="candidateName"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter candidate's full name"
                      className="h-12 bg-black/30 border-2 border-white/20 text-white text-base rounded-xl px-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Position & Level */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Briefcase className="size-6 text-primary" />
                    Position Details
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="position">Position *</Label>
                      <Select
                        value={settings.position}
                        onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                      >
                        <option value="" className="bg-black text-white">Select a position</option>
                        {positions.map(pos => (
                          <option key={pos} value={pos} className="bg-black text-white">
                            {pos}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="difficulty">Experience Level</Label>
                      <Select
                        value={settings.difficulty}
                        onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as any })}
                      >
                        {difficulties.map(diff => (
                          <option key={diff.value} value={diff.value} className="bg-black text-white">
                            {diff.icon} {diff.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Interview Configuration */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Clock className="size-6 text-primary" />
                    Interview Configuration
                  </h3>
                  <div className="mb-6">
                    <Label htmlFor="duration">Interview Duration</Label>
                    <Select
                      value={settings.duration.toString()}
                      onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                    >
                      {durations.map(dur => (
                        <option key={dur.value} value={dur.value} className="bg-black text-white">
                          {dur.icon} {dur.label}
                        </option>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="categories">Interview Categories</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {categories.map(category => {
                        const Icon = category.icon;
                        const isSelected = settings.categories.includes(category.id);
                        return (
                          <label 
                            key={category.id} 
                            className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'bg-primary/20 border-primary text-white' 
                                : 'bg-black/20 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/5'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSettings({
                                    ...settings,
                                    categories: [...settings.categories, category.id]
                                  });
                                } else {
                                  setSettings({
                                    ...settings,
                                    categories: settings.categories.filter(c => c !== category.id)
                                  });
                                }
                              }}
                              className="sr-only"
                            />
                            <div className={`flex-shrink-0 ${isSelected ? 'text-primary' : category.color}`}>
                              {isSelected ? <CheckCircle className="size-5" /> : <Icon className="size-5" />}
                            </div>
                            <span className="font-medium">{category.label}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Additional Questions */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Target className="size-6 text-primary" />
                    Additional Questions (Optional)
                  </h3>
                  <textarea
                    placeholder="Add any specific questions you'd like to include in the interview..."
                    className="w-full h-24 rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-base text-white resize-none transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex gap-4 p-6 pt-4 border-t border-white/10 flex-shrink-0">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold rounded-xl border-2 border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              Back
            </Button>
            <Button
              onClick={handleStartInterview}
              className="flex-1 h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-200 shadow-lg"
              disabled={!candidateName.trim() || !settings.position}
            >
              <Users className="size-5 mr-2" />
              Start Interview
            </Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};