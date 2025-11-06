// ServicesComponents/ServicesHero.js
import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section style={styles.heroSection}>
      {/* Animated background with cosmetic particles */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.cosmeticParticle}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          >
            {['✨', '💄', '🌸', '💎', '🌟', '🌿', '💖', '⭐', '🌺', '🌼', '🌷', '💅', '👑', '🦋', '🥀'][i % 15]}
          </motion.div>
        ))}
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
            Discover Your Natural Beauty
          </motion.h1>
          
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From skincare routines to makeup artistry — we create personalized beauty solutions 
            that enhance your natural radiance while nourishing your skin with premium ingredients.
          </motion.p>

          <motion.div 
            style={styles.ctaButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              style={styles.primaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Products
            </motion.button>
            <motion.button
              style={styles.secondaryButton}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Product bottle visualization */}
        <motion.div 
          style={styles.productVisualization}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={styles.productBottle}>
            <div style={styles.bottleNeck}></div>
            <div style={styles.bottleBody}>
              <motion.div 
                style={styles.liquid}
                animate={{ 
                  height: ['30%', '85%', '30%'],
                  background: [
                    'linear-gradient(to top, #ec4899, #d946ef)',
                    'linear-gradient(to top, #f9a8d4, #ec4899)',
                    'linear-gradient(to top, #ec4899, #d946ef)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div style={styles.bottleGlow}></div>
            </div>
            <div style={styles.bottleBase}></div>
          </div>
          <div style={styles.productLabel}>Premium Serum Formula</div>
          
          {/* Floating ingredients around the bottle */}
          <motion.div 
            style={styles.ingredient}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          >
            🌿
          </motion.div>
          <motion.div 
            style={styles.ingredient}
            animate={{ 
              y: [0, -25, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          >
            💎
          </motion.div>
          <motion.div 
            style={styles.ingredient}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.3, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
          >
            ✨
          </motion.div>
        </motion.div>
      </div>
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
    borderBottom: "1px solid rgba(255,255,255,0.3)",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  cosmeticParticle: {
    position: "absolute",
    color: "rgba(236, 72, 153, 0.5)",
    fontSize: "18px",
    fontWeight: "bold",
    textShadow: "0 2px 10px rgba(255,255,255,0.8)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "80px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  content: {
    flex: "1 1 600px",
    minWidth: 300,
  },
  title: {
    fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
    fontWeight: 700,
    lineHeight: 1.1,
    margin: "0 0 24px 0",
    background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(216, 112, 147, 0.2)",
    letterSpacing: "-0.01em",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
    lineHeight: 1.6,
    color: "#701a75",
    margin: "0 0 40px 0",
    maxWidth: 600,
    fontWeight: 400,
    fontFamily: "'Cormorant Garamond', serif",
  },
  ctaButtons: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
  },
  primaryButton: {
    padding: "16px 32px",
    borderRadius: "50px",
    border: "none",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    color: "white",
    fontSize: "1.1rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3)",
    transition: "all 0.3s ease",
  },
  secondaryButton: {
    padding: "14px 28px",
    borderRadius: "50px",
    border: "2px solid #831843",
    background: "transparent",
    color: "#831843",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  productVisualization: {
    flex: "0 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },
  productBottle: {
    width: "120px",
    height: "220px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  bottleNeck: {
    width: "30px",
    height: "30px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid rgba(236, 72, 153, 0.3)",
    borderRadius: "8px 8px 0 0",
    borderBottom: "none",
    backdropFilter: "blur(10px)",
  },
  bottleBody: {
    width: "80px",
    height: "160px",
    background: "rgba(255, 255, 255, 0.8)",
    border: "2px solid rgba(236, 72, 153, 0.3)",
    borderRadius: "40px 40px 20px 20px",
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(10px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  liquid: {
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    borderRadius: "40px 40px 20px 20px",
    background: "linear-gradient(to top, #ec4899, #d946ef)",
    opacity: 0.8,
  },
  bottleGlow: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "20px",
    height: "60px",
    background: "linear-gradient(to right, rgba(255,255,255,0.6), transparent)",
    borderRadius: "10px",
    transform: "rotate(20deg)",
  },
  bottleBase: {
    width: "90px",
    height: "10px",
    background: "rgba(255, 255, 255, 0.9)",
    border: "2px solid rgba(236, 72, 153, 0.3)",
    borderRadius: "0 0 10px 10px",
    borderTop: "none",
    backdropFilter: "blur(10px)",
  },
  productLabel: {
    color: "#831843",
    fontSize: "0.9rem",
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
    textAlign: "center",
  },
  ingredient: {
    position: "absolute",
    fontSize: "20px",
    color: "rgba(236, 72, 153, 0.7)",
    textShadow: "0 2px 10px rgba(255,255,255,0.8)",
  },
};