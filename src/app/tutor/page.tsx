'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import ChatInput from '@/components/common/ChatInput'

interface Message {
  id: string
  sender: 'student' | 'teacher'
  text: string
  timestamp?: Date
  type?: 'text' | 'file' | 'voice'
  fileUrl?: string
  fileName?: string
  voiceDuration?: string
}

interface Topic {
  id: string
  name: string
  description: string
  lessons: string[]
}

interface ClassTopics {
  [key: string]: Topic[]
}

export default function TutorPage() {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const type = searchParams.get('type') || 'maths'
  const [sessionId, setSessionId] = useState<string>('')

  const tutorData: Record<
  string,
  {
    name: string
    color: string
    gradient: string
    icon: string
    bgColor: string
    image: string
    subject: string
    description: string
  }
> = {
  maths: {
    name: 'Prof. Mathew',
    color: 'text-blue-600',
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    icon: '📐',
    bgColor: 'bg-blue-50',
    image:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    subject: 'Mathematics',
    description: 'Algebra, Geometry, Calculus & Problem Solving',
  },
  science: {
    name: 'Dr. Science',
    color: 'text-emerald-600',
    gradient: 'from-emerald-500 via-green-500 to-teal-600',
    icon: '🔬',
    bgColor: 'bg-emerald-50',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    subject: 'Science',
    description: 'Physics, Chemistry & Biology Explained Clearly',
  },
  homework: {
    name: 'Teacher Alex',
    color: 'text-purple-600',
    gradient: 'from-purple-500 via-pink-500 to-rose-600',
    icon: '📚',
    bgColor: 'bg-purple-50',
    image:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    subject: 'Homework Help',
    description: 'Assignment Support & Exam Preparation',
  },
}

  const currentTutor = tutorData[type] || tutorData.maths

  const mathsTopics: ClassTopics = {
    '5': [
      { id: 'm1', name: 'Basic Addition & Subtraction', description: 'Learn to add and subtract numbers up to 1000', lessons: ['Column method', 'Mental maths', 'Word problems'] },
      { id: 'm2', name: 'Times Tables', description: 'Master multiplication tables from 2 to 12', lessons: ['2x table', '5x table', '10x table', 'Mixed practice'] },
      { id: 'm3', name: 'Fractions Basics', description: 'Introduction to fractions and simple operations', lessons: ['What are fractions?', 'Equivalent fractions', 'Simple addition'] },
      { id: 'm4', name: 'Place Value', description: 'Understanding ones, tens, hundreds, thousands', lessons: ['Reading numbers', 'Writing numbers', 'Comparing numbers'] },
      { id: 'm5', name: 'Simple Shapes', description: '2D and 3D shapes basics', lessons: ['Squares & rectangles', 'Triangles', 'Circles', '3D shapes'] },
    ],
    '6': [
      { id: 'm1', name: 'Long Division', description: 'Master division with remainders', lessons: ['Basic division', 'With remainders', 'Word problems'] },
      { id: 'm2', name: 'Decimals', description: 'Understanding and operating with decimals', lessons: ['Place value', 'Addition & subtraction', 'Multiplication'] },
      { id: 'm3', name: 'Geometry Basics', description: 'Shapes, angles, and area', lessons: ['2D shapes', 'Angles', 'Area calculation'] },
      { id: 'm4', name: 'Percentages', description: 'Introduction to percentages', lessons: ['What are percentages?', 'Simple percentages', 'Real-world problems'] },
      { id: 'm5', name: 'Negative Numbers', description: 'Understanding numbers below zero', lessons: ['Number line', 'Comparing', 'Simple operations'] },
    ],
    '7': [
      { id: 'm1', name: 'Algebraic Expressions', description: 'Introduction to algebra and variables', lessons: ['What is algebra?', 'Simplifying expressions', 'Substitution'] },
      { id: 'm2', name: 'Ratio and Proportion', description: 'Understanding ratios and proportional relationships', lessons: ['Basic ratios', 'Equivalent ratios', 'Real-world problems'] },
      { id: 'm3', name: 'Probability', description: 'Chance, likelihood, and basic probability', lessons: ['Probability scale', 'Calculating probability', 'Experimental vs theoretical'] },
      { id: 'm4', name: 'Coordinates & Graphs', description: 'Plotting points and reading graphs', lessons: ['Coordinate plane', 'Plotting points', 'Line graphs'] },
      { id: 'm5', name: 'Prime Numbers', description: 'Primes, factors, and multiples', lessons: ['Prime numbers', 'Factors', 'Multiples', 'Prime factorisation'] },
    ],
    '8': [
      { id: 'm1', name: 'Linear Equations', description: 'Solving equations with one variable', lessons: ['One-step equations', 'Two-step equations', 'Equations with brackets'] },
      { id: 'm2', name: 'Pythagoras Theorem', description: 'Right-angled triangles and Pythagoras', lessons: ['The theorem', 'Finding hypotenuse', 'Finding shorter sides'] },
      { id: 'm3', name: 'Statistics', description: 'Data handling and statistical analysis', lessons: ['Mean, median, mode', 'Range', 'Data representation'] },
      { id: 'm4', name: 'Sequences', description: 'Number patterns and sequences', lessons: ['Linear sequences', 'Finding nth term', 'Geometric sequences'] },
      { id: 'm5', name: 'Transformations', description: 'Translation, rotation, reflection', lessons: ['Reflection', 'Rotation', 'Translation', 'Enlargement'] },
    ],
    '9': [
      { id: 'm1', name: 'Quadratic Equations', description: 'Solving quadratics by factorising and formula', lessons: ['Factorising', 'Quadratic formula', 'Graphical solutions'] },
      { id: 'm2', name: 'Trigonometry', description: 'Sine, cosine, and tangent ratios', lessons: ['SOH CAH TOA', 'Finding sides', 'Finding angles'] },
      { id: 'm3', name: 'Circle Theorems', description: 'Properties of circles and angles', lessons: ['Circle parts', 'Angle properties', 'Tangent theorems'] },
      { id: 'm4', name: 'Vectors', description: 'Vector operations and applications', lessons: ['Vector basics', 'Addition & subtraction', 'Magnitude'] },
      { id: 'm5', name: 'Functions', description: 'Function notation and composite functions', lessons: ['What are functions?', 'f(x) notation', 'Composite functions'] },
    ],
  }

  const scienceTopics: ClassTopics = {
    '5': [
      { id: 's1', name: 'Plants and Growth', description: 'How plants grow and what they need', lessons: ['Plant parts', 'Photosynthesis intro', 'Life cycle'] },
      { id: 's2', name: 'States of Matter', description: 'Solid, liquid, and gas', lessons: ['Three states', 'Changing states', 'Examples'] },
      { id: 's3', name: 'Living Things', description: 'Characteristics of living organisms', lessons: ['MRS GREN', 'Animals vs plants', 'Habitats'] },
      { id: 's4', name: 'Light and Sound', description: 'Basics of light and sound energy', lessons: ['Light sources', 'Shadows', 'Sound vibrations'] },
      { id: 's5', name: 'Earth and Space', description: 'Our planet and the solar system', lessons: ['Day and night', 'Seasons', 'Planets'] },
    ],
    '6': [
      { id: 's1', name: 'Human Body Systems', description: 'Digestive, respiratory, and circulatory systems', lessons: ['Digestive system', 'Breathing', 'Blood circulation'] },
      { id: 's2', name: 'Electricity', description: 'Basic electrical circuits', lessons: ['Simple circuits', 'Conductors & insulators', 'Safety'] },
      { id: 's3', name: 'Materials & Changes', description: 'Physical and chemical changes', lessons: ['States of matter', 'Melting & boiling', 'Reactions'] },
      { id: 's4', name: 'Forces & Magnets', description: 'Introduction to forces and magnetism', lessons: ['Push & pull', 'Magnetic materials', 'Poles'] },
      { id: 's5', name: 'Animals & Habitats', description: 'How animals adapt to their environment', lessons: ['Food chains', 'Adaptations', 'Conservation'] },
    ],
    '7': [
      { id: 's1', name: 'Cell Biology', description: 'Structure and function of cells', lessons: ['Animal cells', 'Plant cells', 'Specialised cells'] },
      { id: 's2', name: 'Chemical Reactions', description: 'Introduction to chemistry', lessons: ['Elements & compounds', 'Simple reactions', 'Word equations'] },
      { id: 's3', name: 'Energy Transfer', description: 'Forms of energy and transfers', lessons: ['Energy types', 'Energy chains', 'Conservation'] },
      { id: 's4', name: 'Reproduction', description: 'Human and plant reproduction', lessons: ['Human reproductive system', 'Plant pollination', 'Seed dispersal'] },
      { id: 's5', name: 'Acids & Alkalis', description: 'Introduction to acids and bases', lessons: ['pH scale', 'Indicators', 'Neutralisation'] },
    ],
    '8': [
      { id: 's1', name: 'Forces and Motion', description: 'Physics of forces, speed, and acceleration', lessons: ['Types of forces', 'Speed calculation', "Newton's laws"] },
      { id: 's2', name: 'Periodic Table', description: 'Elements and the periodic table', lessons: ['Structure', 'Groups & periods', 'Common elements'] },
      { id: 's3', name: 'Waves', description: 'Light and sound waves', lessons: ['Wave properties', 'Reflection', 'Refraction'] },
      { id: 's4', name: 'Ecology', description: 'Ecosystems and food webs', lessons: ['Producers & consumers', 'Food webs', 'Environmental impact'] },
      { id: 's5', name: 'Atomic Structure', description: 'Inside the atom', lessons: ['Subatomic particles', 'Electron configuration', 'Isotopes'] },
    ],
    '9': [
      { id: 's1', name: 'Genetics and Inheritance', description: 'DNA, genes, and heredity', lessons: ['DNA structure', 'Inheritance patterns', 'Genetic disorders'] },
      { id: 's2', name: 'Energy and Power', description: 'Energy transfers and power calculations', lessons: ['Energy forms', 'Conservation', 'Power calculations'] },
      { id: 's3', name: 'Organic Chemistry', description: 'Carbon compounds and hydrocarbons', lessons: ['Alkanes', 'Alkenes', 'Crude oil'] },
      { id: 's4', name: 'Human Physiology', description: 'Advanced body systems', lessons: ['Nervous system', 'Hormones', 'Homeostasis'] },
      { id: 's5', name: 'Chemical Bonding', description: 'Ionic, covalent, and metallic bonds', lessons: ['Ionic bonding', 'Covalent bonding', 'Metallic bonding'] },
    ],
  }

  const homeworkTopics: ClassTopics = {
    '5': [
      { id: 'h1', name: 'Study Skills Basics', description: 'How to study effectively', lessons: ['Creating a study space', 'Time management', 'Note-taking'] },
      { id: 'h2', name: 'Reading Comprehension', description: 'Understanding what you read', lessons: ['Finding main ideas', 'Making inferences', 'Vocabulary'] },
      { id: 'h3', name: 'Writing Skills', description: 'Improving your writing', lessons: ['Paragraph structure', 'Punctuation', 'Editing'] },
      { id: 'h4', name: 'Memory Techniques', description: 'How to remember what you learn', lessons: ['Mnemonics', 'Visualization', 'Practice testing'] },
      { id: 'h5', name: 'Research Skills', description: 'Finding and using information', lessons: ['Using libraries', 'Internet research', 'Fact-checking'] },
    ],
    '6': [
      { id: 'h1', name: 'Note-Taking Mastery', description: 'Advanced note-taking strategies', lessons: ['Cornell method', 'Mind mapping', 'Summary notes'] },
      { id: 'h2', name: 'Essay Writing', description: 'Structure and planning essays', lessons: ['Essay structure', 'Thesis statements', 'Supporting arguments'] },
      { id: 'h3', name: 'Exam Preparation', description: 'How to prepare for exams', lessons: ['Revision timetables', 'Practice papers', 'Exam technique'] },
      { id: 'h4', name: 'Critical Thinking', description: 'Analysing and evaluating information', lessons: ['Questioning sources', 'Logical reasoning', 'Problem-solving'] },
      { id: 'h5', name: 'Presentation Skills', description: 'Giving effective presentations', lessons: ['Planning', 'Visual aids', 'Public speaking'] },
    ],
    '7': [
      { id: 'h1', name: 'Advanced Study Planning', description: 'Managing multiple subjects', lessons: ['Priority setting', 'Long-term planning', 'Balance'] },
      { id: 'h2', name: 'Scientific Writing', description: 'Writing lab reports and scientific explanations', lessons: ['Method writing', 'Data presentation', 'Conclusions'] },
      { id: 'h3', name: 'Mathematical Problem Solving', description: 'Approaching complex problems', lessons: ['Breaking down problems', 'Checking work', 'Multiple methods'] },
      { id: 'h4', name: 'Digital Literacy', description: 'Using technology for learning', lessons: ['Online research', 'Digital tools', 'Cyber safety'] },
      { id: 'h5', name: 'Collaboration Skills', description: 'Working effectively in groups', lessons: ['Team roles', 'Communication', 'Conflict resolution'] },
    ],
    '8': [
      { id: 'h1', name: 'GCSE Preparation', description: 'Getting ready for GCSEs', lessons: ['Understanding GCSEs', 'Grade boundaries', 'Revision strategies'] },
      { id: 'h2', name: 'Extended Writing', description: 'Long-form essays and reports', lessons: ['Structure', 'Evidence', 'Analysis'] },
      { id: 'h3', name: 'Data Analysis', description: 'Interpreting graphs and statistics', lessons: ['Reading graphs', 'Calculating statistics', 'Drawing conclusions'] },
      { id: 'h4', name: 'Independent Learning', description: 'Self-directed study skills', lessons: ['Goal setting', 'Self-motivation', 'Reflection'] },
      { id: 'h5', name: 'Stress Management', description: 'Managing study stress', lessons: ['Recognising stress', 'Coping strategies', 'Work-life balance'] },
    ],
    '9': [
      { id: 'h1', name: 'GCSE Exam Technique', description: 'Maximising marks in exams', lessons: ['Time management', 'Question analysis', 'Mark schemes'] },
      { id: 'h2', name: 'Coursework Excellence', description: 'Producing high-quality coursework', lessons: ['Planning', 'Research', 'Presentation'] },
      { id: 'h3', name: 'University & Career Prep', description: 'Planning your future', lessons: ['Options research', 'Entry requirements', 'Personal statements'] },
      { id: 'h4', name: 'Advanced Research', description: 'In-depth research projects', lessons: ['Research methods', 'Referencing', 'Academic integrity'] },
      { id: 'h5', name: 'Leadership Skills', description: 'Developing leadership abilities', lessons: ['Leadership styles', 'Decision making', 'Mentoring'] },
    ],
  }

  const getTopicsForTutor = (): ClassTopics => {
    if (type === 'maths') return mathsTopics
    if (type === 'science') return scienceTopics
    if (type === 'homework') return homeworkTopics
    return mathsTopics
  }

  const topicsForTutor = getTopicsForTutor()

  const [boardText, setBoardText] = useState('')
  const [question, setQuestion] = useState('')
  const [chat, setChat] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [lessonTopic, setLessonTopic] = useState('')
  const [lessonDescription, setLessonDescription] = useState('')
  const [studentName, setStudentName] = useState('')
  const [showClassModal, setShowClassModal] = useState(true)
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [teachingMode, setTeachingMode] = useState<'explaining' | 'questioning' | 'practicing'>('explaining')
  const [studentUnderstanding, setStudentUnderstanding] = useState<'confused' | 'okay' | 'confident'>('okay')
  const [currentLessonSection, setCurrentLessonSection] = useState(0)
  const [isSectionComplete, setIsSectionComplete] = useState(false)
  const [lessonSections, setLessonSections] = useState<string[]>([])

  const teachingSteps = [
    { id: 1, name: 'Intro', icon: '🎬' },
    { id: 2, name: 'Teach', icon: '📖' },
    { id: 3, name: 'Example', icon: '💡' },
    { id: 4, name: 'Practice', icon: '✏️' },
    { id: 5, name: 'Check', icon: '✅' },
  ]

  useEffect(() => {
    if (user) {
      setStudentName(user.fullName || user.emailAddresses[0]?.emailAddress.split('@')[0] || 'Student')
    }
  }, [user])

  useEffect(() => {
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        console.log('Voices loaded:', window.speechSynthesis.getVoices().length)
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  useEffect(() => {
    if (isSpeaking) {
      const mouthInterval = setInterval(() => {
        setBoardText(prev => prev + ' ')
      }, 200)
      return () => clearInterval(mouthInterval)
    }
  }, [isSpeaking])

  const startLesson = (topic: Topic) => {
    setSessionId(`session_${Date.now()}`)
    setLessonTopic(topic.name)
    setLessonDescription(topic.description)
    setSelectedTopic(topic)
    setShowClassModal(false)
    setCurrentStep(1)
    setTeachingMode('explaining')

    const welcomeMessage: Message = {
      id: 'welcome',
      sender: 'teacher',
      text: `Hello ${studentName}! 👋\n\nI'm **${currentTutor.name}**, and I'm excited to teach you **${topic.name}** today!\n\n${topic.description}\n\nLet's begin our learning journey! 🚀`,
      type: 'text',
    }

    const boardIntro = `${type.toUpperCase()} • Year ${selectedClass}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📌 ${topic.name}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${topic.description}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🎯 What we'll learn:\n${topic.lessons.map((l, i) => `${i+1}. ${l}`).join('\n')}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n🎬 Step 1: Introduction\n\nLet's get started!`

    setChat([welcomeMessage])
    setBoardText(boardIntro)
    
    setTimeout(() => {
      autoTeachTopic(topic)
    }, 2000)
  }

  const autoTeachTopic = (topic: Topic) => {
    setCurrentStep(2)
    setTeachingMode('explaining')
    
    const sections = topic.lessons.map((lesson, index) => `Section ${index + 1}: ${lesson}`)
    setLessonSections(sections)
    setCurrentLessonSection(0)
    
    teachSection(topic, 0)
  }

  const teachSection = (topic: Topic, sectionIndex: number) => {
    if (sectionIndex >= topic.lessons.length) {
      setTimeout(() => {
        showWorkedExample(topic)
      }, 2000)
      return
    }

    setCurrentLessonSection(sectionIndex)
    setIsSectionComplete(false)
    setTeachingMode('explaining')

    const sectionName = topic.lessons[sectionIndex]
    const sectionContent = getSectionContent(topic, sectionName)

    const boardContent = `${type.toUpperCase()} • Year ${selectedClass}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📖 Section ${sectionIndex + 1}/${topic.lessons.length}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${sectionName}\n\n${sectionContent.board}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 "Take your time to understand this."\n💡 "Ask me if you're confused!"`

    const teachingMessage: Message = {
      id: `section_${sectionIndex}_${Date.now()}`,
      sender: 'teacher',
      text: `Great! Let's start with **Section ${sectionIndex + 1}**: ${sectionName}\n\n${sectionContent.text}\n\nTake your time to read the board and understand this section. \n\nWhen you're ready, type **"got it"** or ask me a question! 😊`,
      type: 'text',
    }

    setChat(prev => [...prev, teachingMessage])
    setBoardText(boardContent)
    speakText(teachingMessage.text)
  }

  const moveToNextSection = (topic: Topic) => {
    const nextSection = currentLessonSection + 1
    
    if (nextSection >= topic.lessons.length) {
      setIsSectionComplete(true)
      const completionMessage: Message = {
        id: `sections_complete_${Date.now()}`,
        sender: 'teacher',
        text: `🎉 Excellent! You've completed all sections!\n\nNow let's look at a **worked example** to see how everything fits together...`,
        type: 'text',
      }
      setChat(prev => [...prev, completionMessage])
      speakText(completionMessage.text)
      setTimeout(() => {
        showWorkedExample(topic)
      }, 3000)
    } else {
      const nextSectionName = topic.lessons[nextSection]
      const sectionContent = getSectionContent(topic, nextSectionName)

      const boardContent = `${type.toUpperCase()} • Year ${selectedClass}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n📖 Section ${nextSection + 1}/${topic.lessons.length}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n${nextSectionName}\n\n${sectionContent.board}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💬 "Let's continue!"\n✅ "You're doing great!"`

      const nextMessage: Message = {
        id: `section_${nextSection}_${Date.now()}`,
        sender: 'teacher',
        text: `Perfect! Now let's move to **Section ${nextSection + 1}**: ${nextSectionName}\n\n${sectionContent.text}\n\nRead the board carefully. Let me know when you understand! 😊`,
        type: 'text',
      }

      setChat(prev => [...prev, nextMessage])
      setBoardText(boardContent)
      setCurrentLessonSection(nextSection)
      speakText(nextMessage.text)
    }
  }

  const getSectionContent = (topic: Topic, sectionName: string): { text: string; board: string } => {
    const content: Record<string, { text: string; board: string }> = {
      'One-step equations': {
        text: `**One-step equations** need just ONE operation to solve.\n\n**Example:** x + 5 = 12\n\nTo solve: Subtract 5 from both sides\nx = 12 - 5\nx = 7\n\n**Remember:** Do the opposite operation!`,
        board: `One-Step Equations\n\nx + 5 = 12\n\nSubtract 5:\nx = 12 - 5\nx = 7 ✓\n\nOpposite operation!`,
      },
      'Two-step equations': {
        text: `**Two-step equations** need TWO operations.\n\n**Example:** 2x + 3 = 11\n\nStep 1: Subtract 3\n2x = 8\n\nStep 2: Divide by 2\nx = 4\n\n**Order matters!** Undo addition/subtraction first, then multiplication/division.`,
        board: `Two-Step Equations\n\n2x + 3 = 11\n\nStep 1: -3\n2x = 8\n\nStep 2: ÷2\nx = 4 ✓\n\nOrder matters!`,
      },
      'Plant parts': {
        text: `**Plants have 4 main parts:**\n\n1. **Roots** - absorb water and nutrients\n2. **Stem** - supports the plant\n3. **Leaves** - make food (photosynthesis)\n4. **Flower** - makes seeds\n\nEach part has a special job!`,
        board: `Plant Parts\n\n1. Roots → Water\n2. Stem → Support\n3. Leaves → Food\n4. Flower → Seeds\n\nEach has a job!`,
      },
      'Photosynthesis intro': {
        text: `**Photosynthesis** is how plants make food!\n\n**What plants need:**\n☀️ Sunlight\n💧 Water\n💨 Carbon dioxide\n\n**What plants make:**\n🍃 Glucose (food)\n💨 Oxygen\n\n**Equation:** CO₂ + H₂O + light → Glucose + O₂`,
        board: `Photosynthesis\n\nNeeds:\n☀️ Light\n💧 Water\n💨 CO₂\n\nMakes:\n🍃 Glucose\n💨 Oxygen`,
      },
      'Animal cells': {
        text: `**Animal cells have 4 main parts:**\n\n1. **Nucleus** - controls the cell (like a brain)\n2. **Cytoplasm** - jelly where reactions happen\n3. **Cell membrane** - controls what enters/leaves\n4. **Mitochondria** - releases energy\n\nEach part is essential!`,
        board: `Animal Cell\n\n1. Nucleus → Control\n2. Cytoplasm → Reactions\n3. Membrane → Gatekeeper\n4. Mitochondria → Energy`,
      },
    }

    if (content[sectionName]) {
      return content[sectionName]
    }

    return {
      text: `Let's learn about **${sectionName}**.\n\nThis is an important part of understanding **${topic.name}**.\n\nLook at the board for the key points.\n\nTake notes if you need to!`,
      board: `${sectionName}\n\nKey Points:\n\n• Point 1\n• Point 2\n• Point 3\n\nExample:\n\n\n\nRemember this!`,
    }
  }

  const showWorkedExample = (topic: Topic) => {
    setCurrentStep(3)
    setTeachingMode('explaining')

    const example = getWorkedExample(topic)
    const exampleMessage: Message = {
      id: `example_${Date.now()}`,
      sender: 'teacher',
      text: `Now let's look at a **worked example**:\n\n${example.text}`,
      type: 'text',
    }

    setChat(prev => [...prev, exampleMessage])
    setBoardText(example.board)
    speakText(example.text)

    setTimeout(() => {
      givePracticeQuestion(topic)
    }, 8000)
  }

  const getWorkedExample = (topic: Topic): { text: string; board: string } => {
    const examples: Record<string, { text: string; board: string }> = {
      'Linear Equations': {
        text: `Let's solve: **3x + 7 = 22**\n\nStep 1: Subtract 7 from both sides\n3x = 22 - 7\n3x = 15\n\nStep 2: Divide both sides by 3\nx = 15 ÷ 3\nx = 5\n\nCheck: 3(5) + 7 = 15 + 7 = 22 ✓`,
        board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 WORKED EXAMPLE\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nSolve: 3x + 7 = 22\n\nStep 1: -7\n3x = 15\n\nStep 2: ÷3\nx = 5\n\n✓ Check: 3(5)+7=22`,
      },
      'Pythagoras Theorem': {
        text: `Find the hypotenuse when a=6 and b=8:\n\nc² = 6² + 8²\nc² = 36 + 64\nc² = 100\nc = √100\nc = 10\n\nSo the hypotenuse is 10 units!`,
        board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 WORKED EXAMPLE\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\na=6, b=8, find c\n\nc² = 36+64\nc² = 100\nc = 10 ✓`,
      },
    }

    return examples[topic.name] || {
      text: `Here's a worked example...\n\nStep 1: Read the question\nStep 2: Apply the method\nStep 3: Calculate\nStep 4: Check your answer`,
      board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n💡 EXAMPLE\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nStep-by-step solution...`,
    }
  }

  const givePracticeQuestion = (topic: Topic) => {
    setCurrentStep(4)
    setTeachingMode('questioning')

    const practice = getPracticeQuestion(topic)
    const practiceMessage: Message = {
      id: `practice_${Date.now()}`,
      sender: 'teacher',
      text: `Now it's **your turn**! 🎯\n\n${practice.question}\n\nTake your time and show your working. You've got this! 💪`,
      type: 'text',
    }

    setChat(prev => [...prev, practiceMessage])
    setBoardText(practice.board)
    speakText(practice.question)
  }

  const getPracticeQuestion = (topic: Topic): { question: string; board: string } => {
    const questions: Record<string, { question: string; board: string }> = {
      'Linear Equations': {
        question: `Solve: **2x + 5 = 17**\n\nShow your working step by step!\n\nHint: What do you do first?`,
        board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✏️ YOUR TURN!\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nSolve: 2x + 5 = 17\n\n\nWorking:\n\n\n\nAnswer: x = ?`,
      },
      'Pythagoras Theorem': {
        question: `Find the hypotenuse when a=5 and b=12\n\nShow all your working!\n\nHint: Use c² = a² + b²`,
        board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✏️ YOUR TURN!\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\na=5, b=12, find c\n\n\nWorking:\n\n\n\nAnswer: c = ?`,
      },
    }

    return questions[topic.name] || {
      question: `Try this practice question...\n\nShow your working!`,
      board: `${type.toUpperCase()}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n✏️ PRACTICE\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nYour question here...`,
    }
  }

  const handleSend = async () => {
    if (!question.trim() || !user) return

    const userMessage = question
    setChat(prev => [...prev, { id: `user_${Date.now()}`, sender: 'student', text: userMessage, type: 'text' }])
    setQuestion('')
    setIsLoading(true)
    setTeachingMode('questioning')

    const lowerMsg = userMessage.toLowerCase()
    
    if (selectedTopic && (
      lowerMsg.includes('got it') || 
      lowerMsg.includes('understand') || 
      lowerMsg.includes('ready') ||
      lowerMsg.includes('next') ||
      lowerMsg.includes('continue') ||
      lowerMsg.includes('okay') ||
      lowerMsg.includes('ok')
    ) && currentStep === 2 && teachingMode === 'explaining') {
      moveToNextSection(selectedTopic)
      setIsLoading(false)
      return
    }

    if (lowerMsg.includes("don't understand") || lowerMsg.includes("confused") || lowerMsg.includes("don't get it")) {
      setStudentUnderstanding('confused')
      handleConfusedResponse()
    } else if (lowerMsg.includes("got it") || lowerMsg.includes("makes sense")) {
      setStudentUnderstanding('confident')
      handleConfidentResponse()
    } else {
      await sendToAI(userMessage)
    }

    setIsLoading(false)
  }

  const handleConfusedResponse = () => {
    const reExplanation = `I understand this might be confusing! Let me explain it **differently**...\n\n${getAlternativeExplanation()}\n\nDoes this make more sense? Feel free to ask if you need more help! 😊`

    const newMessage: Message = {
      id: `reexplain_${Date.now()}`,
      sender: 'teacher',
      text: reExplanation,
      type: 'text',
    }

    setChat(prev => [...prev, newMessage])
    setBoardText(prev => prev + '\n\n' + getAlternativeExplanation())
    speakText(reExplanation)
  }

  const getAlternativeExplanation = (): string => {
    const alternatives: Record<string, string> = {
      'Linear Equations': `**Think of it like a puzzle!**\n\nImagine you have a mystery number (x).\n\nThe equation tells you:\n"Double the mystery number, then add 5, and you get 17"\n\nTo find x, we UNDO each step:\n1. Undo "+5" by subtracting 5\n2. Undo "×2" by dividing by 2\n\nThat's it! 🎯`,
      'Pythagoras Theorem': `**Visual way to think about it:**\n\nImagine squares on each side of the triangle!\n\nThe two smaller squares (on sides a and b)...\nWhen you add their areas together...\nThey equal the big square (on side c)!\n\nThat's why: a² + b² = c²`,
    }

    return alternatives[lessonTopic] || `Let me try a different approach...\n\nSometimes a concept needs to be explained multiple ways.\n\nThink about it like this:\n- Break it into smaller steps\n- Use a real-world example\n- Draw a diagram if it helps`
  }

  const handleConfidentResponse = () => {
    const encouragement = `Excellent! 🌟 I can see you really understand this!\n\nReady for a challenge question? Or shall we move to the mastery check?`

    const newMessage: Message = {
      id: `encourage_${Date.now()}`,
      sender: 'teacher',
      text: encouragement,
      type: 'text',
    }

    setChat(prev => [...prev, newMessage])
    speakText(encouragement)
  }

  const sendToAI = async (message: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          student_id: user!.id,
          tutor_type: type,
          message: message,
          board_text: boardText,
        }),
      })

      if (!response.ok) throw new Error()

      const data = await response.json()

      const tutorResponse: Message = {
        id: data.message_id,
        sender: 'teacher',
        text: data.tutor_response,
        timestamp: new Date(data.timestamp),
        type: 'text',
      }

      setChat(prev => [...prev, tutorResponse])
      speakText(data.tutor_response)

    } catch (error) {
      const fallbackResponse: Message = {
        id: `fallback_${Date.now()}`,
        sender: 'teacher',
        text: `Great question! Let me help you with that.\n\nBased on what we're learning about **${lessonTopic}**:\n\n${getTopicSpecificHelp(message)}`,
        type: 'text',
      }
      setChat(prev => [...prev, fallbackResponse])
    }
  }

  const getTopicSpecificHelp = (question: string): string => {
    return `Think about the key concepts we've covered...\n\n1. What information do you have?\n2. What are you trying to find?\n3. Which method should you use?\n\nShow me your working and I'll give you feedback!`
  }

  const speakText = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text.replace(/[#*_~`]/g, ''))
    speech.rate = 0.9
    speech.pitch = 1
    speech.volume = 1
    
    const voices = window.speechSynthesis.getVoices()
    
    if (type === 'science') {
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Google UK English Female') ||
        voice.name.includes('Microsoft Zira') ||
        voice.name.includes('Tessa') ||
        voice.name.includes('Emma')
      )
      if (femaleVoice) {
        speech.voice = femaleVoice
        speech.pitch = 1.1
      }
    } else {
      const maleVoice = voices.find(voice => 
        voice.name.includes('Male') || 
        voice.name.includes('Daniel') ||
        voice.name.includes('Google UK English Male') ||
        voice.name.includes('Microsoft David') ||
        voice.name.includes('Arthur') ||
        voice.name.includes('James')
      )
      if (maleVoice) {
        speech.voice = maleVoice
        speech.pitch = 0.9
      }
    }
    
    speech.onstart = () => setIsSpeaking(true)
    speech.onend = () => setIsSpeaking(false)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(speech)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileAttach = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileMessage: Message = {
        id: `file_${Date.now()}`,
        sender: 'student',
        text: `📎 Attached: ${file.name}`,
        type: 'file',
        fileName: file.name,
      }
      setChat(prev => [...prev, fileMessage])
      
      setTimeout(() => {
        const response: Message = {
          id: `file_response_${Date.now()}`,
          sender: 'teacher',
          text: `Thanks for sharing **${file.name}**! 📄\n\nI can see you've uploaded a file. Let me help you with it!\n\nWhat specific question or part would you like me to explain?`,
          type: 'text',
        }
        setChat(prev => [...prev, response])
        speakText(response.text)
      }, 1000)
    }
  }

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      const voiceMessage: Message = {
        id: `voice_${Date.now()}`,
        sender: 'student',
        text: '🎤 Voice message',
        type: 'voice',
        voiceDuration: '0:15',
      }
      setChat(prev => [...prev, voiceMessage])
      
      setTimeout(() => {
        const response: Message = {
          id: `voice_response_${Date.now()}`,
          sender: 'teacher',
          text: `I heard your voice message! 🎧\n\nThat's a great question. Let me help you with that...`,
          type: 'text',
        }
        setChat(prev => [...prev, response])
        speakText(response.text)
      }, 1000)
    } else {
      setIsRecording(true)
    }
  }

  const handleStepClick = (stepNumber: number) => {
    setCurrentStep(stepNumber)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex flex-col">
      {showClassModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className={`bg-gradient-to-r ${currentTutor.gradient} px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl sm:rounded-t-3xl`}>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="text-3xl sm:text-5xl">{currentTutor.name}</div>
                <div>
                  <h1 className="text-xl sm:text-3xl font-bold text-white">Welcome to {currentTutor.name}'s Class!</h1>
                  <p className="text-white/90 mt-1 text-sm sm:text-base">Select your year group and topic to begin</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">📚 Step 1: Choose Your Year Group</h2>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
                  {['5', '6', '7', '8', '9'].map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedClass(year)}
                      className={`py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-lg transition-all ${
                        selectedClass === year
                          ? `bg-gradient-to-r ${currentTutor.gradient} text-white shadow-xl scale-105`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Year {year}
                    </button>
                  ))}
                </div>
              </div>

              {selectedClass && (
                <div className="mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">📖 Step 2: Choose Your Topic</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {topicsForTutor[selectedClass]?.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => startLesson(topic)}
                        className="p-4 sm:p-5 rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group"
                      >
                        <h3 className="font-bold text-base sm:text-lg text-gray-800 group-hover:text-blue-600">{topic.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mt-2">{topic.description}</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                          {topic.lessons.slice(0, 3).map((lesson, idx) => (
                            <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              {lesson}
                            </span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-40 flex-shrink-0">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-2">
          <div className="flex justify-between items-center gap-2 sm:gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link href="/dashboard" className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all font-semibold text-gray-700 text-xs sm:text-sm shadow-sm">
                <span>←</span>
                <span className="hidden sm:inline">Dashboard</span>
              </Link>

              <div className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl ${currentTutor.bgColor} border-2 border-${currentTutor.color.split('-')[1]}-200`}>
                <span className="text-2xl sm:text-3xl">{currentTutor.name}</span>
                <div className="hidden xs:block">
                  <h1 className={`text-sm sm:text-lg font-bold ${currentTutor.color}`}>{currentTutor.name}</h1>
                  <p className="text-xs text-gray-500 hidden md:block">Professional AI Tutor</p>
                </div>
              </div>

              {lessonTopic && (
                <div className="hidden lg:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg border-2 border-gray-200 shadow-sm">
                  <span className="text-base sm:text-lg">📌</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 truncate max-w-[200px]">{lessonTopic}</span>
                </div>
              )}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${currentTutor.gradient} text-white shadow-lg flex items-center gap-2 sm:gap-3`}>
                <span className="text-xl sm:text-2xl">🔥</span>
                <div>
                  <p className="text-[10px] sm:text-xs opacity-90 font-medium hidden xs:block">Step</p>
                  <p className="text-sm sm:text-lg font-bold leading-none">{currentStep}/{teachingSteps.length}</p>
                </div>
              </div>

              <Link href="/dashboard" className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-lg sm:rounded-lg bg-red-50 hover:bg-red-100 border-2 border-red-200 text-red-600 font-bold transition-all text-xs sm:text-sm shadow-sm hover:shadow-md">
                <span className="hidden sm:inline">Exit</span>
                <span className="sm:hidden">✕</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Teaching Steps Navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex justify-between gap-1.5 sm:gap-2">
            {teachingSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={`flex-1 min-w-[50px] sm:min-w-[80px] h-12 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 ${
                  currentStep === step.id
                    ? `bg-gradient-to-r ${currentTutor.gradient} text-white shadow-lg scale-105 ring-2 ring-${currentTutor.color.split('-')[1]}-300`
                    : step.id < currentStep
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl sm:text-2xl">{step.icon}</span>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold">{step.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Progress */}
      {currentStep === 2 && selectedTopic && lessonSections.length > 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200 shadow-sm flex-shrink-0">
          <div className="max-w-[1920px] mx-auto px-3 sm:px-4 py-2 sm:py-3">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="font-bold text-sm sm:text-base text-gray-800 flex items-center gap-1.5 sm:gap-2">
                <span className="text-base sm:text-lg">📖</span> <span className="hidden xs:inline">Lesson Sections</span><span className="xs:hidden">Sections</span>
              </h3>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 sm:px-3 py-1 rounded-full">
                {currentLessonSection + 1}/{lessonSections.length}
              </span>
            </div>
            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2">
              {lessonSections.map((section, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 min-w-[100px] sm:min-w-[120px] px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    idx === currentLessonSection
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105'
                      : idx < currentLessonSection
                      ? 'bg-green-100 text-green-700 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  <div className="text-[10px] sm:text-xs opacity-75 mb-0.5 sm:mb-1">Sec {idx + 1}</div>
                  <div className="truncate max-w-[80px] sm:max-w-none">{section.replace(`Section ${idx + 1}: `, '')}</div>
                </div>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 mt-1 sm:mt-2 text-center bg-white/50 rounded-lg py-1">
              💡 Type <strong>"got it"</strong> or <strong>"next"</strong> to continue!
            </p>
          </div>
        </div>
      )}

      {/* Main Content - Three Equal Height Sections */}
      <div className="h-[calc(100vh-80px)] w-full flex justify-center bg-gray-100">

  <div className="
    w-full
    max-w-[1800px]
    h-full
    flex
    gap-4
    p-2 sm:p-3 md:p-4
    overflow-hidden
  ">

    {/* ================= WHITEBOARD ================= */}
    <div className="
      hidden lg:flex
      w-[40%]
      min-w-[350px]
      h-full
      flex-col
      bg-white
      rounded-xl
      shadow-xl
      overflow-hidden
    ">

      <div className={`bg-gradient-to-r ${currentTutor.gradient} px-4 py-3`}>
        <h3 className="text-white font-bold flex items-center gap-2">
          📝 Whiteboard
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
        <pre className="whitespace-pre-wrap text-sm text-gray-800">
          {boardText || "Lesson starting..."}
        </pre>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 border-t bg-white">

        <button
          onClick={() => setBoardText(prev => prev + '\n\n📌 Key Point: ')}
          className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-1 rounded text-sm font-semibold"
        >
          📌 Key
        </button>

        <button
          onClick={() => setBoardText(prev => prev + '\n\n💡 Example: ')}
          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-1 rounded text-sm font-semibold"
        >
          💡 Ex
        </button>

        <button
          onClick={() => setBoardText(prev => prev + '\n\n✏️ Working:\n\nAnswer: ')}
          className="bg-green-100 hover:bg-green-200 text-green-700 py-1 rounded text-sm font-semibold"
        >
          ✏️ Work
        </button>

        <button
          onClick={() => setBoardText('')}
          className="bg-red-100 hover:bg-red-200 text-red-700 py-1 rounded text-sm font-semibold"
        >
          🗑 Clear
        </button>

      </div>

    </div>


    {/* ================= AVATAR ================= */}
    {/* ================= AVATAR ================= */}
<div className="
  hidden lg:flex
  w-[20%]
  min-w-[240px]
  h-full
  flex-col
  items-center
  justify-between
  bg-white
  rounded-xl
  shadow-xl
  p-5
">

  {/* STATUS */}
  <div className="w-full text-center">

    <div className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
      ${isListening
        ? "bg-yellow-100 text-yellow-700"
        : isSpeaking
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"}
    `}>
      {isListening && "🎧 Listening"}
      {isSpeaking && "🗣 Explaining"}
      {!isListening && !isSpeaking && "💭 Thinking"}
    </div>

  </div>


  {/* AVATAR IMAGE */}
  <motion.div
    animate={{
      scale: isSpeaking ? [1, 1.05, 1] : 1,
      boxShadow: isSpeaking
        ? "0px 0px 40px rgba(34,197,94,0.6)"
        : "0px 10px 25px rgba(0,0,0,0.2)"
    }}
    transition={{
      duration: 1,
      repeat: isSpeaking ? Infinity : 0
    }}
    className={`
      w-44 h-44 rounded-full
      bg-gradient-to-br ${currentTutor.gradient}
      flex items-center justify-center
      text-7xl
      shadow-xl
      relative
    `}
  >

    {currentTutor.icon}

    {/* Speaking Waves */}
    {isSpeaking && (
      <div className="absolute bottom-2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              height: [6, 20, 6]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
            className="w-1 bg-white rounded-full"
          />
        ))}
      </div>
    )}

  </motion.div>


  {/* NAME */}
  <div className="text-center mt-4">
    <h3 className="font-bold text-lg">
      {currentTutor.name}
    </h3>

    <p className="text-sm text-gray-500">
      AI Teacher
    </p>
  </div>


  {/* UNDERSTANDING BUTTONS */}
  <div className="mt-6 w-full">

    <p className="text-center text-sm text-gray-600 mb-2">
      Understand?
    </p>

    <div className="flex justify-center gap-2">

      <button
        onClick={() => setStudentUnderstanding("confused")}
        className="
          px-3 py-1 rounded-lg bg-gray-100
          hover:bg-red-500 hover:text-white
          transition
        "
      >
        😕
      </button>

      <button
        onClick={() => setStudentUnderstanding("okay")}
        className="
          px-3 py-1 rounded-lg bg-gray-100
          hover:bg-yellow-500 hover:text-white
          transition
        "
      >
        😐
      </button>

      <button
        onClick={() => setStudentUnderstanding("confident")}
        className="
          px-3 py-1 rounded-lg bg-gray-100
          hover:bg-green-500 hover:text-white
          transition
        "
      >
        😊
      </button>

    </div>

  </div>

</div>


    {/* ================= CHAT ================= */}
    <div className="
      flex
      w-full
      lg:w-[40%]
      min-w-0
      h-full
      flex-col
      bg-white
      rounded-xl
      shadow-xl
      overflow-hidden
    ">

      <div className={`bg-gradient-to-r ${currentTutor.gradient} px-4 py-3`}>
        <h3 className="text-white font-bold flex items-center gap-2">
          💬 Chat
        </h3>
      </div>


      <div
        ref={chatContainerRef}
        className="
          flex-1
          overflow-y-auto
          p-3 sm:p-4
          space-y-3
          bg-gray-50
        "
      >

        {chat.map((msg) => (

          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'student'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >

            <div className={`
              px-3 py-2
              rounded-lg
              max-w-[85%]
              sm:max-w-[75%]
              shadow
              text-sm sm:text-base
              ${
                msg.sender === 'student'
                  ? `bg-gradient-to-r ${currentTutor.gradient} text-white`
                  : 'bg-white border'
              }
            `}>
              {msg.text}
            </div>

          </div>

        ))}

        {isLoading && (
          <div className="text-gray-500 text-sm">
            Typing...
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>


      {/* Input */}
      <ChatInput
        question={question}
        setQuestion={setQuestion}
        handleSend={handleSend}
        currentTutor={currentTutor}
      />

    </div>

  </div>

</div>


    </div>
  )
}
