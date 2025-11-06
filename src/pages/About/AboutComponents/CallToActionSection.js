import React from "react";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section style={styles.section} aria-labelledby="cta-heading">
      {/* Beauty-themed background with floating elements */}
      <div style={styles.beautyBackground}>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={styles.waveSvg}
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <defs>
            <linearGradient id="beautyGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#d946ef" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <pattern id="floral" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20,0 Q30,10 20,20 Q10,30 20,40 M0,20 Q10,10 20,20 Q30,30 40,20" fill="none" stroke="rgba(236, 72, 153, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Floral pattern background */}
          <rect width="100%" height="100%" fill="url(#floral)" />
          
          {/* Elegant wave lines */}
          <motion.path
            d="M0,80 Q400,40 800,80 T1600,80"
            fill="none"
            stroke="url(#beautyGradient)"
            strokeWidth="3"
            strokeOpacity="0.2"
            animate={{
              d: [
                "M0,80 Q400,40 800,80 T1600,80",
                "M0,60 Q400,100 800,60 T1600,60",
                "M0,90 Q400,50 800,90 T1600,90",
                "M0,80 Q400,40 800,80 T1600,80"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>

        {/* Beauty product particles */}
        {[15, 30, 50, 65, 85].map((left, index) => (
          <motion.div
            key={index}
            style={{ ...styles.beautyParticle, left: `${left}%` }}
            animate={{ 
              y: [0, -80, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: index * 0.8,
              ease: "easeOut"
            }}
          >
            {['💄', '✨', '🌹', '💎', '🌟'][index]}
          </motion.div>
        ))}

        {/* Floating sparkle effect */}
        <div style={styles.sparkleRain}>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.sparkle,
                left: `${(i * 4) + Math.random() * 6}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
              animate={{
                y: [0, 200],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ✨
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
            Discover Your Perfect Beauty Routine
          </motion.h2>

          <motion.p 
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience the difference of premium natural cosmetics crafted with care. 
            From luxurious skincare to stunning makeup, we help you reveal your most 
            beautiful self with products that celebrate your natural beauty.
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
                window.open("https://wa.me/27761353762", "_blank");
              }}
              aria-label="Contact us on WhatsApp"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.424"
                  fill="currentColor"
                />
              </svg>
              Chat on WhatsApp
            </motion.button>

            <motion.button
              style={styles.secondaryBtn}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.open("tel:+27761353762", "_blank");
              }}
              aria-label="Call us directly"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Call Now
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
            aria-label="Contact information"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={styles.beautyIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={styles.contactContent}>
              <div style={styles.contactText}>Get Your Free Consultation</div>
              <a href="mailto:info@muhlecosmetics.com" style={styles.email} aria-label="Send email">
                info@muhlecosmetics.com
              </a>
              <div style={styles.small}>Personalized beauty advice • Premium products • Expert guidance</div>
            </div>
          </motion.div>

          <motion.div 
            style={styles.featureCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>💎</div>
              <div>
                <div style={styles.featureTitle}>Natural Ingredients</div>
                <div style={styles.featureDesc}>Premium quality</div>
              </div>
            </div>
            <div style={styles.featureItem}>
              <div style={styles.featureIcon}>🚚</div>
              <div>
                <div style={styles.featureTitle}>Free Delivery</div>
                <div style={styles.featureDesc}>On orders over R500</div>
              </div>
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
    borderTop: "1px solid rgba(236, 72, 153, 0.1)",
  },
  beautyBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    background: "radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%)",
  },
  waveSvg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.4,
  },
  beautyParticle: {
    position: "absolute",
    bottom: "10%",
    color: "rgba(236, 72, 153, 0.6)",
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "'Cormorant Garamond', serif",
  },
  sparkleRain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sparkle: {
    position: "absolute",
    color: "rgba(236, 72, 153, 0.4)",
    fontSize: "12px",
    fontFamily: "'Cormorant Garamond', serif",
    top: "-20px",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    gap: "50px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  left: {
    flex: "1 1 520px",
    minWidth: 280,
  },
  title: {
    fontSize: "clamp(2rem, 4vw, 3rem)",
    margin: 0,
    color: "#831843",
    lineHeight: 1.15,
    fontWeight: 700,
    background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(236, 72, 153, 0.2)",
    letterSpacing: "-0.01em",
    marginBottom: "1.5rem",
    fontFamily: "'Playfair Display', serif",
  },
  description: {
    marginTop: 0,
    color: "#701a75",
    fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
    maxWidth: 640,
    lineHeight: 1.6,
    fontWeight: 400,
    textShadow: "0 2px 20px rgba(255,255,255,0.5)",
    marginBottom: "2rem",
    letterSpacing: "0.01em",
    fontFamily: "'Cormorant Garamond', serif",
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
    fontSize: "1rem",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3), 0 0 0 1px rgba(236, 72, 153, 0.1)",
    transition: "all 0.3s ease",
    letterSpacing: "0.01em",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 32px",
    borderRadius: "50px",
    background: "transparent",
    color: "#831843",
    border: "2px solid #ec4899",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    letterSpacing: "0.01em",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  right: {
    flex: "0 0 350px",
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
    background: "rgba(255,255,255,0.9)",
    color: "#831843",
    padding: "24px",
    borderRadius: "20px",
    boxShadow: "0 15px 30px rgba(236, 72, 153, 0.15)",
    border: "1px solid rgba(236, 72, 153, 0.1)",
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
    gap: "0.5rem",
    alignItems: "flex-start",
  },
  contactText: {
    fontSize: "0.9rem",
    opacity: 0.95,
    fontWeight: 600,
    color: "#831843",
    fontFamily: "'Playfair Display', serif",
  },
  email: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#ec4899",
    textDecoration: "none",
    lineHeight: 1,
    fontFamily: "'Cormorant Garamond', serif",
  },
  small: {
    fontSize: "0.8rem",
    opacity: 0.8,
    color: "#701a75",
    fontFamily: "'Cormorant Garamond', serif",
  },
  featureCard: {
    width: "100%",
    background: "rgba(255,255,255,0.8)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(236, 72, 153, 0.1)",
    border: "1px solid rgba(236, 72, 153, 0.05)",
    backdropFilter: "blur(10px)",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "15px",
    "&:last-child": {
      marginBottom: 0
    }
  },
  featureIcon: {
    fontSize: "1.5rem",
    width: "40px",
    textAlign: "center",
  },
  featureTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#831843",
    fontFamily: "'Playfair Display', serif",
  },
  featureDesc: {
    fontSize: "0.8rem",
    color: "#701a75",
    fontFamily: "'Cormorant Garamond', serif",
  }
};