import { useState, FormEvent, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Loader2, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeading from './ui/SectionHeading';
import MagneticButton from './ui/MagneticButton';
import GlowingBorder from './ui/GlowingBorder';
import { personalInfo } from '../data/data';

const fields = [
  { num: '01', name: 'name', label: 'Your Name', type: 'text' },
  { num: '02', name: 'email', label: 'Your Email', type: 'email' },
  { num: '03', name: 'subject', label: 'Subject', type: 'text' },
];

// EmailJS credentials — create a free account at https://www.emailjs.com,
// set up an email service + template, then drop the IDs in a .env file
// (see .env.example). Never hardcode a private key here — only the
// public key is meant to live in client code.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(formRef, { once: true, margin: '-80px' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      setErrorMessage('Email isn\'t configured yet — add your EmailJS keys to .env (see .env.example).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: personalInfo.email,
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMessage('Something went wrong sending your message — please try again or email me directly.');
      console.error('EmailJS send failed:', err);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      {/* Background glow */}
      <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'hsl(var(--secondary) / 0.06)' }} />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="N°05 / Get In Touch"
          heading="LET'S BUILD SOMETHING"
          description="Have a project in mind? Fill out the form below and I'll get back to you shortly."
        />

        <GlowingBorder className="max-w-2xl">
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-10 p-8 md:p-10"
        >
          {fields.map((f, i) => (
            <motion.div
              key={f.name}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              <label className="flex items-center gap-3 font-mono text-xs text-muted-foreground tracking-wider mb-3">
                <span className="text-primary font-semibold">{f.num}</span> {f.label}
              </label>
              <div className="relative">
                <input
                  type={f.type}
                  required
                  value={formData[f.name as keyof typeof formData]}
                  onChange={e => handleChange(f.name, e.target.value)}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-b-2 border-border/50 pb-3 text-foreground text-lg focus:outline-none transition-all placeholder:text-muted-foreground/30"
                  placeholder={f.label}
                />
                {/* Animated focus line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: focused === f.name ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ transformOrigin: 'left' }}
                />
                {/* Glow on focus */}
                {focused === f.name && (
                  <div className="absolute bottom-0 left-0 right-0 h-px shadow-[0_0_20px_hsl(var(--primary)/0.5)]" />
                )}
              </div>
            </motion.div>
          ))}

          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.36, duration: 0.6 }}
          >
            <label className="flex items-center gap-3 font-mono text-xs text-muted-foreground tracking-wider mb-3">
              <span className="text-primary font-semibold">04</span> Message
            </label>
            <div className="relative">
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => handleChange('message', e.target.value)}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent border-b-2 border-border/50 pb-3 text-foreground text-lg focus:outline-none transition-all resize-none placeholder:text-muted-foreground/30"
                placeholder="Tell me about your project..."
              />
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focused === 'message' ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <MagneticButton>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative px-10 py-4 bg-primary text-primary-foreground rounded-xl font-mono text-sm disabled:opacity-50 flex items-center gap-3 overflow-hidden hover:shadow-[0_0_40px_hsl(var(--primary)/0.4)] transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message →</>
                  )}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              </button>
            </MagneticButton>

            {status === 'success' && (
              <motion.span
                initial={{ opacity: 0, x: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                className="flex items-center gap-2 text-green-400 text-sm font-mono"
              >
                <CheckCircle2 size={18} /> Sent successfully!
              </motion.span>
            )}
            {status === 'error' && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-destructive text-sm font-mono max-w-sm">
                <AlertCircle size={18} className="shrink-0" /> {errorMessage || 'Something went wrong'}
              </motion.span>
            )}
          </motion.div>
        </motion.form>
        </GlowingBorder>
      </div>
    </section>
  );
}
