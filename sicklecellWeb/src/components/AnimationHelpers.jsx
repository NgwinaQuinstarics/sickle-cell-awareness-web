import { useEffect, useState, useRef } from "react";
import logoUrl from "@/assets/sicklecare-logo.png";
import { motion, useInView } from "framer-motion";

/**
 * ScrollReveal: Wraps elements to trigger animations when scrolled into view.
 * Supported variants: "fade-up", "slide-left", "slide-right", "zoom-in"
 */
export function ScrollReveal({ children, variant = "fade-up", delay = 0, duration = 0.6, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const getVariants = () => {
    switch (variant) {
      case "slide-left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        };
      case "slide-right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        };
      case "zoom-in":
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1 },
        };
      case "fade-up":
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCounter: Counts up to numbers when scrolled into view.
 * Handles patterns like "100M+", "300K", "75%", and "1 in 4".
 */
export function AnimatedCounter({ value, duration = 1.5 }) {
  const [count, setCount] = useState("");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) {
      setCount(value);
      return;
    }

    const numbers = value.match(/\d+/g);
    if (!numbers) {
      setCount(value);
      return;
    }

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      const currentText = value.replace(/\d+/g, (match) => {
        const target = parseInt(match, 10);
        const current = Math.floor(progress * target);
        return current.toString();
      });

      setCount(currentText);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, inView, duration]);

  return <span ref={ref}>{count || value}</span>;
}

/**
 * PageLoader: Renders a pulsing healthcare heartbeat loading indicator.
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <motion.img
          src={logoUrl}
          alt="SickleCare"
          width={80}
          height={80}
          animate={{
            scale: [1, 1.07, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-20 w-20 rounded-2xl bg-white object-contain shadow-lg"
        />
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground animate-pulse">
          SickleCare
        </p>
      </div>
    </div>
  );
}

/**
 * AnimatedCard: Standardized card container with hover transitions.
 */
export function AnimatedCard({ children, className = "", delay = 0 }) {
  return (
    <ScrollReveal variant="fade-up" delay={delay}>
      <motion.div
        whileHover={{
          y: -5,
          scale: 1.015,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={`h-full border border-border bg-card transition-colors hover:border-accent/40 ${className}`}
      >
        {children}
      </motion.div>
    </ScrollReveal>
  );
}
