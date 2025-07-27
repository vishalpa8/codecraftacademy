# CodeCraft Academy 🚀

A flexible, extensible multi-language learning platform for programming education that starts with JavaScript and seamlessly expands to support multiple programming languages and frameworks.

## 🌟 Features

- **Multi-Language Support**: JavaScript, Python, HTML/CSS, React, Node.js, and more
- **Interactive Code Editor**: Monaco Editor with syntax highlighting and IntelliSense
- **Real-time Code Execution**: WebContainers for frontend, Docker for backend languages
- **Progressive Learning Paths**: Beginner to advanced curriculum with projects
- **Community Features**: Peer learning, code reviews, and collaborative coding
- **Certification System**: Industry-recognized certificates with blockchain verification
- **Monetization**: Freemium model with tiered pricing

## 🏗️ Architecture

### Core Principles
- **Plugin-based Language Engine**: Each language operates as an independent plugin
- **Content-Agnostic Curriculum Manager**: Consistent structure across all languages
- **Universal Code Execution Framework**: Sandboxed execution for multiple runtimes
- **Extensible Assessment System**: Flexible validation and testing framework

### Technology Stack
- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js/Express + FastAPI (Python) + PostgreSQL + Redis
- **Code Execution**: WebContainers + Docker + Kubernetes
- **Authentication**: NextAuth.js with social login integration
- **Real-time**: Socket.io for collaborative features

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker Desktop
- PostgreSQL 14+
- Redis 6+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codecraft-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
codecraft-academy/
├── src/
│   ├── app/                    # Next.js 14 app directory
│   │   ├── courses/           # Course pages and lessons
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   └── api/               # API routes
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # Base UI components
│   │   └── CodeEditor.tsx     # Interactive code editor
│   ├── lib/                    # Utility functions and configurations
│   │   └── lessonUtils.ts     # Lesson management utilities
│   └── types/                  # TypeScript type definitions
├── prisma/                     # Database schema and migrations
├── public/                     # Static assets
└── docs/                       # Documentation
```

## 🎯 Current Implementation Status

### ✅ Completed Features
- [x] **Project Setup**: Next.js 14 with TypeScript and Tailwind CSS
- [x] **Interactive Code Editor**: Monaco Editor with JavaScript execution
- [x] **Lesson System**: Step-by-step learning with progress tracking
- [x] **Challenge Validation**: Real-time code execution and output validation
- [x] **Progress Management**: Step locking, completion tracking, and persistence
- [x] **Modern UI**: Responsive design with beautiful feedback modals
- [x] **JavaScript Fundamentals**: Complete lesson structure with 3 steps

### 🔄 In Progress
- [ ] **User Authentication**: Login/register system
- [ ] **Database Integration**: PostgreSQL with Prisma ORM
- [ ] **Additional Languages**: Python, HTML/CSS support
- [ ] **Community Features**: Peer learning and collaboration

### 📋 Planned Features
- [ ] **Multi-language Support**: Plugin system for different programming languages
- [ ] **Certification System**: Industry-recognized certificates
- [ ] **Monetization**: Freemium model with premium features
- [ ] **Advanced Analytics**: Learning progress and performance tracking

## 🎮 How to Use

### Learning Flow
1. **Start with JavaScript Fundamentals** - Navigate to `/courses/javascript-fundamentals`
2. **Complete Reading Steps** - Click "Next" to progress through documentation
3. **Solve Coding Challenges** - Write code in the editor and run to validate
4. **Track Progress** - See your completion status in the sidebar
5. **Save Progress** - Your progress is automatically saved and persists

### Features
- **Step Locking**: Can't access later steps without completing previous ones
- **Real-time Validation**: Code execution with immediate feedback
- **Progress Persistence**: Progress saved in localStorage
- **Modern Feedback**: Beautiful modals for success and error states
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run tests
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
```

### Key Components
- **`lessonUtils.ts`**: Centralized lesson management with progress tracking
- **`CodeEditor.tsx`**: Interactive code editor with Monaco Editor
- **`FeedbackModal.tsx`**: Modern feedback system for challenge results
- **Lesson Pages**: Step-by-step learning interface

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Guidelines
1. **TypeScript**: All code must be typed
2. **Component Structure**: Use functional components with hooks
3. **State Management**: Centralized state in utility hooks
4. **UI Consistency**: Follow Tailwind CSS design system
5. **Testing**: Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@codecraft-academy.com
- 💬 Discord: [Join our community](https://discord.gg/codecraft)
- 📖 Documentation: [docs.codecraft-academy.com](https://docs.codecraft-academy.com)

## 🏆 Success Metrics

- **User Engagement**: 40% daily active users
- **Course Completion**: 65% completion rate
- **Challenge Success**: 75% success rate within 3 attempts
- **Revenue Growth**: 20% month-over-month MRR growth

---

Built with ❤️ by the CodeCraft Academy team 