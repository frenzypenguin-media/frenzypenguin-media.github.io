---
layout: default
title: Media - FrenzyPenguin Media
description: "Video portfolio - Security hardening deep-dives, exploit mitigation tutorials, and privacy engineering"
permalink: /media/
---

<div class="media-page" id="media">
  <div class="container">
    <nav class="media-breadcrumb" aria-label="Breadcrumb">
      <a href="{{ '/' | relative_url }}">frenzypenguin.media</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Media</span>
    </nav>

    <header class="media-header">
      <div class="media-brand">
        <span class="media-logo" aria-hidden="true">🎬</span>
        <div>
          <h1>FrenzyPenguin Media</h1>
          <p class="media-tagline">Security hardening deep-dives · Exploit mitigation tutorials · Privacy engineering</p>
        </div>
      </div>
    </header>

    <div class="video-grid" id="video-grid">
      <!-- Video cards rendered by JavaScript -->
    </div>

    <footer class="media-footer">
      <p>All videos published on <a href="https://www.youtube.com/FrenzyPenguinMedia?sub_confirmation=1" target="_blank" rel="noopener">YouTube @FrenzyPenguinMedia</a></p>
      <p>Subscribe for weekly security engineering content</p>
    </footer>
  </div>
</div>

<style>
.media-page { padding: 40px 0 80px; }
.media-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.875rem; color: var(--fg-subtle); margin-bottom: 40px; }
.media-breadcrumb a { color: var(--fg-subtle); }
.media-breadcrumb a:hover { color: var(--accent); }
.media-breadcrumb span[aria-current] { color: var(--fg); font-weight: 500; }

.media-header { display: flex; align-items: center; gap: 24px; margin-bottom: 48px; padding-bottom: 32px; border-bottom: 1px solid var(--border); }
.media-logo { font-size: 3rem; line-height: 1; }
.media-brand h1 { font-size: clamp(2rem, 4vw, 3rem); margin-bottom: 8px; }
.media-tagline { font-size: 1.125rem; color: var(--fg-muted); margin: 0; }

.video-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

.video-card { position: relative; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; transition: all var(--transition); }
.video-card:hover { border-color: var(--accent); transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.video-thumbnail { position: relative; aspect-ratio: 16/9; overflow: hidden; }
.video-thumbnail img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
.video-card:hover .video-thumbnail img { transform: scale(1.05); }

.video-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(11,14,18,0.95) 100%); display: flex; align-items: flex-end; justify-content: center; padding: 24px; opacity: 0; transition: opacity 0.3s ease; }
.video-card:hover .video-overlay { opacity: 1; }

.play-btn { background: linear-gradient(135deg, var(--accent), var(--accent-strong)); border: none; border-radius: 50%; width: 72px; height: 72px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s, box-shadow 0.2s; box-shadow: 0 8px 32px rgba(124,77,255,0.4); }
.play-btn:hover { transform: scale(1.15); box-shadow: 0 12px 48px rgba(124,77,255,0.6); }
.play-btn svg { width: 32px; height: 32px; margin-left: 4px; }

.duration { position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.8); color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); }

.video-info { padding: 16px 20px 20px; }
.video-info h4 { font-size: 0.9375rem; margin-bottom: 6px; color: var(--fg); line-height: 1.4; }
.video-meta { font-size: 0.75rem; color: var(--fg-subtle); font-family: var(--font-mono); }

.media-footer { text-align: center; margin-top: 48px; padding-top: 32px; border-top: 1px solid var(--border); color: var(--fg-subtle); }
.media-footer a { color: var(--accent); }
.media-footer a:hover { color: var(--accent-strong); }
.media-footer p { margin: 8px 0; }

@media (max-width: 768px) {
  .media-header { flex-direction: column; text-align: center; gap: 16px; }
  .video-grid { grid-template-columns: 1fr; }
}
</style>