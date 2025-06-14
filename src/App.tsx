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
    try {
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
    } catch (error) {
      console.error('Error rendering screen:', error);
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-black text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
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