import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaHome, FaUser, FaBox, FaEnvelope } from "react-icons/fa";
import LogoB from "../assets/images/LogoB.png";

export default function Header({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(s => !s);

  const goToCart = () => {
    navigate('/cart');
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 880);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Muhle Cosmetics color scheme
  const ACCENT_A = '#ec4899'; // Pink
  const ACCENT_B = '#d946ef'; // Purple

  // Base styles
  const filledStyle = {
    background: `linear-gradient(90deg, ${ACCENT_B}, ${ACCENT_A})`,
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 10px 30px rgba(236, 72, 153, 0.12)',
  };
  const transparentStyle = {
    background: 'transparent',
    color: '#fdf2f8',
    border: `1px solid rgba(236, 72, 153, 0.07)`,
    boxShadow: 'none',
  };

  // Slightly-dimmed variant for active state
  const activeSoftFilled = {
    background: `linear-gradient(90deg, ${ACCENT_B}, ${ACCENT_A})`,
    color: '#ffffff',
    border: 'none',
    boxShadow: '0 6px 18px rgba(236, 72, 153, 0.08)',
    filter: 'brightness(0.95)',
    transform: 'translateY(0)',
  };

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '10px 20px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      background: 'rgba(253, 242, 248, 0.9)',
      borderBottom: '1px solid rgba(236, 72, 153, 0.1)',
      boxShadow: '0 6px 30px rgba(236, 72, 153, 0.1)',
      alignSelf: 'stretch',
      minHeight: 64,
      fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
    },
    logoImage: {
      height: 44,
      width: 'auto',
      display: 'block',
      filter: 'drop-shadow(0 6px 18px rgba(236, 72, 153, 0.06))',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: '1 1 auto',
      justifyContent: 'center',
    },
    navButton: (isActive) => ({
      textDecoration: 'none',
      padding: '10px 18px',
      borderRadius: 999,
      fontWeight: 600,
      fontSize: 15,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'all 180ms cubic-bezier(.2,.9,.3,1)',
      ...(isActive ? activeSoftFilled : filledStyle),
    }),
    rightControls: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: '0 0 auto',
    },
    iconButton: (toggled = false) => ({
      padding: 10,
      borderRadius: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      minWidth: 44,
      minHeight: 44,
      transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
      ...(toggled ? activeSoftFilled : filledStyle),
    }),
    cartIcon: {
      fontSize: 18,
      color: '#ffffff',
    },
    cartBadge: {
      position: 'absolute',
      top: -6,
      right: -6,
      background: '#ffffff',
      color: '#ec4899',
      borderRadius: 99,
      width: 20,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      boxShadow: '0 6px 18px rgba(236, 72, 153, 0.12)',
      border: '1px solid rgba(236, 72, 153, 0.1)'
    },
    mobileNav: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    mobileMenuOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.45), rgba(217, 70, 239, 0.6))',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 180ms ease',
    },
    mobileMenu: {
      width: 300,
      height: '100%',
      background: 'linear-gradient(180deg, rgba(253, 242, 248, 0.98), rgba(252, 231, 243, 0.95))',
      padding: 20,
      boxShadow: '-20px 0 60px rgba(236, 72, 153, 0.2)',
      borderLeft: '1px solid rgba(236, 72, 153, 0.1)'
    },
    mobileMenuItem: (isActive) => ({
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: '12px 14px',
      textDecoration: 'none',
      borderRadius: 10,
      fontWeight: 600,
      color: isActive ? '#ffffff' : '#831843',
      ...(isActive ? activeSoftFilled : { background: 'rgba(255, 255, 255, 0.8)', border: '1px solid rgba(236, 72, 153, 0.1)' }),
    }),
    mobileIcon: { 
      fontSize: 18, 
      color: (isActive) => isActive ? '#ffffff' : '#ec4899' 
    },
  };

  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/about', label: 'About', icon: <FaUser /> },
    { to: '/contacts', label: 'Contacts', icon: <FaEnvelope /> },
    { to: '/products', label: 'Products', icon: <FaBox /> },
  ];

  return (
    <header style={styles.header} aria-label="Primary header">
      <div style={styles.logoContainer} onClick={handleLogoClick} role="button" tabIndex={0} aria-label="Go to home">
        <img src={LogoB} alt="Logo" style={styles.logoImage} />
      </div>

      {/* Desktop nav */}
      {!isMobile && (
        <nav style={styles.nav} role="navigation" aria-label="Primary navigation">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link key={l.to} to={l.to} style={styles.navButton(isActive)}>
                {l.icon}
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      <div style={styles.rightControls}>
        {/* Cart button for both desktop and mobile */}
        <button
          type="button"
          onClick={goToCart}
          title="Cart"
          aria-label="Cart"
          style={{ ...styles.iconButton(false), position: 'relative' }}
        >
          <FaShoppingCart style={styles.cartIcon} />
          {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
        </button>

        {/* Mobile menu button */}
        {isMobile && (
          <div style={styles.mobileNav}>
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              style={{ ...styles.iconButton(mobileMenuOpen) }}
            >
              {mobileMenuOpen ? <FaTimes style={{ fontSize: 18, color: '#ffffff' }} /> : <FaBars style={{ fontSize: 18, color: '#ffffff' }} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && isMobile && (
        <div style={styles.mobileMenuOverlay} onClick={toggleMobileMenu}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={LogoB} alt="logo" style={{ height: 36 }} />
              </div>
              <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: '#831843', fontSize: 20 }} aria-label="Close menu"><FaTimes /></button>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => {
                const isActive = location.pathname === l.to;
                return (
                  <Link key={l.to} to={l.to} style={styles.mobileMenuItem(isActive)} onClick={() => setMobileMenuOpen(false)}>
                    <span style={{...styles.mobileIcon, color: isActive ? '#ffffff' : '#ec4899'}}>{l.icon}</span>
                    <span>{l.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}