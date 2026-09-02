# Hotel Booking Platform - Frontend Repo

This is the React-based frontend application for the Hotel Booking platform.

The application allows users to:
- View available hotels
- Create new reservations
- Search existing reservations
- Cancel reservations

The frontend communicates with the backend API deployed inside Kubernetes.

## Architecture

```
  Developer
     |
     v
GitHub frontend-repo
     |
     v
GitHub Actions (CI)
     |
     v
Nexus Docker Registry
     |
     v
Kubernetes Manifest Update
     |
     v
ArgoCD Sync (CD)
     |
     v
Frontend Pods (nginx)
     |
     v
Backend Service
backend.hotel-backend.svc.cluster.local:3000
```

The React app is built into static assets and served by Nginx inside the container. Nginx proxies API requests (`/hotels`, `/reservations`) to the backend service inside the cluster.

## Technology Stack

| Layer | Technology |
|---|---|
| UI framework | React |
| Language | JavaScript |
| Build tool | Vite |
| Web server (runtime) | Nginx |
| Containerization | Docker |
| Orchestration | Kubernetes |
| GitOps / CD | ArgoCD |
| CI | GitHub Actions |
| Image registry | Nexus Docker Registry |
| Logging | Promtail, Loki, Grafana |
| E2E testing | Pytest + Playwright |

## Project Structure

```
frontend-repo/
│
├── index.html              # Vite HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # dependencies/scripts
├── package-lock.json       # dependency lock
├── Dockerfile              # production image build
├── nginx.conf              # Nginx runtime config
│
├── src/
│   ├── main.jsx             # React bootstrap
│   ├── App.jsx               # main React component
│   ├── index.css             # global CSS
│   ├── style.css             # imported by screens
│   └── screens/
│       ├── NewReservation.jsx
│       └── ReservationLookup.jsx
│
└── tests/
    ├── pages/
    │   ├── login_page.py
    │   └── lookup_page.py
    ├── test_ui/
    │   └── test_login.py
    └── conftest.py
```

## Prerequisites

- Node.js 18+
- npm
- Docker (for building/running the container image)
- Access to a Kubernetes cluster with the `hotel-frontend` and `hotel-backend` namespaces (for deployment)
- Python + pytest + Playwright (for running UI tests)

## Local Development

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

## Docker

Build the frontend image:
```bash
docker build -t frontend:v1 .
```

Run locally:
```bash
docker run -p 3000:80 frontend:v1
```

Access at:
```
http://localhost:3000
```

### Image Registry

Images are pushed to the Nexus Docker Registry, e.g.:
```
172.18.0.4:30082/frontend:v1
```

Version tags are used for deployments:
```
frontend:v1
frontend:v2
frontend:v3
```

## Kubernetes Deployment

The frontend is deployed to Kubernetes using the following resources:
- Deployment
- Service
- ConfigMaps
- ImagePullSecret

**Namespace:** `hotel-frontend`

Check the service:
```bash
kubectl get svc -n hotel-frontend
```

### Nginx Configuration

The React application is served by Nginx. API requests are proxied to the backend:
- `/hotels`
- `/reservations`

Proxied to:
```
backend.hotel-backend.svc.cluster.local:3000
```

## CI/CD

The frontend repository uses **GitHub Actions** for CI. Pipeline steps:
1. Checkout source code
2. Build Docker image
3. Tag image (e.g. `frontend:v3`)
4. Push image to Nexus Registry

### GitOps Deployment

Deployment is managed by **ArgoCD**. ArgoCD automatically detects manifest changes in the repository and deploys new versions to the cluster — see the Architecture diagram above for the full flow.

## Accessing the Application

Frontend service:
```
http://localhost:30080
```

Or via Kubernetes port-forward:
```bash
kubectl port-forward svc/frontend 3000:80 -n hotel-frontend
```

Then:
```
http://localhost:3000
```

## Monitoring

Frontend logs are collected by:
- Promtail
- Loki
- Grafana

View logs via a Grafana query:
```
{namespace="hotel-frontend"}
```

## UI Tests

The frontend uses **Pytest** with **Playwright** for end-to-end testing.

Test location: `tests/`

Run tests:
```bash
uv run pytest tests -vv
```

## Author

Gabriel Swack