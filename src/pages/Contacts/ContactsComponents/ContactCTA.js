import React from "react";
import { motion } from "framer-motion";

const ContactCTA = () => {
  return (
    <section style={styles.section}>
      {/* Background Elements */}
      <div style={styles.backgroundElements}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.floatingShape}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to Transform Your Beauty Routine?
          </motion.h2>

          <motion.p
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Get personalized beauty advice from our experts. Whether you're looking for 
            skincare solutions, makeup tips, or product recommendations, we're here to help 
            you discover your perfect routine.
          </motion.p>

          <div style={styles.features}>
            <motion.div
              style={styles.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div style={styles.featureIcon}>🎯</div>
              <div>
                <h4 style={styles.featureTitle}>Personalized Advice</h4>
                <p style={styles.featureText}>Tailored to your skin type and concerns</p>
              </div>
            </motion.div>

            <motion.div
              style={styles.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div style={styles.featureIcon}>💎</div>
              <div>
                <h4 style={styles.featureTitle}>Premium Products</h4>
                <p style={styles.featureText}>Only the finest natural ingredients</p>
              </div>
            </motion.div>

            <motion.div
              style={styles.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div style={styles.featureIcon}>🌟</div>
              <div>
                <h4 style={styles.featureTitle}>Expert Guidance</h4>
                <p style={styles.featureText}>Professional beauty consultants</p>
              </div>
            </motion.div>
          </div>

          {/* Contact Info moved to bottom of content */}
          <motion.div
            style={styles.contactInfo}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p style={styles.contactText}>Ready to get started? Reach out to us!</p>
            <div style={styles.contactLinks}>
              <a href="tel:+27761353762" style={styles.contactLink}>
                📞 +27 76 135 3762
              </a>
              <a href="mailto:info@muhlecosmetics.com" style={styles.contactLink}>
                ✉️ info@muhlecosmetics.com
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Container - Replaces Form */}
        <motion.div
          style={styles.imageContainer}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.div
            style={styles.imageCard}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              style={styles.imageWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Replace with your actual beauty/product image */}
              <img 
                src="/images/beauty-consultation.jpg" 
                alt="Professional beauty consultation and premium cosmetics"
                style={styles.actualImage}
                onError={(e) => {
                  // Fallback in case image doesn't load
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder - only shows if image fails to load */}
              <div style={styles.placeholderFallback}>
                <div style={styles.imageContent}>
                  <div style={styles.imageIcon}>💄</div>
                  <h3 style={styles.imageTitle}>Beautiful Results</h3>
                  <p style={styles.imageSubtitle}>Join thousands of satisfied customers</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              style={styles.imageBadge}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <span style={styles.badgeText}>Trusted by 10,000+ Customers</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        style={styles.bottomWave}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={styles.waveSvg}>
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            fill="rgba(236, 72, 153, 0.1)" 
          />
        </svg>
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    background: "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)",
    padding: "80px 20px",
    fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    position: "relative",
    overflow: "hidden",
  },
  backgroundElements: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  floatingShape: {
    position: "absolute",
    width: "60px",
    height: "60px",
    background: "rgba(236, 72, 153, 0.1)",
    borderRadius: "50%",
    border: "2px solid rgba(236, 72, 153, 0.2)",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  content: {
    padding: "20px 0",
  },
  title: {
    fontSize: "clamp(2.2rem, 4vw, 3rem)",
    fontWeight: 700,
    color: "#831843",
    lineHeight: 1.2,
    margin: "0 0 20px 0",
    background: "linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'Playfair Display', serif",
  },
  subtitle: {
    fontSize: "1.2rem",
    lineHeight: 1.6,
    color: "#701a75",
    margin: "0 0 40px 0",
    fontWeight: 400,
    fontFamily: "'Cormorant Garamond', serif",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
    marginBottom: "40px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    background: "rgba(255, 255, 255, 0.7)",
    borderRadius: "16px",
    border: "1px solid rgba(236, 72, 153, 0.1)",
    backdropFilter: "blur(10px)",
  },
  featureIcon: {
    fontSize: "2rem",
    flexShrink: 0,
  },
  featureTitle: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#831843",
    margin: "0 0 5px 0",
    fontFamily: "'Playfair Display', serif",
  },
  featureText: {
    fontSize: "0.95rem",
    color: "#701a75",
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageCard: {
    background: "rgba(255, 255, 255, 0.95)",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 20px 60px rgba(236, 72, 153, 0.15)",
    border: "1px solid rgba(236, 72, 153, 0.1)",
    backdropFilter: "blur(15px)",
    width: "100%",
    maxWidth: "500px",
    position: "relative",
    overflow: "hidden",
  },
  imageWrapper: {
    width: "100%",
    height: "400px",
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#fdf2f8", // Fallback background
  },
  actualImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "16px",
    transition: "transform 0.3s ease",
  },
  placeholderFallback: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #fce7f3 0%, #fbcfe8 50%, #f9a8d4 100%)",
    display: "none", // Hidden by default, only shows if image fails
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  imageContent: {
    textAlign: "center",
    color: "#831843",
  },
  imageIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  imageTitle: {
    fontSize: "1.8rem",
    fontWeight: 700,
    margin: "0 0 10px 0",
    fontFamily: "'Playfair Display', serif",
  },
  imageSubtitle: {
    fontSize: "1.1rem",
    margin: 0,
    opacity: 0.8,
    fontFamily: "'Cormorant Garamond', serif",
  },
  imageBadge: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #ec4899 0%, #d946ef 100%)",
    color: "white",
    padding: "12px 24px",
    borderRadius: "50px",
    fontSize: "0.9rem",
    fontWeight: 600,
    boxShadow: "0 8px 25px rgba(236, 72, 153, 0.4)",
  },
  badgeText: {
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.5px",
  },
  contactInfo: {
    background: "rgba(255, 255, 255, 0.7)",
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid rgba(236, 72, 153, 0.1)",
    backdropFilter: "blur(10px)",
    textAlign: "center",
  },
  contactText: {
    fontSize: "1.1rem",
    color: "#831843",
    margin: "0 0 15px 0",
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
  },
  contactLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  contactLink: {
    color: "#ec4899",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
    transition: "color 0.3s ease",
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

export default ContactCTA;