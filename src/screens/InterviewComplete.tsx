import { DialogWrapper, AnimatedTextBlockWrapper } from "@/components/DialogWrapper";
import React from "react";
import { useAtom } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, RotateCcw } from "lucide-react";

export const InterviewComplete: React.FC = () => {
  const [, setScreenState] = useAtom(screenAtom);

  const candidateName = localStorage.getItem('candidate-name') || 'Candidate';
  const interviewSettings = JSON.parse(localStorage.getItem('interview-settings') || '{}');

  const handleNewInterview = () => {
    // Clear previous interview data
    localStorage.removeItem('candidate-name');
    setScreenState({ currentScreen: "interviewSetup" });
  };

  const handleReturnHome = () => {
    setScreenState({ currentScreen: "intro" });
  };

  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download an interview report
    alert("Interview report download would be implemented here");
  };

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
          <CheckCircle className="size-20 text-green-500 mb-4" />
          
          <h1 className="text-3xl font-bold text-white mb-2">
            Interview Completed!
          </h1>
          
          <div className="text-gray-300 space-y-2 mb-8">
            <p className="text-lg">
              Thank you, <span className="text-white font-semibold">{candidateName}</span>
            </p>
            <p>
              Your interview for <span className="text-primary">{interviewSettings.position}</span> has been completed successfully.
            </p>
            <p className="text-sm">
              The interview recording and analysis will be available shortly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              onClick={handleDownloadReport}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Download className="size-4" />
              Download Report
            </Button>
            
            <Button
              onClick={handleNewInterview}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90"
            >
              <RotateCcw className="size-4" />
              New Interview
            </Button>
          </div>

          <Button
            onClick={handleReturnHome}
            variant="ghost"
            className="text-gray-400 hover:text-white mt-4"
          >
            Return to Home
          </Button>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};