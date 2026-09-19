/* ============================================
   FRENZYPENGUIN MEDIA — MAIN.JS
   Aurora/Grid background, Cards with scroll reveal,
   Project detail overlay, Typewriter, Glitch logo
   ============================================ */

(function () {
  "use strict";

  // ============================================
  // DOM HELPERS
  // ============================================
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };

  // ============================================
  // REVEAL ON SCROLL (CARDS)
  // ============================================
  function initReveal() {
    const cards = $$('.card');
    if (!cards.length) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
          // Clear transition delay after entry so hover feels instant
          setTimeout(() => { entry.target.style.transitionDelay = ''; }, 800);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });

    cards.forEach((card, i) => {
      card.style.transitionDelay = (i % 3 * 70) + 'ms';
      obs.observe(card);
    });
  }

  // ============================================
  // CARD SELECT BURST (RIPPLE + GLITCH FLASH)
  // ============================================
  function attachSelect(card) {
    card.addEventListener('pointerdown', e => {
      const r = card.getBoundingClientRect();
      const d = Math.max(r.width, r.height) * 2.3;
      const s = document.createElement('span');
      s.className = 'ripple';
      s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
      card.appendChild(s);
      setTimeout(() => s.remove(), 800);

      if (card._selT) clearTimeout(card._selT);
      card.classList.remove('selected');
      void card.offsetWidth;
      card.classList.add('selected');
      card._selT = setTimeout(() => card.classList.remove('selected'), 650);
    });
  }

  // ============================================
  // GLITCHING LOGO + TYPEWRITER TAGLINE
  // ============================================
  const _logo = $('#logo');
  const _typed = $('#typed');
  let _gTimer = null;

  function glitchLogo() {
    if (_gTimer) clearTimeout(_gTimer);
    if (!_logo) return;
    _logo.classList.remove('glitching');
    void _logo.offsetWidth;
    _logo.classList.add('glitching');
    _gTimer = setTimeout(() => _logo.classList.remove('glitching'), 420);
  }

  function startTypewriter(list) {
    let _pi = 0;
    function typePhrase(txt, i) {
      if (!_typed) return;
      _typed.textContent = txt.slice(0, i);
      if (i < txt.length) {
        setTimeout(() => typePhrase(txt, i + 1), 16 + Math.random() * 34);
      } else {
        setTimeout(() => { glitchLogo(); erase(txt, txt.length); }, 1500);
      }
    }
    function erase(txt, i) {
      if (!_typed) return;
      _typed.textContent = txt.slice(0, i);
      if (i > 0) {
        setTimeout(() => erase(txt, i - 1), 8 + Math.random() * 14);
      } else {
        _pi = (_pi + 1) % list.length;
        setTimeout(() => typePhrase(list[_pi], 0), 260);
      }
    }
    typePhrase(list[0], 0);
  }

  // Typewriter phrases
  startTypewriter([
    'Game development in Python & pygame',
    'Retro arcade games for Windows & Linux',
    'Tetris · GhostMaze · TristarMania · ZombieShoot',
    'Coding, media & open-source fun',
    'From sandbox to shipped game',
    'Pixel by pixel, build by build',
    'Games with zero telemetry & no launchers',
    'Music, videos & devlogs',
    'Open-source tools, 100% free',
    'Press start to play'
  ]);

  // ============================================
  // PROJECTS FEED (from repos.json)
  // ============================================
  const grid = $('#projects');
  const REPOS = {};
  let _pendingName = null, _dataDone = false, _lastCardRect = null;

  function repoCard(r, i) {
    const card = el('div', 'card');
    card.style.transitionDelay = (i % 3 * 70) + 'ms';
    const a = card.appendChild(el('a', 'fill'));
    a.href = '#/r/' + encodeURIComponent(r.name);
    a.addEventListener('click', () => { _lastCardRect = card.getBoundingClientRect(); });

    const h3 = el('h3');
    h3.append(el('span', null, r.name), el('span', 'stars', '⭐ ' + fmt(r.stargazers_count)));
    card.appendChild(h3);

    card.appendChild(el('p', null, r.description || 'No description yet.'));

    const tags = el('div', 'tags');
    [r.language].concat(r.topics || []).filter(Boolean).slice(0, 3).forEach(t =>
      tags.appendChild(el('span', 'tag', t))
    );
    if (!tags.children.length) tags.appendChild(el('span', 'tag', 'repository'));
    card.appendChild(tags);

    return card;
  }

  function fmt(n) {
    n = n || 0;
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(n);
  }

  function renderRepos(all) {
    if (!grid) return;
    grid.replaceChildren();
    const rank = r => {
      const lw = (r.name + ' ' + (r.description || '') + ' ' + (r.topics || []).join(' ')).toLowerCase();
      if (/(game|arcade|tetris|pygame|shooter|rpg|player|media|music)/.test(lw)) return 0;
      if (/(hardening|security|firewall|dns|honeypot|exploit)/.test(lw)) return 2;
      return 1;
    };
    all.slice().sort((a, b) => rank(a) - rank(b) || (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .forEach((r, i) => {
        REPOS[r.name.toLowerCase()] = r;
        const c = repoCard(r, i);
        grid.appendChild(c);
        attachSelect(c);
      });
  }

  // Fast path: pre-rendered snapshot
  fetch('repos.json').then(r => r.ok ? r.json() : null).then(rows => {
    if (!rows || !rows.length) return;
    renderRepos(rows);
    _dataDone = true;
    if (_pendingName) routeHash();
  }).catch(() => {});

  // ============================================
  // PER-REPO DETAIL OVERLAY (#/r/<name>)
  // ============================================
  const overlay = $('#overlay');
  const panel = $('#panel');
  const pvName = $('#pv-name');
  const pvDesc = $('#pv-desc');
  const pvMeta = $('#pv-meta');
  const pvTags = $('#pv-tags');
  const pvOpen = $('#pv-open');
  let _shownRepo = null, _lastFocus = null, _missingKey = null;

  function fillPanel(r) {
    pvName.textContent = r.name;
    pvDesc.textContent = r.description || 'No description yet.';
    pvMeta.replaceChildren();
    [['⭐', fmt(r.stargazers_count) + ' stars'],
     ['🍴', fmt(r.forks_count) + ' forks'],
     ['🕒', 'updated ' + new Date(r.pushed_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })]
    ].forEach(m => {
      const s = el('span');
      s.append(el('b', null, m[0] + ' '), document.createTextNode(m[1]));
      pvMeta.appendChild(s);
    });
    pvTags.replaceChildren();
    [r.language].concat(r.topics || []).filter(Boolean).slice(0, 4).forEach(t =>
      pvTags.appendChild(el('span', 'tag', t))
    );
    if (!pvTags.children.length) pvTags.appendChild(el('span', 'tag', 'repository'));
    pvOpen.href = r.html_url;
    pvOpen.textContent = 'Open repository →';
  }

  function openDetail(r) {
    if (_shownRepo === r.name) return;
    if (!_shownRepo) _lastFocus = document.activeElement;
    _shownRepo = r.name; _missingKey = null;

    const _rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (_lastCardRect && !_rm) {
      const dx = (_lastCardRect.left + _lastCardRect.width / 2) - innerWidth / 2;
      const dy = (_lastCardRect.top + _lastCardRect.height / 2) - innerHeight / 2;
      panel.style.transform = `translate(${dx}px,${dy}px) scale(.18)`;
      void panel.offsetWidth;
    }
    _lastCardRect = null;

    fillPanel(r);
    document.body.classList.add('detail');
    panel.style.transform = '';
    overlay.setAttribute('aria-hidden', 'false');
    panel.focus({ preventScroll: true });

    if (pvName) { pvName.classList.remove('glitching'); void pvName.offsetWidth; pvName.classList.add('glitching'); }
  }

  function showNotFound(name) {
    if (!_shownRepo) _lastFocus = document.activeElement;
    _shownRepo = '__notfound__';
    if (pvName) pvName.textContent = name;
    if (pvDesc) pvDesc.textContent = 'This repository is not in the live feed (it may be new, a fork, or filtered out). Browse everything on GitHub instead:';
    if (pvMeta) pvMeta.replaceChildren();
    if (pvTags) pvTags.replaceChildren();
    if (pvOpen) { pvOpen.href = 'https://github.com/neohiro?tab=repositories'; pvOpen.textContent = 'Browse repositories →'; }
    document.body.classList.add('detail');
    overlay.setAttribute('aria-hidden', 'false');
    panel.focus({ preventScroll: true });
  }

  function closeDetail() {
    if (!_shownRepo) return;
    _shownRepo = null; _lastCardRect = null; _missingKey = null;
    document.body.classList.remove('detail');
    overlay.setAttribute('aria-hidden', 'true');
    if (_lastFocus && _lastFocus.focus) { _lastFocus.focus({ preventScroll: true }); _lastFocus = null; }
  }

  function routeHash() {
    const m = location.hash.match(/^#\/r\/([^/?#]+)/);
    if (!m) { closeDetail(); return; }
    let key;
    try { key = decodeURIComponent(m[1]).toLowerCase(); }
    catch (e) { showNotFound(m[1]); return; }
    const r = REPOS[key];
    if (r) openDetail(r);
    else if (_dataDone) { _missingKey = key; showNotFound(key); }
    else _pendingName = key;
  }

  window.addEventListener('hashchange', routeHash);
  routeHash();

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && _shownRepo) location.hash = '#';
  });

  // ============================================
  // INIT
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    $$('.card').forEach(attachSelect);
  });

  // Random glitch interval
  (function randGlitch() {
    glitchLogo();
    setTimeout(randGlitch, 2600 + Math.random() * 3400);
  })();
})();