/* ═══════════════════════════════════════════════════════
   GRACE & PEACE FUNERAL SERVICES — JAVASCRIPT
═══════════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════
   SUBTAB ROUTING (packages.html & parlours.html)
   Reads ?tab= from URL and activates the correct tab on load.
══════════════════════════ */
function getUrlTab() {
  const params = new URLSearchParams(window.location.search);
  return params.get('tab');
}

/* ══════════════════════════
   PACKAGE SUBTABS
══════════════════════════ */
function showPackage(sub) {
  document.querySelectorAll('#pkg-tabs .subtab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sub === sub);
  });
  document.querySelectorAll('.pkg-subpage').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('pkg-' + sub);
  if (target) target.classList.add('active');
}

/* ══════════════════════════
   PARLOUR SUBTABS
══════════════════════════ */
function showParlour(sub) {
  document.querySelectorAll('#parlour-tabs .subtab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.sub === sub);
  });
  document.querySelectorAll('.parlour-subpage').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('parlour-' + sub);
  if (target) target.classList.add('active');
}

/* ══════════════════════════
   MOBILE MENU
══════════════════════════ */
function toggleMobile() {
  const menu    = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileOverlay');
  const ham     = document.getElementById('hamburgerBtn');
  const isOpen  = menu.classList.contains('open');
  menu.classList.toggle('open', !isOpen);
  overlay.classList.toggle('open', !isOpen);
  ham.classList.toggle('open', !isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
}

function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
  document.getElementById('hamburgerBtn').classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMobileSub(id) {
  const sub = document.getElementById(id);
  if (sub) sub.classList.toggle('open');
}

/* ══════════════════════════
   FAQ ACCORDION
══════════════════════════ */
function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

/* ══════════════════════════
   CONTACT FORM
══════════════════════════ */
function handleContactForm(e) {
  e.preventDefault();
  const form    = e.target;
  const name    = form.querySelector('#field-name').value.trim();
  const email   = form.querySelector('#field-email').value.trim();
  const message = form.querySelector('#field-message').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before submitting.');
    return;
  }

  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  setTimeout(() => {
    form.reset();
    btn.textContent = 'Send Message';
    btn.disabled = false;
    const success = document.getElementById('formSuccess');
    if (success) {
      success.style.display = 'block';
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }
  }, 1400);
}

/* ══════════════════════════
   LOCATION POPUP MODAL
══════════════════════════ */
var _locSlideImgs = [], _locSlideIdx = 0;

