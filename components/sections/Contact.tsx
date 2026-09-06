'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/navigation';
import { isValidEmail } from '@/lib/utils';
import { Mail, Phone, Linkedin, Github, MapPin, CheckCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    
    if (!isValid) {
      if (newErrors.name) nameInputRef.current?.focus();
      else if (newErrors.email) emailInputRef.current?.focus();
      else if (newErrors.message) messageInputRef.current?.focus();
    }
    
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return;
    if (!validateForm()) return;

    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage("Thanks for reaching out! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setStatusMessage("Something went wrong. Please try again or email me directly.");
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage("Something went wrong. Please try again or email me directly.");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={6} kicker="Contact" title="Get in touch" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left column - Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <Card className="p-6 md:p-8 bg-surface border-line relative overflow-hidden">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px]"
                  />

                  <div>
                    <label htmlFor="name" className="text-sm font-medium text-fg-secondary mb-2 block font-mono">
                      Name
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={cn(
                        "w-full bg-elevated border border-line rounded-lg px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors",
                        errors.name && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-error text-xs font-mono mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-sm font-medium text-fg-secondary mb-2 block font-mono">
                      Email
                    </label>
                    <input
                      ref={emailInputRef}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={cn(
                        "w-full bg-elevated border border-line rounded-lg px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors",
                        errors.email && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-error text-xs font-mono mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="text-sm font-medium text-fg-secondary mb-2 block font-mono">
                      Message
                    </label>
                    <textarea
                      ref={messageInputRef}
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={cn(
                        "w-full bg-elevated border border-line rounded-lg px-4 py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y",
                        errors.message && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="How can I help you?"
                    />
                    {errors.message && (
                      <p id="message-error" className="text-error text-xs font-mono mt-1.5">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full mt-4 flex items-center justify-center gap-2 font-mono"
                    disabled={status === 'loading' || status === 'success'}
                    isLoading={status === 'loading'}
                  >
                    {status === 'idle' || status === 'error' ? (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    ) : status === 'loading' ? (
                      'Sending...'
                    ) : (
                      <>
                        <CheckCircle className="text-success" size={18} />
                        <span className="text-success">Message Sent!</span>
                      </>
                    )}
                  </Button>

                  <div aria-live="polite" className="mt-4">
                    {status === 'success' && (
                      <p className="text-success text-sm text-center font-mono">{statusMessage}</p>
                    )}
                    {status === 'error' && (
                      <p className="text-error text-sm text-center font-mono">{statusMessage}</p>
                    )}
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right column - Direct Contact */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <Card className="p-6 md:p-8 bg-surface border-line h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-heading text-h4 text-fg font-semibold mb-2">
                      Direct Channels
                    </h3>
                    <p className="text-body text-fg-secondary text-sm">
                      Prefer a direct message? Reach out anytime through email, phone, or professional networks.
                    </p>
                  </div>

                  <ul className="space-y-3">
                    <li>
                      <a
                        href="mailto:info.moislam@gmail.com"
                        aria-label="Send email to info.moislam@gmail.com"
                        className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                      >
                        <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-mono truncate">info.moislam@gmail.com</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="tel:+201280806343"
                        aria-label="Call +20 128 080 6343"
                        className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                      >
                        <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-sm font-mono">+20 128 080 6343</span>
                      </a>
                    </li>
                    {socialLinks?.linkedin && (
                      <li>
                        <a
                          href={socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View LinkedIn profile"
                          className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                        >
                          <Linkedin className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm font-mono">LinkedIn Profile</span>
                        </a>
                      </li>
                    )}
                    {socialLinks?.github && (
                      <li>
                        <a
                          href={socialLinks.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View GitHub profile"
                          className="flex items-center gap-3 p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                        >
                          <Github className="w-5 h-5 text-accent flex-shrink-0" />
                          <span className="text-sm font-mono">GitHub Profile</span>
                        </a>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-fg-muted pt-6 mt-6 border-t border-line text-sm font-mono">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Alexandria, Egypt</span>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
