/* ===============================
   TYPING ANIMATION
=============================== */
const words = ["Web Developer", "Frontend Designer", "UI/UX Enthusiast"];
let i = 0, j = 0, isDeleting = false;
const typing = document.getElementById("typing");

function type() {
  const word = words[i];
  if (!isDeleting) {
    typing.textContent = word.substring(0, j + 1);
    j++;
    if (j === word.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  } else {
    typing.textContent = word.substring(0, j - 1);
    j--;
    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  }
  setTimeout(type, isDeleting ? 80 : 120);
}
type();

/* ===============================
   AUTO ASSIGN SECTION IDS
=============================== */
document.querySelectorAll('section').forEach((section, index) => {
  if (!section.id) section.id = 'section' + (index + 1);
});

/* ===============================
   MOBILE MENU TOGGLE
=============================== */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.querySelector('.nav-linkss');
const overlay = document.querySelector('.overlay');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('active');
    overlay?.classList.toggle('active');
    menuToggle.classList.replace(isOpen ? 'fa-bars' : 'fa-xmark', isOpen ? 'fa-xmark' : 'fa-bars');
  });
}

overlay?.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  menuToggle.classList.replace('fa-xmark', 'fa-bars');
});

/* ===============================
   SLIDE-IN SECTION ANIMATION ON LINK CLICK
=============================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    e.preventDefault();

    // Close mobile menu if open
    if (mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      overlay?.classList.remove('active');
      menuToggle.classList.replace('fa-xmark', 'fa-bars');
    }

    // Reset target style for animation
    target.style.transition = 'none';
    target.style.transform = 'translateX(50px)';
    target.style.opacity = 0;

    // Scroll instantly to section
    target.scrollIntoView({ block: 'start' });

    // Trigger animation after a tiny delay
    setTimeout(() => {
      target.style.transition = 'all 0.5s ease';
      target.style.transform = 'translateX(0)';
      target.style.opacity = 1;
    }, 20); // 20ms delay ensures it works first click
  });
});
const form = document.getElementById('contactForm');
const status = document.getElementById('status');

// Your WhatsApp number with country code (no + sign)
const whatsappNumber = "2349139371170"; 

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    status.textContent = "⚠️ Please fill in all fields.";
    status.style.color = "orange";
    return;
  }

  // Format the message for WhatsApp
  const text = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

  // Open WhatsApp Web in a new tab with prefilled message
  const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${text}`;
  window.open(waUrl, '_blank');

  // Show confirmation on the page
  status.textContent = "✅ Message sent!";
  status.style.color = "lime";

  // Reset the form
  form.reset();
});
