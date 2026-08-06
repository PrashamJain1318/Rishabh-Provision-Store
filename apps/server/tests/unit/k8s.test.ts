import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Enterprise Kubernetes Cloud-Native Integration Tests", () => {
  const rootDir = path.resolve(__dirname, "../../../..");

  it("should verify namespace and backend deployment manifests exist with probes", () => {
    const namespaceYaml = fs.readFileSync(path.join(rootDir, "k8s/namespace.yaml"), "utf-8");
    const backendYaml = fs.readFileSync(path.join(rootDir, "k8s/backend-deployment.yaml"), "utf-8");

    expect(namespaceYaml).toContain("name: rishabh-store-prod");
    expect(backendYaml).toContain("path: /api/v1/health/live");
    expect(backendYaml).toContain("path: /api/v1/health/ready");
    expect(backendYaml).toContain("image: rishabh-store/server:latest");
  });

  it("should verify Horizontal Pod Autoscaler scaling bounds (min 2, max 10, 70% CPU)", () => {
    const hpaYaml = fs.readFileSync(path.join(rootDir, "k8s/backend-hpa.yaml"), "utf-8");

    expect(hpaYaml).toContain("minReplicas: 2");
    expect(hpaYaml).toContain("maxReplicas: 10");
    expect(hpaYaml).toContain("averageUtilization: 70");
  });

  it("should verify Nginx Ingress routing and Pod Disruption Budget definitions", () => {
    const ingressYaml = fs.readFileSync(path.join(rootDir, "k8s/ingress.yaml"), "utf-8");
    const pdbYaml = fs.readFileSync(path.join(rootDir, "k8s/pdb.yaml"), "utf-8");

    expect(ingressYaml).toContain("path: /api/");
    expect(ingressYaml).toContain("service:");
    expect(pdbYaml).toContain("minAvailable: 1");
  });
});
