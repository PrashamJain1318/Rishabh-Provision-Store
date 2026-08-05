# 09. Environment & Tech Stack Specifications

## 🏆 Final Recommended Tech Stack (2026)

### Frontend ⭐⭐⭐⭐⭐
| Technology | Choice | Why |
| :--- | :--- | :--- |
| Framework | React 19 + Vite | Fast development and excellent performance |
| Language | TypeScript | Better maintainability and fewer runtime bugs |
| Styling | Tailwind CSS v4 | Rapid UI development |
| UI Components | shadcn/ui | Enterprise-quality, customizable components |
| Icons | Lucide React | Clean, lightweight icon set |
| Animation | Framer Motion | Smooth professional animations |
| Routing | React Router v7 | Stable and feature-rich |
| State Management | Zustand | Simple, fast, and scalable |
| Server State | TanStack Query | API caching and synchronization |
| Forms | React Hook Form + Zod | Excellent validation and performance |
| Charts | Recharts + ApexCharts | Dashboards and business analytics |
| Tables | TanStack Table | Advanced data grids |
| Notifications | Sonner | Modern toast notifications |
| Theme | next-themes (React compatible) | Dark/Light mode |

---

### Backend ⭐⭐⭐⭐⭐
| Technology | Choice |
| :--- | :--- |
| Runtime | Node.js 22 LTS |
| Framework | Express.js |
| Language | TypeScript |
| ORM/ODM | Mongoose |
| Authentication | JWT + Refresh Token |
| Password Hashing | bcrypt |
| Validation | Zod |
| File Upload | Multer |
| Image Storage | Cloudinary |
| Logging | Winston |
| Security | Helmet |
| CORS | cors |
| Rate Limiting | express-rate-limit |
| Compression | compression |
| API Documentation | Swagger/OpenAPI |

---

### Database ⭐⭐⭐⭐⭐
| Technology | Choice |
| :--- | :--- |
| Primary Database | MongoDB Atlas |
| ODM | Mongoose |
| Cache (later) | Redis |

---

### External Services & Integrations

#### AI
- **Service**: Gemini Pro API
- **Purpose**: AI assistant, product search, inventory insights
- **API Key Required**: We'll add the Gemini API key only when we begin AI features, not during initial setup.

#### Payments
- **Service**: Razorpay
- **Purpose**: UPI, Cards, Net Banking
- **API Key Required**: During the payments phase.

#### Authentication
- **Service**: JWT (Login sessions) & Firebase Authentication (OTP and phone verification - optional later)

#### Images
- **Service**: Cloudinary
- **Purpose**: Product images and banners
- **API Key Required**: During image upload implementation.

#### Email
- **Service**: Resend (recommended)
- **Purpose**: Password reset, invoices, notifications

#### Maps
- **Service**: Google Maps Platform
- **Purpose**: Delivery tracking and location services
- **API Key Required**: During delivery module development.

---

### Real-Time Features
| Technology | Purpose |
| :--- | :--- |
| Socket.IO | Live order updates, billing synchronization, notifications |

---

### Barcode, QR, PDF & Excel
| Feature | Library |
| :--- | :--- |
| Barcode | JsBarcode |
| QR Code | qrcode |
| PDF Invoices | pdf-lib |
| Excel Export | ExcelJS |

---

### Testing
| Type | Tool |
| :--- | :--- |
| Unit Testing | Vitest |
| API Testing | Postman |
| End-to-End | Playwright |

---

### Deployment ⭐⭐⭐⭐⭐
| Component | Platform |
| :--- | :--- |
| Frontend | Vercel |
| Backend | Railway |
| Database | MongoDB Atlas |
| Images | Cloudinary |
| Source Control | GitHub |
| CI/CD | GitHub Actions |

This combination gives you:
- Fast frontend deployments
- Reliable backend hosting
- Managed database
- Automatic HTTPS
- Easy scaling

---

## Folder Structure
```text
Rishabh-Provision-Store/
│
├── apps/
│   ├── web/
│   └── server/
│
├── packages/
│   ├── ui/
│   ├── database/
│   ├── config/
│   ├── types/
│   └── utils/
│
├── prompts/
│   ├── gemini/
│   ├── antigravity/
│   └── shared/
│
├── docs/
├── assets/
└── .github/
```
