import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createRoot } from 'react-dom/client';

// --- Types & Data ---

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  year: string;
  description: string;
  images: string[];
};

const PROJECTS_DATA: Project[] = [
  {
    id: 0,
    title: "The Vertex Tower",
    category: "Commercial Offices",
    location: "London, UK",
    year: "2023",
    description: "A landmark project defining the skyline. Utilizing sustainable materials and modern engineering to create a breathable workspace for the future. The design focuses on maximizing natural light while minimizing thermal gain.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 1,
    title: "Azure Interiors",
    category: "Hospitality",
    location: "Milan, Italy",
    year: "2022",
    description: "Interior design is the art and science of enhancing the interior of a space to achieve a healthier and more aesthetically pleasing environment for the occupants. This project involved a complete overhaul of a historic villa.",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    title: "Urban Nexus",
    category: "Banking",
    location: "Copenhagen, Denmark",
    year: "2021",
    description: "Urban planning is the interdisciplinary process of designing and managing land use, infrastructure, and community resources. Urban Nexus reconnects the city center with the waterfront through green corridors.",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1449824913929-49aa99573327?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    title: "Echo Park",
    category: "Retail",
    location: "Austin, USA",
    year: "2024",
    description: "Landscape architecture involves the planning, design, and management of outdoor spaces. Echo Park blends natural and built environments to enhance aesthetic, ecological, and functional aspects of the local community.",
    images: [
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558905545-0d04b684294b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582298538104-fe2e74c2ed54?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    title: "Skyline Harbor",
    category: "Aviation",
    location: "Sydney, Australia",
    year: "2023",
    description: "A waterfront commercial hub designed to resist rising sea levels while providing a vibrant public space.",
    images: [
      "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    title: "The Glass House",
    category: "Hospitality",
    location: "Oslo, Norway",
    year: "2022",
    description: "A minimalist residential project that blurs the line between indoor and outdoor living.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512958779453-164405865e69?q=80&w=1000&auto=format&fit=crop"
    ]
  }
];

// --- Theme Context ---
const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
});

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Icons (SVGs) ---
const Icons = {
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  ),
  ArrowLeft: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
  ),
  ChevronRightBig: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
  ),
  ChevronLeftBig: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
  ),
  CheckBig: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
      <line x1="4" x2="20" y1="9" y2="9"/>
      <line x1="4" x2="20" y1="15" y2="15"/>
    </svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ),
  Sun: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2"/><path d="M12 21v2"/><path d="M4.22 4.22l1.42 1.42"/><path d="M18.36 18.36l1.42 1.42"/><path d="M1 12h2"/><path d="M21 12h2"/><path d="M4.22 19.78l1.42-1.42"/><path d="M18.36 5.64l1.42-1.42"/></svg>
  ),
  Moon: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
  ),
  Hexagon: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M32 2L58 17V47L32 62L6 47V17L32 2Z" />
          <path d="M32 2V32" />
          <path d="M32 32L58 17" />
          <path d="M32 32L6 17" />
          <path d="M6 47L32 62" />
          <path d="M58 47L32 62" />
      </svg>
  ),
  AlertTriangle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  Info: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
  )
};

// --- Hooks ---

const useOnScreen = (options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible] as const;
};

const useCounter = (end: number, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [ref, isVisible] = useOnScreen();
  
  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, start, duration]);

  return [ref, count] as const;
};

const useScrollPercentage = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const element = ref.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const totalDistance = element.offsetHeight - windowHeight;
            const scrolledDistance = -rect.top;
            
            let percentage = scrolledDistance / totalDistance;
            percentage = Math.max(0, Math.min(1, percentage));
            
            setScrollPercentage(percentage);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return [ref, scrollPercentage] as const;
};

// Tracks which section is currently active in the viewport
const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } // Modified threshold to be more precise
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

// Tracks mouse position normalized from -1 to 1
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return mousePos;
};

