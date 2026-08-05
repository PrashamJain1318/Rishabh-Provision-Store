# 07. Deployment Guide

## Deployment Environments
- **Development**: Local dev server running with Turbo / Node.js live reload.
- **Staging**: Cloud hosted environment for QA testing.
- **Production**: Distributed cloud app hosting / Vercel container setup.

## Deployment Checklist
1. Verify build integrity (`npm run build`).
2. Run database migrations (`npm run db:migrate`).
3. Set environment variables.
4. Verify thermal print driver compatibility if deployed locally on store hardware.
