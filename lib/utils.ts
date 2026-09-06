

/**
 * Concatenate class names, filtering falsy values.
 * Simple utility — no clsx dependency needed for this project.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Smooth scroll to an element by ID, accounting for the sticky nav height.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  
  const navHeight = 80; // matches sticky nav height
  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  
  window.scrollTo({
    top: elementPosition - navHeight,
    behavior: 'smooth',
  });
}

/**
 * Sanitize user input string — strips HTML tags and trims.
 */
export function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate email format.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Format section index as a zero-padded number.
 */
export function formatSectionIndex(index: number): string {
  return String(index).padStart(2, '0');
}
