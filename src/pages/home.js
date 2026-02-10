import { html } from "../html.js";

const ASCII_ART_URL = "/ascii-art.txt";

let cachedAsciiArt = null;
let flanksInjected = false;

function injectFlanks() {
  if (flanksInjected) return;
  flanksInjected = true;

  const wrapper = document.createElement("div");
  wrapper.id = "ascii-flanks";
  wrapper.setAttribute("aria-hidden", "true");

  const left = document.createElement("pre");
  left.className = "ascii-flank ascii-flank-left";
  left.id = "ascii-flank-left";

  const right = document.createElement("pre");
  right.className = "ascii-flank ascii-flank-right";
  right.id = "ascii-flank-right";

  wrapper.appendChild(left);
  wrapper.appendChild(right);
  document.body.appendChild(wrapper);
}

function populateFlanks(text) {
  const left = document.getElementById("ascii-flank-left");
  const right = document.getElementById("ascii-flank-right");
  if (left) {
    left.textContent = text;
    left.classList.add("ascii-loaded");
  }
  if (right) {
    right.textContent = text;
    right.classList.add("ascii-loaded");
  }
}

function loadAsciiArt() {
  if (cachedAsciiArt !== null) {
    populateFlanks(cachedAsciiArt);
    return;
  }

  fetch(ASCII_ART_URL)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load ASCII art");
      return res.text();
    })
    .then((text) => {
      cachedAsciiArt = text;
      populateFlanks(cachedAsciiArt);
    })
    .catch(() => {
      /* silently fail – the art is decorative */
    });
}

function showFlanks() {
  const wrapper = document.getElementById("ascii-flanks");
  if (wrapper) wrapper.classList.add("ascii-flanks-visible");
}

/** Call from any route to ensure the ASCII flanks are visible. */
export function showFlanksGlobal() {
  injectFlanks();
  loadAsciiArt();
  showFlanks();
}

export function homePage() {
  return html`
    <section class="page-home">
      <p class="home-greeting" data-reveal>
        <span data-typing="45">$ whoami</span><span class="cursor"></span>
      </p>

      <h1 class="home-name glitch-text" data-reveal>Maxime Kiriakov</h1>

      <p class="home-tagline" data-reveal>
        Tech &amp; Humanity Enthusiast. Full Stack. DevOps. Cloud.<br />
        I design and build
        <span class="highlight">applications in the cloud</span> ☁️<br />
        <em class="home-quote"
          >"I have no special talent. I am only passionately curious."</em
        >
      </p>

      <div class="home-status" data-reveal>
        <span class="status-dot"></span>
        <span>Head of Engineering @ OmniThink AI</span>
      </div>

      <div class="home-section" data-reveal>
        <h2 class="home-section-title">Currently</h2>
        <p class="home-body">
          Leading engineering at
          <a href="https://omnithink.ai" target="_blank" rel="noopener"
            >OmniThink AI</a
          >, directing the development of an agentic AI platform integrating
          generative AI. Previously built cloud infrastructure and DevOps
          pipelines at
          <a
            href="https://www.erlang-solutions.com"
            target="_blank"
            rel="noopener"
            >Erlang Solutions</a
          >, and shipped fintech &amp; bioinformatics platforms at
          <a href="https://quanterall.com" target="_blank" rel="noopener"
            >Quanterall</a
          >. Based in Sofia, Bulgaria — working globally.
        </p>
      </div>

      <div class="home-section" data-reveal>
        <h2 class="home-section-title">What I Do</h2>
        <p class="home-body">
          Full-stack development, cloud architecture on AWS &amp; GCP,
          infrastructure automation with Terraform, CI/CD pipelines, team
          leadership &amp; mentorship. From MVP to production at scale.
        </p>
      </div>
    </section>
  `;
}
