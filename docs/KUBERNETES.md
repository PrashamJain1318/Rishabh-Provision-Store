# Enterprise Kubernetes, Auto Scaling & Cloud Native Platform Guide

This document defines the Kubernetes cloud-native architecture, declarative manifests, Horizontal Pod Autoscaling (HPA), zero-downtime rolling updates, and cluster operational procedures for the Rishabh Provision Store platform.

---

## ⛵ Cloud-Native Architecture Specifications

| Workload / Resource | Type | Min Replicas | Max Replicas | CPU Target | Memory Limit | Health Probes |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **`server-deployment`** | Deployment | **2** | **10** | **70% CPU** | `512 Mi` | Liveness (`/live`), Readiness (`/ready`), Startup |
| **`web-deployment`** | Deployment | **2** | **5** | -- | `256 Mi` | Liveness (`/healthz`) |
| **`redis-deployment`** | Deployment | **1** | **1** | -- | `512 Mi` | Liveness (`redis-cli ping`) |
| **`rishabh-store-ingress`**| Nginx Ingress | -- | -- | -- | -- | TLS Termination + SPA Routing |
| **`server-pdb`** | PDB | **1 Min** | -- | -- | -- | Disruption Safety |

---

## 🚀 Cluster Deployment Commands

### Apply All Kubernetes Manifests
```bash
kubectl apply -f k8s/
```

### Inspect Pod Status & Horizontal Pod Autoscaler (HPA)
```bash
kubectl get pods,hpa,svc,ingress -n rishabh-store-prod
```

### Zero-Downtime Rolling Update Trigger
```bash
kubectl rollout restart deployment/server-deployment -n rishabh-store-prod
```
