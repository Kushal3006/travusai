import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { cn } from "@/utils";
import { useAtom } from "jotai";
import { getDefaultStore } from "jotai";
import { settingsAtom, settingsSavedAtom } from "@/store/settings";
import { screenAtom } from "@/store/screens";
import { X, Settings as SettingsIcon, User, Globe, Mic, MessageSquare, FileText, Key } from "lucide-react";
import * as React from "react";
import { apiTokenAtom } from "@/store/tokens";

// Button Component
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "ghost" | "outline";
    size?: "icon";
  }
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl text-base font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
        {
          "border-2 border-white/30 bg-white/10 hover:bg-white/20": variant === "outline",
          "hover:bg-white/10": variant === "ghost",
          "size-12": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Input Component
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-base text-white transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// Textarea Component
const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-base text-white transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400 resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

// Label Component
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-semibold text-white mb-3 block tracking-wide",
        className
      )}
      {...props}
    />
  );
});
Label.displayName = "Label";

// Select Component
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-12 w-full rounded-xl border-2 border-white/20 bg-black/30 backdrop-blur-sm px-4 py-3 text-base text-white transition-all duration-200 hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Select.displayName = "Select";

export const Settings: React.FC = () => {
  const [settings, setSettings] = useAtom(settingsAtom);
  const [, setScreenState] = useAtom(screenAtom);
  const [token, setToken] = useAtom(apiTokenAtom);
  const [, setSettingsSaved] = useAtom(settingsSavedAtom);

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish", value: "es" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Italian", value: "it" },
    { label: "Portuguese", value: "pt" },
  ];

  const interruptSensitivities = [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const handleClose = () => {
    setScreenState({ 
      currentScreen: token ? "instructions" : "intro" 
    });
  };

  const handleSave = async () => {
    console.log('Current settings before save:', settings);
    
    const updatedSettings = {
      ...settings,
      greeting: settings.greeting,
    };
    
    localStorage.setItem('tavus-settings', JSON.stringify(updatedSettings));
    
    const store = getDefaultStore();
    store.set(settingsAtom, updatedSettings);
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const storedSettings = localStorage.getItem('tavus-settings');
    const storeSettings = store.get(settingsAtom);
    
    console.log('Settings in localStorage:', JSON.parse(storedSettings || '{}'));
    console.log('Settings in store after save:', storeSettings);
    
    setSettingsSaved(true);
    handleClose();
  };

  return (
    <DialogWrapper>
      <div className="relative w-full h-full flex items-center justify-center p-6">
        <div className="w-full max-w-4xl bg-gradient-to-br from-black/60 via-black/40 to-black/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-8 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl">
                <SettingsIcon className="size-6 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-white">Settings</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="size-6" />
            </Button>
          </div>
          
          {/* Scrollable Content */}
          <div className="relative">
            <div 
              className="max-h-[60vh] overflow-y-auto px-8 py-6"
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
                {/* Personal Information */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <User className="size-6 text-primary" />
                    Personal Information
                  </h3>
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                      placeholder="Enter your name"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Language & Communication */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Globe className="size-6 text-primary" />
                    Language & Communication
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select
                        id="language"
                        value={settings.language}
                        onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {languages.map((lang) => (
                          <option 
                            key={lang.value} 
                            value={lang.value}
                            className="bg-black text-white"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {lang.label}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="interruptSensitivity">Interrupt Sensitivity</Label>
                      <Select
                        id="interruptSensitivity"
                        value={settings.interruptSensitivity}
                        onChange={(e) => setSettings({ ...settings, interruptSensitivity: e.target.value })}
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        {interruptSensitivities.map((sensitivity) => (
                          <option 
                            key={sensitivity.value} 
                            value={sensitivity.value}
                            className="bg-black text-white"
                            style={{ fontFamily: "'Inter', sans-serif" }}
                          >
                            {sensitivity.label}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Conversation Settings */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <MessageSquare className="size-6 text-primary" />
                    Conversation Settings
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="greeting">Custom Greeting</Label>
                      <Input
                        id="greeting"
                        value={settings.greeting}
                        onChange={(e) => setSettings({ ...settings, greeting: e.target.value })}
                        placeholder="Enter custom greeting message"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="context">Custom Context</Label>
                      <Textarea
                        id="context"
                        value={settings.context}
                        onChange={(e) => setSettings({ ...settings, context: e.target.value })}
                        placeholder="Paste or type custom context for the AI assistant"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <FileText className="size-6 text-primary" />
                    Advanced Settings
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="persona">Custom Persona ID</Label>
                      <Input
                        id="persona"
                        value={settings.persona}
                        onChange={(e) => setSettings({ ...settings, persona: e.target.value })}
                        placeholder="p2fbd605"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>

                    <div>
                      <Label htmlFor="replica">Custom Replica ID</Label>
                      <Input
                        id="replica"
                        value={settings.replica}
                        onChange={(e) => setSettings({ ...settings, replica: e.target.value })}
                        placeholder="rfb51183fe"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      />
                    </div>
                  </div>
                </div>

                {/* API Configuration */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Key className="size-6 text-primary" />
                    API Configuration
                  </h3>
                  <div>
                    <Label htmlFor="apiToken">API Token</Label>
                    <Input
                      id="apiToken"
                      type="password"
                      value={token || ""}
                      onChange={(e) => {
                        const newToken = e.target.value;
                        setToken(newToken);
                        localStorage.setItem('tavus-token', newToken);
                      }}
                      placeholder="Enter Tavus API Key"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="p-8 pt-6 border-t border-white/10">
            <Button
              onClick={handleSave}
              className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 transition-all duration-200 shadow-lg"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
};