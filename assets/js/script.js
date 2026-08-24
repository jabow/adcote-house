/* ===================================================================
   ADCOTE HOUSE GUEST HOUSE — SCRIPT.JS
   Plain, dependency-free JavaScript.

   Sections:
   1. Mobile navigation menu
   2. Sticky header shadow on scroll
   3. Active navigation link highlighting
   4. Smooth scroll offset for anchor links
   5. Scroll reveal animations
   6. Back-to-top button
   7. Contact form validation
   8. Footer year
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------------------
     1. MOBILE NAVIGATION MENU
  ----------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  function closeMenu() {
    primaryNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    var isOpen = primaryNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', toggleMenu);

    // Close the mobile menu whenever a nav link is clicked
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close the mobile menu on Escape
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });
  }

  /* -----------------------------------------
     2. STICKY HEADER SHADOW ON SCROLL
  ----------------------------------------- */
  var siteHeader = document.getElementById('site-header');

  function updateHeaderShadow() {
    if (window.scrollY > 10) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  }

  updateHeaderShadow();
  window.addEventListener('scroll', updateHeaderShadow);

  /* -----------------------------------------
     3. ACTIVE NAVIGATION LINK HIGHLIGHTING
  ----------------------------------------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('main section[id]');

  function setActiveLink() {
    var scrollPosition = window.scrollY + 120;
    var currentSectionId = '';

    sections.forEach(function (section) {
      if (scrollPosition >= section.offsetTop) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('href') === '#' + currentSectionId;
      link.classList.toggle('is-active', isActive);
    });
  }

  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  /* -----------------------------------------
     4. SMOOTH SCROLL (native CSS handles the
        motion; this just moves focus for
        keyboard/screen-reader users)
  ----------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href').slice(1);
      var targetEl = document.getElementById(targetId);
      if (targetEl) {
        // Allow the native smooth scroll to happen, then move focus
        window.setTimeout(function () {
          targetEl.setAttribute('tabindex', '-1');
          targetEl.focus({ preventScroll: true });
        }, 400);
      }
    });
  });

  /* -----------------------------------------
     5. SCROLL REVEAL ANIMATIONS
  ----------------------------------------- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealElements.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything immediately if IntersectionObserver isn't supported
    revealElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* -----------------------------------------
     6. BACK-TO-TOP BUTTON
  ----------------------------------------- */
  var backToTopBtn = document.getElementById('backToTop');

  function toggleBackToTop() {
    var shouldShow = window.scrollY > 500;
    backToTopBtn.hidden = false; // keep in DOM/tab order once page has scrolled at least once
    backToTopBtn.classList.toggle('is-visible', shouldShow);
  }

  if (backToTopBtn) {
    window.addEventListener('scroll', toggleBackToTop);
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* -----------------------------------------
     7. CONTACT FORM VALIDATION
  ----------------------------------------- */
  var enquiryForm = document.getElementById('enquiryForm');
  var formSuccess = document.getElementById('formSuccess');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var isValid = true;

      var name = document.getElementById('name');
      var email = document.getElementById('email');
      var phone = document.getElementById('phone');
      var message = document.getElementById('message');

      isValid = validateName(name) && isValid;
      isValid = validateEmail(email) && isValid;
      isValid = validatePhone(phone) && isValid;
      isValid = validateMessage(message) && isValid;

      if (isValid) {
        formSuccess.hidden = false;
        enquiryForm.reset();

        // Clear any leftover error states
        enquiryForm.querySelectorAll('.form-row').forEach(function (row) {
          row.classList.remove('has-error');
        });

        // In production, replace this with a real form submission
        // (e.g. fetch() to a backend endpoint or booking service).
      } else {
        formSuccess.hidden = true;
      }
    });
  }

  function showError(input, errorId, message) {
    var errorEl = document.getElementById(errorId);
    var row = input.closest('.form-row');
    row.classList.add('has-error');
    errorEl.textContent = message;
  }

  function clearError(input, errorId) {
    var errorEl = document.getElementById(errorId);
    var row = input.closest('.form-row');
    row.classList.remove('has-error');
    errorEl.textContent = '';
  }

  function validateName(input) {
    if (input.value.trim().length < 2) {
      showError(input, 'nameError', 'Please enter your name.');
      return false;
    }
    clearError(input, 'nameError');
    return true;
  }

  function validateEmail(input) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(input.value.trim())) {
      showError(input, 'emailError', 'Please enter a valid email address.');
      return false;
    }
    clearError(input, 'emailError');
    return true;
  }

  function validatePhone(input) {
    // Phone number is optional, but if provided it should look like a phone number
    var value = input.value.trim();
    var phonePattern = /^[0-9+\s()-]{7,}$/;

    if (value !== '' && !phonePattern.test(value)) {
      showError(input, 'phoneError', 'Please enter a valid phone number.');
      return false;
    }
    clearError(input, 'phoneError');
    return true;
  }

  function validateMessage(input) {
    if (input.value.trim().length < 10) {
      showError(input, 'messageError', 'Please enter a message of at least 10 characters.');
      return false;
    }
    clearError(input, 'messageError');
    return true;
  }

  /* -----------------------------------------
     8. FOOTER YEAR
  ----------------------------------------- */
  var yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
