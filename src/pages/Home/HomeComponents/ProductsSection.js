import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ProductsSection (category-per-slide, random 3 products)
 * - Each slide shows up to 3 random products from one category
 * - Slides move to the next category (no paging inside a category)
 * - Auto-rotates through categories every 5s
 * - Special handling for "mobile" categories: taller container + objectFit: 'contain'
 * - "More..." button for featured products (blinking). Clicking opens modal with full info including description.
 * - Fully mobile responsive with centered layout
 */

const ProductsSection = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentSlideProducts, setCurrentSlideProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        0% { transform: scale(1); box-shadow: 0 6px 18px rgba(49,130,206,0.18); opacity: 1; }
        50% { transform: scale(1.03); box-shadow: 0 10px 28px rgba(49,130,206,0.30); opacity: 0.85; }
        100% { transform: scale(1); box-shadow: 0 6px 18px rgba(49,130,206,0.18); opacity: 1; }
      }
      @keyframes subtleGlow {
        0% { box-shadow: 0 4px 15px rgba(49,130,206,0.3); }
        50% { box-shadow: 0 4px 20px rgba(49,130,206,0.5); }
        100% { box-shadow: 0 4px 15px rgba(49,130,206,0.3); }
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

        // Changed from /api/projects/by_category/ to /api/products/by_category/
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
        setCurrentCategoryIndex(0);
      } catch (err) {
        console.error('Error fetching grouped products:', err);
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoriesWithProducts();
  }, []);

  // Helper: Fisher-Yates shuffle and take n
  const randomSample = (arr, n) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  };

  // Whenever category changes (or categories load), pick up to 3 random products for the slide
  useEffect(() => {
    if (!categories.length) {
      setCurrentSlideProducts([]);
      return;
    }
    const cat = categories[currentCategoryIndex];
    const picks = randomSample(cat.products || [], 3);
    setCurrentSlideProducts(picks);
  }, [categories, currentCategoryIndex]);

  // Auto-rotate through categories
  useEffect(() => {
    if (!categories.length) return;
    const interval = setInterval(() => {
      setCurrentCategoryIndex(prev => (prev + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories]);

  // close modal on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setSelectedProduct(null);
    };
    if (selectedProduct) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProduct]);

  const goToCategory = (index) => {
    if (index < 0 || index >= categories.length) return;
    setCurrentCategoryIndex(index);
  };

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

  const currentCategory = categories[currentCategoryIndex];
  const currentProducts = currentSlideProducts;

  // detect mobile-like categories to show full mobile screenshots:
  const isMobileCategory = /mobile|app|application|android|ios/i.test(currentCategory.name || '');

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
          Featured Products
        </motion.h2>

        {/* Dynamic Category Title */}
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <strong style={{ color: '#4a5568' }}>Now showing:</strong>{' '}
          <span style={{ fontWeight: 800, fontSize: 18 }}>{currentCategory.name}</span>
        </div>

        {/* Category Navigation */}
        <div style={styles.categoryNav}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              style={{
                ...styles.categoryButton,
                ...(index === currentCategoryIndex ? styles.activeCategoryButton : {})
              }}
              onClick={() => goToCategory(index)}
              aria-label={`Show ${category.name} products`}
            >
              {category.name}
              <span style={styles.productCount}>({category.products?.length || 0})</span>
            </button>
          ))}
        </div>

        {/* Products Display */}
        <div style={styles.carouselContainer}>
          <div style={styles.carouselContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategoryIndex}
                style={styles.categorySection}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{
                  ...styles.productsGrid,
                  alignItems: 'start'
                }}>
                  {currentProducts.map((product, index) => {
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
                        key={product.id || `${index}-${currentCategoryIndex}`}
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
                              {/* Removed repo_link and live_link since they don't exist in Product model */}
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
                              ${product.price || '0.00'}
                            </span>
                            <span style={styles.productDate}>
                              {product.created_at ? new Date(product.created_at).toLocaleDateString() : 'Unknown date'}
                            </span>

                            {/* For featured products show the blinking More button */}
                            {product.featured ? (
                              <button
                                onClick={() => openProductModal(product)}
                                style={styles.blinkMoreButton}
                                aria-label={`More about this product`}
                              >
                                more about the product...
                              </button>
                            ) : (
                              <div style={{ width: 72 }} /> /* placeholder to keep alignment */
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Category Indicators */}
        <div style={styles.indicators}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              style={{
                ...styles.indicator,
                ...(index === currentCategoryIndex ? styles.activeIndicator : {})
              }}
              onClick={() => goToCategory(index)}
              aria-label={`Go to ${category.name} products`}
            />
          ))}
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
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3182ce' }}>
                    ${selectedProduct.price || '0.00'}
                  </div>
                </div>

                {/* Meta: created/updated, category */}
                <div style={styles.modalSection}>
                  <h4 style={styles.modalSectionTitle}>Product Details</h4>
                  <div style={{ color: '#4a5568', fontSize: 14 }}>
                    {selectedProduct.category_name && <div><strong>Category:</strong> {selectedProduct.category_name}</div>}
                    {selectedProduct.created_at && <div><strong>Created:</strong> {new Date(selectedProduct.created_at).toLocaleString()}</div>}
                    {selectedProduct.updated_at && <div><strong>Last Updated:</strong> {new Date(selectedProduct.updated_at).toLocaleString()}</div>}
                    {selectedProduct.featured && <div><strong>Status:</strong> <span style={{ color: '#e53e3e', fontWeight: 'bold' }}>Featured Product</span></div>}
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
    padding: '10px 2px',
    background: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    minHeight: 'auto',
    width: '100%',
    overflowX: 'hidden',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    padding: '0 15px',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    textAlign: 'center',
    margin: '0 0 16px 0',
    color: '#1a202c',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  categoryNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap',
    padding: '0 10px',
  },
  categoryButton: {
    padding: '12px 24px',
    border: '1px solid #e2e8f0',
    background: '#f7fafc',
    color: '#4a5568',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
  activeCategoryButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    color: '#ffffff',
    borderColor: 'transparent',
    boxShadow: '0 8px 25px rgba(49, 130, 206, 0.3)',
  },
  productCount: {
    fontSize: '12px',
    opacity: 0.8,
    marginLeft: '4px',
  },
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    width: '100%',
  },
  carouselContent: {
    flex: 1,
    minHeight: '500px',
    position: 'relative',
    width: '100%',
  },
  categorySection: {
    width: '100%',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    padding: '0 10px',
    justifyContent: 'center',
  },
  productCard: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: '#f7fafc',
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
    color: '#cbd5e0',
    background: '#f7fafc',
  },
  productOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(26, 32, 44, 0.8)',
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
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
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
    padding: '20px',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1a202c',
    margin: '0 0 12px 0',
    minHeight: '54px',
  },
  productMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    gap: 12,
  },
  productPrice: {
    color: '#3182ce',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  productDate: {
    color: '#a0aec0',
  },
  blinkMoreButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: '13px',
    animation: 'blinkPulse 1.6s infinite, subtleGlow 2s infinite',
    transformOrigin: 'center',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '5px',
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    background: '#e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeIndicator: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    transform: 'scale(1.2)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 10px',
    color: '#4a5568',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loadingText: {
    fontSize: '16px',
    margin: 0,
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#4a5568',
    maxWidth: 600,
    margin: '0 auto',
  },
  errorTitle: {
    fontSize: '1.5rem',
    color: '#e53e3e',
    margin: '0 0 12px 0',
  },
  errorText: {
    fontSize: '1rem',
    margin: '0 0 8px 0',
    color: '#718096',
  },
  retryButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    boxShadow: '0 4px 15px rgba(49, 130, 206, 0.3)',
    marginTop: '16px',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#4a5568',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    margin: '0 0 12px 0',
  },
  emptyText: {
    fontSize: '1rem',
    margin: 0,
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 1200,
    background: 'rgba(0,0,0,0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 900,
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 10px 40px rgba(2,6,23,0.25)',
    overflow: 'auto',
    maxHeight: '90vh',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 20px',
    borderBottom: '1px solid #edf2f7',
  },
  modalTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 800,
    color: '#1a202c',
  },
  modalClose: {
    background: 'transparent',
    border: 'none',
    fontSize: 26,
    cursor: 'pointer',
    lineHeight: 1,
    color: '#718096',
    transition: 'color 0.3s ease',
  },
  modalBody: {
    padding: '18px 20px 30px 20px',
  },
  modalImageSection: {
    marginBottom: 20,
  },
  modalImage: {
    width: '100%',
    maxHeight: 300,
    borderRadius: 8,
    objectFit: 'cover',
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    margin: '0 0 12px 0',
    fontSize: 16,
    color: '#2d3748',
    fontWeight: 700,
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: 6,
  },
  modalText: {
    margin: 0,
    color: '#4a5568',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    fontSize: 14,
  },
  noDescriptionText: {
    margin: 0,
    color: '#a0aec0',
    fontStyle: 'italic',
    fontSize: 14,
  },
};

export default ProductsSection;