'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoaded, router]);

  const studentProgress = {
    name:
      user?.fullName ||
      user?.emailAddresses[0]?.emailAddress?.split('@')[0] ||
      'Student',
    yearGroup: 7,
    subjects: [
      { name: "Mathematics", progress: 75, weakTopics: ["Fractions", "Algebra"], score: 85 },
      { name: "Science", progress: 82, weakTopics: ["Photosynthesis"], score: 90 },
      { name: "English", progress: 68, weakTopics: ["Comprehension", "Grammar"], score: 75 },
      { name: "History", progress: 78, weakTopics: ["World War II"], score: 80 },
      { name: "Geography", progress: 85, weakTopics: ["Climate Patterns"], score: 88 },
    ],
    weeklyStats: [
      { day: "Mon", hours: 2 },
      { day: "Tue", hours: 1.5 },
      { day: "Wed", hours: 3 },
      { day: "Thu", hours: 2.5 },
      { day: "Fri", hours: 1 },
      { day: "Sat", hours: 4 },
      { day: "Sun", hours: 2 },
    ],
    achievements: [
      { title: "Math Master", description: "Completed 10 algebra lessons", icon: "🏆", earned: true },
      { title: "Quick Learner", description: "Perfect quiz scores", icon: "⚡", earned: true },
      { title: "Consistent Scholar", description: "7-day streak", icon: "🎯", earned: false },
      { title: "Science Explorer", description: "5 experiments done", icon: "🔬", earned: true },
    ]
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Welcome back, {studentProgress.name}!
              </h1>
              <p className="opacity-90 text-sm sm:text-base">
                Continue your learning journey
              </p>
            </div>

            <Link
              href="/subjects"
              className="inline-block bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Start Learning
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          {[
            { title: "Lessons Completed", value: "12" },
            { title: "Study Time", value: "8.5h" },
            { title: "Avg. Score", value: "92%" },
            { title: "Day Streak", value: "7" }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
              <p className="text-gray-600">{card.title}</p>
            </div>
          ))}

        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-6 overflow-x-auto">
            {['overview', 'progress', 'achievements', 'schedule'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-3 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Subject Progress */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Subject Progress</h2>

              {studentProgress.subjects.map((subject, i) => (
                <div key={i} className="mb-4">
                  <div className="flex justify-between text-sm">
                    <span>{subject.name}</span>
                    <span>{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                    <div
                      className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Weekly Activity</h2>

              <div className="h-52 sm:h-64 flex items-end space-x-1 sm:space-x-2">
                {studentProgress.weeklyStats.map((day, i) => (
                  <div key={i} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg"
                      style={{ height: `${day.hours * 15}px` }}
                    />
                    <span className="text-xs mt-1">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === 'progress' && (
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <table className="min-w-[600px] w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Subject</th>
                  <th className="text-left">Progress</th>
                  <th className="text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {studentProgress.subjects.map((subject, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{subject.name}</td>
                    <td>{subject.progress}%</td>
                    <td>{subject.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ACHIEVEMENTS */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {studentProgress.achievements.map((a, i) => (
              <div
                key={i}
                className={`p-5 rounded-xl border ${
                  a.earned
                    ? 'bg-yellow-50 border-yellow-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-3xl">{a.icon}</div>
                <h3 className="font-bold mt-2">{a.title}</h3>
                <p className="text-sm text-gray-600">{a.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <table className="min-w-[700px] w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Time</th>
                  {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((d) => (
                    <th key={d}>{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['09:00','10:00','11:00','12:00'].map((time, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{time}</td>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="text-center">
                        {i === 1 && j < 5 && (
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                            Math
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
