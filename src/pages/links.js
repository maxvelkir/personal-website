import { html } from "../html.js";

export function linksPage() {
  return html`
    <section class="page-landing">
      <div class="landing-avatar" data-reveal>
        <span>MK</span>
      </div>
      <h1 class="landing-name" data-reveal>Maxime Kiriakov</h1>
      <p class="landing-bio" data-reveal>
        full stack · devops · cloud · humanity enthusiast
      </p>

      <h2 class="sr-only" data-reveal>Connect</h2>
      <div class="landing-links stagger" data-reveal>
        <a
          href="https://github.com/maxvelkir"
          target="_blank"
          rel="noopener noreferrer"
          class="landing-link neon-border-card"
        >
          <span class="link-icon">⌥</span>
          <span>GitHub</span>
          <span class="link-arrow">→</span>
        </a>

        <a
          href="https://www.linkedin.com/in/maxime-kiriakov-485bb2219"
          target="_blank"
          rel="noopener noreferrer"
          class="landing-link neon-border-card"
        >
          <span class="link-icon">◆</span>
          <span>LinkedIn</span>
          <span class="link-arrow">→</span>
        </a>

        <a
          href="mailto:maxduck123@duck.com"
          class="landing-link neon-border-card"
        >
          <span class="link-icon">▫</span>
          <span>Email</span>
          <span class="link-arrow">→</span>
        </a>
      </div>

      <div class="landing-divider" data-reveal>
        <span>more</span>
      </div>

      <h2 class="sr-only" data-reveal>Explore</h2>
      <div class="landing-links stagger" data-reveal>
        <a href="/index" data-link class="landing-link neon-border-card">
          <span class="link-icon">📂</span>
          <span>Experience &amp; Projects</span>
          <span class="link-arrow">→</span>
        </a>
      </div>
    </section>
  `;
}
