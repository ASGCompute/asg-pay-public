# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | ✅ Current |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly.

**DO NOT** open a public GitHub issue for security vulnerabilities.

### How to Report

1. Email: **<security@asgcard.dev>**
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

| Action | SLA |
|--------|-----|
| Acknowledgement | 24 hours |
| Initial assessment | 48 hours |
| Fix deployed | 7 business days (critical) |

### Scope

In scope:

- ASG Pay portal (`fund.asgcard.dev`)
- Bridge transaction flows (Wormhole integration)
- Wallet connection handling
- Stripe Checkout integration
- Stellar transaction building and signing

Out of scope:

- Wormhole Guardian network issues
- Stellar network consensus issues
- Third-party wallet extension vulnerabilities
- Social engineering

## Security Practices

- **Client-side only** — no backend stores sensitive data
- **No private key handling** — all signing happens in wallet extensions
- **Destination locking** — recipient address cannot be modified by users
- **CSP headers** — Content Security Policy enforced via Vercel
- **Open source** — fully auditable codebase (Apache 2.0)
