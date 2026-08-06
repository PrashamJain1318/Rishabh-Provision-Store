# 🚀 Rishabh Provision Store - Production Deployment Guide

## 🏗️ Deployment Architecture

```
[ Vercel CDN (Frontend) ] ── (HTTPS REST) ──> [ Railway / Render (Node.js API) ] ──> [ MongoDB Atlas Cloud ]
                                                                                   ──> [ Cloudinary Media CDN ]
```

---

## 🌐 1. Frontend Deployment (Vercel)
1. Import repository to Vercel.
2. Set Root Directory to `apps/web`.
3. Build Command: `pnpm --filter @rishabh-store/web build`.
4. Output Directory: `dist`.

---

## 🚂 2. Backend Deployment (Railway / Render)
1. Deploy Node.js Express server from `apps/server`.
2. Environment Variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=mongodb+srv://...`
   - `GEMINI_API_KEY=...`
   - `CORS_ORIGIN=https://rishabh-provision-store.vercel.app`

---

## 🔒 3. Production Security Checklist
- [x] HTTPS SSL Certification enforced
- [x] Helmet middleware headers enabled
- [x] CORS restricted strictly to production domain
- [x] Environment variables secured in deployment vault
- [x] Rate limiting active (100 req/min per IP)
