// HeroSection.js
import React, { useState } from "react";

export default function HeroSection({
  imageUrl = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29zbWV0aWNzJTIwbW9kZWx8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  title = "Muhle Cosmetics",
  subtitle = "Discover Your Natural Beauty With Our Premium Skincare And Makeup Products. Embrace Your Radiance With Organic, Cruelty-Free Beauty Solutions",
  primaryLabel = "Shop Now",
  onPrimary = () => console.log("Navigate to shop"),
}) {
  const [primaryHover, setPrimaryHover] = useState(false);

  const styles = {
    section: {
      position: "relative",
      overflow: "hidden",
      color: "#ffffff",
      fontFamily: "'Playfair Display', 'Georgia', serif",
      borderRadius: 0,
      boxSizing: "border-box",
      background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(45deg, rgba(120, 40, 100, 0.4) 0%, rgba(200, 80, 120, 0.3) 100%)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      maxWidth: "800px",
      padding: "0 20px",
    },
    title: {
      fontSize: "clamp(3rem, 8vw, 6rem)",
      lineHeight: 1.1,
      margin: 0,
      fontWeight: 700,
      color: "#ffffff",
      textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
      letterSpacing: "2px",
      fontFamily: "'Playfair Display', serif",
      marginBottom: "24px",
    },
    subtitle: {
      marginTop: "24px",
      color: "rgba(255, 255, 255, 0.95)",
      maxWidth: "600px",
      fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
      lineHeight: 1.6,
      fontWeight: 300,
      textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
      margin: "0 auto",
      fontFamily: "'Cormorant Garamond', serif",
    },
    buttonsRow: {
      marginTop: "48px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    primaryBtn: (hover) => ({
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "50px",
      padding: "18px 40px",
      fontWeight: 600,
      fontSize: "1.1rem",
      letterSpacing: "1px",
      border: "none",
      background: hover 
        ? "linear-gradient(135deg, #d4af87 0%, #f8e5d6 100%)"
        : "linear-gradient(135deg, #f8e5d6 0%, #d4af87 100%)",
      color: "#5a2d52",
      transform: hover ? "translateY(-3px) scale(1.05)" : "translateY(0) scale(1)",
      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      boxShadow: hover 
        ? "0 15px 35px rgba(212, 175, 135, 0.4), 0 0 0 1px rgba(255,255,255,0.1)"
        : "0 10px 25px rgba(212, 175, 135, 0.3), 0 0 0 1px rgba(255,255,255,0.05)",
      position: "relative",
      overflow: "hidden",
      fontFamily: "'Cormorant Garamond', serif",
      textTransform: "uppercase",
    }),
    secondaryBtn: (hover) => ({
      cursor: "pointer",
      userSelect: "none",
      borderRadius: "50px",
      padding: "16px 36px",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "1px",
      border: "2px solid #ffffff",
      background: "transparent",
      color: "#ffffff",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.3s ease",
      fontFamily: "'Cormorant Garamond', serif",
      textTransform: "uppercase",
      backdropFilter: "blur(10px)",
    }),
    tagline: {
      marginTop: "20px",
      color: "rgba(255,255,255,0.8)",
      fontSize: "16px",
      fontStyle: "italic",
      fontFamily: "'Cormorant Garamond', serif",
      letterSpacing: "1px",
    },
    features: {
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      marginTop: "40px",
      flexWrap: "wrap",
    },
    feature: {
      color: "rgba(255,255,255,0.9)",
      fontSize: "14px",
      fontFamily: "'Cormorant Garamond', serif",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  };

  return (
    <section style={styles.section} aria-labelledby="hero-heading">
      <div style={styles.overlay} />
      
      <div style={styles.content}>
        <h1 id="hero-heading" style={styles.title}>
          {title}
        </h1>
        <p style={styles.subtitle}>{subtitle}</p>

        <div style={styles.buttonsRow}>
          <div
            role="button"
            tabIndex={0}
            onClick={onPrimary}
            onKeyDown={(e) => e.key === "Enter" && onPrimary()}
            onMouseEnter={() => setPrimaryHover(true)}
            onMouseLeave={() => setPrimaryHover(false)}
            style={styles.primaryBtn(primaryHover)}
            aria-label={primaryLabel}
          >
            {primaryLabel}
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => console.log("Learn more clicked")}
            onKeyDown={(e) => e.key === "Enter" && console.log("Learn more clicked")}
            style={styles.secondaryBtn(false)}
            onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
            onMouseLeave={(e) => e.target.style.background = "transparent"}
            aria-label="Learn More"
          >
            Learn More
          </div>
        </div>

        <div style={styles.tagline}>
          "Nature's Beauty, Perfected"
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            Organic Ingredients
          </div>
          <div style={styles.feature}>
            Cruelty Free
          </div>
          <div style={styles.feature}>
            Vegan Formulas
          </div>
          <div style={styles.feature}>
            Premium Quality
          </div>
        </div>
      </div>
    </section>
  );
}