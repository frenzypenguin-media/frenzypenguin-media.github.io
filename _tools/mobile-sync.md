---
title: mobile-sync
tagline: "OpenCode plugin — makes your desktop or CLI server accessible via Tailscale Funnel for mobile sync"
platform: Cross-platform (Node.js)
language: TypeScript
category: Developer Tools
repo_url: https://github.com/neohiro/mobile-sync
featured: false
weight: 12
icon: |
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="var(--purple)" stroke-width="2"/>
    <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" stroke="var(--purple)" stroke-width="1.5"/>
    <line x1="12" y1="8" x2="12" y2="16" stroke="var(--purple)" stroke-width="1.5"/>
  </svg>
---
**mobile-sync** bridges your OpenCode desktop session to mobile devices via Tailscale Funnel — no port forwarding, no public IPs.

## Features

- **Zero-Config Tunneling** — Uses Tailscale Funnel for HTTPS exposure
- **Mobile-Optimized UI** — Responsive web interface for phone/tablet
- **Session Sync** — Continue coding sessions across devices
- **Offline Queue** — Commands queued locally when mobile is offline
- **E2E Encrypted** — All traffic encrypted via Tailscale WireGuard

## Installation

```bash
opencode plugin install neohiro/mobile-sync
```

## Usage

1. Install Tailscale on desktop and mobile
2. Run `opencode mobile-sync start` on desktop
3. Open the generated `.ts.net` URL on mobile
4. Authenticate via Tailscale (optional, for private access)

## Architecture

```
[Mobile Browser] → [Tailscale Funnel] → [Desktop: mobile-sync daemon] → [OpenCode CLI]
```

The daemon exposes a local WebSocket server that OpenCode connects to, proxied through Tailscale's mesh.

## Requirements

- Tailscale account (free tier works)
- OpenCode v0.8+
- Node.js 18+
- Desktop must be online for mobile access

## Related

- [auto-resume](https://github.com/neohiro/auto-resume) — Pair for resilient mobile sessions
- [Tailscale Funnel Docs](https://tailscale.com/kb/1223/funnel)