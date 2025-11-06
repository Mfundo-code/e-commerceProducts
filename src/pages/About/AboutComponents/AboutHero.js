// ServicesComponents/ServicesHero.js
import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section style={styles.heroSection}>
      {/* Animated background with beauty particles */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.beautyParticle}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 2,
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
            Our Beauty Philosophy
          </motion.h1>
          
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            At Muhle Cosmetics, we believe beauty begins with healthy skin. Our mission is to create 
            products that enhance your natural radiance while providing the nourishment and care 
            your skin deserves. Every formulation is crafted with love and expertise.
          </motion.p>

          <motion.div 
            style={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={styles.statItem}>
              <motion.div 
                style={styles.statNumber}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                5+
              </motion.div>
              <div style={styles.statLabel}>Years of Excellence</div>
            </div>
            <div style={styles.statItem}>
              <motion.div 
                style={styles.statNumber}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                100%
              </motion.div>
              <div style={styles.statLabel}>Natural Ingredients</div>
            </div>
            <div style={styles.statItem}>
              <motion.div 
                style={styles.statNumber}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                5K+
              </motion.div>
              <div style={styles.statLabel}>Happy Customers</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Brand story visualization */}
        <motion.div 
          style={styles.brandVisualization}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={styles.beautyCircle}>
            <motion.div 
              style={styles.circleInner}
              animate={{ 
                rotate: 360,
                background: [
                  'linear-gradient(45deg, #f9a8d4, #ec4899)',
                  'linear-gradient(45deg, #ec4899, #d946ef)',
                  'linear-gradient(45deg, #d946ef, #f9a8d4)'
                ]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                background: { duration: 8, repeat: Infinity }
              }}
            >
              <div style={styles.circleContent}>
                <motion.div
                  style={styles.brandIcon}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🌸
                </motion.div>
                <div style={styles.brandName}>Muhle</div>
                <div style={styles.brandTagline}>Cosmetics</div>
              </div>
            </motion.div>
          </div>

          {/* Floating values around the circle */}
          <motion.div 
            style={styles.floatingValue}
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Natural
          </motion.div>
          <motion.div 
            style={styles.floatingValue}
            animate={{ 
              y: [0, -25, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
          >
            Pure
          </motion.div>
          <motion.div 
            style={styles.floatingValue}
            animate={{ 
              y: [0, -15, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
          >
            Luxurious
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
  beautyParticle: {
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
  stats: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
  },
  statItem: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#ec4899",
    marginBottom: "8px",
    textShadow: "0 4px 20px rgba(236, 72, 153, 0.3)",
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#831843",
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  brandVisualization: {
    flex: "0 1 400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "30px",
    position: "relative",
  },
  beautyCircle: {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.9)",
    border: "3px solid rgba(236, 72, 153, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 60px rgba(236, 72, 153, 0.2)",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  },
  circleInner: {
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    background: "linear-gradient(45deg, #f9a8d4, #ec4899)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  circleContent: {
    textAlign: "center",
    color: "white",
    zIndex: 2,
    position: "relative",
  },
  brandIcon: {
    fontSize: "3rem",
    marginBottom: "10px",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
  },
  brandName: {
    fontSize: "2rem",
    fontWeight: 700,
    fontFamily: "'Playfair Display', serif",
    marginBottom: "5px",
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
  },
  brandTagline: {
    fontSize: "1.2rem",
    fontWeight: 400,
    fontFamily: "'Cormorant Garamond', serif",
    opacity: 0.9,
    textShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },
  floatingValue: {
    position: "absolute",
    color: "#831843",
    fontSize: "0.9rem",
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "5px 12px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(236, 72, 153, 0.2)",
  },
};