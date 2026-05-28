// LOADER → MAIN reveal
window.addEventListener('load', function () {
  setTimeout(function () {
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('main').classList.add('visible');
    initReveal();
    initTypewriter();
  }, 2400);
});

// SCROLL REVEAL
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.10 });
  items.forEach(function (el) { obs.observe(el); });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    e.preventDefault();
    var id = a.getAttribute('href').slice(1);
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

// TYPEWRITER
function initTypewriter() {
  var el = document.getElementById('typewriter');
  if (!el) return;

  var names = ['Gabi', 'Laura', 'Sofia', 'Ana', 'Bruna', 'Lais', 'Júlia', 'Carla', 'Mariana'];
  var nameIdx = 0;
  var charIdx = 0;
  var isDeleting = false;
  var pauseMs = 1400;
  var typeSpeed = 100;
  var deleteSpeed = 60;

  function tick() {
    var current = names[nameIdx];

    if (!isDeleting) {
      charIdx++;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(tick, pauseMs);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIdx--;
      el.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        nameIdx = (nameIdx + 1) % names.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  setTimeout(tick, 800);
}

// COUNTER ANIMATION
function animateCounters() {
  document.querySelectorAll('.proof-stat-number[data-target]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var duration = 1600;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  });
}

var proofObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      animateCounters();
      proofObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

var proofSection = document.querySelector('.proof-section');
if (proofSection) proofObserver.observe(proofSection);
