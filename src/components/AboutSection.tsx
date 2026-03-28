import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Data Slider - Silakan Zaky ganti isinya sesuai project kamu
const slides = [
  {
    id: 1,
    title: "Project Portofolio",
    description: "Membangun identitas digital menggunakan Next.js dan Framer Motion.",
    tag: "Web Dev",
    color: "from-indigo-600 to-blue-500"
  },
  {
    id: 2,
    title: "Eksplorasi Coding",
    description: "Perjalanan belajar JavaScript di kelas X-11 MAN 1 Banda Aceh.",
    tag: "Learning",
    color: "from-emerald-600 to-teal-500"
  },
  {
    id: 3,
    title: "Konten Kreator",
    description: "Berbagi tips teknologi lewat video pendek yang edukatif.",
    tag: "Content",
    color: "from-rose-600 to-orange-500"
  }
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 untuk kanan, -1 untuk kiri

  // Fungsi navigasi
  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === slides.length ? 0 : prev + 1));
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 < 0 ? slides.length - 1 : prev - 1));
  }, []);

  // Auto-play: Geser tiap 5 detik
  useEffect(() => {
    const timer = setInterval(slideNext, 5000);
    return () => clearInterval(timer);
  }, [slideNext]);

  // Animasi Framer Motion
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  };

  return (
    <section className="py-20 bg-muted/10 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Carousel */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="flex items-center gap-2 text-primary font-medium mb-2">
            <Sparkles size={18} />
            <span>Highlights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display">Apa Yang Saya Kerjakan</h2>
        </div>

        {/* Container Utama */}
        <div className="relative max-w-5xl mx-auto group">
          
          {/* Tombol Navigasi - Muncul saat di-hover */}
          <div className="absolute inset-y-0 left-0 z-20 flex items-center -ml-4 md:-ml-8">
            <button 
              onClick={slidePrev}
              className="p-3 rounded-full glass bg-white/10 border border-white/20 hover:bg-primary hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="absolute inset-y-0 right-0 z-20 flex items-center -mr-4 md:-mr-8">
            <button 
              onClick={slideNext}
              className="p-3 rounded-full glass bg-white/10 border border-white/20 hover:bg-primary hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Area Konten Slides */}
          <div className="relative h-[400px] md:h-[450px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className={`absolute inset-0 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-br ${slides[currentIndex].color}`}
              >
                {/* Overlay Gambar/Pattern (Opsional) */}
                <div className="absolute top-0 right-0 p-10 opacity-20 transform rotate-12">
                   <Sparkles size={150} color="white" />
                </div>

                {/* Teks Konten */}
                <div className="relative z-10 text-white">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase mb-4 inline-block">
                    {slides[currentIndex].tag}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-bold font-display mb-4">
                    {slides[currentIndex].title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                    {slides[currentIndex].description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indikator Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-2 transition-all duration-500 rounded-full ${
                  currentIndex === index 
                  ? "w-10 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]" 
                  : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}