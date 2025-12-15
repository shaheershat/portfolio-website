import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu, X, Home, User, Code, Mail, Linkedin, Github, Filter, Zap, BookOpen, ChevronRight, ArrowUpRight, Twitter // Added Twitter icon
} from 'lucide-react';

// --- Static Data Definitions ---

const user = {
  name: "Shaheer Sha T",
  title: "Shopify & Full-Stack Python Developer",
  tagline: "Building scalable e-commerce solutions and robust backend systems.",
  bio: "I am a dedicated developer with 7+ years of experience specializing in custom Shopify theme development, API integrations, and building resilient full-stack applications using Python/Django/Flask. My passion lies in optimizing performance and creating seamless user experiences that drive business growth.",
  expertise: [
    "Shopify Theme Development (Liquid)",
    "Custom App Development (Node/Python)",
    "Full-Stack Python (Django, Flask)",
    "Cloud Services (AWS, Vercel)",
    "Front-end (React, Tailwind CSS)",
    "Database Management (PostgreSQL, MongoDB)",
  ],
  photoUrl: "https://placehold.co/400x400/10b981/ffffff?text=Professional+Photo", // Placeholder
  logoUrl: "https://placehold.co/100x100/1f2937/ffffff?text=AV", // Placeholder for Logo/Monogram
  email: "shaheershat@gmail.com",
  social: {
    linkedin: "https://linkedin.com/in/shaheershat",
    github: "https://github.com/shaheershat",
    twitter: "https://twitter.com/shaheershat",
  }
};

const projectsData = [
  {
    id: 1,
    title: "Eco-Wear Custom Shopify Theme",
    category: "Shopify",
    description: "Developed a high-performance, mobile-first Shopify theme from scratch. Implemented custom sections, dynamic checkout customizations, and integrated a third-party loyalty program API.",
    tech: ["Shopify Liquid", "SCSS", "JavaScript", "Theme Kit"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    id: 2,
    title: "Inventory Sync API (Python/Django)",
    category: "Python",
    description: "A robust Django REST framework application to sync inventory levels between a proprietary warehouse system and multiple Shopify stores in real-time. Features Webhooks and background task processing.",
    tech: ["Python", "Django", "Django Rest Framework", "PostgreSQL", "Celery"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    id: 3,
    title: "Portfolio Website V2 (React)",
    category: "Front-end",
    description: "This very website! Built with React and Tailwind CSS for a fully responsive, animated, and dark-mode enabled experience, focusing on performance and modularity.",
    tech: ["React", "Tailwind CSS", "Vite (Simulated)", "JavaScript"],
    demoLink: "#",
    repoLink: "#",
  },
  {
    id: 4,
    title: "Flask Microservice for Image Optimization",
    category: "Python",
    description: "A small, fast Flask microservice deployed on AWS Lambda that processes and optimizes product images uploaded to Shopify, ensuring faster load times.",
    tech: ["Python", "Flask", "Pillow", "AWS Lambda", "S3"],
    demoLink: "#",
    repoLink: "#",
  },
];

const articlesData = [
  {
    id: 1,
    title: "Optimizing Liquid for 100% Core Web Vitals",
    summary: "Deep dive into Liquid snippets and strategies to achieve perfect performance scores on Shopify stores.",
    date: "Sep 15, 2024",
    link: "#",
  },
  {
    id: 2,
    title: "The Power of Webhooks in Django for E-commerce",
    summary: "How to effectively utilize Django's signal system and external Webhooks for event-driven architecture.",
    date: "Aug 28, 2024",
    link: "#",
  },
];

// --- Utility Functions & Custom Hooks ---

/**
 * Custom hook to detect when an element scrolls into view for animation effect.
 */
const useInViewAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      // Small timeout to ensure the component is mounted before setting visible for initial animation
      setTimeout(() => setIsVisible(true), 100); 
    }
  }, []);

  return [ref, isVisible];
};

/**
 * Manually handle smooth scrolling to sections.
 * @param {string} id The element ID to scroll to.
 */
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    window.scrollTo({
      top: element.offsetTop - 80, // Offset for fixed header
      behavior: 'smooth'
    });
  }
};

// --- Components ---

