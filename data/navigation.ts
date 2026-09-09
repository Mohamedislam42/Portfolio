export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'AI Lab', href: '#ai-lab' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = {
  github: 'https://github.com/Mohamedislam42',
  linkedin: 'https://www.linkedin.com/in/mohamed-islam-292269241/',
  email: 'mailto:info.moislam@gmail.com',
  rawEmail: 'info.moislam@gmail.com',
  phone: '+20 128 080 6343',
  location: 'Alexandria, Egypt',
} as const;
