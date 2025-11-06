// ServicesComponents/ServicesHero.js
import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section style={styles.heroSection}>
      {/* Animated background with beauty elements */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.beautyParticle}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {['💄', '✨', '🌹', '💎', '🌟', '🌸', '💖', '💫', '🦋', '🌺'][i % 10]}
          </motion.div>
        ))}
      </div>

      {/* Floating product elements */}
      <div style={styles.floatingProducts}>
        <motion.div
          style={styles.floatingBottle}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🍶
        </motion.div>
        <motion.div
          style={styles.floatingJar}
          animate={{
            y: [0, -25, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🫙
        </motion.div>
      </div>

      <div style={styles.container}>
        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover Our Premium Collection
          </motion.h1>
          
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the luxury of nature with our carefully crafted beauty products. 
            From rejuvenating skincare to radiant makeup, each item is designed to 
            enhance your natural beauty with pure, effective ingredients.
          </motion.p>

          <motion.div 
            style={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              style={styles.primaryButton}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 30px rgba(236, 72, 153, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              Shop Collection
            </motion.button>
            <motion.button
              style={styles.secondaryButton}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Product visualization */}
        <motion.div 
          style={styles.productVisualization}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={styles.productDisplay}>
            <div style={styles.productGlow}></div>
            <motion.div 
              style={styles.mainProduct}
              animate={{ 
                y: [0, -10, 0],
                rotateY: [0, 5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              💄
            </motion.div>
            <div style={styles.productFeatures}>
              <motion.div 
                style={styles.feature}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              >
                <div style={styles.featureDot}></div>
                <span>Natural Ingredients</span>
              </motion.div>
              <motion.div 
                style={styles.feature}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <div style={styles.featureDot}></div>
                <span>Luxury Formula</span>
              </motion.div>
              <motion.div 
                style={styles.feature}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div style={styles.featureDot}></div>
                <span>Premium Quality</span>
              </motion.div>
            </div>
          </div>
          <div style={styles.productLabel}>Signature Collection</div>
        </motion.div>
      </div>

      {/* Bottom wave decoration */}
      <motion.div
        style={styles.bottomWave}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={styles.waveSvg}>
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="rgba(255, 255, 255, 0.8)" 
          />
        </svg>
      </motion.div>
    </section>
  );
}

const styles = {
  heroSection: {
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    color: "#831843",
    padding: "120px 20px 100px",
    fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid rgba(236, 72, 153, 0.1)",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  beautyParticle: {
    position: "absolute",
    color: "rgba(236, 72, 153, 0.3)",
    fontSize: "18px",
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: "bold",
  },
  floatingProducts: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  floatingBottle: {
    position: "absolute",
    top: "20%",
    left: "10%",
    fontSize: "40px",
    opacity: 0.6,
  },
  floatingJar: {
    position: "absolute",
    top: "60%",
    right: "15%",
    fontSize: "35px",
    opacity: 0.5,
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  content: {
    flex: "1 1 600px",
    minWidth: 300,
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: "0 0 24px 0",
    background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(236, 72, 153, 0.2)",
    letterSpacing: "-0.02em",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    lineHeight: 1.6,
    color: "#701a75",
    margin: "0 0 40px 0",
    maxWidth: 600,
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: 400,
  },
  ctaButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "16px 32px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    color: "white",
    border: "none",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3)",
  },
  secondaryButton: {
    padding: "16px 32px",
    borderRadius: "50px",
    background: "transparent",
    color: "#831843",
    border: "2px solid #ec4899",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  productVisualization: {
    flex: "0 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  productDisplay: {
    width: "150px",
    height: "200px",
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "20px",
    border: "2px solid rgba(236, 72, 153, 0.2)",
    padding: "30px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    boxShadow: "0 20px 40px rgba(236, 72, 153, 0.15)",
    position: "relative",
    backdropFilter: "blur(10px)",
  },
  productGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "120px",
    height: "120px",
    background: "radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)",
    borderRadius: "50%",
  },
  mainProduct: {
    fontSize: "50px",
    zIndex: 2,
  },
  productFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.8rem",
    color: "#831843",
    fontFamily: "'Cormorant Garamond', serif",
  },
  featureDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ec4899",
  },
  productLabel: {
    color: "#701a75",
    fontSize: "0.9rem",
    fontWeight: 500,
    fontFamily: "'Playfair Display', serif",
  },
  bottomWave: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  waveSvg: {
    width: "100%",
    height: "80px",
    display: "block",
  },
};