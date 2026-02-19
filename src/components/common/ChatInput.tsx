'use client';

import { Paperclip, Mic, Send, Square } from 'lucide-react';
import { useRef, useState } from 'react';

const recognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition ||
    (window as any).webkitSpeechRecognition)
    ? new (window.SpeechRecognition ||
        (window as any).webkitSpeechRecognition)()
    : null;

export default function ChatInput({
  question,
  setQuestion,
  handleSend,
  currentTutor,
}: {
  question: string;
  setQuestion: (value: string) => void;
  handleSend: () => void;
  currentTutor: {
    name: string;
    color: string;
    gradient: string;
    icon: string;
    bgColor: string;
    image: string;
    subject: string;
    description: string;
  };
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);

  // Voice setup
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setQuestion((prev: string) => prev + " " + transcript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  }

  const startVoice = () => {
    if (!recognition) {
      alert("Voice not supported in this browser");
      return;
    }

    setIsRecording(true);
    recognition.start();
  };

  const stopVoice = () => {
    recognition.stop();
    setIsRecording(false);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("File selected:", file);
    // Send file to backend here
  };

  return (
    <div className="p-2 sm:p-3 border-t bg-white">
      <div className="
        flex items-center gap-2
        border rounded-xl
        px-2 py-1
        focus-within:ring-2 focus-within:ring-blue-400
        transition
      ">

        {/* Attach Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="
            p-2 rounded-lg
            hover:bg-gray-100
            transition
          "
        >
          <Paperclip size={20} />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileAttach}
          className="hidden"
        />

        {/* Input */}
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          placeholder="Ask anything..."
          className="
            flex-1
            outline-none
            px-2 py-2
            text-sm sm:text-base
          "
        />

        {/* Voice Button */}
        <button
          onClick={isRecording ? stopVoice : startVoice}
          className={`
            p-2 rounded-lg transition
            ${
              isRecording
                ? "bg-red-500 text-white animate-pulse"
                : "hover:bg-gray-100"
            }
          `}
        >
          {isRecording ? (
            <Square size={20} />
          ) : (
            <Mic size={20} />
          )}
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          className={`
            flex items-center gap-1
            px-4 py-2 rounded-lg
            text-white font-medium
            bg-gradient-to-r ${currentTutor.gradient}
            hover:opacity-90
            transition
          `}
        >
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>

      </div>
    </div>
  );
}