// --- Project Detail Component ---
const ProjectDetail = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
       if (!isTransitioning) {
           nextImage();
       }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImageIndex, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex]);

  const nextImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
      setIsTransitioning(false);
    }, 300); 
  };

  const prevImage = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-white flex flex-col animate-[fadeIn_0.5s_ease-out]">
      <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4 md:p-8 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={onClose} aria-label="Go back to project list" className="flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:text-teal-400 transition-colors">
          <Icons.ArrowLeft /> Back to Projects
        </button>
        <button onClick={onClose} aria-label="Close project details" className="p-2 hover:rotate-90 transition-transform duration-300">
           <Icons.X />
        </button>
      </div>

      <div className="relative flex-grow w-full h-full overflow-hidden bg-stone-900">
        <img 
          src={project.images[currentImageIndex]} 
          alt={project.title} 
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        />
        
        <button 
          onClick={prevImage}
          aria-label="Previous image"
          className="absolute top-1/2 left-4 md:left-8 -translate-y-1/2 p-2 md:p-4 text-white hover:text-white hover:scale-110 transition-all duration-300 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full"
        >
          <Icons.ChevronLeftBig />
        </button>
        <button 
          onClick={nextImage}
          aria-label="Next image"
          className="absolute top-1/2 right-4 md:right-8 -translate-y-1/2 p-2 md:p-4 text-white hover:text-white hover:scale-110 transition-all duration-300 z-10 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full"
        >
          <Icons.ChevronRightBig />
        </button>
      </div>

      {/* Increased Overlay Darkness for better readability */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent pt-32 pb-8 md:pb-12 px-6 md:px-20 z-20">
        <div className="container mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
           <div className="max-w-3xl animate-[slideUp_0.5s_ease-out]">
              <div className="flex items-center gap-4 mb-2 text-teal-400 uppercase tracking-widest text-xs font-bold">
                 <span>{project.location}</span>
                 <span className="w-1 h-1 bg-current rounded-full"></span>
                 <span>{project.year}</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold font-space mb-4 md:mb-6 leading-none">
                {project.title}
              </h1>
              <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-2xl border-l-2 border-teal-500 pl-6">
                {project.description}
              </p>
           </div>
           
           <div className="flex flex-col items-end gap-2 text-right">
              <div className="text-4xl md:text-6xl font-space font-bold text-white/20">
                0{currentImageIndex + 1} <span className="text-xl md:text-2xl text-white/10">/ 0{project.images.length}</span>
              </div>
              <div className="flex gap-2">
                 {project.images.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      aria-label={`View image ${idx + 1}`}
                      className={`w-8 md:w-12 h-1 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-teal-500' : 'bg-white/20 hover:bg-white/40'}`}
                    />
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Section Components ---

const StatItem = ({ end, label, suffix = "+" }: { end: number, label: string, suffix?: string }) => {
  const [ref, count] = useCounter(end);
  return (
    <div ref={ref} className="p-4">
      <div className="text-3xl md:text-6xl font-bold font-space text-teal-500 mb-2">
        {count}{suffix}
      </div>
      <div className="text-stone-400 text-xs md:text-sm uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 md:py-20 pl-16 md:pl-20 bg-stone-950 border-y border-stone-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <StatItem end={25} label="Years Experience" />
          <StatItem end={150} label="Projects Completed" />
          <StatItem end={40} label="Awards Won" suffix="" />
          <StatItem end={12} label="Countries Served" />
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, isVisible] = useOnScreen();
  const mousePos = useMousePosition();

  return (
    <section id="about" className="py-16 md:py-32 pl-16 md:pl-20 bg-gray-50 dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          <div className="md:w-1/2 md:sticky md:top-32">
            <h2 className="text-3xl md:text-5xl font-bold font-space mb-6 leading-tight dark:text-white text-stone-900">
              Crafting Spaces <br />
              Since <span className="text-teal-600 dark:text-teal-400">1998</span>
            </h2>
            <div className={`space-y-6 dark:text-gray-400 text-stone-600 leading-relaxed reveal ${isVisible ? 'active' : ''}`} ref={ref}>
              <p>
                Wondrous is more than a construction company. We are partners in realizing your architectural dreams. With over two decades of experience in commercial and high-end residential sectors, we bring precision, passion, and unparalleled expertise to every project.
              </p>
            </div>
          </div>
          <div className="md:w-1/2 relative">
             <div className="grid grid-cols-2 gap-4">
               <img 
                 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop" 
                 className={`w-full h-[300px] md:h-[400px] object-cover rounded-sm reveal-scale ${isVisible ? 'active' : ''}`}
                 style={{ 
                    transitionDelay: '0.2s',
                    transform: isVisible ? `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)` : 'scale(0.9)',
                    transition: 'opacity 1s ease-out, transform 0.8s ease-out' 
                 }}
                 alt="Interior Detail 1" 
               />
               <img 
                 src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1200&auto=format&fit=crop" 
                 className={`w-full h-[300px] md:h-[400px] object-cover mt-8 md:mt-12 rounded-sm reveal-scale ${isVisible ? 'active' : ''}`}
                 style={{ 
                    transitionDelay: '0.4s',
                    transform: isVisible ? `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)` : 'scale(0.9)',
                    transition: 'opacity 1s ease-out, transform 0.8s ease-out' 
                 }}
                 alt="Interior Detail 2" 
               />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const History = () => {
  const [activeEra, setActiveEra] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ref, isVisible] = useOnScreen();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
  };

  const eras = [
    { 
      year: "2013", 
      title: "YES BANK LTD", 
      desc: "Corporate Office at Indiabulls Finance Centre, Mumbai. 3,00,000 Sft. Establishing a new standard for corporate banking environments.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000"
    },
    { 
      year: "2014", 
      title: "INDIABULLS CENTRE", 
      desc: "Executed massive scale commercial fit-outs for major financial institutions in the heart of Mumbai's financial district.",
      image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2000"
    },
    { 
      year: "2016", 
      title: "NIRANTA HOTELS", 
      desc: "Day Hotel Niranta 1 & 2 at Mumbai International Airport. Integrating hospitality directly within the transit ecosystem.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000"
    },
    { 
      year: "2018", 
      title: "MUMBAI AIRPORT", 
      desc: "Specialized high-security zone execution for transit hotels and premium lounges at Terminal 2.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000"
    },
    { 
      year: "2020", 
      title: "PREMIUM LOUNGES", 
      desc: "Continuing our legacy with advanced luxury lounge renovations, enhancing passenger experience through design.",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000"
    },
  ];

  return (
    <section 
        id="history" 
        className="py-16 md:py-32 pl-16 md:pl-20 bg-gray-100 dark:bg-[#1a1a1a] dark:text-gray-200 text-stone-900 transition-colors duration-300 overflow-hidden"
        onMouseMove={handleMouseMove}
    >
      <div className="container mx-auto px-6" ref={ref}>
        <h2 className={`text-2xl md:text-3xl font-space font-medium mb-12 md:mb-16 flex items-center gap-4 dark:text-white text-stone-900 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="w-2 h-2 border border-current inline-block"></span> In short
        </h2>

        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 relative">
          <div className="lg:w-1/2 relative z-10">
            <div className={`absolute left-[3px] top-4 bottom-4 w-[1px] bg-current opacity-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-20 scale-y-100' : 'opacity-0 scale-y-0'}`}></div>
            <div className="space-y-12 md:space-y-16" onMouseLeave={() => setActiveEra(null)}>
              {eras.map((era, idx) => (
                <div 
                  key={idx}
                  className={`group relative pl-10 md:pl-12 cursor-pointer transition-all duration-700 ease-out`}
                  style={{ 
                      opacity: isVisible ? 1 : 0, 
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transitionDelay: `${idx * 150}ms`
                  }}
                  onMouseEnter={() => setActiveEra(idx)}
                >
                  <div className={`absolute left-0 top-1 w-[7px] h-[7px] border border-current bg-transparent transition-all duration-300 ${activeEra === idx ? 'bg-current scale-150' : ''}`}></div>
                  
                  <h3 className={`text-base md:text-lg font-bold font-space uppercase mb-2 transition-colors duration-300 ${activeEra === idx ? 'text-teal-600 dark:text-teal-400' : 'opacity-50'}`}>
                    {era.year} {era.title}
                  </h3>
                  <p className={`text-xs md:text-sm leading-relaxed max-w-md transition-all duration-300 ${activeEra === idx ? 'opacity-100 translate-x-2' : 'opacity-60'}`}>
                    {era.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative min-h-[400px] md:min-h-[600px] perspective-1000 flex items-center justify-center pointer-events-none hidden md:flex">
             <div 
                className={`sticky top-32 w-full max-w-sm aspect-[3/5] rounded-sm bg-stone-200 dark:bg-[#111] shadow-2xl overflow-hidden transition-all duration-700 ease-out will-change-transform ${activeEra !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{
                    transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg)`
                }}
             >
                {eras.map((era, idx) => (
                  <img
                    key={idx}
                    src={era.image}
                    alt={era.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${activeEra === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Sidebar ---
const Sidebar = ({ onNavigate, activeSection }: { onNavigate: (view: string, hash?: string) => void, activeSection: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const menuItems = [
    { label: "about", href: "#about", id: "about" },
    { label: "services", href: "#featured-categories", id: "featured-categories" },
    { label: "showcase", href: "#showcase", id: "showcase" },
    { label: "partners", href: "#partners", id: "partners" },
    { label: "history", href: "#history", id: "history" },
    { label: "contact", href: "#contact", id: "contact" },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 z-50 flex flex-col justify-between items-center transition-colors duration-300
          ${isDark ? 'bg-[#0a0a0a] border-white/10' : 'bg-white border-black/10'}
          w-16 md:w-20 h-full border-r py-0 px-0
      `}>
        {/* TOP: HAMBURGER MENU - Sized exactly to match Close button */}
        <div className="h-20 w-full flex items-center justify-center">
             <button 
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
              className={`p-4 hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${isDark ? 'text-white' : 'text-black'}`}
            >
              <Icons.Menu />
            </button>
        </div>

        {/* MIDDLE: CONTACT */}
        <button 
          onClick={() => onNavigate('home', '#contact')}
          aria-label="Go to Contact Section"
          className={`flex items-center justify-center p-2 hover:text-teal-600 dark:hover:text-teal-400 transition-colors md:flex-grow ${isDark ? 'text-white' : 'text-black'}`}
        >
             <div className="flex flex-col items-center gap-4">
                {activeSection && activeSection !== 'home' && (
                    <span className="text-[10px] tracking-[0.3em] uppercase text-teal-500 font-bold transform transition-all duration-300 animate-[fadeIn_0.5s_ease-out]
                        hidden md:block vertical-rl
                    ">
                        {activeSection.replace('-', ' ')}
                    </span>
                )}
                <span className={`font-bold tracking-[0.2em] text-xs uppercase vertical-rl ${activeSection === 'contact' ? 'text-teal-500' : ''}`}>
                    Contact
                </span>
             </div>
        </button>

        {/* BOTTOM: LOGO - Primary Brand Color (Teal 400 - #2dd4bf) */}
        <div className="h-40 w-full flex items-center justify-center pb-8">
            <button 
              onClick={() => onNavigate('home', '#home')}
              aria-label="Go to Home"
              className="font-space font-bold text-[#2dd4bf] text-xl tracking-tighter hover:opacity-80 transition-opacity vertical-rl whitespace-nowrap"
            >
                WONDROUS
            </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] bg-white dark:bg-[#0a0a0a] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Left Control Column (Close + Theme) - Z-Index Increased to 70 and pointer-events-auto added */}
        <div className={`absolute top-0 left-0 
            w-16 h-full border-r px-0 flex flex-col items-center z-[70] pointer-events-auto
            md:w-20 md:h-full md:border-r md:border-b-0 md:flex-col md:px-0 md:items-center
            ${isDark ? 'border-white/10' : 'border-black/10'}`}>
            
            {/* Top Close Button - Aligned with Hamburger */}
             <div className="h-20 w-full flex items-center justify-center cursor-pointer">
                 <button onClick={() => setIsOpen(false)} aria-label="Close Menu" className={`p-4 hover:text-teal-600 dark:hover:text-teal-400 transition-colors ${isDark ? 'text-white' : 'text-black'}`}>
                    <Icons.X />
                </button>
             </div>

             {/* Theme Toggle - Moved here (Top-Left) */}
             <div className="mt-8 flex flex-col items-center gap-4 cursor-pointer">
                 <button 
                  onClick={toggleTheme}
                  aria-label="Toggle Theme"
                  className={`p-2 hover:text-teal-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {isDark ? <Icons.Sun /> : <Icons.Moon />}
                </button>
             </div>
        </div>

        <div className="h-full flex flex-col justify-center pl-24 md:pl-40 py-20 relative">
          
          <div className="flex-grow flex flex-col justify-center">
            <ul className="space-y-4">
                {menuItems.map((item, idx) => (
                <li key={idx} className="overflow-hidden">
                    <button 
                    onClick={() => {
                        setIsOpen(false);
                        onNavigate('home', item.href);
                    }}
                    className={`block text-4xl md:text-7xl font-bold font-space lowercase tracking-tight hover:ml-4 hover:text-teal-600 dark:hover:text-teal-400 transition-all duration-300 ${isDark ? 'text-white' : 'text-black'}`}
                    >
                    {item.label}
                    </button>
                </li>
                ))}
            </ul>
          </div>
           
           <div className="absolute bottom-20 left-24 md:left-40 flex flex-col items-start gap-8">
              {/* Updated Color for Menu Branding Text */}
              <h2 className="text-6xl md:text-8xl font-bold font-space leading-none tracking-tighter text-[#2dd4bf]">
                  Wondrous.
              </h2>
           </div>
        </div>
      </div>
    </>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (view: string, hash: string) => void }) => {
  const titleText = "BUILDING VISIONS";
  const mousePos = useMousePosition();
  
  return (
    <section id="home" className="relative h-screen min-h-[600px] md:min-h-[800px] flex items-center justify-center overflow-hidden pt-0 pl-16 md:pl-20">
      <div className="absolute inset-0 z-0 bg-black">
        <div 
          className="absolute inset-0 z-0 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x * 10}px, ${-mousePos.y * 10}px) scale(1.05)` }}
        >
          <img 
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=2000" 
            alt="Sky" 
            className="w-full h-full object-cover opacity-80" 
          />
        </div>

        <div 
          className="absolute inset-0 z-10 transition-transform duration-1000 ease-out"
          style={{ transform: `translate(${-mousePos.x * 25}px, ${-mousePos.y * 25}px) scale(1.05)` }}
        >
           <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern Architecture" 
            className="w-full h-full object-cover mt-20 grayscale"
            style={{ 
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 60%)'
            }}
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50/90 via-transparent to-transparent dark:from-[#0a0a0a] dark:via-transparent dark:to-transparent z-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-30 text-center">
        <p className="text-teal-600 dark:text-teal-400 font-medium tracking-[0.2em] mb-4 opacity-0 animate-[slideUp_0.8s_ease-out_0.2s_forwards]">EST. 1998</p>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold font-space leading-[0.9] tracking-tight mb-8 dark:text-white text-stone-900 flex flex-wrap justify-center gap-x-2 sm:gap-x-6">
          {titleText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="flex">
               {word.split("").map((char, charIndex) => (
                  <span 
                    key={charIndex} 
                    className={`inline-block opacity-0 animate-[particleReveal_1s_cubic-bezier(0.16,1,0.3,1)_forwards] ${wordIndex === 1 ? 'text-outline dark:text-outline' : ''}`}
                    style={{ animationDelay: `${0.3 + (wordIndex * 0.5) + (charIndex * 0.05)}s` }}
                  >
                    {char}
                  </span>
               ))}
            </span>
          ))}
        </h1>

        <p className="max-w-xl mx-auto dark:text-gray-300 text-white text-base md:text-lg mb-10 leading-relaxed opacity-0 animate-[slideUp_0.8s_ease-out_1.2s_forwards] mix-blend-difference">
          General contractor for high-end commercial spaces and bespoke interior design. We craft environments that inspire.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[slideUp_0.8s_ease-out_1.4s_forwards]">
          <button 
            onClick={() => onNavigate('home', '#featured-categories')}
            className="group flex items-center gap-2 bg-stone-900 dark:bg-white text-white dark:text-black px-8 py-4 rounded-none font-bold hover:bg-teal-600 dark:hover:bg-teal-600 hover:text-white dark:hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            View Projects
            <span className="group-hover:translate-x-1 transition-transform"><Icons.ArrowRight /></span>
          </button>
        </div>
      </div>
    </section>
  );
};

const Partners = ({ onOpenProject }: { onOpenProject: (id: number) => void }) => {
  const [selectedClient, setSelectedClient] = useState<{name: string, description: string, image: string, logo: string} | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Custom Tooltip Cursor Logic ---
  const [hoveredClientName, setHoveredClientName] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (cursorRef.current) {
              cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
          }
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  // -----------------------------------

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedClient) {
        document.body.style.overflow = 'hidden';
        setActiveCardIndex(0); // Reset to first card on open
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedClient]);

  const clients = [
    { 
        name: "Yes Bank Limited", 
        description: "A full-service commercial bank providing a complete range of products.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4f/Yes_Bank_SVG_Logo.svg"
    },
    { 
        name: "Niranta Airport Transit Hotel", 
        description: "A luxury resort combining modern architecture with natural landscapes.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600",
        logo: "https://www.nirantahotels.com/images/logo.png" 
    },
    { 
        name: "The Indian Hotels Company Limited (Taj)", 
        description: "India's strongest brand across industries and sectors.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1600",
        logo: "https://upload.wikimedia.org/wikipedia/en/9/92/Indian_Hotels_Company_Limited_logo.svg"
    },
    { 
        name: "GVK Power & Infrastructure", 
        description: "Leading Indian conglomerate with diverse interests in energy and resources.",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600",
        logo: "https://iconape.com/wp-content/png_logo_vector/gvk-logo.png"
    },
    { 
        name: "Larsen & Toubro", 
        description: "A major technology, engineering, construction, manufacturing and financial services conglomerate.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/L%26T.png?20141228172036"
    },
    { 
        name: "Bird Group", 
        description: "One of the fastest growing business conglomerates with interests in Travel Technology.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600",
        logo: "https://www.bird.in/images/BG-logo.png"
    },
    { 
        name: "Rustomjee Developers", 
        description: "Premier real estate developer in Mumbai, creating thoughtful living spaces.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1600",
        logo: "https://www.rustomjee.com/assets/front/img/logo.png"
    },
    { 
        name: "Jardine Lloyd Thompson", 
        description: "Global provider of insurance, reinsurance and employee benefits related advice.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Jardine_Lloyd_Thompson_logo.svg/500px-Jardine_Lloyd_Thompson_logo.svg.png"
    },
    { 
        name: "Xanadu Realty", 
        description: "Realty business strategy and institutional sales firm.",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600",
        logo: "https://www.xanadu.in/wp-content/uploads/2022/08/Xanadu_New_Logo-3.svg"
    },
  ];

  const scrollLeft = () => {
        if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.6, behavior: 'smooth' });
    };
  const scrollRight = () => {
        if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.6, behavior: 'smooth' });
    };

  const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      
      const children = Array.from(container.children).filter((child) => (child as HTMLElement).classList.contains('snap-center'));
      
      let closestIndex = 0;
      let minDistance = Infinity;

      children.forEach((child, index) => {
          const childRect = (child as HTMLElement).getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const childCenter = childRect.left + childRect.width / 2 - containerRect.left;
          
          // Distance from container center (clientWidth / 2)
          const distance = Math.abs((container.clientWidth / 2) - childCenter);
          
          if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
          }
      });

      if (closestIndex !== activeCardIndex) {
          setActiveCardIndex(closestIndex);
      }
  };

  return (
    <section id="partners" className="min-h-screen flex flex-col justify-center py-24 pl-16 md:pl-20 bg-white dark:bg-[#0a0a0a] transition-colors duration-300 border-y border-gray-200 dark:border-stone-800">
      
      {/* Custom Tooltip Element - UPDATED BG COLOR */}
      <div 
         ref={cursorRef}
         className="fixed top-0 left-0 pointer-events-none z-[120] transition-opacity duration-300 ease-out"
         style={{ opacity: hoveredClientName && !selectedClient ? 1 : 0 }}
       >
          <div className="bg-[#2dd4bf] text-stone-900 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-widest transform -translate-x-1/2 -translate-y-12 shadow-2xl border border-white/10 whitespace-nowrap">
             {hoveredClientName}
          </div>
       </div>

      <div className="container mx-auto px-6">
        <div className="mb-12">
            <h2 className="text-3xl font-space font-bold dark:text-white text-stone-900 mb-2">Trusted By</h2>
            <p className="dark:text-gray-400 text-stone-600">Our esteemed clients and partners</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10">
          {clients.map((client, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedClient(client)}
              onMouseEnter={() => setHoveredClientName(client.name)}
              onMouseLeave={() => setHoveredClientName(null)}
              className="group bg-white dark:bg-[#0a0a0a] aspect-[4/3] md:aspect-[16/9] flex flex-col items-center justify-center hover:bg-white dark:hover:bg-white transition-colors cursor-pointer p-8 relative overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="w-32 h-16 md:w-48 md:h-24 flex items-center justify-center transition-all duration-300">
                    <img 
                        src={client.logo} 
                        alt={client.name} 
                        className={`w-full h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 dark:brightness-0 dark:invert dark:opacity-60 dark:group-hover:brightness-100 dark:group-hover:invert-0 dark:group-hover:opacity-100 ${client.name.includes('Yes Bank') ? 'invert dark:brightness-100' : ''} ${client.name.includes('Bird Group') ? 'group-hover:invert dark:group-hover:invert' : ''}`} 
                    />
                  </div>
                  
                  {/* Hiding the old view button since we have the fancy cursor now, but keeping functionality */}
                  <div className="h-8 mt-4 overflow-hidden w-full flex justify-center opacity-0">
                    <span className="block translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-widest">
                        View Projects
                    </span>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedClient && (
        <div 
            className="fixed inset-0 z-[100] overflow-hidden flex flex-col animate-[fadeIn_0.5s_ease-out]" 
            onClick={() => setSelectedClient(null)}
        >
            <div className="absolute inset-0 z-0">
               {/* Background Image Transition */}
               {[0, 1, 2].map((i) => (
                   <img 
                       key={i}
                       src={PROJECTS_DATA[i % PROJECTS_DATA.length].images[0]} 
                       className={`absolute inset-0 w-full h-full object-cover blur-sm scale-105 transition-opacity duration-700 ease-in-out ${activeCardIndex === i ? 'opacity-100' : 'opacity-0'}`}
                       alt="Background"
                   />
               ))}
               <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"></div> 
               <div className="absolute inset-0 bg-gradient-to-t from-black via-stone-900/60 to-teal-900/30 mix-blend-multiply"></div> 
            </div>

            <button 
                className="absolute top-6 right-6 z-[110] p-3 text-white/70 hover:text-white transition-all hover:rotate-90 duration-300 bg-black/20 rounded-full hover:bg-white/10 backdrop-blur-md" 
                onClick={(e) => { e.stopPropagation(); setSelectedClient(null); }}
            >
                <Icons.X />
            </button>

            <div className="relative z-10 flex flex-col h-full pt-20 pb-8 md:pb-12 px-0">
                
                <div className="flex-none px-6 md:px-20 mb-8 md:mb-0 max-w-4xl">
                     <div className="h-16 mb-6 opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
                        <img src={selectedClient.logo} alt={selectedClient.name} className="h-full object-contain brightness-0 invert" />
                     </div>
                     <p className="text-gray-300 text-sm md:text-xl max-w-md font-sans leading-relaxed border-l-2 border-teal-500 pl-6 opacity-0 animate-[slideUp_0.5s_ease-out_0.4s_forwards]">{selectedClient.description}</p>
                </div>

                <div className="flex-grow flex items-center relative w-full">
                    <button onClick={(e) => { e.stopPropagation(); scrollLeft(); }} className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-white transition-all group hidden md:block">
                        <div className="opacity-70 group-hover:opacity-100 transition-opacity"><Icons.ChevronLeftBig /></div>
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); scrollRight(); }} className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-30 p-2 md:p-4 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md rounded-full text-white transition-all group hidden md:block">
                         <div className="opacity-70 group-hover:opacity-100 transition-opacity"><Icons.ChevronRightBig /></div>
                    </button>

                    <div 
                        ref={scrollContainerRef}
                        className="w-full h-full overflow-x-auto flex items-center px-6 md:px-20 gap-6 md:gap-12 py-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden" 
                        onClick={(e) => e.stopPropagation()}
                        onScroll={handleScroll}
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        onWheel={(e) => {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollLeft += (e.deltaY + e.deltaX);
                            }
                        }}
                    >
                        {/* Mocking multiple projects for the selected client using PROJECTS_DATA images as requested */}
                        {[0, 1, 2].map((i) => (
                            <div 
                                key={i} 
                                onClick={() => onOpenProject(i % 5)}
                                onMouseEnter={() => setActiveCardIndex(i)}
                                className={`relative flex-none snap-center w-[85vw] md:w-[60vw] lg:w-[45vw] aspect-[16/9] bg-stone-900/50 shadow-2xl overflow-hidden group select-none rounded-sm border transition-all duration-700 ease-out ${activeCardIndex === i ? 'border-teal-500/80 scale-100 opacity-100 z-10' : 'border-white/10 scale-90 opacity-40 hover:opacity-60'} cursor-pointer`}
                            >
                                <img 
                                    src={PROJECTS_DATA[i % PROJECTS_DATA.length].images[0]} 
                                    alt={`${selectedClient.name} Project ${i+1}`} 
                                    className="w-full h-full object-cover transition-all duration-1000 ease-in-out" 
                                    style={{ 
                                        filter: activeCardIndex === i ? 'none' : 'grayscale(100%) contrast(80%)',
                                    }}
                                />
                                 <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-1000 ${activeCardIndex === i ? 'opacity-100' : 'opacity-0'}`}></div>
                                {/* Adjusted padding to reposition text lower as requested */}
                                <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end">
                                     <h3 className={`text-xl md:text-3xl font-space font-bold text-white mb-2 transform transition-all duration-1000 ${activeCardIndex === i ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                        {PROJECTS_DATA[i % PROJECTS_DATA.length].title}
                                     </h3>
                                     
                                     <div className={`flex items-center gap-3 text-gray-300 text-xs md:text-sm font-medium uppercase tracking-wider transition-all duration-1000 delay-100 ${activeCardIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <span className="text-teal-400 font-bold">{PROJECTS_DATA[i % PROJECTS_DATA.length].year}</span>
                                        <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                        <span>{PROJECTS_DATA[i % PROJECTS_DATA.length].category}</span>
                                     </div>
                                     
                                     <div className={`mt-4 flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest transition-all duration-1000 delay-200 ${activeCardIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                        <span>View Project</span>
                                        <Icons.ArrowRight /> 
                                     </div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="w-4 md:w-20 flex-none"></div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </section>
  );
};

const PrivacyPage = ({ onHome }: { onHome: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-white animate-[fadeIn_0.5s_ease-out]">
            <div className="container mx-auto px-6 py-20 md:py-32">
                <button onClick={onHome} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-sm mb-12 hover:opacity-80 transition-opacity">
                    <Icons.ArrowLeft /> Back to Home
                </button>
                <h1 className="text-5xl md:text-7xl font-bold font-space mb-16">Privacy Policy</h1>
                
                <div className="max-w-3xl space-y-12 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                    <section>
                        <h2 className="text-2xl font-bold font-space text-stone-900 dark:text-white mb-4">1. Information Collection</h2>
                        <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or communicate with us. This may include your name, email address, phone number, and project details.</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold font-space text-stone-900 dark:text-white mb-4">2. Use of Information</h2>
                        <p>We use the information we collect to respond to your inquiries, provide the services you request, communicate with you about our projects, and improve our website and client experience.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold font-space text-stone-900 dark:text-white mb-4">3. Data Protection</h2>
                        <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet is 100% secure.</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-bold font-space text-stone-900 dark:text-white mb-4">4. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us via our contact form or at privacy@wondrous.studio.</p>
                    </section>
                </div>
            </div>
            <Footer onNavigate={() => {}} />
        </div>
    );
};

const SuccessPage = ({ onHome }: { onHome: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-white p-6 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="text-teal-600 dark:text-teal-400 mb-8 animate-[scaleIn_0.5s_cubic-bezier(0.175,0.885,0.32,1.275)]">
                <Icons.CheckBig />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-space mb-6">Message Sent Successfully!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mb-12 leading-relaxed">
                Thank you for reaching out to Wondrous Studio. We have received your message and will be in touch with you shortly.
            </p>
            <button 
                onClick={onHome}
                className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-teal-600 dark:hover:bg-teal-600 hover:text-white dark:hover:text-white transition-all duration-300"
            >
                Return Home
            </button>
        </div>
    );
};

const NotFoundPage = ({ onHome }: { onHome: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-white p-6 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="text-teal-600 dark:text-teal-400 mb-8">
                <Icons.AlertTriangle />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-space mb-6">404 - Page Not Found</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg mb-12 leading-relaxed">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <button 
                onClick={onHome}
                className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-black font-bold uppercase tracking-widest hover:bg-teal-600 dark:hover:bg-teal-600 hover:text-white dark:hover:text-white transition-all duration-300"
            >
                Return Home
            </button>
        </div>
    );
};

const StyleGuidePage = ({ onHome }: { onHome: () => void }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-white animate-[fadeIn_0.5s_ease-out]">
            <div className="container mx-auto px-6 py-20 md:py-32">
                <button onClick={onHome} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-sm mb-12 hover:opacity-80">
                   <Icons.ArrowLeft /> Back to Home
                </button>
                <h1 className="text-5xl md:text-7xl font-bold font-space mb-20">Design Style Guide</h1>

                <div className="space-y-24">
                    {/* Colors */}
                    <section>
                        <h2 className="text-2xl font-space font-bold mb-8 border-b dark:border-white/10 pb-4">Colors</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="space-y-2">
                                <div className="h-32 bg-teal-600 rounded-sm"></div>
                                <div className="font-bold">Teal 600</div>
                                <div className="text-sm opacity-60">#0d9488</div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-32 bg-teal-400 rounded-sm"></div>
                                <div className="font-bold">Teal 400</div>
                                <div className="text-sm opacity-60">#2dd4bf</div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-32 bg-stone-900 rounded-sm"></div>
                                <div className="font-bold">Stone 900</div>
                                <div className="text-sm opacity-60">#1c1917</div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-32 bg-[#0a0a0a] border dark:border-white/10 rounded-sm"></div>
                                <div className="font-bold">Black (Dark Bg)</div>
                                <div className="text-sm opacity-60">#0a0a0a</div>
                            </div>
                        </div>
                    </section>

                    {/* Typography */}
                    <section>
                        <h2 className="text-2xl font-space font-bold mb-8 border-b dark:border-white/10 pb-4">Typography</h2>
                        <div className="space-y-12">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Space Grotesk - Headings</div>
                                    <div className="text-6xl font-space font-bold">Building Visions</div>
                                </div>
                                <div>
                                    <div className="text-sm uppercase tracking-widest text-gray-500 mb-2">Inter - Body</div>
                                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                                        General contractor for high-end commercial spaces and bespoke interior design. We craft environments that inspire.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-baseline gap-8">
                                    <span className="w-24 text-sm text-gray-500">H1</span>
                                    <span className="text-5xl md:text-7xl font-space font-bold">Heading 1</span>
                                </div>
                                <div className="flex items-baseline gap-8">
                                    <span className="w-24 text-sm text-gray-500">H2</span>
                                    <span className="text-4xl md:text-5xl font-space font-bold">Heading 2</span>
                                </div>
                                <div className="flex items-baseline gap-8">
                                    <span className="w-24 text-sm text-gray-500">H3</span>
                                    <span className="text-2xl md:text-3xl font-space font-bold">Heading 3</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* UI Elements */}
                    <section>
                        <h2 className="text-2xl font-space font-bold mb-8 border-b dark:border-white/10 pb-4">UI Elements</h2>
                        <div className="flex flex-wrap gap-8 mb-12">
                            <button className="px-8 py-4 bg-stone-900 dark:bg-white text-white dark:text-black font-bold hover:bg-teal-600 dark:hover:bg-teal-600 hover:text-white dark:hover:text-white transition-all duration-300">
                                Primary Button
                            </button>
                            
                            <button className="px-8 py-4 border border-stone-300 dark:border-stone-700 text-sm font-bold uppercase tracking-widest hover:bg-teal-600 dark:hover:bg-teal-600 hover:border-teal-600 dark:hover:border-teal-600 hover:text-white transition-colors">
                                Secondary Button
                            </button>

                            <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-sm hover:opacity-80">
                                Link Button <Icons.ArrowRight />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
            <Footer onNavigate={() => {}} />
        </div>
    );
};

const SiteMapPage = ({ onHome }: { onHome: () => void }) => {
    const [selectedElement, setSelectedElement] = useState<{name: string, description: string} | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const structure = [
        {
            category: "Pages",
            items: [
                { name: "Home View", description: "The main landing page containing all primary sections like Hero, About, and Projects." },
                { name: "Privacy Policy", description: "Legal document outlining how user data is collected, processed, and protected." },
                { name: "Success Page", description: "User feedback page displayed immediately after a successful contact form submission." },
                { name: "404 Not Found", description: "Error page displayed when a user attempts to navigate to a non-existent route." },
                { name: "Style Guide", description: "A comprehensive documentation of design tokens, including colors, typography, and reusable UI components." },
                { name: "Change Log", description: "A chronological record of all updates, bug fixes, and modifications made to the website." },
                { name: "Site Map", description: "This page: A hierarchical interactive view of the website's entire structure and components." }
            ]
        },
        {
            category: "Home Sections",
            items: [
                { name: "Sidebar Menu", description: "Fixed navigation sidebar with hamburger menu, theme toggle, and section shortcuts." },
                { name: "Hero Section", description: "The visual introduction of the site featuring animated typography and mouse-parallax background effects." },
                { name: "Stats Counter", description: "Animated numerical statistics showcasing company achievements and experience." },
                { name: "About Section", description: "Company overview with scroll-triggered animations and mouse-responsive image elements." },
                { name: "Featured Categories", description: "A horizontal sticky-scroll section on desktop and vertical stack on mobile displaying key project categories." },
                { name: "Showcase", description: "A horizontal parallax scrolling section displaying a curated list of top projects." },
                { name: "Partners Grid", description: "A grid layout of client logos. Hovering triggers a custom cursor tooltip, clicking opens a detailed modal." },
                { name: "History Timeline", description: "Interactive timeline of company milestones with 3D card tilt effects on desktop." },
                { name: "Footer", description: "Site footer containing contact form, address details, and links to utility pages." }
            ]
        },
        {
            category: "Key Components",
            items: [
                { name: "ProjectDetail Modal", description: "Full-screen overlay for viewing detailed project information and image galleries." },
                { name: "Partners Client Modal", description: "Specialized modal for viewing specific client portfolios with horizontal scroll capability." },
                { name: "Theme Provider", description: "Context provider managing the application's dark and light mode state." },
                { name: "Custom Tooltips", description: "JavaScript-driven custom cursor elements that follow mouse movement for enhanced interactivity." }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-stone-900 dark:text-white animate-[fadeIn_0.5s_ease-out]">
            <div className="container mx-auto px-6 py-20 md:py-32">
                 <button onClick={onHome} className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold uppercase tracking-widest text-sm mb-12 hover:opacity-80">
                   <Icons.ArrowLeft /> Back to Home
                </button>
                <h1 className="text-5xl md:text-7xl font-bold font-space mb-20">Site Structure</h1>

                <div className="grid md:grid-cols-3 gap-16">
                    {structure.map((section, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl font-space font-bold mb-8 border-b-2 border-teal-500 pb-4 inline-block">{section.category}</h2>
                            <ul className="space-y-4">
                                {section.items.map((item, i) => (
                                    <li key={i}>
                                        <button 
                                            onClick={() => setSelectedElement(item)}
                                            className="flex items-center gap-3 text-lg text-gray-600 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors text-left group w-full"
                                        >
                                            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full group-hover:scale-150 transition-transform"></span>
                                            {item.name}
                                            <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"><Icons.Info /></span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                <div className="mt-20 p-8 bg-gray-100 dark:bg-white/5 rounded-sm border border-gray-200 dark:border-white/10">
                    <h3 className="font-bold font-space text-xl mb-4">Note to Developers</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        This site uses a single-page application architecture built with React. Navigation is handled via state changes (`currentView`) rather than traditional routing. 
                        Global state management handles Theme (Dark/Light) across all components.
                        Click on any element above to see its technical description.
                    </p>
                </div>
            </div>

            {/* Description Overlay */}
            {selectedElement && (
                <div className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-[fadeIn_0.3s_ease-out]" onClick={() => setSelectedElement(null)}>
                    <div className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 max-w-2xl w-full border border-teal-500/30 shadow-2xl relative animate-[scaleIn_0.3s_ease-out]" onClick={(e) => e.stopPropagation()}>
                        <button 
                            onClick={() => setSelectedElement(null)}
                            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-teal-500 transition-colors"
                        >
                            <Icons.X />
                        </button>
                        <div className="text-teal-500 mb-4">
                            <Icons.Hexagon />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-space font-bold mb-6 text-stone-900 dark:text-white">{selectedElement.name}</h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            {selectedElement.description}
                        </p>
                    </div>
                </div>
            )}

            <Footer onNavigate={() => {}} />
        </div>
    );
};

const ChangeLogPage = ({ onHome }: { onHome: () => void }) => {
    const changes = [
        { 
            date: "2024-10-27", 
            title: "Site Map & Interaction Updates", 
            items: [
                "Reverted Partners Modal to original clean design (removed top nav bar).",
                "Updated Site Map to include interactive description overlays for all elements.",
                "Maintained full corporate names and primary color tooltips."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Navigation & Content Update", 
            items: [
                "Implemented full corporate names for all partners.",
                "Updated Partners Tooltip to use Primary Brand Color (Teal 400).",
                "Added 'Site Map' page to footer navigation.",
                "Added Center Aligned Navigation Bar to Partners Modal with colored logos and navigation controls."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Interaction & Logo Fixes", 
            items: [
                "Fixed Sidebar Menu interaction: Close button and Theme Toggle are now fully clickable (z-index fix).",
                "Updated Partner logos for L&T, Bird Group, and Rustomjee to reliable sources.",
                "Ensured Sidebar Close button is perfectly aligned with the Hamburger button.",
                "Moved Theme Setting (Sun/Moon) to the top-left of the sidebar overlay for better accessibility.",
                "Updated Menu Overlay Branding: 'Wondrous.' is now teal (#2dd4bf)."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Specified Updates & Design Tweaks", 
            items: [
                "Moved Theme Setting (Sun/Moon) to top-left of sidebar overlay.",
                "Centered navigation menu items vertically in the overlay.",
                "Changed Sidebar 'Wondrous' logo color to specified Teal (#2dd4bf).",
                "Updated Partner logos (Rustomjee, Niranta, Bird Group, L&T) with corrected images.",
                "Aligned Hamburger and Close buttons perfectly.",
                "Restored full Changelog history."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Restoration Updates", 
            items: [
                "Reverted 'About' section to original image-rich layout.",
                "Ensured 'Selected Works' and 'Partners' sections retain their complex interactive layouts.",
                "Restored missing page components to fix white screen crash."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Reverted Sections", 
            items: [
                "Reverted 'Selected Works' (Showcase) to horizontal scrolling layout.",
                "Reverted 'Partners' section to grid layout with interactive modal details."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Design Updates & Style Guide", 
            items: [
                "Inverted parallax effect on Home page for better natural feel.",
                "Updated Sidebar Menu: Restored theme toggle and added large brand logo.",
                "Added complete Design Style Guide page.",
                "Removed changelog link from Hero section to clean up UI."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-27", 
            title: "Visual & Navigation Updates", 
            items: [
                "Updated Hero section background to pure black for better contrast.",
                "Redesigned Sidebar menu footer.",
                "Added 'HUGE COMPANY LOGO' placeholder in the sidebar menu."
            ],
            type: "specified"
        },
        { 
            date: "2024-10-26", 
            title: "Brand Asset Updates", 
            items: ["Updated partner logos for Yes Bank, L&T, and Taj Group."],
            type: "specified"
        },
        { 
            date: "2024-10-25", 
            title: "Bug Fixes", 
            items: ["Fixed white screen issue by restoring full file content.", "Fixed mobile layout for featured categories."],
            type: "specified"
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20 font-sans animate-[fadeIn_0.5s_ease-out]">
             <button onClick={onHome} className="flex items-center gap-2 text-teal-400 font-bold uppercase tracking-widest text-sm mb-12 hover:opacity-80 transition-opacity">
                <Icons.ArrowLeft /> Back to Home
             </button>
             <h1 className="text-5xl md:text-7xl font-bold font-space mb-16">Change Log</h1>
             <div className="max-w-4xl space-y-16">
                {changes.map((change, idx) => (
                    <div key={idx} className="border-l border-white/20 pl-8 relative">
                        <div className={`absolute -left-1.5 top-2 w-3 h-3 rounded-full ${change.type === 'unspecified' ? 'bg-red-500' : 'bg-teal-500'}`}></div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                            <span className="text-2xl font-bold font-space">{change.title}</span>
                            <span className="text-gray-500 text-sm uppercase tracking-widest">{change.date}</span>
                        </div>
                        <ul className="space-y-4">
                            {change.items.map((item, i) => (
                                <li key={i} className="text-gray-300 text-lg leading-relaxed flex items-start gap-3">
                                    <span className={change.type === 'unspecified' ? 'text-red-500' : 'text-teal-500'}>
                                        {change.type === 'unspecified' ? '❌' : '•'}
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
             </div>
        </div>
    );
};

const Showcase = ({ onOpenProject }: { onOpenProject: (id: number) => void }) => {
    const [containerRef, scrollPercentage] = useScrollPercentage();
    const showcaseProjects = [...PROJECTS_DATA].reverse();
    const scrollItemsRef = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);

    useEffect(() => {
        const updateMaxScroll = () => {
            if (scrollItemsRef.current) {
                const scrollWidth = scrollItemsRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                setMaxScroll(scrollWidth - clientWidth + 300);
            }
        };

        updateMaxScroll();
        window.addEventListener('resize', updateMaxScroll);
        setTimeout(updateMaxScroll, 500); 

        return () => window.removeEventListener('resize', updateMaxScroll);
    }, [showcaseProjects]);

    return (
        <section id="showcase" ref={containerRef} className="relative h-[400vh] bg-stone-100 dark:bg-stone-950 transition-colors duration-300 pl-16 md:pl-20">
             <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
                <div className="container mx-auto px-6 mb-8 lg:mb-16">
                    <h2 className="text-3xl md:text-6xl font-space font-bold max-w-4xl leading-tight dark:text-white text-stone-900">
                        our featured projects showcase, <br/>
                        where <span className="text-teal-600 dark:text-teal-400">innovation</span> meets artistry
                    </h2>
                </div>
                <div 
                    ref={scrollItemsRef}
                    className="flex gap-4 md:gap-8 px-6 will-change-transform"
                    style={{ transform: `translateX(${-scrollPercentage * maxScroll}px)` }} 
                >
                    {showcaseProjects.map((project, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => onOpenProject(project.id)}
                            className="relative flex-none w-[80vw] md:w-[60vw] lg:w-[40vw] aspect-[4/3] md:aspect-[16/9] overflow-hidden group cursor-pointer"
                        >
                             <img 
                                src={project.images[0]} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                             />
                             <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full">
                                <span className="text-white font-space font-bold text-xl group-hover:text-teal-400 transition-colors">{project.title}</span>
                                <p className="text-gray-300 text-sm mt-1">{project.category}</p>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
};

const FeaturedCategories = ({ onOpenProject }: { onOpenProject: (id: number) => void }) => {
    const [activePoint, setActivePoint] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const categories = PROJECTS_DATA.slice(0, 4);

    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            // Only for desktop view
            if (window.innerWidth < 1024) return;
            
            const sections = contentRef.current.querySelectorAll('.scroll-point');
            const triggerLine = window.innerHeight * 0.5;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
                    setActivePoint(index);
                }
            });
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="featured-categories" className="pl-16 md:pl-20 bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
            <div className="container mx-auto">
                 <div className="py-16 md:py-20 px-6">
                    <h2 className="text-3xl md:text-6xl font-space font-bold max-w-2xl dark:text-white text-stone-900 leading-tight">
                        check out our latest <br/> featured projects
                    </h2>
                 </div>

                 {/* Mobile View: Vertical Stack (Images visible) */}
                 <div className="lg:hidden flex flex-col space-y-16 px-6 pb-16">
                    {categories.map((cat, index) => (
                        <div key={index} className="flex flex-col">
                            <div className="w-full aspect-[4/3] md:aspect-video mb-6 overflow-hidden relative group rounded-sm" onClick={() => onOpenProject(cat.id)}>
                                <img src={cat.images[0]} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                            <div>
                                 <div className="mb-4 text-teal-600 dark:text-teal-400"><Icons.Hexagon /></div>
                                 <h3 className="text-3xl font-space font-bold mb-4 dark:text-white text-stone-900">{cat.title}</h3>
                                 <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{cat.description}</p>
                                 <button 
                                   onClick={() => onOpenProject(cat.id)}
                                   className="inline-block px-6 py-3 border border-stone-300 dark:border-stone-700 text-sm font-bold uppercase tracking-widest hover:bg-teal-600 dark:hover:bg-teal-600 hover:border-teal-600 dark:hover:border-teal-600 hover:text-white transition-colors dark:text-white text-stone-900"
                                 >
                                     View Project
                                 </button>
                            </div>
                        </div>
                    ))}
                 </div>

                 {/* Desktop View: Sticky Scroll */}
                 <div className="hidden lg:flex flex-row relative" ref={contentRef}>
                    <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-stone-900 transition-colors duration-300 group cursor-pointer z-10" onClick={() => onOpenProject(categories[activePoint].id)}>
                        {categories.map((cat, index) => (
                             <img 
                                key={index}
                                src={cat.images[0]}
                                alt={cat.title}
                                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${activePoint === index ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                             />
                        ))}
                         <div className="absolute inset-0 bg-black/10 dark:bg-black/30 pointer-events-none group-hover:bg-black/0 transition-colors"></div>
                    </div>

                    <div className="w-1/2">
                        {categories.map((cat, index) => (
                            <div key={index} className="scroll-point min-h-screen flex items-center px-16 py-20 border-b border-gray-200 dark:border-stone-800 last:border-0 bg-white dark:bg-[#0f0f0f] relative z-20">
                                <div className={`transition-all duration-1000 ease-out ${activePoint === index ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-10'}`}>
                                    <div className="mb-8 text-teal-600 dark:text-teal-400">
                                       <Icons.Hexagon />
                                    </div>
                                    <h3 className="text-5xl font-bold font-space mb-6 dark:text-white text-stone-900">
                                        {cat.title}
                                    </h3>
                                    <p className="text-lg leading-relaxed dark:text-gray-400 text-stone-600 mb-8 line-clamp-3">
                                        {cat.description}
                                    </p>
                                    <button 
                                      onClick={() => onOpenProject(cat.id)}
                                      className="inline-block px-6 py-3 border border-stone-300 dark:border-stone-700 text-sm font-bold uppercase tracking-widest hover:bg-teal-600 dark:hover:bg-teal-600 hover:border-teal-600 dark:hover:border-teal-600 hover:text-white transition-colors dark:text-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    >
                                        View Project
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
        </section>
    );
};

const Footer = ({ onNavigate }: { onNavigate: (view: string, hash?: string) => void }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('success');
  };

  return (
    <footer id="contact" className="pl-16 md:pl-20 bg-[#1e1e1e] text-white">
      <div className="flex flex-col lg:flex-row h-full">
        <div className="lg:w-1/2 p-8 md:p-12 lg:p-24 border-r border-white/10 flex flex-col justify-between">
           <div>
             <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-space leading-none mb-4">
               Wondrous.<br/>Studio
             </h2>
           </div>
           <div className="mt-12 md:mt-20 space-y-12">
             <p className="max-w-md text-gray-400">
               if you have any suggestion or desire for cooperation, feel free to contact us via our contact details or contact form
             </p>
           </div>
        </div>

        <div className="lg:w-1/2 flex flex-col">
           <div className="flex flex-col md:flex-row border-b border-white/10">
              <div className="p-8 md:p-16 w-full md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
                 <h4 className="text-gray-500 mb-6">Address</h4>
                 <p className="text-gray-300 leading-relaxed">
                   9, 81 Hanover Park,<br/>
                   London SE15 5HD,<br/>
                   United Kingdom
                 </p>
              </div>
              <div className="p-8 md:p-16 w-full md:w-1/2">
                 <ul className="space-y-2 text-gray-300">
                   <li><button onClick={() => onNavigate('home', '#home')} className="hover:text-teal-400 text-left">Home</button></li>
                   <li><button onClick={() => onNavigate('home', '#featured-categories')} className="hover:text-teal-400 text-left">Latest Projects</button></li>
                 </ul>
              </div>
           </div>

           <div className="p-8 md:p-12 lg:p-16 flex-grow bg-[#222]">
              <h3 className="text-2xl md:text-3xl font-bold font-space mb-8">share you idea <br/>with our team</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <input type="text" placeholder="Your Name" required className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="email" placeholder="Email" required className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition-colors" />
                  <input type="tel" placeholder="Phone" className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition-colors" />
                </div>
                <div className="space-y-1">
                  <textarea placeholder="Your Message" rows={4} className="w-full bg-transparent border border-white/20 p-4 text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition-colors resize-none"></textarea>
                </div>
                
                <button type="submit" className="px-8 py-3 border border-white text-white hover:bg-teal-600 hover:border-teal-600 transition-colors uppercase tracking-widest text-sm font-bold mt-4 focus:outline-none focus:ring-2 focus:ring-teal-400">
                  Send Message
                </button>
              </form>
           </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 p-6 flex flex-col md:flex-row justify-between text-xs text-gray-600 uppercase tracking-wider gap-4 md:gap-0">
        <span>© 2024 Wondrous Studio</span>
        <div className="flex gap-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-teal-400">Privacy Policy</button>
            <button onClick={() => onNavigate('changelog')} className="hover:text-teal-400">Change Log</button>
            <button onClick={() => onNavigate('styleguide')} className="hover:text-teal-400">Style Guide</button>
            <button onClick={() => onNavigate('sitemap')} className="hover:text-teal-400">Site Map</button>
            <button onClick={() => onNavigate('404')} className="hover:text-teal-400 opacity-50">404 Page</button>
        </div>
      </div>
    </footer>
  );
};

const HomeView = ({ onOpenProject, onNavigate }: { onOpenProject: (id: number) => void, onNavigate: (view: string, hash: string) => void }) => {
    const activeSection = useActiveSection(['home', 'about', 'featured-categories', 'showcase', 'partners', 'history', 'contact']);

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, []);

    return (
        <div className="animate-[fadeIn_0.5s_ease-out]">
            <Sidebar onNavigate={onNavigate} activeSection={activeSection} />
            <Hero onNavigate={onNavigate} />
            <Stats />
            <About />
            <FeaturedCategories onOpenProject={onOpenProject} />
            <Showcase onOpenProject={onOpenProject} />
            <Partners onOpenProject={onOpenProject} />
            <History />
            <Footer onNavigate={onNavigate} />
        </div>
    );
};

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  const handleNavigate = (view: string, hash?: string) => {
    setCurrentView(view);
    if (view === 'home') {
      setSelectedProjectId(null);
      if (hash) {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
         window.scrollTo(0,0);
      }
    }
  };

  const handleOpenProject = (id: number) => {
    setSelectedProjectId(id);
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
  };

  return (
    <ThemeProvider>
      <div className="font-sans text-stone-900 dark:text-white bg-white dark:bg-[#0a0a0a] min-h-screen transition-colors duration-300 selection:bg-teal-500 selection:text-white">
          <main className="relative z-10">
              {currentView === 'home' && (
                  <HomeView onOpenProject={handleOpenProject} onNavigate={handleNavigate} />
              )}
              {currentView === 'privacy' && (
                  <PrivacyPage onHome={() => handleNavigate('home')} />
              )}
              {currentView === 'success' && (
                  <SuccessPage onHome={() => handleNavigate('home')} />
              )}
              {currentView === 'changelog' && (
                  <ChangeLogPage onHome={() => handleNavigate('home')} />
              )}
              {currentView === 'styleguide' && (
                  <StyleGuidePage onHome={() => handleNavigate('home')} />
              )}
              {currentView === 'sitemap' && (
                  <SiteMapPage onHome={() => handleNavigate('home')} />
              )}
               {currentView === '404' && (
                  <NotFoundPage onHome={() => handleNavigate('home')} />
              )}
          </main>

          {selectedProjectId !== null && (
              <ProjectDetail 
                  project={PROJECTS_DATA.find(p => p.id === selectedProjectId)!} 
                  onClose={handleCloseProject} 
              />
          )}
      </div>
    </ThemeProvider>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}