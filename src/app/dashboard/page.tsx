'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { motion } from "framer-motion";

interface SessionStats {
  session_id: string;
  tutor_type: string;
  topic: string | null;
  total_messages: number;
  correct_answers: number;
  incorrect_answers: number;
  difficulty_level: string;
  started_at: string;
  last_activity_at: string;
}

interface DashboardData {
  student_id: string;
  summary: {
    total_sessions: number;
    total_messages: number;
    total_correct_answers: number;
    total_incorrect_answers: number;
    accuracy_rate: number;
  };
  by_tutor_type: {
    maths: { sessions: number; messages: number };
    science: { sessions: number; messages: number };
    homework: { sessions: number; messages: number };
  };
  recent_sessions: Array<{
    session_id: string;
    tutor_type: string;
    topic: string | null;
    last_activity: string;
    difficulty: string;
  }>;
}

interface DailySummary {
  student_id: string;
  date: string;
  streak: {
    days: number;
    xp_bonus: number;
  };
  xp: {
    total: number;
    today: number;
  };
  missions: {
    total: number;
    completed: number;
    progress_percent: number;
  };
  motivational_message: string;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [recentSessions, setRecentSessions] = useState<SessionStats[]>([]);
  const [dailySummary, setDailySummary] = useState<DailySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        const dashboardResponse = await fetch(
          `http://localhost:8000/api/chat/dashboard/${user.id}`
        );
        if (dashboardResponse.ok) {
          const data = await dashboardResponse.json();
          setDashboardData(data);
        }

        const sessionsResponse = await fetch(
          `http://localhost:8000/api/chat/sessions/${user.id}`
        );
        if (sessionsResponse.ok) {
          const sessions = await sessionsResponse.json();
          setRecentSessions(sessions);
        }

