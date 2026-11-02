// ============================================================
//  SITE CONFIG — Edit all your content, colors, and links here
// ============================================================

export const siteConfig = {
  // --- Identity ---
  name: 'Muhammad Affan',
  role: 'Full-Stack MERN Developer',
  tagline: 'I build scalable, beautiful web applications that solve real problems.',
  location: 'Karachi, Pakistan',
  email: 'affanmuhammad926@gmail.com',
  phone: '+923233129528',
  domain: 'https://YOUR-DOMAIN.com',

  // --- Social Links ---
  github: 'https://github.com/Affan-1',
  githubUsername: 'Affan-1',
  linkedin: 'https://www.linkedin.com/in/muhammad-affan-976423255/',
  whatsapp: 'https://wa.me/923233129528?text=Hi%20Affan%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.',

  // --- Resume ---
  resume: '/resume.pdf',

  // --- Animated Roles (for TypeAnimation in hero) ---
  roles: [
    'Full-Stack MERN Developer',
    'React & Node.js Engineer',
    'API & Database Specialist',
    'UI/UX-Focused Developer',
    'Software Engineering Student',
  ],

  // --- About ---
  about: {
    intro: `I'm Muhammad Affan — a passionate Full-Stack MERN Developer and Software Engineering student at Iqra University, Karachi. I love turning ideas into polished, production-ready web applications.`,
    bio: `During my internship at YoungDev Interns, I delivered 5+ client projects in an Agile team, improved app load times by 40% through refactoring and lazy loading, and built secure, scalable REST APIs. I care deeply about clean code, great user experiences, and continuous learning.`,
    facts: [
      { label: 'Based in', value: 'Karachi, Pakistan' },
      { label: 'Degree', value: 'BS Computer Software Engineering' },
      { label: 'University', value: 'Iqra University (2023–2027)' },
      { label: 'Status', value: 'Open to opportunities' },
    ],
  },

  // --- Skills ---
  skills: [
    {
      category: 'Languages',
      icon: '🧠',
      items: ['JavaScript', 'Java', 'C', 'SQL', 'HTML', 'CSS'],
    },
    {
      category: 'Frameworks & Libraries',
      icon: '⚛️',
      items: ['React', 'Node.js', 'Express.js', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      category: 'Databases',
      icon: '🗄️',
      items: ['MongoDB', 'MySQL', 'SQL Server'],
    },
    {
      category: 'Tools & Practices',
      icon: '🔧',
      items: ['Git', 'GitHub', 'REST APIs', 'JWT Authentication', 'Agile/Scrum'],
    },
    {
      category: 'Design',
      icon: '🎨',
      items: ['Graphic Design', 'Banner Design', 'UI/UX Principles', 'Responsive Web Design'],
    },
  ],

  // --- Marquee tech items ---
  marqueeItems: [
    { label: 'React', icon: '⚛️' },
    { label: 'Node.js', icon: '🟢' },
    { label: 'MongoDB', icon: '🍃' },
    { label: 'Express.js', icon: '🚂' },
    { label: 'JavaScript', icon: '💛' },
    { label: 'Tailwind CSS', icon: '💨' },
    { label: 'REST APIs', icon: '🔌' },
    { label: 'JWT Auth', icon: '🔐' },
    { label: 'Git', icon: '🌿' },
    { label: 'SQL', icon: '🗃️' },
    { label: 'Redux', icon: '🔄' },
    { label: 'Vite', icon: '⚡' },
  ],
};

// --- Projects ---
export const projects = [
  {
    id: 1,
    slug: 'freelancer-crm',
    title: 'Freelancer CRM',
    shortDesc: 'A full-stack CRM for freelancers to manage clients, projects, invoices, and team collaboration from one dashboard.',
    liveUrl: 'https://freelancer-crm-sand.vercel.app/',
    screenshots: ['/projects/freelancer-crm-1.png'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Query', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    featured: true,
    caseStudy: {
      overview: 'Freelancer CRM is a full-stack client relationship management application designed specifically for freelancers. It consolidates client management, project tracking, invoicing, calendar events, and team notifications into a single, unified dashboard.',
      problem: 'Freelancers typically juggle multiple tools — spreadsheets for clients, separate invoicing software, email for communication, and calendar apps for scheduling. This fragmentation wastes time and creates gaps in project visibility.',
      solution: 'A unified MERN-stack CRM that gives freelancers a single dashboard to manage every aspect of their work, with JWT-secured routes, dark mode, and team collaboration via role-based email invitations.',
      keyFeatures: [
        'JWT authentication with protected routes and persistent sessions',
        'Dark mode with user preference storage',
        'Team management with role-based email invitations (invitees accept or decline through secure links)',
        'Client and project management dashboard',
        'Invoice creation and tracking',
        'Calendar integration for deadline and event management',
        'REST API secured with Helmet, CORS, and rate limiting',
        'React Query for efficient data fetching and caching',
      ],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'React Query', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Helmet', 'CORS'],
      architecture: 'The project follows a standard MERN architecture: a React + Vite frontend deployed on Vercel, a Node.js/Express backend deployed on Render, and MongoDB Atlas as the cloud database. React Query manages all server state on the frontend, while Helmet and rate limiting protect the backend endpoints.',
      challenges: [
        {
          challenge: 'CORS configuration between Vercel frontend and Render backend',
          solution: 'Configured origin whitelisting in the Express CORS middleware using environment variables for the frontend URL, allowing seamless communication in production.',
        },
        {
          challenge: 'API base URL routing with the /api prefix',
          solution: 'Standardized all backend routes under the /api prefix and configured a proxy in Vite for local development, and environment-specific base URLs for production.',
        },
        {
          challenge: 'Invitation emails blocked by free hosting tier SMTP restrictions',
          solution: 'Bypassed the blocked SMTP port by routing email sending through a Google Apps Script web app deployed as an HTTPS endpoint, which in turn used Gmail\'s SMTP. This required no paid tier and remained reliable in production.',
        },
      ],
      learned: [
        'Navigating the real-world constraints of free hosting tiers and finding creative workarounds',
        'Configuring CORS correctly for decoupled frontend/backend deployments',
        'Managing server state efficiently with React Query',
        'Designing secure, role-based invitation workflows',
      ],
    },
  },
  {
    id: 2,
    slug: 'cortexflow',
    title: 'CortexFlow',
    shortDesc: 'An AI-powered workflow automation platform that connects services and automates repetitive business tasks with a visual builder.',
    liveUrl: 'https://cortex-flow-delta.vercel.app',
    screenshots: ['/projects/cortexflow-1.png'],
    stack: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'Gemini AI'],
    featured: true,
    caseStudy: {
      overview: 'CortexFlow is an AI-powered workflow automation platform that lets users connect services like Gmail, Slack, Discord, Google Sheets, Notion, and HubSpot, and build multi-step automations with a visual workflow builder.',
      problem: 'Business teams spend significant time on repetitive, rule-based tasks across multiple disconnected platforms. Setting up automations often requires technical knowledge or expensive third-party subscriptions.',
      solution: 'CortexFlow provides a visual, no-code workflow builder backed by a robust Node.js backend with background job processing via Redis and BullMQ, and AI-powered agent functionality through Gemini AI.',
      keyFeatures: [
        'AI agent functionality powered by Gemini AI for intelligent workflow steps',
        'Visual multi-step workflow builder with drag-and-drop interface',
        'Webhook triggers for real-time event-driven automation',
        'Scheduled automation with cron-based job queuing via BullMQ',
        'Integrations: Gmail, Slack, Discord, Google Sheets, Notion, HubSpot',
        'Background job processing with Redis and BullMQ for reliable execution',
        'React dashboard showing workflows, integrations, and execution history',
      ],
      techStack: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Redis', 'BullMQ', 'Gemini AI API'],
      architecture: 'The platform uses a React frontend for the visual builder and dashboard, with a Node.js/Express backend as the core engine. Redis powers the job queue (BullMQ) for reliable, non-blocking execution of automation steps. MongoDB stores workflow definitions, integration credentials, and execution logs. Gemini AI is called as an external API within specific AI-powered workflow steps.',
      challenges: [
        {
          challenge: 'Reliable background job processing without blocking the main API',
          solution: 'Implemented BullMQ with Redis to offload automation execution into a separate worker process, ensuring API responsiveness and job retry logic on failure.',
        },
        {
          challenge: 'Managing secure OAuth credentials for multiple third-party integrations',
          solution: 'Designed an integration model that stores encrypted credentials per user per service, and refreshes tokens as needed before each workflow execution.',
        },
      ],
      learned: [
        'Building scalable background job queues with BullMQ and Redis',
        'Integrating multiple third-party APIs and managing OAuth flows',
        'Designing a visual workflow builder from scratch',
        'Using Gemini AI as an agentic step within larger workflows',
      ],
    },
  },
  {
    id: 3,
    slug: 'hcm-lite',
    title: 'HCM Lite',
    shortDesc: 'An AI-assisted Human Capital Management system with role-based access for Admin, HR, and Employee users.',
    liveUrl: 'https://hcm-lite-c376.vercel.app',
    screenshots: ['/projects/hcm-lite-1.png'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Gemini AI'],
    featured: true,
    caseStudy: {
      overview: 'HCM Lite is an AI-assisted Human Capital Management system that provides role-based access for three user types: Admin, HR, and Employee. It covers the core HR lifecycle — from employee records and attendance to payroll and AI-powered HR summaries.',
      problem: 'Small to medium teams often rely on spreadsheets or fragmented software to manage HR tasks. This leads to errors in payroll, difficulty tracking attendance, and a lack of data-driven HR insights.',
      solution: 'HCM Lite centralizes the entire HR workflow in a clean, role-sensitive dashboard. An integrated Gemini AI assistant helps HR managers draft leave summaries and responses, with all AI output clearly labelled for human review.',
      keyFeatures: [
        'Role-based access: Admin, HR, and Employee dashboards with role-specific menus',
        'Employee record management',
        'Attendance check-in/check-out with history',
        'Leave requests with balance tracking and HR approval workflow',
        'Payroll runs and downloadable payslips',
        'JWT authentication with protected routes',
        'Interactive charts and analytics for HR data',
        'Dark mode support',
        'AI assistant for smart leave requests and HR summaries (all output clearly labelled for human review)',
      ],
      techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Gemini AI API'],
      architecture: 'The frontend is a React + Vite SPA that adapts its navigation and views based on the decoded JWT role. The backend is a Node.js/Express REST API with role-protected middleware. MongoDB stores all HR data. Gemini AI is called on-demand for AI-assisted features, with the UI always displaying a clear label indicating the content is AI-generated.',
      challenges: [
        {
          challenge: 'Implementing a robust role-based access system across both frontend and backend',
          solution: 'Encoded the user role in the JWT payload, verified it in backend middleware for every protected route, and used a React context on the frontend to conditionally render role-specific UI elements.',
        },
        {
          challenge: 'Ensuring responsible AI usage in an HR context',
          solution: 'All Gemini AI responses are displayed with a clear "AI-generated — please review" label, and no AI output is automatically saved or acted upon without explicit human confirmation.',
        },
      ],
      learned: [
        'Designing and implementing role-based access control across a full-stack application',
        'Responsible AI integration with clear labelling and human-in-the-loop design',
        'Building downloadable document generation (payslips) in the browser',
        'Managing complex, interconnected HR data models in MongoDB',
      ],
    },
  },
  {
    id: 4,
    slug: 'bella-notte',
    title: 'Bella-Notte',
    shortDesc: 'A modern, visually engaging restaurant website with responsive design and reusable React components.',
    liveUrl: 'https://bella-notte-restraunt-website.vercel.app',
    screenshots: ['/projects/bella-notte-1.png'],
    stack: ['React', 'Vite', 'Tailwind CSS'],
    featured: false,
    caseStudy: {
      overview: 'Bella-Notte is a modern restaurant website with a visually engaging layout, built to showcase a fictional Italian restaurant brand. It demonstrates a clean component architecture and polished UI design.',
      problem: 'Restaurant websites are often outdated, slow, or built with rigid page builders that are hard to maintain and extend.',
      solution: 'A custom React application with reusable, composable components and Tailwind CSS utility classes for consistent, responsive styling across all screen sizes.',
      keyFeatures: [
        'Visually engaging hero section and menu layout',
        'Reusable React components for consistent UI',
        'Fully responsive across mobile, tablet, and desktop',
        'Tailwind CSS for rapid, maintainable styling',
        'Optimized for performance and fast load times',
      ],
      techStack: ['React', 'Vite', 'Tailwind CSS'],
      architecture: 'A standard React SPA with Vite for fast development and builds. Components are organized by feature and reused across pages. No backend — all data is static for this frontend showcase project.',
      challenges: [
        {
          challenge: 'Creating a premium, restaurant-quality aesthetic with only a frontend stack',
          solution: 'Focused on typography, spacing, color harmony, and subtle animations to achieve a premium feel without relying on complex backend integrations.',
        },
      ],
      learned: [
        'Building visually rich UIs with Tailwind CSS',
        'Designing reusable, composable React components',
        'Achieving a polished, brand-consistent aesthetic through typography and spacing',
      ],
    },
  },
];

// --- Experience & Education ---
export const timeline = [
  {
    type: 'experience',
    title: 'Software Development Intern',
    org: 'YoungDev Interns',
    location: 'Karachi, Pakistan',
    period: 'Aug 2024 – Dec 2024',
    description: 'Built and deployed full-stack MERN applications with efficient database queries and RESTful APIs. Delivered 5+ client projects within an Agile/Scrum team. Developed responsive UIs using React and Tailwind CSS. Improved application load times by 40% through code refactoring and lazy loading strategies.',
    highlights: ['5+ client projects delivered', 'Agile/Scrum workflow', '40% load time improvement', 'Full-stack MERN development'],
  },
  {
    type: 'education',
    title: 'BS Computer Software Engineering',
    org: 'Iqra University',
    location: 'Karachi, Pakistan',
    period: 'Oct 2023 – Oct 2027',
    description: 'Pursuing a Bachelor of Science in Computer Software Engineering, with coursework covering data structures, algorithms, software design, databases, and web development.',
    highlights: ['Software Engineering', 'Data Structures & Algorithms', 'Database Systems', 'Web Development'],
  },
];
