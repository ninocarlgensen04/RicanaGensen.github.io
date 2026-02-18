// ============================================
// THEME TOGGLE FUNCTIONALITY
// ============================================

(function() {
  'use strict';
  
  // Initialize theme on page load
  function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }
  
  // Call init immediately to prevent flash
  initTheme();
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupThemeToggle);
  } else {
    setupThemeToggle();
  }
  
  function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (!themeToggle) {
      console.error('Theme toggle button not found');
      return;
    }
    
    // Update icon based on current theme
    updateThemeIcon();
    
    // Add click event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    console.log('Theme toggle initialized successfully');
  }
  
  function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
    
    console.log('Theme switched to:', newTheme);
  }
  
  function updateThemeIcon() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (!icon) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    if (currentTheme === 'light') {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }
  
})();

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// ============================================
// RESUME & CV FUNCTIONS
// ============================================

function viewResume() {
  const resumePath = './Assets/Ricana-RESUME.pdf';
  window.open(resumePath, '_blank');
}

function downloadResume() {
  const resumePath = './Assets/Ricana-RESUME.pdf';
  const link = document.createElement('a');
  link.href = resumePath;
  link.download = 'My_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function viewCV() {
  const cvPath = './Assets/CV.pdf';
  window.open(cvPath, '_blank');
}

function downloadCV() {
  const cvPath = './Assets/CV.pdf';
  const link = document.createElement('a');
  link.href = cvPath;
  link.download = 'My_CV.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


// ============================================================
//  EXPERIENCE SECTION v2 – Horizontal Slider
//  Replace your previous experience JS with this
// ============================================================

const experiences = [
  {
    img:     'Assets/img/experience1.jpg',
    alt:     'Presentation at Alliance Software',
    title:   'Low-Code Training Program by Alliance Software Inc.',
    desc:    'Completed 5 months of training while contributing to the development of a desktop E-commerce Store application using Power Apps, Power Automate, and Power BI. Designed intuitive user interfaces as a Front-End Developer and performed functional testing as a Technical Leader, ensuring smooth workflows, accurate data, and overall system reliability prior to deployment.',
    btnText: 'Download Certificate',
    btnHref: '#'
  },
  {
    img:     'Assets/img/experience2.jpg',
    alt:     'Computer hardware assembly',
    title:   'Computer Hardware Assembly & Troubleshooting',
    desc:    'Hands-on experience assembling, upgrading, and troubleshooting desktop computer systems. Worked with motherboards, CPUs, RAM, storage devices, and power supplies — developing strong diagnostic skills and understanding of hardware-software integration.',
    btnText: 'View Project',
    btnHref: '#'
  },
  {
    img:     'Assets/img/experience3.jpg',
    alt:     'Electronics soldering',
    title:   'Electronics & PCB Prototyping',
    desc:    'Engaged in hands-on electronics work including soldering components onto PCBs, building basic circuits, and prototyping embedded systems. Gained experience with soldering irons, heat guns, and testing equipment as part of applied electronics coursework.',
    btnText: 'View Details',
    btnHref: '#'
  },
  {
    img:     'Assets/img/experience4.jpg',
    alt:     'Lab work',
    title:   'IT Laboratory Work',
    desc:    'Participated in hands-on IT lab sessions involving computer networking, system configuration, and applied programming exercises. Developed practical technical skills in a structured academic environment.',
    btnText: 'View Details',
    btnHref: '#'
  }
];

// ── DOM refs ──
const sliderWrapper  = document.getElementById('expSliderWrapper');
const sliderTrack    = document.getElementById('expSliderTrack');
const sliderPrev     = document.getElementById('sliderPrev');
const sliderNext     = document.getElementById('sliderNext');
const sliderDots     = document.getElementById('sliderDots');
const expDetail      = document.getElementById('expDetail');
const backBtn        = document.getElementById('backBtn');
const detailImg      = document.getElementById('detailImg');
const detailTitle    = document.getElementById('detailTitle');
const detailDesc     = document.getElementById('detailDesc');
const detailBtn      = document.getElementById('detailBtn');

// ── Slider state ──
const slides        = sliderTrack.querySelectorAll('.exp-slide');
const totalSlides   = slides.length;
const visibleCount  = window.innerWidth <= 600 ? 1 : window.innerWidth <= 900 ? 2 : 3;
let   currentIndex  = 0;

// ── Build dots ──
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('slider-dot');
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  sliderDots.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function updateArrows() {
  sliderPrev.disabled = currentIndex === 0;
  sliderNext.disabled = currentIndex >= totalSlides - visibleCount;
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, totalSlides - visibleCount));

  // Calculate slide width + gap
  const slideEl   = slides[0];
  const slideW    = slideEl.offsetWidth;
  const gap       = 16;
  const offset    = currentIndex * (slideW + gap);

  sliderTrack.style.transform = `translateX(-${offset}px)`;
  updateDots();
  updateArrows();
}

// ── Arrow click handlers ──
sliderPrev.addEventListener('click', () => goToSlide(currentIndex - 1));
sliderNext.addEventListener('click', () => goToSlide(currentIndex + 1));

// Initialize arrow state
updateArrows();

// ── Click a slide → open detail ──
sliderTrack.addEventListener('click', (e) => {
  const slide = e.target.closest('.exp-slide');
  if (!slide) return;

  const id  = parseInt(slide.dataset.id);
  const exp = experiences[id];

  // Use the actual loaded image src from the clicked slide
  const clickedImgSrc = slide.querySelector('img').src;

  detailImg.src           = clickedImgSrc;
  detailImg.alt           = exp.alt;
  detailTitle.textContent = exp.title;
  detailDesc.textContent  = exp.desc;
  detailBtn.textContent   = exp.btnText;
  detailBtn.href          = exp.btnHref;

  // Fade out slider → show detail
  sliderWrapper.classList.add('exp-fade-out');
  setTimeout(() => {
    sliderWrapper.style.display = 'none';
    sliderWrapper.classList.remove('exp-fade-out');

    expDetail.style.display = 'flex';
    requestAnimationFrame(() => expDetail.classList.add('visible'));
  }, 280);
});

// ── Back button → return to slider ──
backBtn.addEventListener('click', () => {
  expDetail.classList.remove('visible');
  expDetail.classList.add('exp-fade-out');

  setTimeout(() => {
    expDetail.style.display = 'none';
    expDetail.classList.remove('exp-fade-out');

    sliderWrapper.style.display = 'flex';
    sliderWrapper.classList.add('exp-fade-in');

    sliderWrapper.addEventListener('animationend', () => {
      sliderWrapper.classList.remove('exp-fade-in');
    }, { once: true });
  }, 280);
});