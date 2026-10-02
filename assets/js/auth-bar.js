/**
 * Shared auth bar — cross-site GitHub OAuth + private assistant contact.
 *
 * Flow (simplest possible, matches the user's "gh auth only" spec):
 *   1. User clicks Login tab.
 *   2. Browser is redirected to github.com/login/oauth/authorize with
 *      client_id + redirect_uri + state. No tokens stored client-side.
 *   3. GitHub redirects back to /auth/callback?code=...&state=...
 *   4. The site's server (functions/api/auth.js) exchanges the code for
 *      a token, uses the host's `gh` CLI credentials to verify org
 *      membership, and returns a session_id derived from the role.
 *   5. Auth bar reads #session= from the URL, stores session_id in
 *      localStorage as the only client-side artifact, then displays
 *      the role-aware UI.
 *
 * Required:
 *   - auth-bar.html (markup)
 *   - auth-bar.css  (styles)
 *   - functions/api/auth.js (server endpoint) reachable from this origin
 *
 * Optional globals:
 *   window.OAUTH_CLIENT_ID  — required; configure per host
 *   window.Auth             — legacy dashboard Auth object (overrides)
 *   window.AUTH_CALLBACK    — override callback path (default: /auth/callback)
 */

(function () {
  'use strict';

  const GH_USER = 'neohiro';
  const SESSION_KEY = 'neohiro_session_v1';
  const OAUTH_STATE_KEY = 'neohiro_oauth_state_v1';
  const AUTH_CALLBACK = (typeof window !== 'undefined' && window.AUTH_CALLBACK) || '/auth/callback';
  const AUTH_STATE_ENDPOINT = (typeof window !== 'undefined' && window.AUTH_STATE_ENDPOINT) || '/auth/state';
  const CONTACT_ENDPOINT = '/api/contact';
  const SESSION_MAX_AGE_MS = 24 * 60 * 60 * 1000;

  const state = { activeTab: null };

  function $(id) { return document.getElementById(id); }
  function qa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  function show(panel) {
    if (panel) { panel.hidden = false; panel.removeAttribute('hidden'); }
  }
  function hide(panel) {
    if (panel) { panel.hidden = true; panel.setAttribute('hidden', ''); }
  }

  function closeAll() {
    qa('.auth-bar__panel').forEach(hide);
    qa('.auth-bar__tab').forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('active');
    });
    hide($('auth-bar__overlay'));
    state.activeTab = null;
  }

  function selectTab(tabId) {
    if (!tabId) { closeAll(); return; }
    qa('.auth-bar__panel').forEach(hide);
    qa('.auth-bar__tab').forEach(t => {
      t.setAttribute('aria-selected', 'false');
      t.classList.remove('active');
    });
    const tab = $(`auth-bar__tab--${tabId}`);
    const panel = $(`auth-bar__panel--${tabId}`);
    if (!tab || !panel) return;
    tab.setAttribute('aria-selected', 'true');
    tab.classList.add('active');
    show(panel);
    state.activeTab = tabId;
    const overlay = $('auth-bar__overlay');
    if (tabId === 'contact' || tabId === 'login') show(overlay); else hide(overlay);
    if (tabId === 'contact') {
      setTimeout(() => { const input = $('auth-bar__contact-input'); if (input) input.focus(); }, 350);
    }
  }

  function appendSize(avatarUrl, size) {
    if (!avatarUrl) return '';
    return avatarUrl + (avatarUrl.indexOf('?') >= 0 ? '&' : '?') + 's=' + size;
  }

  function readSessionIdFromUrl() {
    const hash = location.hash || '';
    const m = hash.match(/session=([a-f0-9]+)/i);
    if (m) return m[1];
    const u = new URLSearchParams(location.search);
    return u.get('session');
  }

  async function fetchState() {
    try {
      const r = await fetch(AUTH_STATE_ENDPOINT, { credentials: 'same-origin' });
      if (!r.ok) return null;
      const data = await r.json();
      return data && data.state;
    } catch (_) { return null; }
  }

  function storeSession(sessionId, profile, role) {
    if (!sessionId) return null;
    const record = {
      session_id: sessionId,
      login: profile.login,
      name: profile.name || null,
      avatar_url: profile.avatar_url || null,
      role: role || 'user',
      expiresAt: Date.now() + SESSION_MAX_AGE_MS,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(record));
    return record;
  }

  function readStoredSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.session_id || !Number.isFinite(s.expiresAt) || s.expiresAt < Date.now()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return s;
    } catch (_) { return null; }
  }

  function clearSession() {
    const s = readStoredSession();
    if (s && s.session_id) {
      fetch(`/auth/session?session=${encodeURIComponent(s.session_id)}`, { method: 'DELETE' }).catch(() => {});
    }
    localStorage.removeItem(SESSION_KEY);
  }

  function setUser(session) {
    const loginTab = $('auth-bar__tab--login');
    const dashboardTab = $('auth-bar__tab--dashboard');
    const userTab = $('auth-bar__tab--user');
    const dashboardLink = $('auth-bar__dashboard-link');
    const userDashboardLink = $('auth-bar__user-dashboard-link');

    if (session && session.login) {
      if (loginTab) loginTab.classList.add('hidden');
      if (dashboardTab) dashboardTab.classList.remove('hidden');
      if (userTab) userTab.classList.remove('hidden');

      const avatar = $('auth-bar__avatar');
      const avatarLg = $('auth-bar__user-avatar-lg');
      const username = $('auth-bar__username');
      const userName = $('auth-bar__user-name');
      const userLogin = $('auth-bar__user-login');
      const role = $('auth-bar__role');

      if (avatar) avatar.src = appendSize(session.avatar_url, 40);
      if (avatarLg) avatarLg.src = appendSize(session.avatar_url, 72);
      if (username) username.textContent = session.login;
      if (userName) userName.textContent = session.name || session.login;
      if (userLogin) userLogin.textContent = '@' + session.login;
      if (role) {
        const r = session.role || (session.login === GH_USER ? 'godadmin' : 'user');
        role.textContent = r;
        role.className = 'auth-bar__role-badge auth-bar__role-badge--' + r;
      }
      const dash = `https://neohiro.github.io/dashboard/?user=${encodeURIComponent(session.login)}`;
      if (dashboardLink) dashboardLink.href = dash;
      if (userDashboardLink) userDashboardLink.href = dash;
    } else {
      if (loginTab) loginTab.classList.remove('hidden');
      if (dashboardTab) dashboardTab.classList.add('hidden');
      if (userTab) userTab.classList.add('hidden');
    }
  }

  async function startOAuth() {
    const clientId = (typeof window !== 'undefined' && window.OAUTH_CLIENT_ID) || '';
    if (!clientId) {
      console.warn('[auth-bar] OAUTH_CLIENT_ID not set — login unavailable on this host');
      return;
    }
    const stateVal = await fetchState();
    if (!stateVal) {
      console.warn('[auth-bar] failed to fetch OAuth state from server');
      return;
    }
    sessionStorage.setItem(OAUTH_STATE_KEY, stateVal);
    const redirect = encodeURIComponent(location.origin + AUTH_CALLBACK);
    const returnTo = encodeURIComponent(location.pathname + location.search);
    const url =
      `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${redirect}` +
      `&scope=read:user%20read:org` +
      `&state=${encodeURIComponent(stateVal)}` +
      `&return_to=${returnTo}`;
    location.href = url;
  }

  async function consumeCallback() {
    const sessionId = readSessionIdFromUrl();
    if (!sessionId) return false;
    if (location.hash.includes('session=')) {
      history.replaceState({}, '', location.pathname + location.search);
    } else {
      const u = new URLSearchParams(location.search);
      u.delete('session');
      const q = u.toString();
      history.replaceState({}, '', location.pathname + (q ? '?' + q : ''));
    }
    try {
      const r = await fetch(`/auth/session?session=${encodeURIComponent(sessionId)}`);
      if (!r.ok) return false;
      const profile = await r.json();
      storeSession(sessionId, profile, profile.role);
      return profile;
    } catch (_) { return false; }
  }

  async function sendContact() {
    const form = $('auth-bar__contact-form');
    const success = $('auth-bar__contact-success');
    const error = $('auth-bar__contact-error');
    const errorMsg = $('auth-bar__contact-error-msg');
    const input = $('auth-bar__contact-input');
    const submitBtn = form ? form.querySelector('[type=submit]') : null;

    if (!input || !input.value.trim()) return;
    if (submitBtn) submitBtn.disabled = true;
    hide(success); hide(error);

    const session = readStoredSession();
    try {
      const body = {
        message: input.value.trim(),
        source: location.origin + location.pathname,
        ts: new Date().toISOString(),
      };
      if (session) body.session_id = session.session_id;

      const r = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!r.ok) {
        const d = await r.json().catch(() => ({}));
        throw new Error(d.error || `HTTP ${r.status}`);
      }
      hide(form);
      show(success);
      input.value = '';
    } catch (e) {
      if (errorMsg) errorMsg.textContent = e.message || 'Something went wrong. Try again.';
      show(error);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  }

  function initContactForm() {
    const form = $('auth-bar__contact-form');
    const input = $('auth-bar__contact-input');
    const charCount = $('auth-bar__char-count');
    if (input && charCount) {
      input.addEventListener('input', () => {
        const len = input.value.length;
        charCount.textContent = `${len} / 1000`;
        charCount.style.color = len > 900 ? 'var(--red, #f85149)' : '';
      });
    }
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); sendContact(); });
  }

  function initOverlay() {
    const overlay = $('auth-bar__overlay');
    if (overlay) overlay.addEventListener('click', () => selectTab(null));
  }

  async function init() {
    await consumeCallback();

    qa('.auth-bar__tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const id = tab.id.replace('auth-bar__tab--', '');
        selectTab(id === state.activeTab ? null : id);
      });
    });

    const ghBtn = $('auth-bar__gh-btn');
    if (ghBtn) ghBtn.addEventListener('click', startOAuth);

    const logoutDashboard = $('auth-bar__logout-btn');
    const logoutUser = $('auth-bar__user-logout');
    [logoutDashboard, logoutUser].forEach(btn => {
      if (btn) btn.addEventListener('click', () => { clearSession(); setUser(null); });
    });

    initContactForm();
    initOverlay();
    setUser(readStoredSession());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.AuthBar = { selectTab };
})();
