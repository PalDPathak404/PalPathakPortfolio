export const mockProjects = [
  {
    _id: 'p1',
    title: 'RapidResQ',
    description: 'Rapid ResQ is a smart emergency dispatch system that prevents call misrouting and overloads.',
    longDescription: 'Rapid ResQ is an intelligent emergency dispatch system that uses real-time geospatial routing to prevent misrouting and overloads while ensuring reliable connections through automated failovers during congestion..',
    category: 'personal',
    subCategory: 'Full Stack',
    tags: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Framer Motion'],
    thumbnail: 'https://picsum.photos/seed/nexus/1200/800',
    githubUrl: 'https://github.com/viperscar404',
    liveUrl: 'https://nexus-demo.vercel.app',
    youtubeId: 'dQw4w9WgXcQ',
    featured: true
  },
  {
    _id: 'p2',
    title: 'Aether OS',
    description: 'An immersive in-browser desktop environment built with Three.js.',
    longDescription: 'Aether OS pushes the boundaries of web interfaces. It is a fully functional desktop environment running entirely within the browser. Using Three.js for a depth-filled windowing system and WebGL for reactive backgrounds.',
    category: 'personal',
    subCategory: 'Frontend',
    tags: ['React', 'Three.js', 'GSAP', 'Zustand'],
    thumbnail: 'https://picsum.photos/seed/aether/1200/800',
    githubUrl: 'https://github.com/viperscar404/aether-os',
    liveUrl: 'https://aether-os.vercel.app',
    featured: true
  },
  {
    _id: 'p3',
    title: 'Chronos Hack',
    description: 'Winner: Best Fintech solution for decentralized payroll.',
    longDescription: 'Developed during the 48-hour Global Fintech Hackathon, Chronos simplifies payroll for remote teams using smart contracts. This project won first place for its innovative approach to off-ramp efficiency.',
    category: 'hackathon',
    subCategory: 'Full Stack',
    tags: ['Solidity', 'Web3.js', 'Next.js', 'Tailwind'],
    thumbnail: 'https://picsum.photos/seed/chronos/1200/800',
    githubUrl: 'https://github.com/placeholder',
    featured: true
  },
  {
    _id: 'p4',
    title: 'Shadow Realm',
    description: 'A 2D atmospheric puzzle platformer built with Canvas.',
    longDescription: 'Shadow Realm is a journey through light and darkness. Built using a custom physics engine and tile-based rendering, it features procedural level generation and dynamic lighting.',
    category: 'personal',
    subCategory: 'Game',
    tags: ['TypeScript', 'Canvas', 'Game Loop'],
    thumbnail: 'https://picsum.photos/seed/shadow/1200/800',
    featured: false
  },
  {
    _id: 'p5',
    title: 'Pixel Clone',
    description: 'A pixel-perfect recreation of a premium design agency site.',
    longDescription: 'A deep dive into advanced CSS and Framer Motion, recreating the complex interactions and layout of a top-tier digital agency.',
    category: 'personal',
    subCategory: 'Clone',
    tags: ['React', 'Framer Motion', 'Lottie'],
    thumbnail: 'https://picsum.photos/seed/pixel/1200/800',
    featured: false
  },
  {
    _id: 'p6',
    title: 'DeFi Pulse',
    description: 'Real-time analytics dashboard for decentralized finance protocols.',
    longDescription: 'A technical dashboard providing deep insights into liquidity pools and yield farms across multiple chains.',
    category: 'personal',
    subCategory: 'Full Stack',
    tags: ['GraphQL', 'Apollo', 'Recharts'],
    thumbnail: 'https://picsum.photos/seed/defi/1200/800',
    featured: false
  },
  {
    _id: 'p7',
    title: 'HackThePlanet',
    description: 'A cybersecurity educational platform for budding white-hats.',
    longDescription: 'Created for the Cyber Security Hackathon, this platform provides interactive labs for learning penetration testing safely.',
    category: 'hackathon',
    subCategory: 'Full Stack',
    tags: ['Python', 'Django', 'Docker'],
    thumbnail: 'https://picsum.photos/seed/hack/1200/800',
    featured: false
  },
  {
    _id: 'p8',
    title: 'EduChain',
    description: 'Blockchain-based credential verification system.',
    longDescription: 'Hackathon project focused on eliminating certificate fraud through immutable ledger records.',
    category: 'hackathon',
    subCategory: 'Full Stack',
    tags: ['Ethereum', 'React', 'IPFS'],
    thumbnail: 'https://picsum.photos/seed/educhain/1200/800',
    featured: false
  },
  {
    _id: 'p9',
    title: 'SwiftCode',
    description: 'A collaborative real-time code editor with AI pair programmer.',
    longDescription: 'Built in 24 hours, this tool allows teams to code together with an integrated AI assistant that understands context.',
    category: 'hackathon',
    subCategory: 'Full Stack',
    tags: ['Yjs', 'Monaco Editor', 'OpenAI'],
    thumbnail: 'https://picsum.photos/seed/swift/1200/800',
    featured: false
  },
  {
    _id: 'p10',
    title: 'HealthSync',
    description: 'A wellness platform connecting patients with nutritionists.',
    longDescription: 'Hackathon finalist project aimed at improving post-surgical recovery through personalized nutrition plans.',
    category: 'hackathon',
    subCategory: 'Full Stack',
    tags: ['React Native', 'Firebase', 'Express'],
    thumbnail: 'https://picsum.photos/seed/health/1200/800',
    featured: false
  }
];

