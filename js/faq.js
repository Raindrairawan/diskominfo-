// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  // Toggle FAQ item
  const toggleFaq = (item) => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');
    
    // Check if this item is already active
    const isActive = item.classList.contains('active');
    
    // First, close all items
    faqItems.forEach(faqItem => {
      // Skip the current item
      if (faqItem === item) return;
      
      const faqContent = faqItem.querySelector('.faq-content');
      const faqIcon = faqItem.querySelector('.faq-icon');
      
      faqItem.classList.remove('active');
      faqContent.style.maxHeight = null;
      
      if (faqIcon) {
        faqIcon.classList.remove('fa-minus');
        faqIcon.classList.add('fa-plus');
      }
    });
    
    // Then toggle the current item
    if (isActive) {
      item.classList.remove('active');
      content.style.maxHeight = null;
      
      if (icon) {
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    } else {
      item.classList.add('active');
      content.style.maxHeight = content.scrollHeight + 'px';
      
      if (icon) {
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      }
    }
  };

  // Add click event to each FAQ header
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    
    header.addEventListener('click', () => {
      toggleFaq(item);
    });
    
    // Add keyboard accessibility
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleFaq(item);
      }
    });
  });

  // Open the first FAQ item by default
  if (faqItems.length > 0) {
    toggleFaq(faqItems[0]);
  }

  // Handle FAQ filtering if filter buttons exist
  const faqFilterButtons = document.querySelectorAll('.faq-filter-btn');
  if (faqFilterButtons.length) {
    faqFilterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        faqFilterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        // Filter FAQ items
        faqItems.forEach(item => {
          if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ Search functionality
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    faqSearch.addEventListener('input', () => {
      const searchTerm = faqSearch.value.toLowerCase();
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-content').textContent.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Expand all FAQs button
  const expandAllBtn = document.getElementById('expand-all-faqs');
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const isExpanded = expandAllBtn.classList.contains('expanded');
      
      if (isExpanded) {
        // Collapse all
        faqItems.forEach(item => {
          const content = item.querySelector('.faq-content');
          const icon = item.querySelector('.faq-icon');
          
          item.classList.remove('active');
          content.style.maxHeight = null;
          
          if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        });
        
        expandAllBtn.classList.remove('expanded');
        expandAllBtn.textContent = 'Expand All';
      } else {
        // Expand all
        faqItems.forEach(item => {
          const content = item.querySelector('.faq-content');
          const icon = item.querySelector('.faq-icon');
          
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
          
          if (icon) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
          }
        });
        
        expandAllBtn.classList.add('expanded');
        expandAllBtn.textContent = 'Collapse All';
      }
    });
  }
});