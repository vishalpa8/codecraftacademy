import { NextResponse } from 'next/server'

const courses = [
  {
    id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming language',
    slug: 'javascript-fundamentals',
    language: 'JavaScript',
    difficulty: 'BEGINNER',
    image: '🟡',
    lessons: 24,
    duration: 480, // minutes
    isPublished: true,
  },
  {
    id: '2',
    title: 'React Basics',
    description: 'Build interactive user interfaces with React',
    slug: 'react-basics',
    language: 'React',
    difficulty: 'INTERMEDIATE',
    image: '⚛️',
    lessons: 18,
    duration: 360,
    isPublished: false,
  },
  {
    id: '3',
    title: 'Node.js Backend',
    description: 'Create server-side applications with Node.js',
    slug: 'nodejs-backend',
    language: 'Node.js',
    difficulty: 'INTERMEDIATE',
    image: '🟢',
    lessons: 22,
    duration: 420,
    isPublished: false,
  },
  {
    id: '4',
    title: 'Python for Beginners',
    description: 'Start your journey with Python programming',
    slug: 'python-beginners',
    language: 'Python',
    difficulty: 'BEGINNER',
    image: '🐍',
    lessons: 20,
    duration: 400,
    isPublished: false,
  },
]

export async function GET() {
  // In a real app, you'd fetch from database
  const publishedCourses = courses.filter(course => course.isPublished)
  
  return NextResponse.json({
    courses: publishedCourses,
    total: publishedCourses.length,
  })
} 