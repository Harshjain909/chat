import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="pt-20 px-4 max-w-5xl mx-auto space-y-6">
      {/* Theme Selection */}
      <section>
        <h2 className="text-lg font-semibold">Theme</h2>
        <p className="text-sm text-base-content/70">Choose a theme for your chat interface</p>

        <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center p-2 rounded-lg transition 
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
              onClick={() => setTheme(t)}
            >
              <div className="relative w-full h-8 rounded overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="bg-primary rounded"></div>
                  <div className="bg-secondary rounded"></div>
                  <div className="bg-accent rounded"></div>
                  <div className="bg-neutral rounded"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium mt-1 truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Preview */}
      <section>
        <h3 className="text-lg font-semibold">Preview</h3>

        <div className="rounded-xl border border-base-300 bg-base-100 shadow-lg">
          {/* Header */}
          <div className="p-4 border-b border-base-300 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
              J
            </div>
            <div>
              <h4 className="font-medium text-sm">John Doe</h4>
              <p className="text-xs text-base-content/70">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 h-52 overflow-y-auto">
            {PREVIEW_MESSAGES.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                <div
                  className={`p-3 rounded-xl max-w-[80%] shadow-sm text-sm ${
                    msg.isSent
                      ? "bg-primary text-primary-content"
                      : "bg-base-200 text-base-content"
                  }`}
                >
                  <p>{msg.content}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      msg.isSent ? "text-primary-content/70" : "text-base-content/70"
                    }`}
                  >
                    12:00 PM
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-base-300 flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1 text-sm h-10"
              placeholder="Type a message..."
              value="This is a preview"
              readOnly
            />
            <button className="btn btn-primary h-10 min-h-0">
              <Send size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingsPage;
