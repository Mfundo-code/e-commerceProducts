import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AboutMe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const stats = [
    { number: "50+", label: "Premium Products" },
    { number: "100%", label: "Natural Ingredients" },
    { number: "5K+", label: "Happy Customers" }
  ];

  const availability = [
    "Skincare Consultations",
    "Makeup Tutorials", 
    "Product Customization"
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let connections = [];
    const mouse = { x: 0, y: 0, active: false };

    // Cosmetic-related symbols for nodes
    const cosmeticSymbols = ['✨', '🌸', '💎', '🌟', '🌿', '💖', '⭐', '🌺', '🌼', '🌷'];

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.random() * 6 + 4;
        this.size = this.baseSize;
        this.symbol = cosmeticSymbols[Math.floor(Math.random() * cosmeticSymbols.length)];
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.hue = Math.random() * 40 + 320; // Pink/purple hues for cosmetics
      }

      update() {
        // Pulsing effect
        this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 2;
        
        // Gentle floating movement
        this.x += this.vx;
        this.y += this.vy;

        // Boundary check with gentle bounce
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 70%, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 70%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw main node
        ctx.fillStyle = `hsla(${this.hue}, 70%, 70%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw symbol for some nodes
        if (Math.random() > 0.7) {
          ctx.fillStyle = `hsla(${this.hue}, 70%, 100%, ${this.opacity * 1.5})`;
          ctx.font = `${this.size * 1.2}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.symbol, this.x, this.y);
        }
      }
    }

    class Connection {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.progress = Math.random() * Math.PI * 2;
        this.speed = 0.02 + Math.random() * 0.02;
        this.length = Math.sqrt(
          Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
        );
      }

      update() {
        this.progress += this.speed;
      }

      draw() {
        const alpha = (Math.sin(this.progress) + 1) * 0.3 + 0.2;
        
        // Create gradient along the connection
        const gradient = ctx.createLinearGradient(
          this.node1.x, this.node1.y,
          this.node2.x, this.node2.y
        );
        gradient.addColorStop(0, `hsla(${this.node1.hue}, 70%, 70%, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `hsla(${(this.node1.hue + this.node2.hue) / 2}, 80%, 80%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.node2.hue}, 70%, 70%, ${alpha * 0.3})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.lineDashOffset = -this.progress * 10;

        ctx.beginPath();
        ctx.moveTo(this.node1.x, this.node1.y);
        ctx.lineTo(this.node2.x, this.node2.y);
        ctx.stroke();

        ctx.setLineDash([]);
      }
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 8000));
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const updateConnections = () => {
      connections = [];
      const maxDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[j].x - nodes[i].x, 2) + Math.pow(nodes[j].y - nodes[i].y, 2)
          );
          
          if (distance < maxDistance && Math.random() > 0.3) {
            connections.push(new Connection(nodes[i], nodes[j]));
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background grid
      ctx.strokeStyle = 'rgba(216, 112, 147, 0.03)'; // Soft pink grid
      ctx.lineWidth = 0.5;
      const gridSize = 40;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Update and draw connections
      connections.forEach(connection => {
        connection.update();
        connection.draw();
      });

      // Update and draw nodes
      nodes.forEach(node => {
        // Mouse interaction
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            node.x -= dx * force * 0.02;
            node.y -= dy * force * 0.02;
          }
        }

        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      initNodes();
      updateConnections();
      animate();
    };

    // Initialize
    init();

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      initNodes();
      updateConnections();
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section ref={containerRef} style={styles.section} aria-labelledby="about-heading">
      {/* Cosmetic-themed Animation Background */}
      <canvas 
        ref={canvasRef} 
        style={styles.canvas}
        aria-hidden="true"
      />

      <div style={styles.container}>
        <div style={styles.content}>
          {/* Left Column - Text Content */}
          <motion.div 
            style={styles.left}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h2 
              id="about-heading" 
              style={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              About Muhle Cosmetics
            </motion.h2>

            <motion.p 
              style={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >
              At Muhle Cosmetics, we believe beauty should be both luxurious and natural. 
              Our carefully crafted products blend the finest organic ingredients with 
              cutting-edge skincare science. Each formulation is designed to enhance your 
              natural radiance while nourishing your skin from within.
            </motion.p>

            {/* Services Section */}
            <motion.div 
              style={styles.availabilitySection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <h3 style={styles.availabilityTitle}>Our Services:</h3>
              <div style={styles.availabilityTags}>
                {availability.map((item, index) => (
                  <motion.span
                    key={index}
                    style={styles.availabilityTag}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      y: -2,
                      boxShadow: "0 8px 20px rgba(216, 112, 147, 0.4)"
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Explore Products Button */}
            <motion.button
              style={styles.moreButton}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 12px 30px rgba(216, 112, 147, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = "/products"}
            >
              <span>Explore Products</span>
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                initial={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <path 
                  d="M5 12h14m-7-7l7 7-7 7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </motion.svg>
            </motion.button>
          </motion.div>

          {/* Right Column - Stats Cards Only */}
          <motion.div 
            style={styles.right}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            {/* Stats Cards */}
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  style={styles.statCard}
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    y: -8,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(216, 112, 147, 0.2)"
                  }}
                >
                  <motion.div 
                    style={styles.statNumber}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      duration: 0.8,
                      delay: 0.6 + index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div 
                    style={styles.statLabel}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    {stat.label}
                  </motion.div>
                  
                  {/* Animated accent line */}
                  <motion.div 
                    style={styles.cardAccent}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Playfair Display', 'Georgia', serif",
    borderRadius: '24px',
    margin: '20px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
    minHeight: '400px',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 0.7,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  content: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  left: {
    flex: '1 1 500px',
    minWidth: 300,
  },
  right: {
    flex: '1 1 400px',
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 700,
    color: '#831843',
    margin: '0 0 16px 0',
    lineHeight: 1.1,
    background: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 30px rgba(216, 112, 147, 0.1)',
  },
  description: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    color: '#701a75',
    margin: '0 0 24px 0',
    fontWeight: 400,
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
  },
  availabilitySection: {
    marginTop: '24px',
    marginBottom: '20px',
  },
  availabilityTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#831843',
    margin: '0 0 12px 0',
    textAlign: 'center',
  },
  availabilityTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  availabilityTag: {
    background: 'linear-gradient(135deg, #d946ef 0%, #ec4899 100%)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 600,
    boxShadow: '0 4px 15px rgba(216, 112, 147, 0.3)',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  moreButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 6px 20px rgba(216, 112, 147, 0.3)',
    transition: 'all 0.3s ease',
    fontFamily: "'Cormorant Garamond', serif",
    width: '100%',
    maxWidth: '260px',
  },
  statsGrid: {
    display: 'grid',
    gap: '20px',
    width: '100%',
    maxWidth: '380px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(15px)',
    padding: '24px 20px',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s ease',
    position: 'relative',
    overflow: 'hidden',
    perspective: '1000px',
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 900,
    color: '#ec4899',
    margin: '0 0 6px 0',
    lineHeight: 1,
    textShadow: '0 4px 20px rgba(236, 72, 153, 0.3)',
  },
  statLabel: {
    fontSize: '1rem',
    color: '#831843',
    fontWeight: 600,
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ec4899, #d946ef)',
    borderRadius: '0 0 16px 16px',
  },
};