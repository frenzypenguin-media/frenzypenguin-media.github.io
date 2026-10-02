---
layout: default
title: FrenzyPenguin Media
description: "Security hardening & privacy tools for Windows and Linux. Defense is the best defense."
---

<div class="hero" id="home">
  <div class="container">
    <div class="hero-content">
      <div class="hero-badges" aria-label="Affiliations">
        <span class="badge badge-metapod">METAPOD</span>
        <span class="badge badge-fpm">FrenzyPenguin Media</span>
      </div>

      <h1 class="hero-title shimmer">Defense is the best defense.</h1>

      <div class="typing-container" aria-live="polite" aria-atomic="true">
        <p class="typing-text">
          <span class="typing-prefix"></span>
          <span class="typing-cursor" aria-hidden="true">|</span>
        </p>
      </div>

      <div class="hero-cta">
        <a href="#featured-tools" class="btn btn-primary">Explore Tools</a>
        <a href="{{ '/repositories/' | relative_url }}" class="btn btn-secondary">All Repositories</a>
      </div>
    </div>
  </div>
</div>

<!-- Media / Video Portfolio Section -->
<section class="section" id="media-portfolio">
  <div class="container">
    <header class="section-header">
      <h2>FrenzyPenguin Media</h2>
      <p class="section-subtitle">Video deep-dives on security hardening, exploit mitigation, and privacy engineering</p>
    </header>
    
    <div class="video-grid" id="video-grid">
      <!-- Video cards rendered by JavaScript -->
    </div>
    
    <div class="media-cta" style="text-align: center; margin-top: 48px;">
      <a href="https://www.youtube.com/FrenzyPenguinMedia?sub_confirmation=1" class="btn btn-secondary" target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.814v-8l8 3.993-8 4.007z"/></svg>
        View All Videos on YouTube
      </a>
    </div>
  </div>
</section>

<section class="section" id="featured-tools">
  <div class="container">
    <header class="section-header">
      <h2>Featured Tools</h2>
      <p class="section-subtitle">Production-grade security tooling for Windows and Linux</p>
    </header>

    <div class="tools-grid">
      {% assign featured = site.tools | where_exp: "tool", "tool.featured == true" | sort: "weight" %}
      {% for tool in featured %}
        <article class="tool-card card-3d" itemscope itemtype="https://schema.org/SoftwareApplication">
          <div class="tool-icon" aria-hidden="true">
            {% if tool.icon %}
              {{ tool.icon }}
            {% else %}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="3"/>
                <path d="M9 12h6M12 9v6"/>
              </svg>
            {% endif %}
          </div>
          <h3 class="tool-name" itemprop="name">{{ tool.title }}</h3>
          <p class="tool-desc" itemprop="description">{{ tool.tagline }}</p>
          <div class="tool-meta">
            <span class="tool-platform" itemprop="operatingSystem">{{ tool.platform }}</span>
            {% if tool.language %}
              <span class="tool-lang">{{ tool.language }}</span>
            {% endif %}
          </div>
          <div class="tool-links">
            <a href="{{ tool.repo_url }}" class="tool-link" target="_blank" rel="noopener" itemprop="url">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              Repository
            </a>
            {% if tool.demo_url %}
              <a href="{{ tool.demo_url }}" class="tool-link tool-link-secondary" target="_blank" rel="noopener">Demo</a>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  </div>
</section>

<section class="section section-alt" id="hardening-guides">
  <div class="container">
    <header class="section-header">
      <h2>Hardening Guides</h2>
      <p class="section-subtitle">Step-by-step post-install security for your OS</p>
    </header>

    <div class="guides-grid">
      <article class="guide-card">
        <div class="guide-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M8 4v16M16 4v16M4 8h16"/>
          </svg>
        </div>
        <h3>Windows 10/11 STIG-Style Hardening</h3>
        <p>18 modules, 4 profiles, allow-lists, rollback, dry-run — one command.</p>
        <a href="https://github.com/neohiro/windows" class="guide-link" target="_blank" rel="noopener">
          View Guide <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </article>

      <article class="guide-card card-3d">
        <div class="guide-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M12 2l10 7v10l-10 7-10-7v-10l10-7z"/>
            <path d="M2 12h20M12 2v20"/>
          </svg>
        </div>
        <h3>Linux Post-Install Hardening</h3>
        <p>Firewall, encrypted DNS, Tor, auditd, AppArmor — automated.</p>
        <a href="https://github.com/neohiro/ubuntu" class="guide-link" target="_blank" rel="noopener">
          View Guide <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </article>

      <article class="guide-card card-3d">
        <div class="guide-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <h3>Network Hardening</h3>
        <p>DNS sinkhole, encrypted DNS, firewall rules, traffic classification.</p>
        <a href="https://github.com/neohiro/Cripple-NetStrip" class="guide-link" target="_blank" rel="noopener">
          View Guide <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </article>
    </div>
  </div>
</section>

<section class="section" id="community">
  <div class="container">
    <header class="section-header">
      <h2>Community & Support</h2>
      <p class="section-subtitle">Pick a project, then choose how to engage</p>
    </header>

    <div class="community-grid">
      <article class="community-card card-3d" onclick="window.open('https://github.com/neohiro?tab=repositories', '_blank', 'noopener')">
        <h3>Bug Reports</h3>
        <p>Structured issue templates on each repository with required diagnostics.</p>
        <span class="card-action">Select a project →</span>
      </article>

      <article class="community-card card-3d" onclick="window.open('https://github.com/neohiro?tab=repositories', '_blank', 'noopener')">
        <h3>Security Vulnerabilities</h3>
        <p>Private disclosure via Security Advisories tab on each repository.</p>
        <span class="card-action">Select a project →</span>
      </article>

      <article class="community-card card-3d" onclick="window.open('https://github.com/neohiro?tab=repositories', '_blank', 'noopener')">
        <h3>Discussions</h3>
        <p>Questions, showcases, and feature requests in each repo's Discussions.</p>
        <span class="card-action">Select a project →</span>
      </article>

      <article class="community-card card-3d" onclick="window.open('https://github.com/sponsors/neohiro', '_blank', 'noopener')">
        <h3>Sponsor</h3>
        <p>Support ongoing development via GitHub Sponsors or Patreon.</p>
        <span class="card-action">Sponsor neohiro →</span>
      </article>
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
      "Open-source security hardening for Windows & Linux.",
      "Exploit mitigation catalogs that actually work.",
      "Encrypted DNS, firewalls, honeypots — zero fluff.",
      "STIG-style Windows hardening in one command.",
      "Network visibility. Traffic control. Zero trust.",
      "Built by FrenzyPenguin Media. No telemetry. Ever.",
      "Auditd, AppArmor, Tor — Linux post-install automated.",
      "Your system. Your rules. Our tooling."
    ];

    const typingPrefix = document.querySelector('.typing-prefix');
    const cursor = document.querySelector('.typing-cursor');
    if (!typingPrefix || !cursor) return;

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 48;       // ms per char (slower typing)
    const deleteSpeed = 18;     // ms per char (faster deletion)
    const holdTime = 2200;      // ms to hold full text
    const pauseBetween = 400;   // ms before next phrase

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingPrefix.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingPrefix.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let nextDelay = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        nextDelay = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        nextDelay = pauseBetween;
      }

      setTimeout(type, nextDelay);
    }

    type();

    // Make community cards keyboard accessible
    document.querySelectorAll('.community-card').forEach(card => {
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
    });
  });
</script>
