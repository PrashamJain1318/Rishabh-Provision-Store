# Enterprise Zero-Trust Security Architecture Guide

This document defines the Zero-Trust security controls, threat models, RBAC authorization matrices, and OWASP ASVS Level 2 compliance mechanisms built into the Rishabh Provision Store platform.

---

## 🛡️ OWASP ASVS & Security Controls Matrix

| Security Area | Control Implementation | Standard / Guideline | Verification |
| :--- | :--- | :--- | :---: |
| **Authentication Protection** | Account lockout after 5 failed attempts for 15m (`lockout.service.ts`) | OWASP ASVS V2.1 | 🟢 PASS |
| **JWT Authorization** | HMAC SHA-256 access tokens (15m expiry) & refresh token rotation | OWASP ASVS V3.5 | 🟢 PASS |
| **Role-Based Access Control** | Enforced RBAC (`OWNER`, `MANAGER`, `CASHIER`, `EMPLOYEE`, `CUSTOMER`, `DELIVERY_PARTNER`) | OWASP ASVS V4.1 | 🟢 PASS |
| **HTTP Security Headers** | Helmet HSTS (`maxAge: 31536000`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` | OWASP Top 10 A05:2021 | 🟢 PASS |
| **File Upload Hardening** | Magic byte validation, strict MIME whitelist (`JPG`, `PNG`, `WEBP`), 5MB size limit | OWASP Top 10 A04:2021 | 🟢 PASS |
| **API Rate Limiting** | Separate Redis-backed rate limiters for Auth (10 req/15m) and REST APIs (100 req/15m) | OWASP Top 10 A04:2021 | 🟢 PASS |
| **Input Sanitization** | Zod strict schema validation preventing NoSQL Injection, XSS & Mass Assignment | OWASP Top 10 A03:2021 | 🟢 PASS |
| **Security Audit Endpoint** | `GET /api/v1/security/status` reporting live OWASP posture metrics | Enterprise SecOps | 🟢 PASS |

---

## 🔒 Threat Model & Incident Response Basics

1. **Brute-Force & Credential Stuffing Defense**:
   - `lockoutService` monitors failed logins per email/IP.
   - Triggers 15-minute lock upon 5 failed attempts.
2. **Secrets & Credentials Protection**:
   - All API keys (`RAZORPAY_KEY_SECRET`, `GEMINI_API_KEY`, `JWT_SECRET`, `FIREBASE_PRIVATE_KEY`) loaded from `apps/server/.env`.
   - Never committed to version control (`.gitignore` verified).
3. **Data Protection in Transit & at Rest**:
   - TLS 1.3 encryption in transit for API endpoints.
   - HMAC SHA-256 signatures for payment webhooks.
