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
import { Briefcase, Users } from "lucide-react";

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-white mb-2 block">
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
    className={`flex h-10 w-full rounded-md border border-input bg-black/20 px-3 py-2 text-sm text-white font-mono ${className}`}
    style={{ fontFamily: "'Source Code Pro', monospace" }}
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
    { value: "easy", label: "Junior Level" },
    { value: "medium", label: "Mid Level" },
    { value: "hard", label: "Senior Level" }
  ];

  const durations = [
    { value: 15, label: "15 minutes" },
    { value: 30, label: "30 minutes" },
    { value: 45, label: "45 minutes" },
    { value: 60, label: "60 minutes" }
  ];

  const handleStartInterview = () => {
    if (!candidateName.trim() || !settings.position) {
      alert("Please fill in all required fields");
      return;
    }

    // Save settings
    localStorage.setItem('interview-settings', JSON.stringify(settings));
    localStorage.setItem('candidate-name', candidateName);
    
    setScreenState({ currentScreen: "instructions" });
  };

  const handleBack = () => {
    setScreenState({ currentScreen: "intro" });
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="w-full max-w-2xl h-full flex flex-col">
          <div className="text-center mb-6">
            <Briefcase className="size-12 text-primary mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-white mb-2">Interview Setup</h1>
            <p className="text-gray-400 text-sm">Configure your AI-powered interview session</p>
          </div>

          {/* Scrollable form content */}
          <div className="flex-1 overflow-y-auto pr-4 -mr-4 max-h-[calc(100vh-400px)]">
            <div className="space-y-4">
              <div>
                <Label htmlFor="candidateName">Candidate Name *</Label>
                <Input
                  id="candidateName"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter candidate's full name"
                  className="bg-black/20 text-white font-mono"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>

              <div>
                <Label htmlFor="position">Position *</Label>
                <Select
                  value={settings.position}
                  onChange={(e) => setSettings({ ...settings, position: e.target.value })}
                >
                  <option value="">Select a position</option>
                  {positions.map(pos => (
                    <option key={pos} value={pos} className="bg-black text-white">
                      {pos}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="difficulty">Experience Level</Label>
                  <Select
                    value={settings.difficulty}
                    onChange={(e) => setSettings({ ...settings, difficulty: e.target.value as any })}
                  >
                    {difficulties.map(diff => (
                      <option key={diff.value} value={diff.value} className="bg-black text-white">
                        {diff.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label htmlFor="duration">Interview Duration</Label>
                  <Select
                    value={settings.duration.toString()}
                    onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                  >
                    {durations.map(dur => (
                      <option key={dur.value} value={dur.value} className="bg-black text-white">
                        {dur.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="categories">Interview Categories</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                  {["technical", "behavioral", "problem-solving"].map(category => (
                    <label key={category} className="flex items-center space-x-2 text-white">
                      <input
                        type="checkbox"
                        checked={settings.categories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSettings({
                              ...settings,
                              categories: [...settings.categories, category]
                            });
                          } else {
                            setSettings({
                              ...settings,
                              categories: settings.categories.filter(c => c !== category)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="capitalize font-mono text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="customQuestions">Additional Questions (Optional)</Label>
                <textarea
                  id="customQuestions"
                  placeholder="Add any specific questions you'd like to include..."
                  className="w-full h-20 rounded-md border border-input bg-black/20 px-3 py-2 text-sm text-white font-mono resize-none"
                  style={{ fontFamily: "'Source Code Pro', monospace" }}
                />
              </div>
            </div>
          </div>

          {/* Fixed bottom buttons */}
          <div className="flex gap-4 pt-6 mt-6 border-t border-gray-700">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleStartInterview}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!candidateName.trim() || !settings.position}
            >
              <Users className="size-4 mr-2" />
              Start Interview
            </Button>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};