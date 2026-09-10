'use client';

import React, { useState, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { socialLinks } from '@/data/navigation';
import { isValidEmail } from '@/lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faLocationDot, faCircleCheck, faPaperPlane, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';

const INQUIRY_PRESETS = [
  { label: 'Discuss an ML/AI Role', subject: 'Opportunity Discussion: ML/AI Role', text: 'Hi Mohamed, I came across your portfolio and would love to discuss an AI/ML engineering opportunity with our team.' },
  { label: 'Project Collaboration', subject: 'NLP & Systems Collaboration', text: 'Hi Mohamed, I saw your work on LoRA distillation and Cairo routing, and I would love to explore collaborating on a project.' },
  { label: 'General Inquiry', subject: 'Hello from your portfolio', text: 'Hi Mohamed, I really enjoyed exploring your interactive AI lab and wanted to connect!' },
];

export function Contact() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  });
  
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = (text: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    showToast(`Copied ${field === 'email' ? 'email address' : 'phone number'} to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSelectPreset = (presetText: string) => {
    setFormData((prev) => ({ ...prev, message: presetText }));
    messageInputRef.current?.focus();
    showToast('Inquiry template loaded into message box', 'info');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
        setStatusMessage("Thanks for reaching out! I'll get back to you promptly.");
        showToast('Message sent successfully! Thank you.', 'success');
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      } else {
        setStatus('error');
        setStatusMessage("Something went wrong. Please try again or email me directly.");
        showToast('Failed to send message. Please email me directly.', 'error');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage("Something went wrong. Please try again or email me directly.");
      showToast('Failed to send message. Please email me directly.', 'error');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 bg-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeading index={7} kicker="Get In Touch" title="Let's Build Something Intelligent" />

        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Left column - Form */}
          <div className="lg:col-span-3">
            <ScrollReveal delay={0.1}>
              <Card className="p-5 sm:p-6 md:p-8 bg-surface border-line relative overflow-hidden">
                {/* Inquiry presets */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-line">
                  <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2.5">
                    Quick Message Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {INQUIRY_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(preset.text)}
                        className="text-[11px] sm:text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg bg-elevated border border-line hover:border-accent/50 text-fg-secondary hover:text-accent transition-colors text-left"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
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
                    <label htmlFor="name" className="text-xs sm:text-sm font-medium text-fg-secondary mb-1.5 block font-mono">
                      Your Name
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
                        "w-full bg-elevated border border-line rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-base sm:text-sm font-body",
                        errors.name && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="e.g. Alex Morgan"
                    />
                    {errors.name && (
                      <p id="name-error" className="text-error text-xs font-mono mt-1.5">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="text-xs sm:text-sm font-medium text-fg-secondary mb-1.5 block font-mono">
                      Your Email Address
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
                        "w-full bg-elevated border border-line rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-base sm:text-sm font-body",
                        errors.email && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="alex.morgan@company.com"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-error text-xs font-mono mt-1.5">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="text-xs sm:text-sm font-medium text-fg-secondary mb-1.5 block font-mono">
                      Your Message
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
                        "w-full bg-elevated border border-line rounded-lg px-3.5 sm:px-4 py-2.5 sm:py-3 text-fg placeholder:text-fg-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y text-base sm:text-sm font-body",
                        errors.message && "border-error focus:border-error focus:ring-error"
                      )}
                      placeholder="Share project details, job opportunities, or inquiries..."
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
                    className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm"
                    disabled={status === 'loading' || status === 'success'}
                    isLoading={status === 'loading'}
                  >
                    {status === 'idle' || status === 'error' ? (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
                        <span>Send Direct Dispatch</span>
                      </>
                    ) : status === 'loading' ? (
                      'Dispatching...'
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCircleCheck} className="text-success w-4 h-4" />
                        <span className="text-success">Message Sent!</span>
                      </>
                    )}
                  </Button>

                  <div aria-live="polite" className="mt-3 sm:mt-4">
                    {status === 'success' && (
                      <p className="text-success text-xs sm:text-sm text-center font-mono">{statusMessage}</p>
                    )}
                    {status === 'error' && (
                      <p className="text-error text-xs sm:text-sm text-center font-mono">{statusMessage}</p>
                    )}
                  </div>
                </form>
              </Card>
            </ScrollReveal>
          </div>

          {/* Right column - Direct Contact & 1-Click Copy */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <Card className="p-5 sm:p-6 md:p-8 bg-surface border-line h-full flex flex-col justify-between">
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl text-fg font-semibold mb-2">
                      Direct Communication
                    </h3>
                    <p className="text-body text-fg-secondary text-xs leading-relaxed">
                      Prefer direct channels? Reach out anytime via email, phone, or professional networks. 1-click copy available for quick outreach.
                    </p>
                  </div>

                  <ul className="space-y-2.5 sm:space-y-3">
                    {/* Email item */}
                    <li>
                      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-elevated border border-line hover:border-accent/50 transition-colors">
                        <a
                          href="mailto:info.moislam@gmail.com"
                          className="flex items-center gap-2.5 min-w-0 text-fg-secondary hover:text-accent transition-colors"
                        >
                          <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent shrink-0" />
                          <span className="text-[11px] sm:text-xs font-mono truncate">info.moislam@gmail.com</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy('info.moislam@gmail.com', 'email')}
                          className="p-1.5 text-fg-muted hover:text-accent hover:bg-surface rounded transition-colors shrink-0 ml-1.5"
                          title="Copy email to clipboard"
                          aria-label="Copy email"
                        >
                          {copiedField === 'email' ? <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-accent" /> : <FontAwesomeIcon icon={faCopy} className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </li>

                    {/* Phone item */}
                    <li>
                      <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-elevated border border-line hover:border-accent/50 transition-colors">
                        <a
                          href="tel:+201280806343"
                          className="flex items-center gap-2.5 min-w-0 text-fg-secondary hover:text-accent transition-colors"
                        >
                          <FontAwesomeIcon icon={faPhone} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent shrink-0" />
                          <span className="text-[11px] sm:text-xs font-mono">+20 128 080 6343</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy('+201280806343', 'phone')}
                          className="p-1.5 text-fg-muted hover:text-accent hover:bg-surface rounded transition-colors shrink-0 ml-1.5"
                          title="Copy phone to clipboard"
                          aria-label="Copy phone"
                        >
                          {copiedField === 'phone' ? <FontAwesomeIcon icon={faCheck} className="w-3.5 h-3.5 text-accent" /> : <FontAwesomeIcon icon={faCopy} className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </li>

                    {/* LinkedIn */}
                    <li>
                      <a
                        href={socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                      >
                        <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent shrink-0" />
                        <span className="text-xs font-mono">LinkedIn Profile</span>
                      </a>
                    </li>

                    {/* GitHub */}
                    <li>
                      <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-lg bg-elevated hover:bg-elevated/80 border border-line hover:border-accent/50 transition-colors text-fg-secondary hover:text-accent group"
                      >
                        <FontAwesomeIcon icon={faGithub} className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-accent shrink-0" />
                        <span className="text-xs font-mono">GitHub Profile</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="flex items-center gap-2 text-fg-muted pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-line text-[11px] sm:text-xs font-mono">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-accent shrink-0" />
                  <span>Alexandria, Egypt (Available Globally)</span>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
