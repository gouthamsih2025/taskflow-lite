// validation.js
// Form validation logic for task inputs

/**
 * Validates task input value.
 * Returns true if valid, false if invalid.
 * Also manages the error display messaging.
 * @param {string} value - The input value to check
 * @returns {boolean}
 */
export function validateTaskInput(value) {
  const errorMsgEl = document.getElementById('error-msg');
  const inputWrap = document.querySelector('.input-wrap');
  
  if (!value || value.trim().length === 0) {
    showError(errorMsgEl, inputWrap, 'Please enter a task objective.');
    return false;
  }
  
  if (value.trim().length < 3) {
    showError(errorMsgEl, inputWrap, 'Task is too short (minimum 3 characters).');
    return false;
  }
  
  if (value.trim().length > 100) {
    showError(errorMsgEl, inputWrap, 'Task is too long (maximum 100 characters).');
    return false;
  }
  
  hideError(errorMsgEl, inputWrap);
  return true;
}

function showError(msgEl, wrapEl, message) {
  if (msgEl) {
    msgEl.textContent = message;
    msgEl.classList.add('show');
  }
  if (wrapEl) {
    wrapEl.style.borderColor = 'var(--red)';
    wrapEl.style.boxShadow = '0 0 0 3px rgba(224, 82, 82, 0.15)';
    
    // Shake animation
    wrapEl.style.animation = 'none';
    wrapEl.offsetHeight; // trigger reflow
    wrapEl.style.animation = 'shake 0.35s ease';
  }
}

function hideError(msgEl, wrapEl) {
  if (msgEl) {
    msgEl.classList.remove('show');
  }
  if (wrapEl) {
    wrapEl.style.borderColor = '';
    wrapEl.style.boxShadow = '';
    wrapEl.style.animation = '';
  }
}
