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
import { Briefcase, Users, Clock, Target, Brain, CheckCircle, Globe, AlertCircle } from "lucide-react";
import { getLanguageOptions } from "@/api/interviewQuestions";
import { createCandidate, createInterview } from "@/lib/supabase";
import { apiTokenAtom } from "@/store/tokens";

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
  const [token] = useAtom(apiTokenAtom);
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const positions = [
    "Frontend Developer",
    "Backend Developer", 
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Product Manager",
    "UX Designer",
    "Software Engineer",
    "Mobile Developer",
    "QA Engineer"
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

  const languageOptions = getLanguageOptions();

  // Check if form is valid
  const isFormValid = candidateName.trim().length > 0 && 
                     settings.position.length > 0 && 
                     settings.categories.length > 0 &&
                     token; // Also check if token exists

  const handleCategoryToggle = (categoryId: string) => {
    const updatedCategories = settings.categories.includes(categoryId)
      ? settings.categories.filter(c => c !== categoryId)
      : [...settings.categories, categoryId];
    
    setSettings({ ...settings, categories: updatedCategories });
  };

  const handleStartInterview = async () => {
    if (!token) {
      setError("API token is required. Please go back and enter your Tavus API key.");
      return;
    }

    if (!candidateName.trim()) {
      setError("Candidate name is required.");
      return;
    }

    if (!settings.position) {
      setError("Please select a position.");
      return;
    }

    if (settings.categories.length === 0) {
      setError("Please select at least one interview category.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Starting interview creation process...');
      
      // Create candidate in database
      const candidate = await createCandidate(candidateName.trim(), candidateEmail.trim() || undefined);
      console.log('Candidate created:', candidate);
      
      // Ensure we have complete settings
      const completeSettings = {
        position: settings.position,
        difficulty: settings.difficulty || "medium",
        duration: settings.duration || 30,
        language: settings.language || "en",
        categories: settings.categories.length > 0 ? settings.categories : ["technical", "behavioral"]
      };

      console.log('Interview settings:', completeSettings);

      // Create interview in database
      const interview = await createInterview(candidate.id, completeSettings);
      console.log('Interview created:', interview);

      // Store data in localStorage for the interview session
      localStorage.setItem('interview-settings', JSON.stringify(completeSettings));
      localStorage.setItem('candidate-name', candidateName.trim());
      localStorage.setItem('candidate-id', candidate.id);
      localStorage.setItem('interview-id', interview.id);
      
      console.log('Interview setup completed successfully');
      
      // Navigate to instructions
      setScreenState({ currentScreen: "instructions" });
    } catch (error) {
      console.error('Error creating interview:', error);
      setError('Failed to create interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    // Clear any stored interview data when going back
    localStorage.removeItem('interview-settings');
    localStorage.removeItem('candidate-name');
    localStorage.removeItem('candidate-id');
    localStorage.removeItem('interview-id');
    
    // Navigate back to intro screen
    setScreenState({ currentScreen: "intro" });
  };

  return (
    <DialogWrapper>
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-6xl h-full bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col m-4 rounded-3xl">
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
                {/* Error Message */}
                {error && (
                  <div className="bg-gradient-to-r from-red-500/10 to-red-600/5 rounded-2xl p-4 border border-red-500/30">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="size-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Token Warning */}
                {!token && (
                  <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-2xl p-4 border border-yellow-500/30">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="size-5 text-yellow-400 flex-shrink-0" />
                      <p className="text-yellow-400 text-sm">
                        API token is required to start an interview. Please go back and enter your Tavus API key.
                      </p>
                    </div>
                  </div>
                )}

                {/* Candidate Information */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Users className="size-6 text-primary" />
                    Candidate Information
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <div>
                      <Label htmlFor="candidateEmail">Email (Optional)</Label>
                      <Input
                        id="candidateEmail"
                        type="email"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        placeholder="Enter candidate's email"
                        className="h-12 bg-black/30 border-2 border-white/20 text-white text-base rounded-xl px-4 backdrop-blur-sm transition-all duration-200 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
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

                {/* Language & Duration */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Globe className="size-6 text-primary" />
                    Language & Duration
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Interview Language</Label>
                      <Select
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                      >
                        {languageOptions.map(lang => (
                          <option key={lang.code} value={lang.code} className="bg-black text-white">
                            {lang.flag} {lang.nativeName} ({lang.name})
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
                            {dur.icon} {dur.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Interview Categories */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Target className="size-6 text-primary" />
                    Interview Categories *
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">Select at least one category for the interview</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {categories.map(category => {
                      const Icon = category.icon;
                      const isSelected = settings.categories.includes(category.id);
                      return (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategoryToggle(category.id)}
                          className={`flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                            isSelected 
                              ? 'bg-primary/20 border-primary text-white' 
                              : 'bg-black/20 border-white/20 text-gray-300 hover:border-white/40 hover:bg-white/5'
                          }`}
                        >
                          <div className={`flex-shrink-0 ${isSelected ? 'text-primary' : category.color}`}>
                            {isSelected ? <CheckCircle className="size-5" /> : <Icon className="size-5" />}
                          </div>
                          <span className="font-medium">{category.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form Validation Status */}
                {!isFormValid && (
                  <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 rounded-2xl p-4 border border-yellow-500/30">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="size-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-yellow-400 text-sm font-medium mb-2">
                          Please complete the following required fields:
                        </p>
                        <ul className="text-yellow-300 text-sm space-y-1">
                          {!token && <li>• API Token (go back to enter your Tavus API key)</li>}
                          {!candidateName.trim() && <li>• Candidate Name</li>}
                          {!settings.position && <li>• Position</li>}
                          {settings.categories.length === 0 && <li>• At least one Interview Category</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex gap-4 p-6 pt-4 border-t border-white/10 flex-shrink-0">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={isLoading}
              className="flex-1 h-12 text-base font-semibold rounded-xl border-2 border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
            >
              Back to Home
            </Button>
            <Button
              onClick={handleStartInterview}
              disabled={!isFormValid || isLoading}
              className={`flex-1 h-12 text-base font-semibold rounded-xl transition-all duration-200 shadow-lg ${
                isFormValid && !isLoading
                  ? 'bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 cursor-pointer' 
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Interview...
                </div>
              ) : (
                <>
                  <Users className="size-5 mr-2" />
                  Start Interview
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};