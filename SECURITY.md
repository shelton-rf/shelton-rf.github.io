# Security and privacy deployment requirements

The public site is a static Vite build. The portfolio access panel is a UI contract only; it does not authenticate users, store passwords, upload files, or send messages until a server-side API is connected.

Before enabling the private workspace, the implementation owner must complete a documented threat model, risk assessment, security review, privacy impact assessment, and legal review for the jurisdictions and users involved. No certification or regulatory compliance is implied by this repository.

## Minimum technical controls

- Use a mature identity provider or reviewed server implementation with Argon2id or scrypt password hashing, email verification, MFA, secure password reset, rate limiting, account lockout protections, and session revocation.
- Use HTTPS everywhere, HSTS, secure `HttpOnly` and `SameSite` session cookies, CSRF protection, origin checks, strict input validation, output encoding, and security headers.
- Keep private files outside the public web root. Enforce object-level authorization on every read, write, download, and message operation. Scan uploads for malware, enforce size/type limits, generate safe server-side names, and retain immutable audit events.
- Encrypt data in transit and at rest with managed key rotation. Separate production secrets, backups, logs, and customer content. Define retention and secure deletion procedures.
- Moderate and report community content, protect private messages from cross-account access, and provide abuse response, account deletion, export, correction, and consent controls as required by applicable law.
- Maintain dependency scanning, vulnerability disclosure, incident response, backup recovery tests, access reviews, logging minimization, and a documented breach notification process.

## Standards and legal review

Map controls to the applicable editions of IEEE 7000-series ethics/privacy guidance, ISO/IEC 27001 information security, ISO/IEC 27002 controls, ISO/IEC 27701 privacy information management, and ISO/IEC 29100 privacy principles. Consider OWASP ASVS and the relevant NIST guidance as implementation references.

A qualified privacy/security professional and counsel must determine the actual obligations, which may include GDPR/UK GDPR, CCPA/CPRA, state privacy and breach-notification laws, ePrivacy/cookie requirements, accessibility obligations, employment or education rules, records retention, and sector-specific requirements. Obtain consent where required and publish reviewed Terms of Use, Privacy Notice, Cookie Notice, Community Guidelines, and Data Processing Agreements where applicable.
