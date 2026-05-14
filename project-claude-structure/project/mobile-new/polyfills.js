// React Native Web Brave browser compatibility fix (2026)
// Simple and reliable approach to handle CSSStyleDeclaration indexing issues
if (typeof window !== 'undefined' && window.CSSStyleDeclaration) {
  
  // 1. Suppress the specific error completely
  const originalError = window.console.error;
  window.console.error = function(...args) {
    const message = args[0]?.toString() || '';
    if (message.includes('Failed to set an indexed property') && 
        message.includes('CSSStyleDeclaration')) {
      // Silently ignore this specific error
      return;
    }
    return originalError.apply(this, args);
  };

  // 2. Patch CSSStyleDeclaration prototype to handle indexed setters gracefully
  const originalSetProperty = CSSStyleDeclaration.prototype.setProperty;
  
  // Override setProperty to catch and handle errors silently
  CSSStyleDeclaration.prototype.setProperty = function(property, value, priority) {
    try {
      return originalSetProperty.call(this, property, value, priority);
    } catch (error) {
      // For indexing errors, just ignore them silently
      if (error.message && error.message.includes('indexed property')) {
        return;
      }
      // Re-throw other errors
      throw error;
    }
  };

  // 3. Add safe indexed property setters for common indices
  for (let i = 0; i < 50; i++) {
    if (!(i in CSSStyleDeclaration.prototype)) {
      try {
        Object.defineProperty(CSSStyleDeclaration.prototype, i, {
          get: function() {
            return this.item && typeof this.item === 'function' ? this.item(i) : undefined;
          },
          set: function(value) {
            // Silently ignore indexed setters - they're not supported in modern browsers
            return;
          },
          configurable: true,
          enumerable: false
        });
      } catch (e) {
        // Ignore if we can't define the property
      }
    }
  }
}