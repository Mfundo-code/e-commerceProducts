import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // inject spinner + blink keyframes once (clean up on unmount)
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes blinkPulse {
        0% { transform: scale(1); box-shadow: 0 6px 18px rgba(236, 72, 153, 0.18); opacity: 1; }
        50% { transform: scale(1.03); box-shadow: 0 10px 28px rgba(236, 72, 153, 0.30); opacity: 0.85; }
        100% { transform: scale(1); box-shadow: 0 6px 18px rgba(236, 72, 153, 0.18); opacity: 1; }
      }
      @keyframes subtleGlow {
        0% { box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3); }
        50% { box-shadow: 0 4px 20px rgba(236, 72, 153, 0.5); }
        100% { box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3); }
      }
    `;
    document.head.appendChild(styleEl);
    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  // Fetch grouped-by-category data from backend
  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('http://127.0.0.1:8000/api/products/by_category/');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const mapped = (data || [])
          .map(cat => ({
            id: cat.id,
            name: cat.name || 'Untitled Category',
            description: cat.description || '',
            products: Array.isArray(cat.products) ? cat.products : []
          }))
          .filter(cat => (cat.products || []).length > 0);

        setCategories(mapped);
        
        // Auto-select first category if available
        if (mapped.length > 0) {
          setSelectedCategory(mapped[0]);
          setProducts(mapped[0].products || []);
        }
      } catch (err) {
        console.error('Error fetching grouped products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setProducts(category.products || []);
    setDropdownOpen(false);
  };

  // close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProduct]);

  // Image URL helper (defensive) - handles string or { url } objects
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (typeof imagePath === 'string' && imagePath.startsWith('http')) return imagePath;
    if (typeof imagePath === 'string') return `http://127.0.0.1:8000${imagePath}`;
    if (typeof imagePath === 'object' && imagePath.url) {
      return imagePath.url.startsWith('http') ? imagePath.url : `http://127.0.0.1:8000${imagePath.url}`;
    }
    return null;
  };

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={styles.section}>
        <div style={styles.errorContainer}>
          <h3 style={styles.errorTitle}>Unable to load products</h3>
          <p style={styles.errorText}>{error}</p>
          <button style={styles.retryButton} onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section style={styles.section}>
        <div style={styles.emptyContainer}>
          <h3 style={styles.emptyTitle}>No Products Available</h3>
          <p style={styles.emptyText}>Check back later for new products.</p>
        </div>
      </section>
    );
  }

  // detect mobile-like categories to show full mobile screenshots:
  const isMobileCategory = selectedCategory && /mobile|app|application|android|ios/i.test(selectedCategory.name || '');

  // open modal
  const openProductModal = (product) => {
    setSelectedProduct(product || null);
  };

  // close modal (also used when clicking overlay)
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section style={styles.section} aria-labelledby="products-heading">
      <div style={styles.container}>
        <motion.h2
          id="products-heading"
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Premium Collection
        </motion.h2>

        {/* Category Dropdown Selector */}
        <div style={styles.dropdownContainer}>
          <div style={styles.dropdownWrapper}>
            <button
              style={styles.dropdownButton}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="listbox"
            >
              <span style={styles.dropdownButtonText}>
                {selectedCategory ? selectedCategory.name : 'Select Category'}
              </span>
              <span style={styles.dropdownArrow}>
                {dropdownOpen ? '▲' : '▼'}
              </span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  style={styles.dropdownMenu}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      style={{
                        ...styles.dropdownItem,
                        ...(selectedCategory?.id === category.id ? styles.dropdownItemActive : {})
                      }}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <span style={styles.dropdownItemText}>{category.name}</span>
                      <span style={styles.productCount}>({category.products?.length || 0})</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Selected Category Info */}
        {selectedCategory && (
          <motion.div
            style={styles.categoryInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={styles.categoryName}>{selectedCategory.name}</h3>
            {selectedCategory.description && (
              <p style={styles.categoryDescription}>{selectedCategory.description}</p>
            )}
            <p style={styles.productCountText}>
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </motion.div>
        )}

        {/* Products Grid */}
        <div style={styles.productsContainer}>
          <div style={{
            ...styles.productsGrid,
            alignItems: 'start'
          }}>
            {products.map((product, index) => {
              // dynamic container & image styles for mobile categories
              const dynamicImageContainerStyle = {
                ...styles.imageContainer,
                height: isMobileCategory ? 360 : styles.imageContainer.height,
                background: isMobileCategory ? '#ffffff' : styles.imageContainer.background,
                padding: isMobileCategory ? 12 : 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                textAlign: 'center',
              };

              const dynamicImgStyle = {
                ...styles.productImage,
                objectFit: isMobileCategory ? 'contain' : 'cover',
                maxWidth: isMobileCategory ? 'calc(100% - 24px)' : '100%',
                maxHeight: isMobileCategory ? 336 : '100%',
                width: isMobileCategory ? 'auto' : '100%',
                height: isMobileCategory ? '100%' : '100%',
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                boxSizing: 'border-box',
                background: isMobileCategory ? '#ffffff' : 'transparent'
              };

              return (
                <motion.div
                  key={product.id || index}
                  style={styles.productCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <div style={dynamicImageContainerStyle}>
                    {product.product_image ? (
                      <img
                        src={getImageUrl(product.product_image)}
                        alt={product.description || 'Product image'}
                        style={dynamicImgStyle}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={styles.imagePlaceholder}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5"/>
                          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
                        </svg>
                      </div>
                    )}

                    <div style={styles.productOverlay}>
                      <div style={styles.productActions}>
                        <button 
                          style={styles.actionButton} 
                          onClick={() => openProductModal(product)}
                          aria-label="View product details"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={styles.productContent}>
                    <h4 style={styles.productName}>
                      {product.description ? 
                        (product.description.length > 50 ? 
                          `${product.description.substring(0, 50)}...` : 
                          product.description
                        ) : 
                        'Untitled Product'
                      }
                    </h4>

                    <div style={styles.productMeta}>
                      <span style={styles.productPrice}>
                        R{product.price || '0.00'}
                      </span>
                      {product.featured && (
                        <span style={styles.featuredBadge}>Featured</span>
                      )}
                    </div>

                    {/* For featured products show the blinking More button */}
                    {product.featured ? (
                      <button
                        onClick={() => openProductModal(product)}
                        style={styles.blinkMoreButton}
                        aria-label={`More about this product`}
                      >
                        More Details
                      </button>
                    ) : (
                      <button
                        onClick={() => openProductModal(product)}
                        style={styles.moreButton}
                        aria-label={`More about this product`}
                      >
                        View Details
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal for More info */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            key="modalOverlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={closeProductModal}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              key="modalContent"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <h3 style={styles.modalTitle}>Product Details</h3>
                <button onClick={closeProductModal} style={styles.modalClose} aria-label="Close details">×</button>
              </div>

              <div style={styles.modalBody}>
                {/* Product Image in Modal */}
                {selectedProduct.product_image && (
                  <div style={styles.modalImageSection}>
                    <img
                      src={getImageUrl(selectedProduct.product_image)}
                      alt={selectedProduct.description || 'Product image'}
                      style={{
                        ...styles.modalImage,
                        objectFit: isMobileCategory ? 'contain' : 'cover'
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* Full description */}
                {selectedProduct.description ? (
                  <div style={styles.modalSection}>
                    <h4 style={styles.modalSectionTitle}>Description</h4>
                    <p style={styles.modalText}>{selectedProduct.description}</p>
                  </div>
                ) : (
                  <div style={styles.modalSection}>
                    <h4 style={styles.modalSectionTitle}>Description</h4>
                    <p style={styles.noDescriptionText}>No description available for this product.</p>
                  </div>
                )}

                {/* Price */}
                <div style={styles.modalSection}>
                  <h4 style={styles.modalSectionTitle}>Price</h4>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ec4899' }}>
                    R{selectedProduct.price || '0.00'}
                  </div>
                </div>

                {/* Meta: created/updated, category */}
                <div style={styles.modalSection}>
                  <h4 style={styles.modalSectionTitle}>Product Details</h4>
                  <div style={{ color: '#4a5568', fontSize: 14 }}>
                    {selectedCategory && <div><strong>Category:</strong> {selectedCategory.name}</div>}
                    {selectedProduct.created_at && <div><strong>Created:</strong> {new Date(selectedProduct.created_at).toLocaleString()}</div>}
                    {selectedProduct.updated_at && <div><strong>Last Updated:</strong> {new Date(selectedProduct.updated_at).toLocaleString()}</div>}
                    {selectedProduct.featured && <div><strong>Status:</strong> <span style={{ color: '#ec4899', fontWeight: 'bold' }}>Featured Product</span></div>}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #fbcfe8 100%)',
    fontFamily: "'Playfair Display', 'Cormorant Garamond', 'Georgia', serif",
    minHeight: '100vh',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    textAlign: 'center',
    margin: '0 0 40px 0',
    color: '#831843',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #d946ef 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontFamily: "'Playfair Display', serif",
  },
  dropdownContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  dropdownWrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
  },
  dropdownButton: {
    width: '100%',
    padding: '16px 20px',
    background: '#ffffff',
    border: '2px solid #ec4899',
    borderRadius: '12px',
    color: '#831843',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.1)',
    transition: 'all 0.3s ease',
    fontFamily: "'Cormorant Garamond', serif",
  },
  dropdownButtonText: {
    fontSize: '18px',
    fontWeight: 700,
  },
  dropdownArrow: {
    fontSize: '14px',
    color: '#ec4899',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    background: '#ffffff',
    border: '2px solid #ec4899',
    borderTop: 'none',
    borderRadius: '0 0 12px 12px',
    boxShadow: '0 8px 25px rgba(236, 72, 153, 0.15)',
    zIndex: 100,
    maxHeight: '300px',
    overflowY: 'auto',
  },
  dropdownItem: {
    width: '100%',
    padding: '12px 20px',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #fce7f3',
    color: '#831843',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
    fontFamily: "'Cormorant Garamond', serif",
  },
  dropdownItemActive: {
    background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
  },
  dropdownItemText: {
    fontSize: '16px',
  },
  productCount: {
    fontSize: '14px',
    opacity: 0.7,
    fontWeight: 500,
  },
  categoryInfo: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '0 20px',
  },
  categoryName: {
    fontSize: '2rem',
    color: '#831843',
    fontWeight: 700,
    margin: '0 0 16px 0',
    fontFamily: "'Playfair Display', serif",
  },
  categoryDescription: {
    fontSize: '1.1rem',
    color: '#701a75',
    lineHeight: 1.6,
    margin: '0 0 16px 0',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: "'Cormorant Garamond', serif",
  },
  productCountText: {
    fontSize: '1rem',
    color: '#a855f7',
    fontWeight: 600,
    fontFamily: "'Cormorant Garamond', serif",
  },
  productsContainer: {
    width: '100%',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px',
    padding: '0 20px',
  },
  productCard: {
    background: '#ffffff',
    borderRadius: '20px',
    overflow: 'hidden',
    border: '1px solid rgba(236, 72, 153, 0.1)',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 30px rgba(236, 72, 153, 0.1)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '250px',
    overflow: 'hidden',
    background: '#fdf2f8',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fbcfe8',
    background: '#fdf2f8',
  },
  productOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(131, 24, 67, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  productActions: {
    display: 'flex',
    gap: '12px',
  },
  actionButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  productContent: {
    padding: '24px',
  },
  productName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#831843',
    margin: '0 0 16px 0',
    minHeight: '60px',
    fontFamily: "'Playfair Display', serif",
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  productPrice: {
    color: '#ec4899',
    fontWeight: 'bold',
    fontSize: '24px',
    fontFamily: "'Cormorant Garamond', serif",
  },
  featuredBadge: {
    background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  blinkMoreButton: {
    width: '100%',
    background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '16px',
    animation: 'blinkPulse 1.6s infinite, subtleGlow 2s infinite',
    transformOrigin: 'center',
    transition: 'all 0.3s ease',
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  moreButton: {
    width: '100%',
    background: 'transparent',
    color: '#ec4899',
    border: '2px solid #ec4899',
    padding: '12px 20px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '16px',
    transition: 'all 0.3s ease',
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '80px 20px',
    color: '#831843',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #fce7f3',
    borderTop: '4px solid #ec4899',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '18px',
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  errorContainer: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#831843',
    maxWidth: 600,
    margin: '0 auto',
  },
  errorTitle: {
    fontSize: '2rem',
    color: '#dc2626',
    margin: '0 0 16px 0',
    fontFamily: "'Playfair Display', serif",
  },
  errorText: {
    fontSize: '1.1rem',
    margin: '0 0 20px 0',
    color: '#701a75',
    fontFamily: "'Cormorant Garamond', serif",
  },
  retryButton: {
    background: 'linear-gradient(135deg, #ec4899 0%, #d946ef 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '16px 32px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '16px',
    boxShadow: '0 8px 25px rgba(236, 72, 153, 0.3)',
    fontFamily: "'Cormorant Garamond', serif",
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '80px 20px',
    color: '#831843',
  },
  emptyTitle: {
    fontSize: '2rem',
    margin: '0 0 16px 0',
    fontFamily: "'Playfair Display', serif",
  },
  emptyText: {
    fontSize: '1.1rem',
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1200,
    background: 'rgba(131, 24, 67, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modalContent: {
    width: '100%',
    maxWidth: '600px',
    background: '#fff',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(131, 24, 67, 0.3)',
    overflow: 'auto',
    maxHeight: '90vh',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    borderBottom: '1px solid #fce7f3',
  },
  modalTitle: {
    margin: 0,
    fontSize: '24px',
    fontWeight: 800,
    color: '#831843',
    fontFamily: "'Playfair Display', serif",
  },
  modalClose: {
    background: 'transparent',
    border: 'none',
    fontSize: '28px',
    cursor: 'pointer',
    lineHeight: 1,
    color: '#ec4899',
    transition: 'color 0.3s ease',
  },
  modalBody: {
    padding: '24px',
  },
  modalImageSection: {
    marginBottom: '24px',
  },
  modalImage: {
    width: '100%',
    maxHeight: '300px',
    borderRadius: '12px',
    objectFit: 'cover',
  },
  modalSection: {
    marginBottom: '24px',
  },
  modalSectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '18px',
    color: '#831843',
    fontWeight: 700,
    borderBottom: '1px solid #fce7f3',
    paddingBottom: '8px',
    fontFamily: "'Playfair Display', serif",
  },
  modalText: {
    margin: 0,
    color: '#701a75',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    fontSize: '16px',
    fontFamily: "'Cormorant Garamond', serif",
  },
  noDescriptionText: {
    margin: 0,
    color: '#a855f7',
    fontStyle: 'italic',
    fontSize: '16px',
    fontFamily: "'Cormorant Garamond', serif",
  },
};

export default ProductsSection;