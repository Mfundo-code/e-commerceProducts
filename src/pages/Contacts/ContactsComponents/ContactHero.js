import React from "react";
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section style={styles.heroSection}>
      {/* Background with floating beauty elements */}
      <div style={styles.animatedBackground}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.floatingElement}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          >
            {['🌸', '✨', '💖', '🌺', '🌟', '🌷', '💎', '🌼'][i]}
          </motion.div>
        ))}
      </div>

      <div style={styles.container}>
        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Let's Connect & Create Beauty Together
          </motion.h1>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Whether you're looking for personalized skincare advice, have questions about our products, 
            or want to explore collaboration opportunities — we'd love to hear from you. 
            Your beauty journey starts with a conversation.
          </motion.p>

          {/* Contact Highlights */}
          <motion.div
            style={styles.highlights}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={styles.highlightItem}>
              <motion.div
                style={styles.highlightIcon}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                💌
              </motion.div>
              <div>
                <h3 style={styles.highlightTitle}>Quick Response</h3>
                <p style={styles.highlightText}>We reply within 24 hours</p>
              </div>
            </div>

            <div style={styles.highlightItem}>
              <motion.div
                style={styles.highlightIcon}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                👩‍💼
              </motion.div>
              <div>
                <h3 style={styles.highlightTitle}>Expert Advice</h3>
                <p style={styles.highlightText}>Professional beauty consultations</p>
              </div>
            </div>

            <div style={styles.highlightItem}>
              <motion.div
                style={styles.highlightIcon}
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 8, -8, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
              >
                🎁
              </motion.div>
              <div>
                <h3 style={styles.highlightTitle}>Personalized Service</h3>
                <p style={styles.highlightText}>Tailored to your unique needs</p>
              </div>
            </div>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            style={styles.actionButtons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="mailto:info@muhlecosmetics.com"
              style={styles.primaryButton}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(236, 72, 153, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Email Us</span>
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path 
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <polyline 
                  points="22,6 12,13 2,6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>

            <motion.a
              href="tel:+27761353762"
              style={styles.secondaryButton}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Call Now</span>
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path 
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.a>

            <motion.a
              href="https://wa.me/27761353762"
              style={styles.tertiaryButton}
              whileHover={{ 
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>WhatsApp</span>
              <motion.svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path 
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" 
                  fill="currentColor"
                />
              </motion.svg>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Visual Element - Contact Card Preview */}
        <motion.div
          style={styles.visualSection}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            style={styles.contactCard}
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardAvatar}>MC</div>
              <div style={styles.cardTitle}>
                <div style={styles.cardName}>Muhle Cosmetics</div>
                <div style={styles.cardStatus}>Online • Ready to help</div>
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.contactInfo}>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Email:</span>
                  <span style={styles.contactValue}>info@muhlecosmetics.com</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Phone:</span>
                  <span style={styles.contactValue}>+27 76 135 3762</span>
                </div>
                <div style={styles.contactItem}>
                  <span style={styles.contactLabel}>Hours:</span>
                  <span style={styles.contactValue}>Mon-Fri • 9AM-6PM</span>
                </div>
              </div>
              
              <motion.div
                style={styles.typingIndicator}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💬 Typing a warm welcome message...
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const styles = {
  heroSection: {
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    color: "#831843",
    padding: "100px 20px 80px",
    fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  floatingElement: {
    position: "absolute",
    fontSize: "24px",
    color: "rgba(236, 72, 153, 0.4)",
    textShadow: "0 2px 10px rgba(255,255,255,0.8)",
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
    fontWeight: 700,
    lineHeight: 1.1,
    margin: "0 0 24px 0",
    background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(216, 112, 147, 0.2)",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    lineHeight: 1.6,
    color: "#701a75",
    margin: "0 0 40px 0",
    maxWidth: 600,
    fontWeight: 400,
    fontFamily: "'Cormorant Garamond', serif",
  },
  highlights: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  },
  highlightItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid rgba(236, 72, 153, 0.1)",
    backdropFilter: "blur(10px)",
  },
  highlightIcon: {
    fontSize: "2rem",
    flexShrink: 0,
  },
  highlightTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#831843",
    margin: "0 0 5px 0",
    fontFamily: "'Playfair Display', serif",
  },
  highlightText: {
    fontSize: "0.9rem",
    color: "#701a75",
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  actionButtons: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "16px 28px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    color: "white",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.3)",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 26px",
    borderRadius: "50px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#831843",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    border: "2px solid #831843",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    backdropFilter: "blur(10px)",
  },
  tertiaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px 26px",
    borderRadius: "50px",
    background: "rgba(255, 255, 255, 0.9)",
    color: "#831843",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    border: "2px dashed rgba(236, 72, 153, 0.3)",
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: "uppercase",
    letterSpacing: "1px",
    backdropFilter: "blur(10px)",
  },
  visualSection: {
    flex: "0 1 400px",
    minWidth: 300,
    display: "flex",
    justifyContent: "center",
  },
  contactCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "20px",
    padding: "25px",
    boxShadow: "0 20px 60px rgba(236, 72, 153, 0.2)",
    border: "1px solid rgba(236, 72, 153, 0.1)",
    backdropFilter: "blur(15px)",
    maxWidth: "320px",
    width: "100%",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "20px",
    paddingBottom: "15px",
    borderBottom: "2px solid rgba(236, 72, 153, 0.1)",
  },
  cardAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: 700,
    fontSize: "1.2rem",
    fontFamily: "'Playfair Display', serif",
  },
  cardTitle: {
    flex: 1,
  },
  cardName: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#831843",
    fontFamily: "'Playfair Display', serif",
  },
  cardStatus: {
    fontSize: "0.85rem",
    color: "#10b981",
    fontWeight: 600,
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  contactItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },
  contactLabel: {
    fontSize: "0.85rem",
    color: "#701a75",
    fontWeight: 600,
  },
  contactValue: {
    fontSize: "0.85rem",
    color: "#831843",
    fontWeight: 600,
  },
  typingIndicator: {
    background: "rgba(236, 72, 153, 0.1)",
    padding: "10px 15px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    color: "#831843",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: "10px",
  },
};

export default ContactHero;