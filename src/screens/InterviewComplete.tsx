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
  AlertCircle
} from "lucide-react";

export const InterviewComplete: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);
  const [showFeedback, setShowFeedback] = useState(false);

  const candidateName = localStorage.getItem('candidate-name') || 'Candidate';
  const interviewSettings = JSON.parse(localStorage.getItem('interview-settings') || '{}');

  // Enhanced mock performance data
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
      "Excellent communication skills",
      "Strong problem-solving approach", 
      "Good technical knowledge",
      "Confident presentation"
    ],
    improvements: [
      "Could provide more specific examples",
      "Consider elaborating on technical details",
      "Practice explaining complex concepts simply"
    ],
    feedback: {
      positive: [
        "Great eye contact and professional demeanor",
        "Clear and articulate responses",
        "Showed enthusiasm for the role",
        "Asked thoughtful questions"
      ],
      constructive: [
        "Could benefit from more concrete examples",
        "Some technical explanations could be clearer",
        "Consider preparing STAR method responses"
      ]
    }
  };

  const handleNewInterview = () => {
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
    if (score >= 80) return "bg-green-400/20 border-green-400/30";
    if (score >= 60) return "bg-yellow-400/20 border-yellow-400/30";
    return "bg-red-400/20 border-red-400/30";
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
      <AnimatedTextBlockWrapper>
        <div className="w-full max-w-6xl h-full flex flex-col">
          <div className="text-center mb-6">
            <CheckCircle className="size-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Interview Completed!</h1>
            <p className="text-gray-300">
              Thank you, <span className="text-white font-semibold">{candidateName}</span> for completing the interview for <span className="text-primary">{interviewSettings.position}</span>
            </p>
          </div>

          {/* Scrollable content area */}
          <div className="flex-1 overflow-y-auto pr-4 -mr-4 max-h-[calc(100vh-300px)]">
            {/* Performance Dashboard */}
            <div className="bg-gradient-to-br from-black/40 to-black/20 rounded-xl p-6 mb-6 border border-gray-700/50">
              <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="size-6 text-primary" />
                <h2 className="text-2xl font-semibold text-white">Performance Analysis</h2>
              </div>

              {/* Overall Score with Performance Level */}
              <div className="text-center mb-8">
                <div className={`inline-flex flex-col items-center justify-center w-32 h-32 rounded-full ${getScoreBackground(performanceData.overallScore)} border-2 mb-3`}>
                  <span className={`text-3xl font-bold ${getScoreColor(performanceData.overallScore)}`}>
                    {performanceData.overallScore}%
                  </span>
                  <span className="text-xs text-gray-300 mt-1">
                    {getPerformanceLevel(performanceData.overallScore)}
                  </span>
                </div>
                <p className="text-gray-300 font-medium">Overall Performance</p>
              </div>

              {/* Detailed Scores Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-700/30">
                  <MessageSquare className="size-6 text-blue-400 mx-auto mb-2" />
                  <div className={`text-xl font-bold ${getScoreColor(performanceData.communicationScore)} mb-1`}>
                    {performanceData.communicationScore}%
                  </div>
                  <p className="text-gray-300 text-xs">Communication</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-700/30">
                  <Brain className="size-6 text-purple-400 mx-auto mb-2" />
                  <div className={`text-xl font-bold ${getScoreColor(performanceData.technicalScore)} mb-1`}>
                    {performanceData.technicalScore}%
                  </div>
                  <p className="text-gray-300 text-xs">Technical Skills</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-700/30">
                  <Target className="size-6 text-orange-400 mx-auto mb-2" />
                  <div className={`text-xl font-bold ${getScoreColor(performanceData.problemSolvingScore)} mb-1`}>
                    {performanceData.problemSolvingScore}%
                  </div>
                  <p className="text-gray-300 text-xs">Problem Solving</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-700/30">
                  <Award className="size-6 text-green-400 mx-auto mb-2" />
                  <div className={`text-xl font-bold ${getScoreColor(performanceData.confidenceScore)} mb-1`}>
                    {performanceData.confidenceScore}%
                  </div>
                  <p className="text-gray-300 text-xs">Confidence</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-700/30">
                  <Lightbulb className="size-6 text-yellow-400 mx-auto mb-2" />
                  <div className={`text-xl font-bold ${getScoreColor(performanceData.clarityScore)} mb-1`}>
                    {performanceData.clarityScore}%
                  </div>
                  <p className="text-gray-300 text-xs">Clarity</p>
                </div>
              </div>

              {/* Interview Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-4 border border-gray-700/30">
                  <Clock className="size-6 text-primary" />
                  <div>
                    <p className="text-white font-medium text-lg">{performanceData.duration}</p>
                    <p className="text-gray-400 text-sm">Interview Duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-4 border border-gray-700/30">
                  <TrendingUp className="size-6 text-primary" />
                  <div>
                    <p className="text-white font-medium text-lg">
                      {performanceData.questionsAnswered}/{performanceData.totalQuestions}
                    </p>
                    <p className="text-gray-400 text-sm">Questions Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-lg p-4 border border-gray-700/30">
                  <Star className="size-6 text-primary" />
                  <div>
                    <p className="text-white font-medium text-lg">{performanceData.confidence}</p>
                    <p className="text-gray-400 text-sm">Confidence Level</p>
                  </div>
                </div>
              </div>

              {/* Strengths and Areas for Improvement */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <ThumbsUp className="size-5 text-green-400" />
                    <h3 className="text-lg font-semibold text-green-400">Key Strengths</h3>
                  </div>
                  <ul className="space-y-2">
                    {performanceData.strengths.map((strength, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="size-5 text-yellow-400" />
                    <h3 className="text-lg font-semibold text-yellow-400">Areas for Growth</h3>
                  </div>
                  <ul className="space-y-2">
                    {performanceData.improvements.map((improvement, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interviewer Feedback Section */}
              <div className="bg-blue-500/10 rounded-lg p-6 border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="size-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-blue-400">Interviewer Feedback</h3>
                  </div>
                  <Button
                    onClick={() => setShowFeedback(!showFeedback)}
                    variant="outline"
                    size="sm"
                    className="text-blue-400 border-blue-400/30"
                  >
                    {showFeedback ? 'Hide' : 'Show'} Details
                  </Button>
                </div>

                {showFeedback && (
                  <div className="space-y-4">
                    <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <ThumbsUp className="size-4 text-green-400" />
                        <h4 className="font-medium text-green-400">What Went Well</h4>
                      </div>
                      <ul className="space-y-1">
                        {performanceData.feedback.positive.map((item, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <ThumbsDown className="size-4 text-orange-400" />
                        <h4 className="font-medium text-orange-400">Constructive Feedback</h4>
                      </div>
                      <ul className="space-y-1">
                        {performanceData.feedback.constructive.map((item, index) => (
                          <li key={index} className="text-gray-300 text-sm flex items-start gap-2">
                            <span className="text-orange-400 mt-1">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                      <h4 className="font-medium text-blue-400 mb-2">Overall Recommendation</h4>
                      <p className="text-gray-300 text-sm">
                        {candidateName} demonstrated strong potential for the {interviewSettings.position} role. 
                        With some focused preparation on the areas mentioned above, they would be an excellent 
                        addition to the team. The candidate showed good technical understanding and excellent 
                        communication skills throughout the interview.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fixed bottom buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-700">
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