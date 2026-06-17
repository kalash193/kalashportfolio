// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

// Select all elements that have the "reveal" class
const revealElements = document.querySelectorAll('.reveal');

// Create an observer that watches when elements appear on screen
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    // If the element is visible on screen
    if (entry.isIntersecting) {
      entry.target.classList.add('show'); // add "show" class to make it visible
      revealObserver.unobserve(entry.target); // stop watching it (no need anymore)
    }
  });
}, { threshold: 0.12 }); // trigger when 12% of the element is visible

// Start watching each reveal element
revealElements.forEach(function(el) {
  revealObserver.observe(el);
});


// ===========================
// SKILL BAR ANIMATION
// ===========================

// Select all skill cards
const skillCards = document.querySelectorAll('.skill-card');

// Create an observer for skill bars
const skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Get the skill bar inside this card
      const bar = entry.target.querySelector('.skill-bar');

      // Get the skill level number from the data-level attribute
      const level = entry.target.getAttribute('data-level');

      // Animate the bar width to match the skill level
      bar.style.width = level + '%';

      // Stop watching this card
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 }); // trigger when 30% of the card is visible

// Start watching each skill card
skillCards.forEach(function(card) {
  skillObserver.observe(card);
});


// ===========================
// ACTIVE NAV LINK HIGHLIGHT
// ===========================

// Get all sections and nav links
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// Watch which section is currently on screen
const sectionObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Remove active style from all links
      navLinks.forEach(function(link) {
        link.style.background = '';
        link.style.color = '';
      });

      // Find the matching nav link and highlight it
      const activeLink = document.querySelector('.nav-links a[href="#' + entry.target.id + '"]');
      if (activeLink) {
        activeLink.style.background = '#e8eeff';
        activeLink.style.color = '#4f7fff';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(function(section) {
  sectionObserver.observe(section);
});


// ===========================
// SMOOTH SCROLL FOR NAV LINKS
// ===========================

navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // stop default jump behaviour

    // Get the target section id from the href
    const targetId = link.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Scroll smoothly to that section
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


// ===========================
// CURRENT YEAR IN FOOTER
// ===========================

// Automatically update the year in the footer
const footer = document.querySelector('footer');
if (footer) {
  const currentYear = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace('2026', currentYear);
}
