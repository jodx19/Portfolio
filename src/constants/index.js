/**
 * ============================================
 * PORTFOLIO CONSTANTS
 * All static data for the portfolio site
 * ============================================
 */

// === NAVIGATION SECTIONS ===
export const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Journey" },
  { id: "skills", label: "Stack" },
  { id: "projects", label: "Work" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

// === HERO SECTION DATA ===
export const heroData = {
  name: { first: "Mahmoud", last: "Mostafa" },
  role: "Full-Stack Web Developer",
  specialization: ".NET Core & Modern JavaScript",
  status: "Available for New Projects",
  description: "I build scalable, high-performance web applications. Specializing in turning complex problems into elegant digital solutions with a focus on Clean Architecture and User Experience.",
  cta: {
    primary: { label: "View My Work", href: "#projects" },

    secondary: {
      label: "Download CV",
      href: "/Mahmoud_Mostafa_CV.pdf"
    }
  }
};

// === ABOUT SECTION DATA ===
export const aboutData = {
  title: "Bridging the Gap Between Robust Backend & Dynamic Frontend",
  description: [
    "I am a Software Engineer specialized in the .NET ecosystem, with a deep passion for building high-scale applications. My expertise spans across Angular and React, allowing me to choose the best tool for the job—whether it's an enterprise-level modular system or a fast-paced interactive SPA.",
    "I don't just write code; I architect solutions that are scalable, maintainable, and user-centric."
  ],
  image: "/images/me@2x.jpg",
  stats: [
    { title: "Enterprise Ready", desc: "Angular & .NET Expert", icon: "🏢" },
    { title: "Clean Architecture", desc: "SOLID & Design Patterns", icon: "🏗️" },
    { title: "Performance First", desc: "Optimized APIs & DOM", icon: "⚡" },
  ]
};


// === SKILLS ===
export const skills = [
  // === BACKEND (.NET STACK) ===
  {
    name: "ASP.NET Core / Web API",
    category: "backend",
    categoryLabel: "Backend",
    level: "Expert",
    description: "Building scalable RESTful APIs with .NET 8, implementing Clean Architecture, SOLID principles, and Middleware.",
  },
  {
    name: "Entity Framework Core",
    category: "backend",
    categoryLabel: "Backend",
    level: "Expert",
    description: "Expertise in LINQ, Migrations, Database-First/Code-First approaches, and complex relationship mapping.",
  },
  {
    name: "SQL Server & PostgreSQL",
    category: "backend",
    categoryLabel: "Backend",
    level: "Advanced",
    description: "Architecting relational databases, query optimization, and performance tuning for enterprise data.",
  },
  {
    name: "API Design & Swagger",
    category: "backend",
    categoryLabel: "Backend",
    level: "Expert",
    description: "Crafting professional API contracts with OpenAPI standards, JWT security, and Versioning.",
  },

  // === FRONTEND (ANGULAR & REACT) ===
  {
    name: "Angular (v14+)",
    category: "frontend",
    categoryLabel: "Frontend",
    level: "Expert",
    description: "Building enterprise SPAs using Reactive Forms, RxJS Observables, Modular architecture, and Standalone Components.",
  },
  {
    name: "React / Vite",
    category: "frontend",
    categoryLabel: "Frontend",
    level: "Advanced",
    description: "Developing modern UIs with Hooks, Context API, and Framer Motion for high-performance interactive experiences.",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    categoryLabel: "Design",
    level: "Expert",
    description: "Rapid UI development with utility-first CSS, custom themes, and responsive Glassmorphism effects.",
  },

  // === TOOLS & QUALITY ===
  {
    name: "Git & GitHub Actions",
    category: "devops",
    categoryLabel: "DevOps",
    level: "Advanced",
    description: "Version control and CI/CD pipelines to automate testing and deployment workflows.",
  },
  {
    name: "Clean Code & Testing",
    category: "quality",
    categoryLabel: "Quality",
    level: "Advanced",
    description: "Applying Design Patterns and Unit Testing to ensure robust, maintainable, and bug-free codebases.",
  }
];

// === PROJECTS ===
export const projects = [
  {
    title: "SafiStore - Full Stack E-Commerce",
    description: "A comprehensive e-commerce platform enabling users to browse products, manage their shopping cart, and complete purchases securely.",
    image: "/images/safistore.png",
    tags: ["Angular", ".NET Core API", "SQL Server", "Tailwind CSS"],
    githubLink: "https://github.com/jodx19/safistore-front-end-angular-",
    liveLink: null,
    images: ["/images/backendapi (1).png", "/images/backendapi (2).png"]
  },
  {
    title: "MovieBox",
    description: "A movie discovery platform featuring advanced search and user ratings, powered by external APIs.",
    image: "/images/movieapp@2x.png",
    tags: ["angular", "tailwind css", "TMDB API"],
    githubLink: "https://github.com/amralmohamdy/Movie-App",
    liveLink: "#"
  },
  {
    title: "Digital Notes Manager",
    description: "A smart digital note-taking system that focuses on performance and ease of access to information.",
    image: "/images/digitalnote@2x.png",
    tags: ["c#", "sql database", "Entity Framwork", "Linq"],
    githubLink: "https://github.com/jodx19/DigitalNotesManager",
    liveLink: "#"
  },
  {
    title: "Smart To-Do List",
    description: "A smart task management system that allows users to prioritize and track their daily tasks efficiently.",
    image: "/images/todo.png",
    tags: ["html", "css", "vanilla Js"],
    githubLink: "https://github.com/jodx19/To_do_list",
    liveLink: "#"
  },
  {
    title: "SafiStore Backend API",
    description: "A robust RESTful API built with .NET Core, featuring JWT authentication, role-based access control, and Swagger documentation for seamless integration.",
    image: "/images/backendapi (2).png",
    tags: [".NET 8", "Entity Framework", "JWT", "SQL Server", "Swagger"],
    githubLink: "https://github.com/jodx19/SafiStore-Backend-API",
    liveLink: "https://jodx19-3404492.postman.co/workspace/mahmoud-mostafa-%27s-Workspace~22e8087e-31a5-44d8-88f4-88a57e30e178/collection/50957138-99e6cbb0-b903-4f33-9bda-d46d8d072362?action=share&creator=50957138&active-environment=50957138-fecde5c1-4707-449c-90f4-cc92c837dfd1&sideView=agentMode"
  },
];
// === EXPERIENCE ===
export const experience = [
  {
    role: "Full-Stack .NET Developer",
    place: "Freelance & Contract",
    period: "2023 - Present",
    description: "Architecting end-to-end solutions for international clients, ensuring seamless integration between .NET APIs and modern JS frameworks (React/Angular).",
  },
  {
    role: "Software Engineering Trainee",
    place: "ITI (Information Technology Institute)",
    period: "2024",
    description: "Mastered full-stack development cycles, focusing on Clean Code, SOLID principles, and Agile methodologies within the .NET ecosystem.",
  },
  {
    role: "General Practitioner Dentist",
    place: "Ministry of Health / Private Clinics",
    period: "2021 - 2023",
    description: "Working as a general dentist, where I developed high skills in dealing with complex cases, time management, working under pressure, and attention to the finest anatomical and technical details.",
  },
  {
    role: "Dental Intern",
    place: "Minia University & Public Hospitals",
    period: "2021",
    description: "The medical internship period; intensive practical training in surgery and medical diagnosis, which contributed to building an organized analytical mindset.",
  },
];

// === EDUCATION ===
export const education = [
  {
    degree: "ITI Graduate Full Stack .NET Web Developer",
    university: "Information Technology Institute (ITI)",
    year: "07/2025 - 12/2025",
    description: "Mastered full-stack development cycles, focusing on Clean Code, SOLID principles, and Agile methodologies within the .NET ecosystem.",
  },
  {
    degree: "Bachelor of Oral and Dental Medicine and Surgery",
    university: "Minia University",
    year: "2016 - 2021",
    description: "Built a solid analytical foundation and precision-oriented mindset during my medical studies, which I've seamlessly transitioned into software solutions.",
  },
];
// === SOCIAL LINKS ===
export const socialLinks = [
  {
    platform: "GitHub",
    url: "https://github.com/jodx19",
    icon: "Github"
  },
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/mahmoud-mostafa-elsafi",
    icon: "Linkedin"
  },
  {
    platform: "Email",
    url: "mailto:ma7moudmostafa19@gmail.com",
    icon: "Mail"
  },
];
// === CONTACT INFO ===
export const contactInfo = {
  phone: "01118286088",
  email: "ma7moudmostafa19@gmail.com",
  location: "Remote /Cairo, Egypt",
};