function openLocationPopup(key) {
  var d = locationData[key];
  if (!d) return;
  document.getElementById('locPopName').textContent = d.name;
  document.getElementById('locPopDesc').textContent = d.desc;
  document.getElementById('locPopType').textContent = d.type;

  var linkBtn = document.getElementById('locPopLink');
  if (d.link) {
    linkBtn.href = d.link;
    linkBtn.style.display = '';
  } else {
    linkBtn.style.display = 'none';
  }

  // Slideshow setup
  _locSlideImgs = d.imgs && d.imgs.length > 1 ? d.imgs : [d.img];
  _locSlideIdx  = 0;
  _locSetSlide(0);
  var multi = _locSlideImgs.length > 1;
  document.getElementById('locPopPrev').style.display = multi ? 'flex' : 'none';
  document.getElementById('locPopNext').style.display = multi ? 'flex' : 'none';

  // Build dots
  var dots = document.getElementById('locPopDots');
  dots.innerHTML = '';
  dots.style.display = multi ? 'flex' : 'none';
  _locSlideImgs.forEach(function(_, i) {
    var dot = document.createElement('div');
    dot.style.cssText = 'width:7px;height:7px;border-radius:50%;background:' + (i===0?'white':'rgba(255,255,255,.5)') + ';cursor:pointer;transition:background .2s;';
    dot.onclick = function(){ _locSetSlide(i); };
    dots.appendChild(dot);
  });

  document.getElementById('locationPopupOverlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function _locSetSlide(idx) {
  _locSlideIdx = (idx + _locSlideImgs.length) % _locSlideImgs.length;
  var img = document.getElementById('locPopImg');
  img.style.opacity = '0';
  setTimeout(function(){ img.src = _locSlideImgs[_locSlideIdx]; img.style.opacity = '1'; }, 150);
  var dots = document.getElementById('locPopDots').children;
  for (var i = 0; i < dots.length; i++) {
    dots[i].style.background = i === _locSlideIdx ? 'white' : 'rgba(255,255,255,.5)';
  }
}

function locSlide(dir) { _locSetSlide(_locSlideIdx + dir); }

function closeLocationPopup() {
  document.getElementById('locationPopupOverlay').style.display = 'none';
  document.body.style.overflow = '';
}

/* ══════════════════════════
   LOCATION DATA
══════════════════════════ */
var locationData = {
  //church
  "church_of_our_lady_of_lourdes": {
    "name": "Church of Our Lady of Lourdes",
    "desc": "A historic Catholic church in the heart of the city, known for its beautiful architecture and rich heritage. Offers a serene wake parlour for families.",
    "link": "https://www.google.com/maps/place/Church+of+Our+Lady+of+Lourdes/@1.3031666,103.8560437,17z/data=!3m1!4b1!4m6!3m5!1s0x31da19b9ff36987f:0xc0704d38c9ae630b!8m2!3d1.3031666!4d103.8560437!16zL20vMGIwaGhw?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    "img": "images/parlours/city district/church_of_ourlady_of_lourdes.jpg",
    "type": "Church"
  },
  "church_of_saint_teresa": {
    "name": "Church of Saint Teresa",
    "desc": "A well-loved parish in the city district, providing a dignified and peaceful setting for Catholic wakes with full pastoral support.",
    "link": "https://www.google.com/maps?q=Church+of+Saint+Teresa+Singapore",
    "img": "images/parlours/city district/church_of_saint_teresa.jpg",
    "type": "Church"
  },
  "saint_joseph_s_church__victoria_street_": {
    "name": "Saint Joseph's Church (Victoria Street)",
    "desc": "A vibrant parish in Upper Thomson, known for its active community and various spiritual programs.",
    "link": "https://www.google.com/maps?q=Saint+Josephs+Church+Victoria+Street+Singapore",
    "img": "images/parlours/city district/saint_josephs_church.jpg",
    "type": "Church"
  },
  "church_of_saint_francis_xavier": {
    "name": "Church of Saint Francis Xavier",
    "desc": "A welcoming parish in Serangoon serving the Catholic community with compassion. The church parlour is available for rosary prayers and family gatherings.",
    "link": "https://www.google.com/maps?q=Church+of+Saint+Francis+Xavier+Singapore",
    "img": "images/parlours/serangoon district/church_of_saint_fracis_xavier.jpg",
    "type": "Church"
  },
  "church_of_the_immaculate_heart_of_mary": {
    "name": "Church of the Immaculate Heart of Mary",
    "desc": "A serene and reverent church in the Serangoon district, dedicated to honouring loved ones with full Catholic rites and a comfortable parlour space.",
    "link": "https://www.google.com/maps?q=Church+Immaculate+Heart+of+Mary+Singapore",
    "img": "images/parlours/serangoon district/church_of_the_immaculate_heart_of_mary.jpg",
    "type": "Church"
  },
  "church_of_the_transfiguration": {
    "name": "Church of the Transfiguration",
    "desc": "A prominent parish in Serangoon offering well-maintained wake facilities and attentive pastoral care for grieving families.",
    "link": "https://www.google.com/maps?q=Church+of+the+Transfiguration+Singapore",
    "img": "images/parlours/serangoon district/church_of_transfiguration.jpg",
    "type": "Church"
  },
  "church_of_christ_the_king": {
    "name": "Church of Christ The King",
    "desc": "Located in the north, this church provides a calm and comforting environment for Catholic wakes, with experienced clergy and support staff on hand.",
    "link": "https://www.google.com/maps?q=Church+of+Christ+The+King+Singapore",
    "img": "images/parlours/north district/church_of_christ_the_king.jpg",
    "type": "Church"
  },
  "church_of_saint_anthony": {
    "name": "Church of Saint Anthony",
    "desc": "A beloved north-district parish with a dedicated wake parlour, offering full support for rosary services and traditional Catholic funeral customs.",
    "link": "https://www.google.com/maps?q=Church+of+Saint+Anthony+Singapore",
    "img": "images/parlours/north district/church_of_the_saint_anthony.jpg",
    "type": "Church"
  },
  "church_of_the_holy_spirit": {
    "name": "Church of the Holy Spirit",
    "desc": "A peaceful and spiritually uplifting church in the north, offering dignified wake arrangements with pastoral guidance from the resident clergy.",
    "link": "https://www.google.com/maps?q=Church+of+the+Holy+Spirit+Singapore",
    "img": "images/parlours/north district/church_of_the_holy_spirit.jpg",
    "type": "Church"
  },
  "saint_joseph_s_church__bukit_timah_": {
    "name": "Saint Joseph's Church (Bukit Timah)",
    "desc": "Nestled in the leafy Bukit Timah area, this parish offers an intimate and tranquil setting for Catholic wakes with a fully equipped parlour.",
    "link": "https://www.google.com/maps?q=Saint+Josephs+Church+Bukit+Timah+Singapore",
    "img": "images/parlours/north district/church_of_the_st_joseph.jpg",
    "type": "Church"
  },
  "church_of_our_lady_queen_of_peace": {
    "name": "Church of Our Lady Queen of Peace",
    "desc": "A beautiful east-district church providing a warm and reverent space for Catholic families to gather, pray, and bid farewell to their loved ones.",
    "link": "https://www.google.com/maps?q=Church+of+Our+Lady+Queen+of+Peace+Singapore",
    "img": "images/parlours/east district/church_of_the_lady_queen_of_peace.jpg",
    "type": "Church"
  },
  "church_of_saint_stephen": {
    "name": "Church of Saint Stephen",
    "desc": "A welcoming parish in the east, offering a well-maintained parlour space and compassionate support for families throughout the wake process.",
    "link": "https://www.google.com/maps/place/Church+of+St.+Stephen/@1.3257633,103.880606,17z/data=!3m1!4b1!4m6!3m5!1s0x31da182764fbc96b:0xd9a846b3d5106efc!8m2!3d1.3257633!4d103.8831809!16s%2Fg%2F1tfbf77q?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    "img": "images/parlours/east district/church_of_saint_stepen.jpg",
    "type": "Church"
  },
  "church_of_saint_ignatius": {
    "name": "Church of Saint Ignatius",
    "desc": "A prominent west-district parish with excellent facilities, dedicated to serving Catholic families with reverence, warmth, and full pastoral care.",
    "link": "https://www.google.com/maps?q=Church+of+Saint+Ignatius+Singapore",
    "img": "images/parlours/west district/church_of_saint_ignatius.jpg",
    "type": "Church"
  },
  "church_of_saint_mary_of_the_angels": {
    "name": "Church of Saint Mary of the Angels",
    "desc": "A charming and historic Franciscan church in the west, offering a dignified parlour setting and deep spiritual support for grieving families.",
    "link": "https://www.google.com/maps?q=Church+of+Saint+Mary+of+the+Angels+Singapore",
    "img": "images/parlours/west district/st_marys_of_the_angels.jpg",
    "type": "Church"
  },
  "church_of_the_holy_cross": {
    "name": "Church of the Holy Cross",
    "desc": "Located in the west, this church provides a peaceful wake environment with experienced pastoral staff and a respectful, caring atmosphere.",
    "link": "https://www.google.com/maps?q=Church+of+the+Holy+Cross+Singapore",
    "img": "images/parlours/west district/church_of_the_holy_cross.jpg",
    "type": "Church"
  },

  //venue
  "the_garden_of_remembrance_parlour": {
    "name": "The Garden of Remembrance Parlour",
    "desc": "A serene, garden-inspired funeral parlour offering a tranquil setting for families of all faiths. Features landscaped grounds, comfortable lounges, and dedicated wake halls for an intimate farewell.",
    "link": "https://www.google.com/maps?q=Garden+of+Remembrance+Singapore",
    "img": "images/parlours/outside the churches/the_garden_of_remembrence.jpg",
    "type": "Venue"
  },
  "singapore_funeral_parlour__tampines_": {
    "name": "Singapore Funeral Parlour (Tampines)",
    "desc": "Conveniently located in Tampines, this professionally managed funeral parlour provides fully equipped wake halls with flexible capacity, air-conditioned facilities, and ample parking for guests.",
    "link": "https://www.google.com/maps/place/Singapore+Funeral+Parlour/@1.3676995,103.9265889,17z/data=!3m1!4b1!4m6!3m5!1s0x31da3d3505ffa8a9:0xf9fae3db68ea0b72!8m2!3d1.3676995!4d103.9291638!16s%2Fg%2F11g0zx9vhx?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    "img": "images/parlours/outside the churches/Singapore_funeral_parlour.jpg",
    "type": "Venue"
  },
  "woodlands_memorial": {
    "name": "Woodlands Memorial",
    "desc": "Situated in the north of Singapore, Woodlands Memorial offers dignified wake facilities with a calm, respectful environment. Easily accessible for families in the Woodlands and Yishun areas.",
    "link": "https://www.google.com/maps/place/Woodlands+Memorial/@1.4533843,103.797655,17z/data=!3m1!4b1!4m6!3m5!1s0x31da131790de4329:0x112a809faa3048c9!8m2!3d1.4533843!4d103.8002299!16s%2Fg%2F11rq8nzm4s?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    "img": "images/parlours/outside the churches/woodlands_memorial.jpg",
    "type": "Venue"
  },
  "private_parlours": {
    "name": "Private Parlours",
    "desc": "For families seeking a more private and exclusive setting, we work with a network of private parlours across Singapore. These venues offer personalised spaces tailored to your family's specific needs and preferences.",
    "link": "https://www.google.com/maps/search/private+funeral+parlour+Singapore/@1.3738821,103.6915735,12z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI2MDIyNS4wIKXMDSoASAFQAw%3D%3D",
    "img": "images/parlours/outside the churches/private_parlour_at_selected_locations_available.jpg",
    "type": "Venue"
  },
  "home___hdb_void_deck": {
    "name": "Home / HDB Void Deck",
    "desc": "A traditional and meaningful choice for many Singapore families. Our team will manage the full setup of the void deck or home wake, including tentage, seating, floral arrangements, and all necessary equipment.",
    "img": "images/parlours/outside the churches/wake_at_landed_property.jpg",
    "imgs": [
      "images/parlours/outside the churches/wake_at_landed_property.jpg",
      "images/parlours/outside the churches/HDB_void_deck.jpg",
      "images/parlours/outside the churches/HDB_multi_purpose_hall.jpg"
    ],
    "type": "Venue"
  }
};

/* ══════════════════════════
   INIT
══════════════════════════ */
document.addEventListener('DOMContentLoaded', function() {

  // ── Set active nav link based on current page ──
  var currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  document.querySelectorAll('.nav-btn').forEach(function(btn) {
    var page = btn.dataset.page;
    if (
      (page === 'home' && (currentPage === 'index' || currentPage === '')) ||
      (page === currentPage)
    ) {
      btn.classList.add('active');
    }
  });

  // ── Read URL ?tab= param for packages & parlours pages ──
  var tab = getUrlTab();
  if (tab) {
    // packages page
    if (document.getElementById('pkg-tabs')) {
      showPackage(tab);
    }
    // parlours page
    if (document.getElementById('parlour-tabs')) {
      showParlour(tab);
    }
  }

  // ── Contact form ──
  var contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleContactForm);

  // ── Mobile overlay click closes menu ──
  var overlay = document.getElementById('mobileOverlay');
  if (overlay) overlay.addEventListener('click', closeMobile);

  // ── Escape key closes location popup ──
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLocationPopup();
  });

  // ── Dropdown hover reliability fix ──
  document.querySelectorAll('.nav-item').forEach(function(item) {
    var closeTimer = null;
    var dropdown   = item.querySelector('.dropdown');
    if (!dropdown) return;

    item.addEventListener('mouseenter', function() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      dropdown.style.opacity     = '1';
      dropdown.style.visibility  = 'visible';
      dropdown.style.pointerEvents = 'all';
    });

    item.addEventListener('mouseleave', function() {
      closeTimer = setTimeout(function() {
        dropdown.style.opacity     = '';
        dropdown.style.visibility  = '';
        dropdown.style.pointerEvents = '';
      }, 120);
    });

    dropdown.addEventListener('mouseenter', function() {
      if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    });

    dropdown.addEventListener('mouseleave', function() {
      closeTimer = setTimeout(function() {
        dropdown.style.opacity     = '';
        dropdown.style.visibility  = '';
        dropdown.style.pointerEvents = '';
      }, 80);
    });
  });

  // ── Subtle scroll shadow on header ──
  var header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (header) {
      header.style.boxShadow = window.scrollY > 10
        ? '0 4px 24px rgba(22,38,97,.12)'
        : '0 2px 12px rgba(22,38,97,.07)';
    }
  }, { passive: true });

  // ── Intersection observer fade-in animations ──
  var fadeEls = document.querySelectorAll('.service-card, .testi-card, .value-card, .pkg-card, .parlour-preview-card, .parlour-full-card');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function(el, i) {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease ' + (i * 0.07) + 's, transform .5s ease ' + (i * 0.07) + 's, box-shadow .25s, border-color .25s';
      observer.observe(el);
    });
  }

});
