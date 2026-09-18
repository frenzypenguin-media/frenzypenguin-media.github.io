# FrenzyPenguin Media

> Security hardening deep-dives, exploit mitigation tutorials, and privacy engineering.

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)
[![ Jekyll](https://img.shields.io/badge/Jekyll-3.9-blueviolet.svg)](https://jekyllrb.com/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-frenzypenguin--media.github.io-brightgreen)](https://frenzypenguin-media.github.io)

**FrenzyPenguin Media** is the indie media and creative arm of the neohiro network.
We produce video deep-dives on security hardening, exploit mitigation, and privacy
engineering for Windows and Linux.

**Live site:** [frenzypenguin-media.github.io](https://frenzypenguin-media.github.io)

---

## What we publish

- Video tutorials on Windows STIG-style hardening
- Deep-dives into exploit protection settings (ASR, CFG, DEP, SEHOP)
- DNS privacy engineering (dnscrypt-proxy, encrypted DNS, sinkholes)
- Network defense tooling walkthroughs
- Privacy engineering case studies

**Subscribe:** [YouTube @FrenzyPenguinMedia](https://www.youtube.com/FrenzyPenguinMedia?sub_confirmation=1)

---

## Related repositories

This repo is the **content source** for the FrenzyPenguin Media GitHub Pages site.
The actual tools live in the [neohiro](https://github.com/neohiro) organization:

| Tool | Repo | Description |
|------|------|-------------|
| ExploitProtection | [neohiro/ExploitProtection](https://github.com/neohiro/ExploitProtection) | Windows Exploit Protection GUI |
| dnscrypt-proxy-gui | [neohiro/dnscrypt-proxy-gui](https://github.com/neohiro/dnscrypt-proxy-gui) | Encrypted DNS GUI |
| Cripple-NetStrip | [neohiro/Cripple-NetStrip](https://github.com/neohiro/Cripple-NetStrip) | DNS sinkhole + firewall |
| Windows Hardening | [neohiro/windows](https://github.com/neohiro/windows) | STIG-style Windows hardening |
| Linux Hardening | [neohiro/linux](https://github.com/neohiro/linux) | Post-install Linux hardening |

---

## Repository structure

```
frenzypenguin-media/
├── _tools/          # Tool descriptions for the Jekyll catalog
├── _includes/       # Shared Jekyll includes (badges, contact cards)
├── _layouts/        # Page layouts
├── _config.yml      # Jekyll configuration
├── assets/          # CSS, JS, images
├── github-social/   # GitHub card graphics
├── heartbeats/      # Heart cadence signals (live counter data)
├── index.md         # Homepage source
├── media.md         # Video portfolio page
└── repositories.md  # Full tools catalog page
```

---

## Contributing

Found a security hardening technique we missed? Have a tool to submit?

1. Open an issue with your suggestion or proposed addition
2. For tool additions, include: name, tagline, repo URL, platform, language
3. For content corrections, be specific and include sources

For security vulnerabilities, see [SECURITY.md](SECURITY.md) for private disclosure.

---

## Sister sites

- [neohiro](https://neohiro.github.io) — Security hardening & privacy tools
- [transhumanists](https://transhumanists.github.io) — Transhumanism & human enhancement
- [openstageisland](https://openstageisland.github.io) — Second Life music venue

---

## License

GPL-3.0 — see [LICENSE](LICENSE) and [SECURITY.md](SECURITY.md).

[![Visitors](https://api.visitorbadge.io/api/visitors?path=github.com%2Fneohiro%2Ffrenzypenguin-media&label=Visitors&countColor=%23263759)](https://visitorbadge.io/status?path=github.com%2Fneohiro%2Ffrenzypenguin-media)
