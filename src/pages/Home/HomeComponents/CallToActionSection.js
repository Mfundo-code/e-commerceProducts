import React from "react";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section style={styles.section} aria-labelledby="cta-heading">
      {/* Cosmetics-themed background with floral elements */}
      <div style={styles.cosmeticsBackground}>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={styles.floralSvg}
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <defs>
            <linearGradient id="floralGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#f9a8d4" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
            <pattern id="floralGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="rgba(249, 168, 212, 0.1)" />
              <circle cx="10" cy="10" r="0.5" fill="rgba(236, 72, 153, 0.1)" />
              <circle cx="30" cy="30" r="0.5" fill="rgba(217, 70, 239, 0.1)" />
            </pattern>
          </defs>

          {/* Floral background */}
          <rect width="100%" height="100%" fill="url(#floralGrid)" />
          
          {/* Floral pattern lines */}
          <motion.path
            d="M0,80 Q200,40 400,80 T800,80 T1200,80"
            fill="none"
            stroke="url(#floralGradient)"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            animate={{
              d: [
                "M0,80 Q200,40 400,80 T800,80 T1200,80",
                "M0,60 Q200,100 400,60 T800,60 T1200,60",
                "M0,100 Q200,60 400,100 T800,100 T1200,100",
                "M0,80 Q200,40 400,80 T800,80 T1200,80"
              ]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>

        {/* Sparkle particles */}
        {[15, 30, 50, 65, 85].map((left, index) => (
          <motion.div
            key={index}
            style={{ ...styles.sparkleParticle, left: `${left}%` }}
            animate={{ 
              y: [0, -40, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeOut"
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Flower petal effect */}
        <div style={styles.petalRain}>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.petal,
                left: `${(i * 8) + Math.random() * 8}%`,
                fontSize: `${12 + Math.random() * 8}px`,
              }}
              animate={{
                y: [0, 250],
                x: [0, Math.random() * 20 - 10],
                rotate: [0, Math.random() * 360],
                opacity: [0, 0.7, 0]
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            >
              {['🌸', '🌺', '🌼', '🌷', '💮', '🏵️'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.left}>
          <motion.h2 
            id="cta-heading" 
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover Your Natural Beauty
          </motion.h2>

          <motion.p 
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience the perfect blend of nature and luxury with our premium skincare 
            and makeup collections. Transform your beauty routine with products that 
            nourish your skin while enhancing your natural radiance.
          </motion.p>

          <motion.div 
            style={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              style={styles.primaryBtn}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 30px rgba(236, 72, 153, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.open("/shop", "_self");
              }}
              aria-label="Explore our product collection"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 12 }}>
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  fill="currentColor"
                />
              </svg>
              Shop Collection
            </motion.button>

            <motion.button
              style={styles.secondaryBtn}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.open("/consultation", "_self");
              }}
              aria-label="Book a beauty consultation"
            >
              Book Consultation
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          style={styles.right}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            style={styles.contactCard} 
            role="region" 
            aria-label="Beauty consultation information"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={styles.beautyIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  fill="white"
                />
              </svg>
            </div>

            <div style={styles.contactContent}>
              <div style={styles.contactText}>Free Beauty Consultation</div>
              <a href="tel:+1234567890" style={styles.phone} aria-label="Call for consultation">
                (123) 456-7890
              </a>
              <div style={styles.small}>Personalized skincare advice — Let's find your perfect routine</div>
            </div>
          </motion.div>

          <motion.div 
            style={styles.guaranteeCard}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div style={styles.guaranteeIcon}>✓</div>
            <div style={styles.guaranteeText}>
              <strong>100% Satisfaction Guarantee</strong>
              <span>30-day return policy on all products</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    padding: "80px 20px",
    fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    borderTop: "1px solid rgba(255,255,255,0.3)",
  },
  cosmeticsBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    background: "radial-gradient(circle at 80% 20%, rgba(249, 168, 212, 0.1) 0%, transparent 50%)",
  },
  floralSvg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  sparkleParticle: {
    position: "absolute",
    bottom: "15%",
    color: "rgba(236, 72, 153, 0.6)",
    fontSize: "16px",
    fontWeight: "bold",
  },
  petalRain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  petal: {
    position: "absolute",
    color: "rgba(236, 72, 153, 0.4)",
    fontFamily: "Arial",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    gap: "40px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  left: {
    flex: "1 1 600px",
    minWidth: 280,
  },
  title: {
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
    margin: 0,
    color: "#831843",
    lineHeight: 1.1,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    marginBottom: "1.5rem",
  },
  description: {
    marginTop: 0,
    color: "#701a75",
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    maxWidth: 640,
    lineHeight: 1.6,
    fontWeight: 400,
    textShadow: "0 2px 20px rgba(255,255,255,0.5)",
    marginBottom: "2rem",
    letterSpacing: "0.01em",
  },
  actions: {
    marginTop: 0,
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 32px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    color: "white",
    border: "none",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1.1rem",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.1)",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "50px",
    background: "transparent",
    color: "#831843",
    border: "2px solid #831843",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    letterSpacing: "0.02em",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
  },
  right: {
    flex: "0 0 320px",
    minWidth: 280,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "flex-end",
  },
  contactCard: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    width: "100%",
    background: "rgba(255,255,255,0.8)",
    color: "#831843",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
  },
  beautyIconWrap: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 15px rgba(236, 72, 153, 0.3)",
  },
  contactContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    alignItems: "flex-start",
  },
  contactText: {
    fontSize: "0.9rem",
    opacity: 0.95,
    fontWeight: 600,
    color: "#831843",
  },
  phone: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#ec4899",
    textDecoration: "none",
    lineHeight: 1,
  },
  small: {
    fontSize: "0.8rem",
    opacity: 0.8,
    color: "#701a75",
  },
  guaranteeCard: {
    display: "flex",
    gap: "0.8rem",
    alignItems: "center",
    width: "100%",
    background: "rgba(255,255,255,0.9)",
    color: "#065f46",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    border: "1px solid rgba(255,255,255,0.9)",
  },
  guaranteeIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#10b981",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontWeight: "bold",
    fontSize: "16px",
  },
  guaranteeText: {
    display: "flex",
    flexDirection: "column",
    gap: "0.2rem",
  }
};