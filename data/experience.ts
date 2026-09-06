export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  mode: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  techStack: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    id: 'srta-city',
    role: 'Game Development & Animation Intern',
    company: 'City of Scientific Research and Technological Applications (SRTA-City)',
    location: 'Egypt',
    mode: 'Hybrid',
    startDate: 'Jul 2025',
    endDate: 'Sep 2025',
    bullets: [
      'Built 3D character models with full skeletal rigging in Blender, producing fluid, realistic in-game animation.',
      'Implemented AI agent behaviors using Unity\'s NavMesh system for pathfinding/navigation, creating NPCs that respond dynamically to obstacles and player actions.',
      'Applied rigging, AI agent behavior programming, and animation pipeline workflows for interactive game development.',
      'Built and textured performance-optimized 3D assets for real-time rendering.',
    ],
    techStack: ['Blender', 'Unity', 'NavMesh', 'C#'],
  },
  {
    id: 'iti',
    role: 'Software Development Trainee',
    company: 'Information Technology Institute (ITI)',
    location: 'Egypt',
    mode: 'Hybrid',
    startDate: 'Jul 2024',
    endDate: 'Aug 2024',
    bullets: [
      'Developed a full-featured Chat Room Application in Java (JavaFX, FXML, Swing) with authentication, real-time messaging, and active-status indicators.',
      'Implemented a multi-threaded server architecture using Java socket programming to handle simultaneous connections.',
      'Designed responsive, intuitive UIs in JavaFX/FXML applying UI/UX best practices.',
      'Applied concurrent programming and multithreading for real-time data processing across clients.',
    ],
    techStack: ['Java', 'JavaFX', 'FXML', 'Swing', 'Socket Programming'],
  },
];

export const education: Education = {
  id: 'aiu',
  degree: 'BSc Computer Science — Artificial Intelligence',
  institution: 'Al Alamein International University (AIU)',
  location: 'Egypt',
  startDate: 'Oct 2022',
  endDate: 'Jul 2026 (Expected)',
  description: 'Specialization covering machine learning, deep learning, NLP, algorithms, and software engineering.',
};
