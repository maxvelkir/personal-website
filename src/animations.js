// ─── Particle Grid Background ───────────────────────────────────────────────
// Draws a subtle animated dot grid with floating connection lines on a
// full-screen canvas.  Neon-accented, low-opacity, very performant.

const PARTICLE_COUNT = 2000;
const CONNECTION_DIST = 250;
const MOUSE_RADIUS = 100;
const BASE_SPEED = 0.01;

let canvas, ctx, particles, mouse, raf, dpr;

function initParticleGrid() {
  canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
    opacity: "0",
    transition: "opacity 1.2s ease",
  });
  document.body.prepend(canvas);
  requestAnimationFrame(() => (canvas.style.opacity = "1"));

  ctx = canvas.getContext("2d");
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  mouse = { x: -9999, y: -9999 };
  particles = [];

  resize();
  seed();
  animate();

  window.addEventListener("resize", debounce(handleResize, 200));
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mouseleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;
  });
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function handleResize() {
  resize();
  seed();
}

function seed() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const count = Math.min(PARTICLE_COUNT, Math.floor((w * h) / 12000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * BASE_SPEED * 2,
    vy: (Math.random() - 0.5) * BASE_SPEED * 2,
    r: Math.random() * 1.2 + 0.6,
    hue: Math.random() > 0.5 ? 168 : 200, // mint or blue neon
  }));
}

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function animate() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  for (const p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    // wrap around edges
    if (p.x < 0) p.x = w;
    if (p.x > w) p.x = 0;
    if (p.y < 0) p.y = h;
    if (p.y > h) p.y = 0;

    // mouse repulsion (soft)
    const mdx = p.x - mouse.x;
    const mdy = p.y - mouse.y;
    const md = Math.sqrt(mdx * mdx + mdy * mdy);
    if (md < MOUSE_RADIUS) {
      const force = (1 - md / MOUSE_RADIUS) * 0.02;
      p.vx += mdx * force;
      p.vy += mdy * force;
    }

    // dampen velocity
    p.vx *= 0.99;
    p.vy *= 0.99;

    // draw dot
    const baseBright =
      md < MOUSE_RADIUS ? 0.45 + (1 - md / MOUSE_RADIUS) * 0.35 : 0.25;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${baseBright})`;
    ctx.fill();
  }

  // draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.12;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `hsla(168, 80%, 70%, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  raf = requestAnimationFrame(animate);
}

// ─── Scroll Reveal (Intersection Observer) ──────────────────────────────────
// Automatically observes elements with [data-reveal] and fades + slides them
// in when they enter the viewport.

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
  );

  observeRevealTargets(observer);
  return observer;
}

function observeRevealTargets(observer) {
  document.querySelectorAll("[data-reveal]").forEach((el) => {
    if (!el.classList.contains("revealed")) {
      observer.observe(el);
    }
  });
}

// ─── Typing Effect ──────────────────────────────────────────────────────────
// Simulates typing for elements with [data-typing].  Text is taken from the
// element's textContent; the element is emptied and re-typed char by char.

function initTypingEffects() {
  document.querySelectorAll("[data-typing]").forEach((el) => {
    if (el.dataset._typed) return;
    el.dataset._typed = "1";

    const text = el.textContent;
    el.textContent = "";
    el.style.visibility = "visible";

    const speed = parseInt(el.dataset.typing, 10) || 55;
    let i = 0;

    function type() {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
        setTimeout(type, speed + Math.random() * 30);
      }
    }

    // Small initial delay so the page has time to paint
    setTimeout(type, 350);
  });
}

// ─── Glitch Text Effect ────────────────────────────────────────────────────
// Elements with class .glitch-text get a CSS-driven glitch on hover.
// JS handles cloning the text into data attributes for the pseudo-elements.

function initGlitchText() {
  document.querySelectorAll(".glitch-text").forEach((el) => {
    if (el.dataset._glitch) return;
    el.dataset._glitch = "1";
    el.setAttribute("data-text", el.textContent);
  });
}

let borderAngle = 0;

function initNeonBorders() {
  function tick() {
    borderAngle = (borderAngle + 0.4) % 360;
    document.documentElement.style.setProperty(
      "--border-angle",
      borderAngle + "deg",
    );
    requestAnimationFrame(tick);
  }
  tick();
}

// ─── Scanline Overlay ───────────────────────────────────────────────────────
// Extremely subtle CRT scanline texture over the page (CSS-only, toggled via
// a dom element).

function initScanlines() {
  const overlay = document.createElement("div");
  overlay.id = "scanlines";
  overlay.setAttribute("aria-hidden", "true");
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "9999",
    pointerEvents: "none",
    background:
      "repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
    opacity: "0.5",
    mixBlendMode: "multiply",
  });
  document.body.appendChild(overlay);
}

// ─── Page Transition Helper ─────────────────────────────────────────────────
// Wraps page content in a fade-slide transition when the route changes.

function pageEnterTransition() {
  const content = document.getElementById("content");
  if (!content) return;

  content.classList.remove("page-enter-active");
  // Force reflow
  void content.offsetWidth;
  content.classList.add("page-enter-active");
}

// ─── Nav Scroll Shadow ──────────────────────────────────────────────────────
// Adds a subtle bottom glow/shadow to the navbar when scrolled.

function initNavScrollEffect() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > 10) {
            nav.classList.add("nav-scrolled");
          } else {
            nav.classList.remove("nav-scrolled");
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );
}

// ─── Tag Hover Tilt ─────────────────────────────────────────────────────────
// A fun micro-interaction: skill tags tilt slightly toward the cursor on
// hover, adding a 3D tactile quality.

function initTagTilt() {
  document.addEventListener(
    "mousemove",
    (e) => {
      const tag = e.target.closest(".tag");
      if (!tag) return;

      const rect = tag.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * -8;
      const tiltY = (x / rect.width) * 8;

      tag.style.transform = `perspective(400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    },
    { passive: true },
  );

  document.addEventListener(
    "mouseleave",
    (e) => {
      if (e.target.classList && e.target.classList.contains("tag")) {
        e.target.style.transform = "";
      }
    },
    true,
  );

  // Reset when mouse leaves a tag (mouseout)
  document.addEventListener(
    "mouseout",
    (e) => {
      const tag = e.target.closest(".tag");
      if (tag && !tag.contains(e.relatedTarget)) {
        tag.style.transform = "";
      }
    },
    { passive: true },
  );
}

// ─── Utilities ──────────────────────────────────────────────────────────────

function debounce(fn, ms) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ─── Public API ─────────────────────────────────────────────────────────────

let revealObserver = null;

export function initAnimations() {
  initParticleGrid();
  initScanlines();
  initNeonBorders();
  initNavScrollEffect();
  initTagTilt();
  revealObserver = initScrollReveal();
  applyPageEffects();
}

/** Call after every route change so new DOM nodes get wired up. */
export function applyPageEffects() {
  initTypingEffects();
  initGlitchText();
  pageEnterTransition();

  if (revealObserver) {
    observeRevealTargets(revealObserver);
  }
}
