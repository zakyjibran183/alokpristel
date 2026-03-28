import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Data Zaky tetap sama, tidak ada yang diubah di sini
const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-ecommer modern yg ada di HP bisa di gunakan untuk berbelanja.',
    tags: ['Shopee', 'Tiktok shop', 'Lazada', 'Tokopedia'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Learning Platform',
    description: 'Platform pembelajaran online yg mempermudah kmu dalam belajar.',
    tags: ['Zenius', 'Ruang Guru', 'Duolingo', 'Quuipper'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Social Media platform',
    description: 'platform yg berguna untuk social media dan sharing-sharing.',
    tags: ['tiktok', 'facebook', 'Instagram', 'whatsApp'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'AI platform',
    description: 'Tool untuk generate konten menggunakan AI dengan integrasi berbagai model language.',
    tags: ['Dola', 'Gemini', 'Chat GPT', 'Google'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Seri tutorial video editing yg sudah tersebar di banyak platform.',
    tags: ['Tiktok', 'Youtube', 'Instagram'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: '#',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips programming atau coding.',
    tags: ['Instagram', 'TikTok', 'YouTube'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: '#',
  },
];

// --- 1. Komponen Animasi Teks Mengetik (Unik untuk Header) ---
const TypingHeader = ({ text }: { text: string }) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const childVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.h2
      className="font-display text-3xl md:text-5xl font-bold mb-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Mulai animasi saat setengah teks terlihat
    >
      {words.map((word, index) => (
        <motion.span
          variants={childVariants}
          style={{ display: "inline-block", marginRight: "5px" }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};

// --- 2. Komponen Kartu Project dengan Animasi 3D Tilt ---
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Nilai input mouse (X dan Y) relative terhadap container kartu
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Ubah input mouse (pixel) menjadi rotasi (derajat)
  const rotateX = useTransform(y, [-100, 100], [15, -15]); // Miring atas/bawah
  const rotateY = useTransform(x, [-100, 100], [-15, 15]); // Miring kiri/kanan

  // Ubah input mouse menjadi pergeseran bayangan
  const shadowX = useTransform(x, [-100, 100], [10, -10]);
  const shadowY = useTransform(y, [-100, 100], [10, -10]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Hitung posisi relative dari tengah (-100 sampai 100)
    const relativeX = (mouseX / width) * 200 - 100;
    const relativeY = (mouseY / height) * 200 - 100;

    x.set(relativeX);
    y.set(relativeY);
  }

  function handleMouseLeave() {
    // Kembalikan kartu ke posisi datar saat mouse keluar
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }} // Muncul saat sedikit bagian terlihat
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 50 }}
      className="perspective-1000 group" // Penting untuk efek 3D
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          boxShadow: isHovered 
            ? `${shadowX.get()}px ${shadowY.get()}px 25px rgba(0,0,0,0.1)` 
            : "0 10px 15px -3px rgba(0,0,0,0.1)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="h-full p-6 glass rounded-2xl border border-white/10 shadow-lg group-hover:border-primary/20"
      >
        {/* Preview Image/Emoji dengan Efek Muncul Sedikit */}
        <motion.div 
          className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-6xl">{project.image}</span>
        </motion.div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {project.isContent && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1"
                >
                  <Sparkles size={12}/>
                  Content
                </motion.span>
              )}
            </AnimatePresence>
            <h3 className="font-display text-lg font-bold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-secondary/50 text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-2 pt-2">
            {project.github && (
              <Button variant="outline" size="sm" className="rounded-full group/btn" asChild>
                <a href={project.github}>
                  <Github className="h-4 w-4 mr-1 group-hover/btn:rotate-12 transition-transform" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" className="rounded-full group/btn" asChild>
                <a href={project.demo}>
                  <ExternalLink className="h-4 w-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                  Demo
                </a>
              </Button>
            )}
            {project.youtube && (
              <Button size="sm" className="rounded-full bg-red-600 hover:bg-red-700 group/btn" asChild>
                <a href={project.youtube}>
                  <Play className="h-4 w-4 mr-1 group-hover/btn:translate-x-1 transition-transform" />
                  Watch
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 3. Komponen Utama Section ---
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/10 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        
        {/* Dekorasi Latar Belakang Pelan */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        />

        {/* Header Section dengan Animasi Baru */}
        <div className="text-center mb-16 relative z-10">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium mb-2 block"
          >
            Portfolio
          </motion.span>
          
          {/* Pakai komponen TypingHeader di sini */}
          <TypingHeader text="Projects & Karya Terbaik Saya" />
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-primary mx-auto rounded-full" 
          />
        </div>

        {/* Grid Kartu Project */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            // Pakai komponen ProjectCard di sini
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}