        const dailyResponse = await fetch(
          `http://localhost:8000/api/daily/summary/${user.id}`
        );
        if (dailyResponse.ok) {
          const summary = await dailyResponse.json();
          setDailySummary(summary);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const studentName =
    user.fullName ||
    user.emailAddresses[0]?.emailAddress.split('@')[0] ||
    'Student';

  const totalSessions = dashboardData?.summary.total_sessions || recentSessions.length;
  const totalMessages = dashboardData?.summary.total_messages || 0;
  const accuracyRate = dashboardData?.summary.accuracy_rate || 0;

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= HEADER ================= */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {studentName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base sm:text-xl font-semibold text-gray-900 truncate">
                  Hi, {studentName} 👋
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">
                  Let's keep building your maths confidence.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 flex-wrap">

              <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 flex-shrink-0">
                <span>🔥</span>
                <span>{dailySummary?.streak.days || Math.ceil(totalSessions / 2)} days</span>
              </div>

              <div className="flex-1 sm:w-44 min-w-[120px]">
                <div className="flex items-center justify-between sm:block">
                  <p className="text-xs text-gray-500 mb-1 hidden sm:block">XP Progress</p>
                  <p className="text-xs font-semibold text-blue-600 sm:hidden">{dailySummary?.xp.total || totalMessages} XP</p>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((dailySummary?.xp.total || totalMessages) / 200 * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right sm:text-left">
                  {dailySummary?.xp.total || totalMessages} XP
                </p>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">

        {/* ===== TOP SECTION ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* AI RECOMMENDED */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border p-4 sm:p-6">

            <p className="text-xs sm:text-sm text-blue-600 font-medium mb-2">
              AI Recommended
            </p>

            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 line-clamp-2">
              Y7 Maths – Fractions: Common Denominators
            </h2>

            <div className="flex flex-col md:flex-row md:items-center gap-6 sm:gap-8">

              {/* Progress Circle */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] border-blue-100"></div>
                <div className="absolute inset-0 rounded-full border-[8px] sm:border-[10px] border-blue-600 border-t-transparent rotate-45"></div>
                <span className="text-lg sm:text-xl font-bold text-blue-600">{accuracyRate.toFixed(0)}%</span>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2 sm:space-y-3 text-center md:text-left">

                {dashboardData ? (
                  <>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Total Sessions: <span className="font-semibold">{dashboardData.summary.total_sessions}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Accuracy Rate: <span className="font-semibold">{dashboardData.summary.accuracy_rate}%</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Total Messages: <span className="font-semibold">{dashboardData.summary.total_messages}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Last Activity: {recentSessions.length > 0 ? 'Recent session available' : 'No recent activity'}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      Time Needed: ~18 minutes
                    </p>
                  </>
                )}

                <div className="flex gap-2 sm:gap-3 pt-2 flex-wrap justify-center md:justify-start">
                  <Link
                    href="/tutor?type=maths"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md flex-1 sm:flex-none text-center"
                  >
                    Resume Lesson
                  </Link>

                  <button className="border border-gray-300 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition flex-1 sm:flex-none">
                    Practice First
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* TODAY MISSIONS */}
          <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
              Today's Missions
            </h3>

            {dailySummary ? (
              <>
                <p className="text-xs sm:text-sm text-blue-600 font-medium mb-3 sm:mb-4 line-clamp-2">
                  {dailySummary.motivational_message}
                </p>

                <div className="mb-3 sm:mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{dailySummary.missions.completed}/{dailySummary.missions.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${dailySummary.missions.progress_percent}%` }}
                    />
                  </div>
                </div>

                {dailySummary.streak.days >= 3 && (
                  <div className="bg-orange-50 p-2.5 sm:p-3 rounded-xl mb-3 sm:mb-4 border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-xs sm:text-sm text-orange-800">
                          🔥 Streak Bonus!
                        </p>
                        <p className="text-xs text-orange-600">
                          {dailySummary.streak.days} day streak
                        </p>
                      </div>
                      <span className="text-base sm:text-lg font-bold text-orange-600">
                        +{dailySummary.streak.xp_bonus} XP
                      </span>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="bg-yellow-50 p-3 sm:p-4 rounded-xl mb-3">
                  <p className="font-medium text-xs sm:text-sm mb-1">
                    Fix a Weak Spot
                  </p>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    Equivalent fractions – 5 quick questions
                  </p>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div
                      className="bg-yellow-500 h-full rounded-full"
                      style={{ width: '40%' }}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-3 sm:p-4 rounded-xl mb-3">
                  <p className="font-medium text-xs sm:text-sm mb-1">
                    Spaced Review Quiz
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Quick recall from last week
                  </p>
                </div>

                <div className="bg-green-50 p-3 sm:p-4 rounded-xl">
                  <p className="font-medium text-xs sm:text-sm mb-1">
                    Confidence Boost
                  </p>
                  <p className="text-xs text-gray-600 line-clamp-2">
                    Algebra: basic factoring
                  </p>
                </div>
              </>
            )}

            <Link
              href="/tutor?type=maths"
              className="mt-3 sm:mt-4 block w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center px-4 py-2.5 sm:py-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
            >
              Start Learning →
            </Link>
          </div>

        </div>

        {/* ===== WEEK PROGRESS ===== */}
        <div className="mt-6 sm:mt-8">
          <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">

            <h3 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
              This Week's Progress
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">

              <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-xl">
                <p className="text-xl sm:text-2xl font-bold text-blue-600">
                  {dashboardData ? `+${dashboardData.summary.total_sessions}` : '0'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Sessions
                </p>
              </div>

              <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl">
                <p className="text-xl sm:text-2xl font-bold text-green-600">
                  {dashboardData?.summary.total_correct_answers || 0}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Correct
                </p>
              </div>

              <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-xl">
                <p className="text-xl sm:text-2xl font-bold text-orange-600">
                  {accuracyRate > 0 ? `${accuracyRate}%` : '0%'}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Accuracy
                </p>
              </div>

              <div className="text-center p-3 sm:p-4 bg-purple-50 rounded-xl">
                <p className="text-xl sm:text-2xl font-bold text-purple-600">
                  {totalMessages}
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Messages
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ===== RECENT SESSIONS ===== */}
        {recentSessions.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">
              <h3 className="font-semibold text-gray-900 mb-4 sm:mb-6 text-sm sm:text-base">
                Recent Tutoring Sessions
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Tutor</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Topic</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Messages</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Accuracy</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Last Activity</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSessions.slice(0, 5).map((session) => {
                      const accuracy = session.total_messages > 0
                        ? Math.round((session.correct_answers / (session.correct_answers + session.incorrect_answers)) * 100) || 0
                        : 0;

                      return (
                        <tr key={session.session_id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold
                              ${session.tutor_type === 'maths' ? 'bg-blue-100 text-blue-700' : ''}
                              ${session.tutor_type === 'science' ? 'bg-green-100 text-green-700' : ''}
                              ${session.tutor_type === 'homework' ? 'bg-purple-100 text-purple-700' : ''}
                            `}>
                              <span className="text-xs sm:text-sm">{session.tutor_type === 'maths' ? '📐' : session.tutor_type === 'science' ? '🔬' : '📚'}</span>
                              <span className="ml-1 capitalize hidden sm:inline">{session.tutor_type}</span>
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap max-w-[150px] sm:max-w-none truncate">
                            {session.topic || 'General Practice'}
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-700 whitespace-nowrap">
                            {session.total_messages}
                          </td>
                          <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                            <span className={`text-xs sm:text-sm font-semibold ${accuracy >= 80 ? 'text-green-600' : accuracy >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {accuracy}%
                            </span>
                          </td>
                          <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                            {new Date(session.last_activity_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                            <Link
                              href={`/tutor?type=${session.tutor_type}`}
                              className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium"
                            >
                              Continue →
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===== PICK YOUR TUTOR ===== */}
        <div className="text-center mt-8 sm:mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 sm:mb-10 px-4">
            Pick Your Tutor
          </h2>

          <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 flex-wrap px-4">

            {/* ===== Maths Tutor ===== */}
            <Link href="/tutor?type=maths" className="flex flex-col items-center group">
              <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64 rounded-2xl sm:rounded-[30px] overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Maths Tutor"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">
                Maths
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {dashboardData?.by_tutor_type.maths.sessions || 0} sessions
              </p>
            </Link>

            {/* ===== Science Tutor ===== */}
            <Link href="/tutor?type=science" className="flex flex-col items-center group">
              <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64 rounded-2xl sm:rounded-[30px] overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Science Tutor"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">
                Science
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {dashboardData?.by_tutor_type.science.sessions || 0} sessions
              </p>
            </Link>

            {/* ===== Homework Tutor ===== */}
            <Link href="/tutor?type=homework" className="flex flex-col items-center group">
              <div className="w-32 h-48 sm:w-40 sm:h-56 md:w-48 md:h-64 rounded-2xl sm:rounded-[30px] overflow-hidden shadow-md group-hover:scale-105 transition duration-300">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Homework Tutor"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-base sm:text-lg font-semibold text-gray-800">
                Homework
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {dashboardData?.by_tutor_type.homework.sessions || 0} sessions
              </p>
            </Link>

          </div>
        </div>

      </main>
    </div>
  );
}
