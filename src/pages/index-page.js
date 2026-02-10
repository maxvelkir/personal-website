import { html } from "../html.js";

export function indexPage() {
  return html`
    <div class="page-index">
      <div class="index-header" data-reveal>
        <div class="index-path">~/index/</div>
        <h1 class="index-title">Index</h1>
      </div>

      <section class="index-section" data-reveal>
        <div class="index-section-header">
          <h2><span class="icon">📂</span> experience</h2>
        </div>
        <div class="index-table stagger">
          <div class="exp-entry neon-border-card">
            <div class="index-row">
              <span class="meta">2023–now</span>
              <h3 class="name dir">omnithink-ai</h3>
              <span class="desc">SF Bay Area (Remote)</span>
            </div>
            <div class="exp-roles">
              <div class="exp-role">
                <span class="exp-period">Jan 2026–Present</span>
                <span class="exp-title">Head of Engineering</span>
                <p class="exp-desc">
                  Transitioned from direct coding responsibilities to leading
                  code reviews and developer mentoring. Driving the development
                  of an agentic AI platform; overseeing technical
                  infrastructure, managing stakeholder expectations, and
                  supervising high-performing teams.
                </p>
              </div>
              <div class="exp-role">
                <span class="exp-period">May 2023–Dec 2025</span>
                <span class="exp-title">Software Developer</span>
                <p class="exp-desc">
                  Led a team of 3, built an MVP that secured 7 clients —
                  including a multi-billion dollar apparel company.
                </p>
              </div>
            </div>
          </div>

          <div class="exp-entry neon-border-card">
            <div class="index-row">
              <span class="meta">2022–2025</span>
              <h3 class="name dir">erlang-solutions</h3>
              <span class="desc">Remote</span>
            </div>
            <div class="exp-roles">
              <div class="exp-role">
                <span class="exp-period">Jul 2024–Dec 2025</span>
                <span class="exp-title">DevOps Engineer</span>
                <p class="exp-desc">
                  Spearheaded AWS cloud architecture (Organizations, ECS, VPC,
                  VPN, CloudFront, FSx for Lustre). Led cloud migration of
                  on-prem file systems. Automated infrastructure with Terraform,
                  Bash & Go. Built CI/CD pipelines with GitHub Actions.
                  Published WombatOAM to AWS Marketplace.
                </p>
              </div>
              <div class="exp-role">
                <span class="exp-period">Jun 2022–Jul 2024</span>
                <span class="exp-title">Software Developer</span>
                <p class="exp-desc">
                  Built e-commerce search algorithms with Elixir & Phoenix. Led
                  6 technical interviews. Co-authored beginner & advanced Elixir
                  courses.
                </p>
              </div>
            </div>
          </div>

          <div class="exp-entry neon-border-card">
            <div class="index-row">
              <span class="meta">2020–2022</span>
              <h3 class="name dir">quanterall</h3>
              <span class="desc">Varna, Bulgaria</span>
            </div>
            <div class="exp-roles">
              <div class="exp-role">
                <span class="exp-period">Jul 2020–Jun 2022</span>
                <span class="exp-title">Software Developer</span>
                <ul class="exp-list">
                  <li>
                    Fintech data analysis pipeline (Elixir, Phoenix) for
                    investment evaluation
                  </li>
                  <li>
                    SaaS for shipping container management (TypeScript, Node,
                    Angular)
                  </li>
                  <li>
                    Bioinformatics platform for genetic analysis lab (Python,
                    Django, React)
                  </li>
                  <li>
                    Designed & delivered an intro Elixir course for university &
                    high school students
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="index-section" data-reveal>
        <div class="index-section-header">
          <h2><span class="icon">🗃️</span> projects</h2>
        </div>
        <div class="project-grid stagger">
          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">AI</span>
              <h3 class="name">omnithink-platform</h3>
            </div>
            <p class="project-desc">
              Event-driven platform with FastAPI and arq workers backed by Redis
              for async task processing. PostgreSQL for persistence, deployed on
              GKE with CDN-accelerated delivery and Cloud Storage. Vertex AI for
              generative capabilities.
            </p>
            <div class="project-stack">
              <span class="tag">python</span>
              <span class="tag">fastapi</span>
              <span class="tag">redis</span>
              <span class="tag">postgresql</span>
              <span class="tag">gcp</span>
              <span class="tag">kubernetes</span>
              <span class="tag">vertex ai</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">DevOps</span>
              <h3 class="name">aws-org-architecture</h3>
            </div>
            <p class="project-desc">
              ~50-account AWS Organizations structure with SCPs and isolated
              DEV, UAT, and PROD environments. Private VPC links between
              accounts, terminating via site-to-site VPN to on-prem on one end
              and a fully private application account on the other.
            </p>
            <div class="project-stack">
              <span class="tag">terraform</span>
              <span class="tag">aws</span>
              <span class="tag">organizations</span>
              <span class="tag">vpc</span>
              <span class="tag">vpn</span>
              <span class="tag">iam</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">DevOps</span>
              <h3 class="name">wombat-oam-pipeline</h3>
            </div>
            <p class="project-desc">
              Tag-triggered CI/CD pipeline for WombatOAM, an in-house Elixir
              analytics tool. Builds Docker image, produces an AMI via Packer,
              and publishes directly to AWS Marketplace. Zero manual steps from
              tag to listing.
            </p>
            <div class="project-stack">
              <span class="tag">github actions</span>
              <span class="tag">packer</span>
              <span class="tag">docker</span>
              <span class="tag">aws</span>
              <span class="tag">bash</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">Cloud</span>
              <h3 class="name">cloud-migration</h3>
            </div>
            <p class="project-desc">
              Lift-and-shift migration of an on-prem NFS file system to FSx for
              Lustre over a site-to-site AWS VPN. Matched original throughput
              with up to 60% cost savings.
            </p>
            <div class="project-stack">
              <span class="tag">aws</span>
              <span class="tag">fsx</span>
              <span class="tag">vpn</span>
              <span class="tag">terraform</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">Elixir</span>
              <h3 class="name">ecommerce-search</h3>
            </div>
            <p class="project-desc">
              Search engine for an e-commerce platform using Elasticsearch with
              custom ranking algorithms, fuzzy matching, and full-text search.
              Built with Elixir and Phoenix.
            </p>
            <div class="project-stack">
              <span class="tag">elixir</span>
              <span class="tag">phoenix</span>
              <span class="tag">elasticsearch</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">Bio</span>
              <h3 class="name">genetic-analysis-platform</h3>
            </div>
            <p class="project-desc">
              Platform for a genetics lab processing DNA data for hereditary
              disease screening. Led a team of 3 junior developers. Built with
              Django and React.
            </p>
            <div class="project-stack">
              <span class="tag">python</span>
              <span class="tag">django</span>
              <span class="tag">react</span>
            </div>
          </div>

          <div class="project-card neon-border-card">
            <div class="project-card-header">
              <span class="project-label">SaaS</span>
              <h3 class="name">container-logistics</h3>
            </div>
            <p class="project-desc">
              SaaS frontend for shipping container management — tracking,
              scheduling, and operational tooling for logistics companies.
            </p>
            <div class="project-stack">
              <span class="tag">typescript</span>
              <span class="tag">node.js</span>
              <span class="tag">angular</span>
            </div>
          </div>
        </div>
      </section>

      <section class="index-section" data-reveal>
        <div class="index-section-header">
          <h2><span class="icon">🏷️</span> skills</h2>
        </div>
        <div class="skills-grid stagger">
          <div class="skills-group neon-border-card">
            <span class="skills-group-label">languages</span>
            <div class="skills-group-tags">
              <span class="tag">elixir</span>
              <span class="tag">typescript</span>
              <span class="tag">python</span>
              <span class="tag">go</span>
              <span class="tag">javascript</span>
              <span class="tag">bash</span>
            </div>
          </div>

          <div class="skills-group neon-border-card">
            <span class="skills-group-label">frameworks</span>
            <div class="skills-group-tags">
              <span class="tag">phoenix</span>
              <span class="tag">react</span>
              <span class="tag">angular</span>
              <span class="tag">django</span>
              <span class="tag">node.js</span>
            </div>
          </div>

          <div class="skills-group neon-border-card">
            <span class="skills-group-label">cloud & devops</span>
            <div class="skills-group-tags">
              <span class="tag">aws</span>
              <span class="tag">gcp</span>
              <span class="tag">terraform</span>
              <span class="tag">docker</span>
              <span class="tag">github actions</span>
              <span class="tag">ci/cd</span>
              <span class="tag">ecs</span>
              <span class="tag">cloudfront</span>
              <span class="tag">vpc</span>
              <span class="tag">iam</span>
              <span class="tag">s3</span>
              <span class="tag">ec2</span>
              <span class="tag">linux</span>
              <span class="tag">git</span>
            </div>
          </div>

          <div class="skills-group neon-border-card">
            <span class="skills-group-label">leadership</span>
            <div class="skills-group-tags">
              <span class="tag">engineering management</span>
              <span class="tag">project management</span>
              <span class="tag">technical interviews</span>
              <span class="tag">mentorship</span>
            </div>
          </div>
        </div>
      </section>

      <section class="index-section" data-reveal>
        <div class="index-section-header">
          <h2><span class="icon">📄</span> education</h2>
        </div>
        <div class="compact-grid stagger">
          <div class="compact-card neon-border-card">
            <span class="compact-card-name dir">new-bulgarian-university</span>
            <span class="compact-card-detail"
              >2021–2023 · Computer Science</span
            >
          </div>
          <div class="compact-card neon-border-card">
            <span class="compact-card-name dir">sofia-university</span>
            <span class="compact-card-detail"
              >2019–2021 · Computer Science · St. Kliment Ohridski</span
            >
          </div>
        </div>
      </section>

      <section class="index-section" data-reveal>
        <div class="index-section-header">
          <h2><span class="icon">🎓</span> teaching</h2>
        </div>
        <div class="compact-grid stagger">
          <div class="compact-card neon-border-card">
            <span class="compact-card-name">elixir-courses</span>
            <span class="compact-card-detail"
              >Erlang Solutions · Beginner &amp; advanced Elixir course
              development</span
            >
          </div>
          <div class="compact-card neon-border-card">
            <span class="compact-card-name">intro-to-elixir</span>
            <span class="compact-card-detail"
              >Quanterall · Elixir course for university &amp; high school
              students</span
            >
          </div>
        </div>
      </section>
    </div>
  `;
}
