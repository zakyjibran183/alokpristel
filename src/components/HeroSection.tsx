import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="flex justify-center mb-8"
    >
      <motion.div className="relative" whileHover={{ scale: 1.05 }}>
        {/* Glow */}
        <div className="absolute inset-0 rounded-full blur-2xl bg-primary/30 opacity-70"></div>

        {/* Image */}
        <img
          src="/eek.jpg" // ganti dengan foto kamu
          alt="Profile"
          className="relative w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-4 border-white/20 shadow-xl"
        />
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
    >
      <ThreeScene />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* FOTO PROFIL */}
          <ProfilePhoto />

          {/* TAG */}
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            👋 Selamat datang di portfolio saya
          </motion.span>

          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Hi, I'm
            <br />
            <span className="text-gradient">M. Zaky Jibran</span>
          </motion.h1>

          {/* DESC */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
          >
            Saya m.zaky jibran pengalaman pertama mennyelesaikan coding
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              className="rounded-full px-8 shadow-glow"
              onClick={() => {
                const element = document.querySelector('#projects');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Lihat Projects
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Hubungi Saya
            </Button>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              { icon: Github, href: 'https://github.com/zakyjibran183/alokpristel.git', label: 'GitHub' },
              // { icon: Linkedin, href: '#', label: 'LinkedIn' },
              // { icon: Youtube, href: '#', label: 'YouTube' },
              // { icon: Instagram, href: '#', label: 'Instagram' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                className="p-3 rounded-full glass hover:shadow-glow transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5 text-foreground" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* SCROLL DOWN */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-float cursor-pointer"
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}