const Header = ({ activeSection, scrollTo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", id: "home", icon: Home },
    { name: "About", id: "about", icon: User },
    { name: "Projects", id: "projects", icon: Code },
    { name: "Blog", id: "blog", icon: BookOpen },
    { name: "Contact", id: "contact", icon: Mail },
  ];

  const handleNavClick = (id) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-sm shadow-md transition-shadow duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a href="#home" onClick={() => scrollTo('home')} className="text-2xl font-extrabold text-indigo-600">
          {user.logoUrl ? <img src={user.logoUrl} alt="Logo" className="h-8 w-8 rounded-full inline-block mr-2" /> : "AV"} {user.name.split(' ')[0]}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors duration-300 relative group
                ${activeSection === item.id ? 'text-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transition-transform duration-300 transform ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full text-gray-700 bg-gray-100 hover:ring-2 ring-indigo-500 transition duration-300"
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4 space-y-2 border-t border-gray-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-300
                ${activeSection === item.id ? 'bg-indigo-100 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};


const HeroSection = ({ scrollTo }) => {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-48 md:pb-36 overflow-hidden min-h-screen-minus-header flex items-center bg-gray-50 transition-colors duration-500">
      {/* Background Parallax Effect Simulation */}
      <div className="absolute inset-0 opacity-10 bg-indigo-600/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 z-10 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg font-semibold text-indigo-600 mb-4 animate-pulse">
            Hello, I'm Shaheer Sha T
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight mb-6">
            {user.title}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {user.tagline}
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollTo('projects')}
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>View My Projects</span>
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="px-8 py-3 bg-white text-indigo-600 border border-indigo-600 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02]"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <section id="about" className="py-24 md:py-36 bg-white transition-colors duration-500">
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Personal Info Column */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <img
              src={user.photoUrl}
              alt="Alex Vesper Professional Photo"
              className="w-40 h-40 object-cover rounded-full mx-auto lg:mx-0 mb-6 shadow-xl ring-4 ring-indigo-500/50"
            />
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h3>
            <p className="text-indigo-600 font-medium mb-6">{user.title}</p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href={user.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200">
                <Github className="w-6 h-6" />
              </a>
              {/* Optional personal branding element */}
              <div className="h-6 w-px bg-gray-300"></div>
              <p className="text-sm font-bold text-gray-700 self-center">Monogram: AV</p>
            </div>
          </div>

          {/* Bio Column */}
          <div className="lg:col-span-2">
            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Professional Overview</h4>
            <p className="text-gray-600 leading-relaxed mb-8">
              {user.bio}
            </p>

            <h4 className="text-2xl font-semibold text-gray-900 mb-4">Key Expertise</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.expertise.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <ChevronRight className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <div ref={ref} className={`bg-white rounded-xl shadow-xl p-6 flex flex-col h-full transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <span className="inline-block text-xs font-semibold px-3 py-1 mb-3 rounded-full bg-indigo-100 text-indigo-600">
        {project.category}
      </span>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
      <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto flex space-x-3 pt-4 border-t border-gray-100">
        <a
          href={project.demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition duration-300"
        >
          Live Demo
        </a>
        <a
          href={project.repoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          Repository
        </a>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const categories = ["All", ...new Set(projectsData.map(p => p.category))];
  const [activeFilter, setActiveFilter] = useState("All");
  
  const filteredProjects = activeFilter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 md:py-36 bg-gray-50 transition-colors duration-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Recent Projects</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          A selection of significant works in Shopify e-commerce and full-stack Python development.
        </p>

        {/* Filter Bar */}
        <div className="flex justify-center flex-wrap gap-3 mb-12">
          <Filter className="w-5 h-5 text-gray-500 self-center hidden sm:block" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300
                ${activeFilter === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-800 hover:bg-indigo-100 hover:text-indigo-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-center text-xl text-gray-500 mt-10">No projects found for the selected filter.</p>
        )}
      </div>
    </section>
  );
};

const BlogSection = ({ scrollTo }) => {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <section id="blog" className="py-24 md:py-36 bg-white transition-colors duration-500">
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Insights & Articles</h2>
        <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Sharing knowledge and best practices on e-commerce optimization and full-stack architecture.
        </p>

        <div className="space-y-8 max-w-3xl mx-auto">
          {articlesData.map(article => (
            <div key={article.id} className="p-6 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-indigo-500">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  <a href={article.link} onClick={(e) => { e.preventDefault(); console.log('Simulating navigation to blog post'); }}>{article.title}</a>
                </h3>
                <span className="text-sm font-medium text-gray-500 flex-shrink-0 ml-4">{article.date}</span>
              </div>
              <p className="text-gray-600 mb-4">{article.summary}</p>
              <a
                href={article.link}
                onClick={(e) => { e.preventDefault(); console.log('Simulating navigation to blog post'); }}
                className="inline-flex items-center text-indigo-600 font-medium hover:underline text-sm"
              >
                Read Article <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button
            onClick={() => scrollTo('contact')}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300"
          >
            Suggest a Topic
          </button>
        </div>
      </div>
    </section>
  );
};


// 🔄 UPDATED: ContactSection implemented with the new simplified/centered layout and fixed to Light Mode styling.
const ContactSection = () => {
  const [ref, isVisible] = useInViewAnimation();

  return (
    <section id="contact" className={`py-24 md:py-36 bg-white transition-colors duration-500`}>
      <div ref={ref} className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-xl mx-auto text-center">
          <h2 className={`text-4xl font-bold mb-4 text-gray-900`}>
            Get In Touch
          </h2>
          <p className={`text-lg mb-10 text-gray-600`}>
            Have a project idea, a job opportunity, or just want to say hi? My inbox is always open.
          </p>
          <div className="flex flex-col space-y-4">
            <a 
              href={`mailto:${user.email}`}
              // Using Indigo color scheme for consistency
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center shadow-lg shadow-indigo-500/50"
            >
              <Mail className="w-5 h-5 mr-3" />
              Email Me Directly
            </a>
            <p className={`text-sm text-gray-500 mt-6`}>or find me on social media</p>
            <div className="flex justify-center space-x-6 pt-4">
              {Object.entries(user.social).map(([platform, url]) => {
                let Icon = null;
                if (platform === 'github') Icon = Github;
                if (platform === 'linkedin') Icon = Linkedin;
                if (platform === 'twitter') Icon = Twitter; // Now imported
                if (!Icon) return null;
                return (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    // Cleaned up classes for light mode only
                    className="text-gray-500 hover:text-indigo-600 transition-colors p-3 rounded-full border border-gray-300 hover:border-indigo-500"
                    aria-label={platform}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Footer = ({ scrollTo }) => (
  <footer className="py-10 bg-gray-100 border-t border-gray-200 transition-colors duration-500">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <button onClick={() => scrollTo('home')} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Home</button>
        <button onClick={() => scrollTo('about')} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">About</button>
        <button onClick={() => scrollTo('projects')} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Projects</button>
        <button onClick={() => scrollTo('contact')} className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Contact</button>
      </div>
      <p className="text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {user.name}. All rights reserved.
      </p>
    </div>
  </footer>
);


// --- Main Application Component ---
const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Utility function for scrolling
  const scrollToSectionCallback = useCallback((sectionId) => {
    scrollToSection(sectionId);
  }, []);

  // Effect to handle intersection observation for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' } 
    );

    ['home', 'about', 'projects', 'blog', 'contact'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
  
  // Render
  return (
    <div className={`font-sans text-base`}>
      <style>{`
        /* Global Styles and Smooth Scroll */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding-top: 0; 
          background-color: #ffffff; /* Fixed light background */
        }
        
        /* Custom height for better viewport use */
        .min-h-screen-minus-header {
            min-height: calc(100vh - 80px);
        }
      `}</style>
      
      <Header activeSection={activeSection} scrollTo={scrollToSectionCallback} />
      
      <main>
        <HeroSection scrollTo={scrollToSectionCallback} />
        <AboutSection />
        <ProjectsSection />
        <BlogSection scrollTo={scrollToSectionCallback} />
        <ContactSection /> {/* Now using the updated component */}
      </main>

      {/* Back to top button */}
      {activeSection !== 'home' && (
        <button
          onClick={() => scrollToSectionCallback('home')} 
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 text-white z-50"
          aria-label="Back to top"
        >
          {/* Using ArrowUpright icon with transform to simulate up arrow */}
          <ArrowUpRight className="w-5 h-5 rotate-[-135deg]" /> 
        </button>
      )}

      <Footer scrollTo={scrollToSectionCallback} />
    </div>
  );
};

export default App;
