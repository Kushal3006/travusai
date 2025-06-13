import { useAtom } from "jotai";
import { screenAtom } from "./store/screens";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import {
  IntroLoading,
  Outage,
  OutOfMinutes,
  Intro,
  InterviewSetup,
  Instructions,
  Conversation,
  InterviewConversation,
  FinalScreen,
  InterviewComplete,
  Settings,
} from "./screens";

function App() {
  const [{ currentScreen }] = useAtom(screenAtom);

  const renderScreen = () => {
    switch (currentScreen) {
      case "introLoading":
        return <IntroLoading />;
      case "outage":
        return <Outage />;
      case "outOfMinutes":
        return <OutOfMinutes />;
      case "intro":
        return <Intro />;
      case "interviewSetup":
        return <InterviewSetup />;
      case "settings":
        return <Settings />;
      case "instructions":
        return <Instructions />;
      case "conversation":
        return <Conversation />;
      case "interviewConversation":
        return <InterviewConversation />;
      case "finalScreen":
        return <FinalScreen />;
      case "interviewComplete":
        return <InterviewComplete />;
      default:
        return <IntroLoading />;
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col bg-black overflow-hidden">
      {currentScreen !== "introLoading" && (
        <div className="absolute top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
          <Header />
        </div>
      )}
      <div className="flex-1 w-full h-full">
        {renderScreen()}
      </div>
      {currentScreen !== "introLoading" && (
        <div className="absolute bottom-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8">
          <Footer />
        </div>
      )}
    </main>
  );
}

export default App;