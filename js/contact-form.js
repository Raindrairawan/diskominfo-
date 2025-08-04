// Contact Form Handling and Validation
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Form elements
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit-button');
  const formStatus = document.getElementById('form-status');

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Input validation functions
  const validators = {
    name: (value) => {
      return value.trim().length >= 3;
    },
    email: (value) => {
      return emailPattern.test(value);
    },
    subject: (value) => {
      return value.trim().length >= 5;
    },
    message: (value) => {
      return value.trim().length >= 10;
    }
  };

  // Show error message
  const showError = (input, message) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    } else {
      const newErrorElement = document.createElement('div');
      newErrorElement.className = 'error-message';
      newErrorElement.textContent = message;
      formGroup.appendChild(newErrorElement);
    }
  };

  // Clear error message
  const clearError = (input) => {
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }
  };

  // Validate a single input
  const validateInput = (input) => {
    const value = input.value;
    const name = input.name;
    
    if (!validators[name]) return true;
    
    const isValid = validators[name](value);
    
    if (!isValid) {
      let errorMessage = 'Input tidak valid';
      
      switch (name) {
        case 'name':
          errorMessage = 'Nama harus minimal 3 karakter';
          break;
        case 'email':
          errorMessage = 'Email tidak valid';
          break;
        case 'subject':
          errorMessage = 'Subjek harus minimal 5 karakter';
          break;
        case 'message':
          errorMessage = 'Pesan harus minimal 10 karakter';
          break;
      }
      
      showError(input, errorMessage);
    } else {
      clearError(input);
    }
    
    return isValid;
  };

  // Validate all inputs
  const validateForm = () => {
    let isValid = true;
    
    isValid = validateInput(nameInput) && isValid;
    isValid = validateInput(emailInput) && isValid;
    isValid = validateInput(subjectInput) && isValid;
    isValid = validateInput(messageInput) && isValid;
    
    return isValid;
  };

  // Add input event listeners for real-time validation
  nameInput.addEventListener('input', () => validateInput(nameInput));
  emailInput.addEventListener('input', () => validateInput(emailInput));
  subjectInput.addEventListener('input', () => validateInput(subjectInput));
  messageInput.addEventListener('input', () => validateInput(messageInput));

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all inputs before submission
    if (!validateForm()) {
      return;
    }
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner"></span> Mengirim...';
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success message
      formStatus.textContent = 'Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera!';
      formStatus.className = 'form-status success';
      formStatus.style.display = 'block';
      
      // Reset form
      contactForm.reset();
      
      // Reset button state
      submitButton.disabled = false;
      submitButton.innerHTML = 'Kirim Pesan';
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    }, 2000);
  });

  // Character counter for message
  if (messageInput) {
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    messageInput.parentNode.appendChild(charCounter);
    
    const updateCharCount = () => {
      const remaining = 500 - messageInput.value.length;
      charCounter.textContent = `${remaining} karakter tersisa`;
      
      if (remaining < 50) {
        charCounter.classList.add('warning');
      } else {
        charCounter.classList.remove('warning');
      }
    };
    
    messageInput.addEventListener('input', updateCharCount);
    updateCharCount(); // Initial count
  }
});