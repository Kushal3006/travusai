import { createConversation } from "@/api";
import { createInterviewConversation } from "@/api/createInterview";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
  StaticTextBlockWrapper,
} from "@/components/DialogWrapper";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AlertTriangle, Mic, Video } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationError } from "./ConversationError";
import zoomSound from "@/assets/sounds/zoom.mp3";
import { Button } from "@/components/ui/button";
import { apiTokenAtom } from "@/store/tokens";
import { quantum } from 'ldrs';
import gloriaVideo from "@/assets/video/gloria.mp4";
import { getLanguageOptions } from "@/api/interviewQuestions";

// Register the quantum loader
quantum.register();

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const token = useAtomValue(apiTokenAtom);

  const createConversationRequest = async () => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }

      // Check if this is an interview or demo
      const candidateName = localStorage.getItem('candidate-name');
      const interviewSettings = localStorage.getItem('interview-settings');
      
      let conversation;
      if (candidateName && interviewSettings) {
        // Create interview conversation
        conversation = await createInterviewConversation(
          token, 
          JSON.parse(interviewSettings),
          candidateName
        );
        setConversation(conversation);
        setScreenState({ currentScreen: "interviewConversation" });
      } else {
        // Create demo conversation
        conversation = await createConversation(token);
        setConversation(conversation);
        setScreenState({ currentScreen: "conversation" });
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

export const Instructions: React.FC = () => {
  const daily = useDaily();
  const { currentMic, setMicrophone, setSpeaker } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState(false);
  const audio = useMemo(() => {
    const audioObj = new Audio(zoomSound);
    audioObj.volume = 0.7;
    return audioObj;
  }, []);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  // Check if this is an interview or demo
  const candidateName = localStorage.getItem('candidate-name');
  const interviewSettings = localStorage.getItem('interview-settings');
  const isInterview = !!candidateName;
  
  let selectedLanguage = null;
  if (interviewSettings) {
    const settings = JSON.parse(interviewSettings);
    const languageOptions = getLanguageOptions();
    selectedLanguage = languageOptions.find(lang => lang.code === settings.language);
  }

  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleClick = async () => {
    try {
      setIsLoading(true);
      setIsPlayingSound(true);
      
      audio.currentTime = 0;
      await audio.play();
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsPlayingSound(false);
      setIsLoadingConversation(true);
      
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultMic = res?.mic?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultSpeaker = res?.speaker?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        micDeviceId = res?.mic?.deviceId;

        if (isDefaultMic) {
          if (!isDefaultMic) {
            setMicrophone("default");
          }
          if (!isDefaultSpeaker) {
            setSpeaker("default");
          }
        }
      }
      if (micDeviceId) {
        await createConversationRequest();
      } else {
        setGetUserMediaError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingConversation(false);
    }
  };

  if (isPlayingSound || isLoadingConversation) {
    return (
      <DialogWrapper>
        <video
          src={gloriaVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <AnimatedTextBlockWrapper>
          <div className="flex flex-col items-center justify-center gap-4">
            <l-quantum
              size="45"
              speed="1.75"
              color="white"
            ></l-quantum>
            <p className="text-white text-center">
              {isInterview 
                ? `Preparing ${selectedLanguage?.nativeName || 'English'} interview for ${candidateName}...`
                : 'Connecting to AI assistant...'
              }
            </p>
          </div>
        </AnimatedTextBlockWrapper>
      </DialogWrapper>
    );
  }

  if (error) {
    return <ConversationError onClick={handleClick} />;
  }

  return (
    <DialogWrapper>
      <video
        src={gloriaVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <AnimatedTextBlockWrapper>
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 
            className="mb-6 pt-1 text-center text-3xl sm:text-4xl lg:text-5xl font-semibold"
            style={{
              fontFamily: 'Source Code Pro, monospace'
            }}
          >
            {isInterview ? (
              <>
                <span className="text-white">Ready for your</span>{" "}
                <span style={{ color: '#9EEAFF' }}>
                  {selectedLanguage?.nativeName || 'English'} Interview?
                </span>
              </>
            ) : (
              <>
                <span className="text-white">See AI?</span>{" "}
                <span style={{ color: '#9EEAFF' }}>Act Natural.</span>
              </>
            )}
          </h1>
          
          <p className="max-w-[650px] mx-auto text-center text-base sm:text-lg text-gray-400 mb-12">
            {isInterview 
              ? `${candidateName}, your AI interviewer is ready to begin a professional conversation in ${selectedLanguage?.nativeName || 'English'} to assess your qualifications.`
              : "Have a face-to-face conversation with an AI so real, it feels human—an intelligent agent ready to listen, respond, and act across countless use cases."
            }
          </p>
          
          {selectedLanguage && (
            <div className="mb-8 inline-flex items-center gap-3 bg-[rgba(0,0,0,0.3)] px-6 py-3 rounded-full border border-white/20">
              <span className="text-2xl">{selectedLanguage.flag}</span>
              <span className="text-white font-medium">Interview Language: {selectedLanguage.nativeName}</span>
            </div>
          )}
          
          <Button
            onClick={handleClick}
            className="relative z-20 flex items-center justify-center gap-2 rounded-3xl border border-[rgba(255,255,255,0.3)] px-8 py-2 text-sm text-white transition-all duration-200 hover:text-primary mb-12 disabled:opacity-50"
            disabled={isLoading}
            style={{
              height: '48px',
              transition: 'all 0.2s ease-in-out',
              backgroundColor: 'rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 15px rgba(34, 197, 254, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Video className="size-5" />
            {isInterview ? 'Start Interview' : 'Start Video Chat'}
            {getUserMediaError && (
              <div className="absolute -top-1 left-0 right-0 flex items-center gap-1 text-wrap rounded-lg border bg-red-500 p-2 text-white backdrop-blur-sm">
                <AlertTriangle className="text-red size-4" />
                <p>
                  To chat with the AI, please allow microphone access. Check your
                  browser settings.
                </p>
              </div>
            )}
          </Button>
          
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-8 text-gray-400 justify-center">
            <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
              <Mic className="size-5 text-primary" />
              Mic access is required
            </div>
            <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.2)] px-4 py-2 rounded-full">
              <Video className="size-5 text-primary" />
              Camera access is required
            </div>
          </div>
          
          <span className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-4 text-sm text-gray-500 text-center">
            By starting a conversation, I accept the{' '}
            <a href="#" className="text-primary hover:underline">Terms of Use</a> and acknowledge the{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </span>
        </div>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};

export const PositiveFeedback: React.FC = () => {
  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <StaticTextBlockWrapper
          imgSrc="/images/positive.png"
          title="Great Conversation!"
          titleClassName="sm:max-w-full bg-[linear-gradient(91deg,_#43BF8F_16.63%,_#FFF_86.96%)]"
          description="Thanks for the engaging discussion. Feel free to come back anytime for another chat!"
        />
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};