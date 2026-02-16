'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';

// Mock tutor data based on subject
const TUTOR_DATA: Record<string, { name: string; subject: string; avatar: string; color: string }> = {
  math: {
    name: 'Dr. Emma Wilson',
    subject: 'Mathematics',
    avatar: '👩‍🏫',
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500'
  },
  science: {
    name: 'Prof. James Chen',
    subject: 'Science',
    avatar: '👨‍🔬',
    color: 'bg-gradient-to-r from-blue-400 to-cyan-500'
  },
  english: {
    name: 'Ms. Sarah Lee',
    subject: 'English',
    avatar: '👩‍💼',
    color: 'bg-gradient-to-r from-green-400 to-emerald-500'
  },
  history: {
    name: 'Dr. Robert Davis',
    subject: 'History',
    avatar: '👨‍🏫',
    color: 'bg-gradient-to-r from-amber-400 to-yellow-500'
  },
  geography: {
    name: 'Prof. Maria Garcia',
    subject: 'Geography',
    avatar: '👩‍🏫',
    color: 'bg-gradient-to-r from-teal-400 to-cyan-500'
  },
  french: {
    name: 'Madame Sophie Dubois',
    subject: 'French',
    avatar: '👩‍🏫',
    color: 'bg-gradient-to-r from-red-400 to-pink-500'
  },
  german: {
    name: 'Herr Klaus Weber',
    subject: 'German',
    avatar: '👨‍🏫',
    color: 'bg-gradient-to-r from-orange-400 to-amber-500'
  },
  spanish: {
    name: 'Prof. Carmen Rodriguez',
    subject: 'Spanish',
    avatar: '👩‍🏫',
    color: 'bg-gradient-to-r from-pink-400 to-rose-500'
  }
};

export default function VoiceCallPage() {
  const params = useParams();
  const subjectId = params.subjectId as string;
  const [callTime, setCallTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([]);
  const [tutorInfo, setTutorInfo] = useState(TUTOR_DATA[subjectId] || TUTOR_DATA.math);

  // Timer for call duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCallTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate transcript updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // Randomly add transcript lines
        const newLines = [
          "So when you're solving for x in this equation, remember to isolate the variable on one side first...",
          "The key concept here is that energy cannot be created or destroyed, only transformed from one form to another.",
          "For this historical event, we need to consider the economic and political factors that led to it.",
          "Let's break down this grammar rule step by step so you can understand how to apply it."
        ];
        setTranscript(prev => [...prev.slice(-4), newLines[Math.floor(Math.random() * newLines.length)]]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    // In a real app, this would end the call
    console.log('Ending call');
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full w-40 h-40 flex items-center justify-center mb-6 shadow-2xl">
            <span className="text-7xl text-white">{tutorInfo.avatar}</span>
          </div>
          <h1 className="text-3xl font-bold">{tutorInfo.name}</h1>
          <p className="text-gray-700 text-lg mt-2">{tutorInfo.subject} Tutor</p>
          <p className="text-gray-600 mt-4">Connected • {formatTime(callTime)}</p>
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
            <div className="text-center mb-4">
              <h2 className="text-lg font-semibold">Live Transcription</h2>
            </div>
            <div className="bg-gray-100 rounded-xl p-4 h-40 overflow-y-auto border border-gray-300">
              {transcript.length > 0 ? (
                transcript.map((line, index) => (
                  <p key={index} className="text-sm mb-2 last:mb-0 text-gray-700">{line}</p>
                ))
              ) : (
                <p className="text-center text-gray-500">Transcription will appear here...</p>
              )}
            </div>
          </div>

          <div className="flex justify-center space-x-1 mb-8">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 bg-gradient-to-t from-green-400 to-blue-500 rounded-full animate-wave"
                style={{
                  height: `${Math.floor(Math.random() * 30) + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-center space-x-8">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-5 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white backdrop-blur-sm shadow-lg`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              {isMuted ? (
                <>
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </>
              ) : (
                <>
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A4.98 4.98 0 0115 10a4.98 4.98 0 01-1.757 3.536 1 1 0 01-1.415-1.414A2.98 2.98 0 0013 10a2.98 2.98 0 00-1.029-2.122 1 1 0 010-1.414z" clipRule="evenodd" />
                </>
              )}
            </svg>
          </button>
          
          <button 
            onClick={handleEndCall}
            className="p-6 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-white backdrop-blur-sm shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>
          
          <button 
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`p-5 rounded-full ${isSpeakerOn ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'} text-white backdrop-blur-sm shadow-lg`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-wave {
          animation: wave 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}