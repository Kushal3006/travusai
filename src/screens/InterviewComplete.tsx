import { DialogWrapper, AnimatedTextBlockWrapper } from "@/components/DialogWrapper";
import React from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { CheckCircle, RotateCcw, BarChart3, Clock, Star, TrendingUp } from "lucide-react";

export const InterviewComplete: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);

  const candidateName = localStorage.getItem('candidate-name') || 'Candidate';
  const interviewSettings = JSON.parse(localStorage.getItem('interview-settings') || '{}');

  // Mock performance data - in a real app this would come from the interview analysis
  const performanceData = {
    overallScore: 78,
    communicationScore: 85,
    technicalScore: 72,
    problemSolvingScore: 80,
    duration: "28 minutes",
    questionsAnswered: 6,
    confidence: "High"
  };

  const handleNewInterview = () => {
    // Clear previous interview data
    localStorage.removeItem('candidate-name');
    setScreenState({ currentScreen: "interviewSetup" });
  };

  const handleReturnHome = () => {
    setScreenState({ currentScreen: "intro" });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-400/20";
    if (score >= 60) return "bg-yellow-400/20";
    return "bg-red-400/20";
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Interview Completed!</h1>
            <p className="text-gray-300">
              Thank you, <span className="text-white font-semibold">{candidateName}</span> for completing the interview for <span className="text-primary">{interviewSettings.position}</span>
            </p>
          </div>

          {/* Performance Dashboard */}
          <div className="bg-black/30 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="size-5 text-primary" />
              <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
            </div>

            {/* Overall Score */}
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getScoreBackground(performanceData.overallScore)} border-2 border-current ${getScoreColor(performanceData.overallScore)} mb-2`}>
                <span className="text-2xl font-bold">{performanceData.overallScore}%</span>
              </div>
              <p className="text-gray-300">Overall Score</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/40 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(performanceData.communicationScore)} mb-1`}>
                  {performanceData.communicationScore}%
                </div>
                <p className="text-gray-300 text-sm">Communication</p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(performanceData.technicalScore)} mb-1`}>
                  {performanceData.technicalScore}%
                </div>
                <p className="text-gray-300 text-sm">Technical Skills</p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 text-center">
                <div className={`text-2xl font-bold ${getScoreColor(performanceData.problemSolvingScore)} mb-1`}>
                  {performanceData.problemSolvingScore}%
                </div>
                <p className="text-gray-300 text-sm">Problem Solving</p>
              </div>
            </div>

            {/* Interview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-black/40 rounded-lg p-3">
                <Clock className="size-5 text-primary" />
                <div>
                  <p className="text-white font-medium">{performanceData.duration}</p>
                  <p className="text-gray-400 text-xs">Duration</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/40 rounded-lg p-3">
                <TrendingUp className="size-5 text-primary" />
                <div>
                  <p className="text-white font-medium">{performanceData.questionsAnswered}</p>
                  <p className="text-gray-400 text-xs">Questions Answered</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-black/40 rounded-lg p-3">
                <Star className="size-5 text-primary" />
                <div>
                  <p className="text-white font-medium">{performanceData.confidence}</p>
                  <p className="text-gray-400 text-xs">Confidence Level</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleNewInterview}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <RotateCcw className="size-4" />
              New Interview
            </Button>
            
            <Button
              onClick={handleReturnHome}
              variant="outline"
              className="flex items-center gap-2"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};