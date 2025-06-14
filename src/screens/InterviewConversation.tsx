import { DialogWrapper } from "@/components/DialogWrapper";
import {
  DailyAudio,
  useDaily,
  useLocalSessionId,
  useParticipantIds,
  useVideoTrack,
  useAudioTrack,
} from "@daily-co/daily-react";
import React, { useCallback, useEffect, useState } from "react";
import Video from "@/components/Video";
import { conversationAtom } from "@/store/conversation";
import { useAtom, useAtomValue } from "jotai";
import { screenAtom } from "@/store/screens";
import { Button } from "@/components/ui/button";
import { endConversation } from "@/api/endConversation";
import {
  MicIcon,
  MicOffIcon,
  VideoIcon,
  VideoOffIcon,
  PhoneIcon,
  Clock,
  User,
  Briefcase
} from "lucide-react";
import { apiTokenAtom } from "@/store/tokens";
import { quantum } from 'ldrs';
import { cn } from "@/lib/utils";
import { updateInterviewStatus } from "@/lib/supabase";

quantum.register();

export const InterviewConversation: React.FC = () => {
  const [conversation, setConversation] = useAtom(conversationAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const token = useAtomValue(apiTokenAtom);
  const [interviewStartTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const daily = useDaily();
  const localSessionId = useLocalSessionId();
  const localVideo = useVideoTrack(localSessionId);
  const localAudio = useAudioTrack(localSessionId);
  const isCameraEnabled = !localVideo.isOff;
  const isMicEnabled = !localAudio.isOff;
  const remoteParticipantIds = useParticipantIds({ filter: "remote" });
  const [start, setStart] = useState(false);

  // Get interview settings from localStorage
  const candidateName = localStorage.getItem('candidate-name') || 'Candidate';
  const interviewSettings = JSON.parse(localStorage.getItem('interview-settings') || '{}');
  const interviewId = localStorage.getItem('interview-id');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (remoteParticipantIds.length && !start) {
      setStart(true);
      setTimeout(() => daily?.setLocalAudio(true), 4000);
    }
  }, [remoteParticipantIds, start]);

  useEffect(() => {
    if (conversation?.conversation_url) {
      daily
        ?.join({
          url: conversation.conversation_url,
          startVideoOff: false,
          startAudioOff: true,
        })
        .then(() => {
          daily?.setLocalVideo(true);
          daily?.setLocalAudio(false);
        });
    }
  }, [conversation?.conversation_url]);

  const toggleVideo = useCallback(() => {
    daily?.setLocalVideo(!isCameraEnabled);
  }, [daily, isCameraEnabled]);

  const toggleAudio = useCallback(() => {
    daily?.setLocalAudio(!isMicEnabled);
  }, [daily, isMicEnabled]);

  const endInterview = useCallback(async () => {
    try {
      // End the Daily call
      daily?.leave();
      daily?.destroy();
      
      // End the Tavus conversation
      if (conversation?.conversation_id && token) {
        await endConversation(token, conversation.conversation_id);
      }
      
      // Update interview status in database
      if (interviewId) {
        await updateInterviewStatus(interviewId, 'completed');
      }
      
      setConversation(null);
      setScreenState({ currentScreen: "interviewComplete" });
    } catch (error) {
      console.error('Error ending interview:', error);
      // Still proceed to completion screen even if there's an error
      setConversation(null);
      setScreenState({ currentScreen: "interviewComplete" });
    }
  }, [daily, token, conversation, interviewId, setConversation, setScreenState]);

  const formatDuration = (start: Date, current: Date) => {
    const diff = Math.floor((current.getTime() - start.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <DialogWrapper>
      <div className="absolute inset-0 size-full">
        {/* Interview Info Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center gap-2 mb-1">
              <User className="size-4" />
              <span className="font-medium">{candidateName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <Briefcase className="size-3" />
              <span>{interviewSettings.position || 'Interview'}</span>
            </div>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-white">
            <div className="flex items-center gap-2">
              <Clock className="size-4" />
              <span className="font-mono">{formatDuration(interviewStartTime, currentTime)}</span>
            </div>
            <div className="text-xs text-gray-300 text-center">
              / {interviewSettings.duration || 30}min
            </div>
          </div>
        </div>

        {remoteParticipantIds?.length > 0 ? (
          <Video
            id={remoteParticipantIds[0]}
            className="size-full"
            tileClassName="!object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <l-quantum
                size="45"
                speed="1.75"
                color="white"
              ></l-quantum>
              <p className="text-white mt-4">Connecting to interviewer...</p>
            </div>
          </div>
        )}

        {localSessionId && (
          <Video
            id={localSessionId}
            tileClassName="!object-cover"
            className={cn(
              "absolute bottom-20 right-4 aspect-video h-40 w-24 overflow-hidden rounded-lg border-2 border-[#22C5FE] shadow-[0_0_20px_rgba(34,197,254,0.3)] sm:bottom-12 lg:h-auto lg:w-52"
            )}
          />
        )}

        <div className="absolute bottom-8 right-1/2 z-10 flex translate-x-1/2 justify-center gap-4">
          <Button
            size="icon"
            className="border border-[#22C5FE] shadow-[0_0_20px_rgba(34,197,254,0.2)]"
            variant="secondary"
            onClick={toggleAudio}
          >
            {!isMicEnabled ? (
              <MicOffIcon className="size-6" />
            ) : (
              <MicIcon className="size-6" />
            )}
          </Button>
          <Button
            size="icon"
            className="border border-[#22C5FE] shadow-[0_0_20px_rgba(34,197,254,0.2)]"
            variant="secondary"
            onClick={toggleVideo}
          >
            {!isCameraEnabled ? (
              <VideoOffIcon className="size-6" />
            ) : (
              <VideoIcon className="size-6" />
            )}
          </Button>
          <Button
            size="icon"
            className="bg-[rgba(251,36,71,0.80)] backdrop-blur hover:bg-[rgba(251,36,71,0.60)] border border-[rgba(251,36,71,0.9)] shadow-[0_0_20px_rgba(251,36,71,0.3)]"
            variant="secondary"
            onClick={endInterview}
          >
            <PhoneIcon className="size-6 rotate-[135deg]" />
          </Button>
        </div>
        <DailyAudio />
      </div>
    </DialogWrapper>
  );
};