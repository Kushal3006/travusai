import { DialogWrapper, AnimatedTextBlockWrapper } from "@/components/DialogWrapper";
import React, { useState } from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  RotateCcw, 
  BarChart3, 
  Clock, 
  Star, 
  TrendingUp, 
  MessageSquare,
  Award,
  Target,
  Brain,
  Users,
  Lightbulb,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export const InterviewComplete: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [showFeedback, setShowFeedback] = useState(false);

  const candidateName = localStorage.getItem('candidate-name') || 'Candidate';
  const interviewSettings = JSON.parse(localStorage.getItem('interview-settings') || '{}');

  const performanceData = {
    overallScore: 78,
    communicationScore: 85,
    technicalScore: 72,
    problemSolvingScore: 80,
    confidenceScore: 88,
    clarityScore: 75,
    duration: "28 minutes",
    questionsAnswered: 6,
    totalQuestions: 8,
    confidence: "High",
    strengths: [
      "Excellent communication skills and professional demeanor",
      "Strong problem-solving approach with logical thinking",
      "Good technical knowledge with practical examples",
      "Confident presentation and clear articulation"
    ],
    improvements: [
      "Could provide more specific examples from past experience",
      "Consider elaborating on technical implementation details",
      "Practice explaining complex concepts in simpler terms",
      "Prepare more STAR method responses for behavioral questions"
    ],
    feedback: {
      positive: [
        "Maintained excellent eye contact and professional demeanor throughout",
        "Provided clear and well-structured responses to most questions",
        "Showed genuine enthusiasm for the role and company",
        "Asked thoughtful questions about the team and responsibilities",
        "Demonstrated good listening skills and engagement"
      ],
      constructive: [
        "Could benefit from more concrete examples when discussing achievements",
        "Some technical explanations could be more detailed and specific",
        "Consider preparing more stories using the STAR method",
        "Practice explaining complex technical concepts to non-technical audiences",
        "Work on providing quantifiable results in experience examples"
      ]
    }
  };

  const handleNewInterview = () => {
    localStorage.removeItem('candidate-name');
    localStorage.removeItem('interview-settings');
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
    if (score >= 80) return "bg-gradient-to-br from-green-400/20 to-green-600/20 border-green-400/40";
    if (score >= 60) return "bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-yellow-400/40";
    return "bg-gradient-to-br from-red-400/20 to-red-600/20 border-red-400/40";
  };

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Satisfactory";
    return "Needs Improvement";
  };

  return (
    <DialogWrapper>
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="text-center p-8 pb-6 border-b border-white/10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400/20 to-green-600/40 rounded-3xl mb-6">
              <CheckCircle className="size-12 text-green-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Interview Completed!</h1>
            <p className="text-gray-300 text-lg">
              Thank you, <span className="text-white font-semibold">{candidateName}</span> for completing the interview for{" "}
              <span className="text-primary font-semibold">{interviewSettings.position}</span>
            </p>
          </div>

          {/* Scrollable Content */}
          <div className="relative">
            <div 
              className="max-h-[65vh] overflow-y-auto px-8 py-6"
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

              <div className="space-y-8">
                {/* Performance Overview */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-3 mb-8">
                    <BarChart3 className="size-8 text-primary" />
                    <h2 className="text-3xl font-bold text-white">Performance Analysis</h2>
                  </div>

                  {/* Overall Score */}
                  <div className="text-center mb-10">
                    <div className={`inline-flex flex-col items-center justify-center w-40 h-40 rounded-full ${getScoreBackground(performanceData.overallScore)} border-4 mb-4`}>
                      <span className={`text-5xl font-bold ${getScoreColor(performanceData.overallScore)}`}>
                        {performanceData.overallScore}%
                      </span>
                      <span className="text-sm text-gray-300 mt-2 font-medium">
                        {getPerformanceLevel(performanceData.overallScore)}
                      </span>
                    </div>
                    <p className="text-gray-300 font-semibold text-xl">Overall Performance</p>
                  </div>

                  {/* Detailed Scores */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
                    {[
                      { icon: MessageSquare, label: "Communication", score: performanceData.communicationScore, color: "text-blue-400" },
                      { icon: Brain, label: "Technical", score: performanceData.technicalScore, color: "text-purple-400" },
                      { icon: Target, label: "Problem Solving", score: performanceData.problemSolvingScore, color: "text-orange-400" },
                      { icon: Award, label: "Confidence", score: performanceData.confidenceScore, color: "text-green-400" },
                      { icon: Lightbulb, label: "Clarity", score: performanceData.clarityScore, color: "text-yellow-400" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <div key={index} className="bg-gradient-to-br from-black/40 to-black/20 rounded-xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-200">
                          <Icon className={`size-8 ${item.color} mx-auto mb-3`} />
                          <div className={`text-2xl font-bold ${getScoreColor(item.score)} mb-2`}>
                            {item.score}%
                          </div>
                          <p className="text-gray-300 text-sm font-medium">{item.label}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { icon: Clock, label: "Interview Duration", value: performanceData.duration, color: "text-primary" },
                      { icon: TrendingUp, label: "Questions Completed", value: `${performanceData.questionsAnswered}/${performanceData.totalQuestions}`, color: "text-primary" },
                      { icon: Star, label: "Confidence Level", value: performanceData.confidence, color: "text-primary" }
                    ].map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <div key={index} className="flex items-center gap-4 bg-gradient-to-r from-black/40 to-black/20 rounded-xl p-6 border border-white/10">
                          <Icon className={`size-8 ${stat.color}`} />
                          <div>
                            <p className="text-white font-bold text-xl">{stat.value}</p>
                            <p className="text-gray-400 text-sm">{stat.label}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl p-6 border border-green-500/30">
                    <div className="flex items-center gap-3 mb-6">
                      <ThumbsUp className="size-6 text-green-400" />
                      <h3 className="text-2xl font-bold text-green-400">Key Strengths</h3>
                    </div>
                    <ul className="space-y-3">
                      {performanceData.strengths.map((strength, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-2xl p-6 border border-yellow-500/30">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertCircle className="size-6 text-yellow-400" />
                      <h3 className="text-2xl font-bold text-yellow-400">Areas for Growth</h3>
                    </div>
                    <ul className="space-y-3">
                      {performanceData.improvements.map((improvement, index) => (
                        <li key={index} className="text-gray-300 flex items-start gap-3">
                          <span className="text-yellow-400 mt-1 flex-shrink-0">→</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interviewer Feedback */}
                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-2xl p-8 border border-blue-500/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="size-8 text-blue-400" />
                      <h3 className="text-3xl font-bold text-blue-400">Interviewer Feedback</h3>
                    </div>
                    <Button
                      onClick={() => setShowFeedback(!showFeedback)}
                      variant="outline"
                      className="flex items-center gap-2 bg-blue-500/20 border-blue-400/40 text-blue-400 hover:bg-blue-500/30 transition-all duration-200"
                    >
                      {showFeedback ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      {showFeedback ? 'Hide' : 'Show'} Details
                    </Button>
                  </div>

                  {showFeedback && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-green-500/10 to-green-600/5 rounded-xl p-6 border border-green-500/30">
                        <div className="flex items-center gap-3 mb-4">
                          <ThumbsUp className="size-6 text-green-400" />
                          <h4 className="text-xl font-bold text-green-400">What Went Well</h4>
                        </div>
                        <ul className="space-y-2">
                          {performanceData.feedback.positive.map((item, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-3">
                              <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl p-6 border border-orange-500/30">
                        <div className="flex items-center gap-3 mb-4">
                          <ThumbsDown className="size-6 text-orange-400" />
                          <h4 className="text-xl font-bold text-orange-400">Constructive Feedback</h4>
                        </div>
                        <ul className="space-y-2">
                          {performanceData.feedback.constructive.map((item, index) => (
                            <li key={index} className="text-gray-300 flex items-start gap-3">
                              <span className="text-orange-400 mt-1 flex-shrink-0">→</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 rounded-xl p-6 border border-blue-500/30">
                        <h4 className="text-xl font-bold text-blue-400 mb-4">Overall Recommendation</h4>
                        <p className="text-gray-300 leading-relaxed">
                          <span className="font-semibold text-white">{candidateName}</span> demonstrated strong potential for the{" "}
                          <span className="font-semibold text-primary">{interviewSettings.position}</span> role. 
                          With focused preparation on the areas mentioned above, they would be an excellent 
                          addition to the team. The candidate showed good technical understanding, excellent 
                          communication skills, and genuine enthusiasm throughout the interview. I recommend 
                          proceeding to the next round with additional focus on practical problem-solving scenarios.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex flex-col sm:flex-row gap-4 p-8 pt-6 border-t border-white/10">
            <Button
              onClick={handleNewInterview}
              className="flex-1 h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-200 shadow-lg"
            >
              <RotateCcw className="size-5 mr-2" />
              New Interview
            </Button>
            
            <Button
              onClick={handleReturnHome}
              variant="outline"
              className="flex-1 h-12 text-base font-semibold rounded-xl border-2 border-white/30 bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};