export const mockSkills = [
  { _id: 's1', name: 'React', category: 'Frontend', icon: 'Atom', level: 90, color: '#61dbfb', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { _id: 's2', name: 'TypeScript', category: 'Frontend', icon: 'FileCode', level: 85, color: '#007acc', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { _id: 's3', name: 'Node.js', category: 'Backend', icon: 'Server', level: 80, color: '#3c873a', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { _id: 's4', name: 'MongoDB', category: 'Databases', icon: 'Database', level: 75, color: '#4db33d', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { _id: 's5', name: 'Three.js', category: 'Frontend', icon: 'Box', level: 70, color: '#049EF4', logoUrl: 'https://raw.githubusercontent.com/mrdoob/three.js/master/files/icon.svg' },
  { _id: 's6', name: 'Tailwind CSS', category: 'Frontend', icon: 'Wind', level: 95, color: '#38b2ac', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { _id: 's7', name: 'Express', category: 'Backend', icon: 'Zap', level: 85, color: '#f27d26', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { _id: 's8', name: 'Git', category: 'Tools', icon: 'Github', level: 90, color: '#f34f29', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { _id: 's9', name: 'Docker', category: 'DevOps', icon: 'Container', level: 60, color: '#2496ed', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { _id: 's10', name: 'Framer Motion', category: 'Frontend', icon: 'Activity', level: 85, color: '#ff0055', logoUrl: 'https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png' }
];

export const mockCertificates = [
  { _id: 'c1', title: 'Full Stack Web Development', issuer: 'Coursera', issueDate: 'Jan 2024', category: 'educational', imageUrl: 'https://picsum.photos/seed/cert1/800/600', description: 'Comprehensive certification covering MERN stack.' },
  { _id: 'c2', title: '1st Place - Fintech Hackathon', issuer: 'Global Hackers', issueDate: 'Mar 2024', category: 'hackathon', imageUrl: 'https://picsum.photos/seed/cert2/800/600', description: 'Won for innovative use of smart contracts.' }
];

export const mockHackathons = [
  {
    _id: 'h1',
    name: 'Hack the Future 2024',
    date: 'February 2024',
    outcome: 'Winner',
    techStack: ['React', 'Solidity', 'Express'],
    theme: 'Future of Finance',
    problemStatement: 'Inaccessible global payroll systems for decentralized autonomous organizations.',
    solution: 'Built Chronos, a smart-contract based payroll system that automates cross-border payments with 0% fees.',
    longSolution: 'The core innovation lies in our custom smart contract that batches transactions to reduce gas fees by 60%. We integrated with Chainlink Price Feeds to ensure real-time currency conversion and implemented a multi-sig approval process for high-value transfers. The UI features a real-time ledger and a custom dashboard for DAO admins to track spending metrics.',
    highlights: [
      'Reduced gas fees by 60% through transaction batching',
      'Real-time currency conversion via Chainlink Oracle',
      'Multi-signature approval for transfers over $10,000',
      'Dashboard with live analytics for DAO treasury management'
    ],
    images: [
      'https://picsum.photos/seed/hack1_1/1200/800',
      'https://picsum.photos/seed/hack1_2/1200/800',
      'https://picsum.photos/seed/hack1_3/1200/800',
      'https://picsum.photos/seed/hack1_4/1200/800',
      'https://picsum.photos/seed/hack1_5/1200/800',
      'https://picsum.photos/seed/hack1_6/1200/800'
    ],
    teamSize: 3,
    repoUrl: 'https://github.com/viperscar404/chronos-hack',
    demoUrl: 'https://youtube.com/demo1'
  },
  {
    _id: 'h2',
    name: 'BuildForBharat',
    date: 'December 2023',
    outcome: 'Finalist',
    techStack: ['Node.js', 'PostgreSQL', 'TensorFlow'],
    theme: 'Social Impact',
    problemStatement: 'Lack of localized linguistic support for agricultural AI tools.',
    solution: 'Agrilingual: A voice-first AI that translates complex farming advice into 12 regional Indian dialects.',
    longSolution: 'Agrilingual uses a fine-tuned Whisper model for speech-to-text and a custom translation layer mapped to agricultural terminology. We processed over 500 hours of dialect-specific audio data. The backend manages a repository of expert farming advice retrieved via a vector-based search engine for maximum relevance. The system achieves 94% accuracy in translating agricultural terminology across supported dialects.',
    highlights: [
      '94% translation accuracy for agricultural terminology',
      'Supports 12 regional Indian dialects',
      'Processed 500+ hours of dialect-specific audio data',
      'Vector-based search engine for farming advice retrieval',
      'Voice-first interface for low-literacy users'
    ],
    images: [
      'https://picsum.photos/seed/hack2_1/1200/800',
      'https://picsum.photos/seed/hack2_2/1200/800',
      'https://picsum.photos/seed/hack2_3/1200/800',
      'https://picsum.photos/seed/hack2_4/1200/800',
      'https://picsum.photos/seed/hack2_5/1200/800'
    ],
    teamSize: 4,
    repoUrl: 'https://github.com/viperscar404/agrilingual',
    demoUrl: 'https://youtube.com/demo2'
  },
  {
    _id: 'h3',
    name: 'InnoQuest 3.0',
    date: 'October 2023',
    outcome: 'Most Innovative',
    techStack: ['Python', 'FastAPI', 'React'],
    theme: 'Smart Cities',
    problemStatement: 'Inefficient waste management routing in high-density urban areas.',
    solution: 'SmartRoute: Real-time IoT-based bin monitoring and pathfinding for collection vehicles.',
    longSolution: 'Our system uses ultrasonic sensors mounted on waste bins to report fill levels via LoRaWAN. The routing algorithm calculates the most efficient path for collection trucks, excluding empty bins and considering traffic data. This solution reduces fuel consumption by up to 30% and optimizes worker schedules. The admin dashboard provides heat maps of waste generation patterns, helping cities plan better bin placement and collection frequencies.',
    highlights: [
      '30% reduction in fuel consumption for collection fleet',
      'IoT ultrasonic sensors with LoRaWAN connectivity',
      'Real-time traffic-aware routing algorithm',
      'Heat map visualization of waste generation patterns',
      'Predictive analytics for bin fill-level forecasting'
    ],
    images: [
      'https://picsum.photos/seed/hack3_1/1200/800',
      'https://picsum.photos/seed/hack3_2/1200/800',
      'https://picsum.photos/seed/hack3_3/1200/800',
      'https://picsum.photos/seed/hack3_4/1200/800',
      'https://picsum.photos/seed/hack3_5/1200/800',
      'https://picsum.photos/seed/hack3_6/1200/800'
    ],
    teamSize: 2,
    repoUrl: 'https://github.com/viperscar404/smartroute'
  }
];

export const mockAchievements = [
  { _id: 'a1', title: 'Dean\'s List', description: 'Outstanding academic performance in Computer Science.', date: '2023', icon: 'Award' }
];

export const mockEducation = [
  { _id: 'e1', institution: 'University of Technology', degree: 'Bachelor of Science', field: 'Computer Science', startYear: '2021', endYear: '2025', grade: '3.9/4.0' }
];
