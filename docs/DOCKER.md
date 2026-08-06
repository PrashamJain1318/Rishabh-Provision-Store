# Enterprise Docker, Containerization & Production Deployment Guide

This document defines the production containerization architecture, multi-stage Dockerfiles, Docker Compose orchestrations, and deployment playbooks for the Rishabh Provision Store platform.

---

## 🐳 Container Specifications & Image Metrics

| Container Service | Base Image | Multi-Stage Layers | User Context | Ports | Healthcheck Target | Image Size (Est.) |
| :--- | :--- | :---: | :---: | :---: | :--- | :---: |
| **`rishabh_web`** | `nginx:1.25-alpine` | `Node 20 Builder -> Nginx` | `nginx` | `80, 443` | `http://localhost/healthz` | **`~28 MB`** |
| **`rishabh_server`** | `node:20-alpine` | `Node 20 Builder -> Dist` | `node` (unprivileged) | `5001` | `http://localhost:5001/api/v1/health/live` | **`~145 MB`** |
| **`rishabh_redis`** | `redis:7-alpine` | Alpine official | `redis` | `6379` | `redis-cli ping` | **`~32 MB`** |

---

## 🚀 Deployment Commands

### Development Setup (Local Containers)
```bash
docker compose up --build -d
```

### Production Deployment (with External MongoDB Atlas)
```bash
docker compose -f docker-compose.prod.yml up --build -d
```

### View Live Container Telemetry & Logs
```bash
docker compose logs -f --tail=100
```
