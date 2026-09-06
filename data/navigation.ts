export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export const socialLinks = {
  github: 'https://github.com/Mohamedislam42',
  linkedin: 'https://www.linkedin.com/in/mohamed-islam-292269241/',
  email: 'mailto:info.moislam@gmail.com',
} as const;
