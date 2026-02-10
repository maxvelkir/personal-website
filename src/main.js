import {
  addRoute,
  setOutlet,
  navigate,
  resolve,
  onAfterRoute,
} from "./router.js";
import { homePage, showFlanksGlobal } from "./pages/home.js";
import { indexPage } from "./pages/index-page.js";
import { linksPage } from "./pages/links.js";
import { initAnimations, applyPageEffects } from "./animations.js";

addRoute("/", homePage);
addRoute("/index", indexPage);
addRoute("/links", linksPage);
addRoute("*", homePage);

function updateActiveLink(path) {
  document.querySelectorAll(".nav-links [data-link]").forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === path);
  });
}

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function closeMobileNav() {
  if (navToggle && navLinks) {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("open");
    navToggle.classList.remove("active");
  }
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
    navToggle.classList.toggle("active");
  });
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (!link) return;

  e.preventDefault();
  const href = link.getAttribute("href");
  navigate(href);
  updateActiveLink(href);
  closeMobileNav();
});

window.addEventListener("popstate", () => {
  const path = window.location.pathname;
  updateActiveLink(path);
  resolve();
});

const seoConfig = {
  "/": {
    title:
      "Maxime Kiriakov — Full-Stack Engineer, DevOps & Cloud Architect | Portfolio",
    description:
      "Maxime Kiriakov — Head of Engineering & Full-Stack Developer specializing in cloud architecture, DevOps, and AI platforms. Explore my portfolio, experience at OmniThink AI & Erlang Solutions, and technical projects across AWS, GCP, Elixir, Python, and TypeScript.",
    canonical: "https://maximekiriakov.com/",
    ogTitle: "Maxime Kiriakov — Full-Stack Engineer, DevOps & Cloud Architect",
  },
  "/index": {
    title:
      "Experience & Projects — Maxime Kiriakov | Full-Stack, DevOps & Cloud Portfolio",
    description:
      "Browse Maxime Kiriakov's professional experience, technical projects, and skills — including roles at OmniThink AI, Erlang Solutions, and Quanterall. AWS, GCP, Terraform, Elixir, Python, TypeScript, and more.",
    canonical: "https://maximekiriakov.com/index",
    ogTitle: "Experience & Projects — Maxime Kiriakov",
  },
  "/links": {
    title: "Links & Contact — Maxime Kiriakov | GitHub, LinkedIn & Email",
    description:
      "Connect with Maxime Kiriakov — find links to GitHub, LinkedIn, email, and more. Full-stack engineer and Head of Engineering at OmniThink AI, based in Sofia, Bulgaria.",
    canonical: "https://maximekiriakov.com/links",
    ogTitle: "Links & Contact — Maxime Kiriakov",
  },
};

function updateSeoMeta(path) {
  const config = seoConfig[path] || seoConfig["/"];

  document.title = config.title;

  const descTag = document.querySelector('meta[name="description"]');
  if (descTag) descTag.setAttribute("content", config.description);

  let canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute("href", config.canonical);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", config.ogTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", config.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", config.canonical);

  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute("content", config.ogTitle);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute("content", config.description);
}

onAfterRoute((path) => {
  updateActiveLink(path);
  updateSeoMeta(path);
  // Re-apply page-level animation effects for newly rendered DOM
  applyPageEffects();

  // Keep ASCII flanks visible on every page
  showFlanksGlobal();
});

setOutlet("#content");
updateActiveLink(window.location.pathname);
resolve();

// Boot all global animations (canvas, glow, scanlines, observers, etc.)
initAnimations();
