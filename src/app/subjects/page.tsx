'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

// Mock data for AI tutors
const AI_TUTORS = [
  {
    id: 'math',
    name: 'Dr. Sarah Mitchell',
    subject: 'Mathematics • Algebra & Calculus',
    avatar: '/mnt/user-data/uploads/453114.jpg',
    online: true,
    description: 'Expert in mathematical concepts and problem-solving techniques',
    rating: 4.9
  },
  {
    id: 'science',
    name: 'Prof. Emma Rodriguez',
    subject: 'Physics • Mechanics & Waves',
    avatar: '/mnt/user-data/uploads/511496.jpg',
    online: true,
    description: 'Specialist in physics principles and experimental methods',
    rating: 4.8
  },
  {
    id: 'computer_science',
    name: 'Dr. Jessica Taylor',
    subject: 'Computer Science • Python & Algorithms',
    avatar: '/mnt/user-data/uploads/844414.jpg',
    online: true,
    description: 'Coding expert with focus on programming fundamentals',
    rating: 4.9
  },
  {
    id: 'english',
    name: 'Ms. Olivia Johnson',
    subject: 'English Literature • Shakespeare & Modern Fiction',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Literature specialist with deep knowledge of classic and contemporary works',
    rating: 4.7
  },
  {
    id: 'history',
    name: 'Prof. Michael Chen',
    subject: 'World History • Ancient Civilizations & Modern Era',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Historian with expertise in global historical events',
    rating: 4.8
  },
  {
    id: 'geography',
    name: 'Dr. Amelia Foster',
    subject: 'Geography • Physical & Human Geography',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Geographer specializing in environmental and cultural studies',
    rating: 4.6
  },
  {
    id: 'french',
    name: 'Madame Sophie Dubois',
    subject: 'French Language • Literature & Grammar Mastery',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Native speaker with expertise in French culture and linguistics',
    rating: 4.9
  },
  {
    id: 'german',
    name: 'Herr Klaus Weber',
    subject: 'German Language • Classical & Contemporary Studies',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Language expert focusing on grammar and cultural context',
    rating: 4.7
  },
  {
    id: 'spanish',
    name: 'Prof. Carmen Rodriguez',
    subject: 'Spanish Language • Hispanic Culture & Linguistics',
    avatar: '/mnt/user-data/uploads/default-avatar.jpg',
    online: true,
    description: 'Native speaker with passion for Hispanic literature and culture',
    rating: 4.8
  },
];

export default function SubjectsPage() {
  const [userName, setUserName] = useState<string>('Student');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTutors, setFilteredTutors] = useState(AI_TUTORS);
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/auth/login');
      } else {
        // Extract user info from Clerk user object
        const name = user.firstName || user.fullName || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'Student';
        setUserName(name);
      }
    }
  }, [user, isLoaded, router]);

  useEffect(() => {
    // Filter tutors based on search term
    if (searchTerm) {
      const filtered = AI_TUTORS.filter(tutor => 
        tutor.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTutors(filtered);
    } else {
      setFilteredTutors(AI_TUTORS);
    }
  }, [searchTerm]);

  const handleTutorClick = (tutorId: string) => {
    // Navigate to the tutor page
    router.push(`/tutor/${tutorId}`);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {userName}! 👋</h1>
              <p className="text-indigo-100 mt-1">Choose a subject to start learning</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subjects..."
                  className="w-full md:w-64 px-4 py-2 rounded-lg bg-white/20 placeholder-indigo-200 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg 
                  className="absolute right-3 top-2.5 h-5 w-5 text-indigo-200" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 mb-8">

  {/* Card 1 */}
  <div className="min-w-[260px] flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-2xl font-bold text-gray-900">12</h3>
        <p className="text-gray-600">Lessons Completed</p>
      </div>
    </div>
  </div>

  {/* Card 2 */}
  <div className="min-w-[260px] flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-green-100 text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-2xl font-bold text-gray-900">8.5h</h3>
        <p className="text-gray-600">Study Time</p>
      </div>
    </div>
  </div>

  {/* Card 3 */}
  <div className="min-w-[260px] flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-2xl font-bold text-gray-900">92%</h3>
        <p className="text-gray-600">Avg. Score</p>
      </div>
    </div>
  </div>

  {/* Card 4 */}
  <div className="min-w-[260px] flex-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
    <div className="flex items-center">
      <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="ml-4">
        <h3 className="text-2xl font-bold text-gray-900">7</h3>
        <p className="text-gray-600">Day Streak</p>
      </div>
    </div>
  </div>

</div>


        {/* Subject Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {['Math', 'Science', 'Computer Science', 'English', 'History', 'Geography', 'French', 'German', 'Spanish'].map((subject, index) => (
              <button
                key={index}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                  <span className="text-indigo-600 font-bold">{subject.charAt(0)}</span>
                </div>
                <span className="text-gray-700 text-sm font-medium">{subject}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tutor List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your AI Tutors</h2>
            <div className="text-sm text-gray-600">
              Showing {filteredTutors.length} of {AI_TUTORS.length} tutors
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleTutorClick(tutor.id)}
              >
                <div className="p-6">
                  <div className="flex items-start">
                    <div className="relative">
                      <img
                        src={tutor.avatar}
                        alt={tutor.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow"
                        onError={(e) => {
                          // Fallback to a default avatar if the image fails to load
                          e.currentTarget.src = 'https://placehold.co/64x64?text=' + tutor.name.charAt(0);
                        }}
                      />
                      <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${tutor.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-900">{tutor.name}</h3>
                        <div className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {tutor.rating}
                        </div>
                      </div>
                      <p className="text-indigo-600 font-medium">{tutor.subject}</p>
                      <p className="text-gray-600 text-sm mt-1">{tutor.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full ${tutor.online ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {tutor.online ? 'Online Now' : 'Offline'}
                    </span>
                    <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-300">
                      Start Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}