# Hotel Booking Frontend

React-based frontend application for the Hotel Booking platform.

The application allows users to:
- View available hotels
- Create new reservations
- Search existing reservations
- Cancel reservations

The frontend communicates with the backend API deployed inside Kubernetes.

## Technology Stack

- React
- JavaScript
- Vite
- Nginx
- Docker
- Kubernetes
- ArgoCD

# Local Development

## Prerequisites

- Node.js 18+
- npm

## Install dependencies

```bash
npm install
Run development server
npm run dev

The application will be available at:
http://localhost:5173


## Project Structure:
frontend-repo/
│
├── index.html              ✅ Vite HTML entry point
├── vite.config.js          ✅ Vite configuration
├── package.json             ✅ dependencies/scripts
├── package-lock.json        ✅ dependency lock
├── Dockerfile               ✅ production image build
├── nginx.conf               ✅ Nginx runtime config
│
└── src/
    ├── main.jsx             ✅ React bootstrap
    ├── App.jsx              ✅ main React component
    ├── index.css            ✅ global CSS
    ├── style.css            ✅ imported by screens
    └── screens/
        ├── NewReservation.jsx
        └── ReservationLookup.jsx


Build the frontend image:
docker build -t frontend:v1 .

Run locally:
docker run -p 3000:80 frontend:v1

Access:
http://localhost:3000

Docker Image:
Images are pushed to Nexus Docker Registry.
Example:
172.18.0.4:30082/frontend:v1

Version tags are used for deployments:

frontend:v1
frontend:v2
frontend:v3
Kubernetes Deployment

The frontend is deployed using Kubernetes.
Resources:
Deployment
Service
Configurations
ImagePullSecret

Namespace:
hotel-frontend

Service:
kubectl get svc -n hotel-frontend

Nginx Configuration
The React application is served by Nginx.
API requests are proxied:
/hotels
/reservations

to the backend Kubernetes service:
backend.hotel-backend.svc.cluster.local:3000
CI/CD

The frontend repository uses GitHub Actions.
Pipeline steps:
Checkout source code
Build Docker image
Tag image
Push image to Nexus Registry

Example:
frontend:v3
GitOps Deployment

Deployment is managed by ArgoCD.
Flow:
Developer
   |
   v
GitHub frontend-repo
   |
   v
GitHub Actions
   |
   v
Nexus Docker Registry
   |
   v
Kubernetes Manifest Update
   |
   v
ArgoCD Sync
   |
   v
Frontend Pods

ArgoCD automatically detects manifest changes and deploys new versions.


## Monitoring:
Frontend logs are collected by:
Promtail
Loki
Grafana

Logs can be viewed using Grafana queries:
{namespace="hotel-frontend"}

Accessing the Application:
Frontend service:
http://localhost:30080
(or through Kubernetes port-forward)
Example:
kubectl port-forward svc/frontend 3000:80 -n hotel-frontend
Then:
http://localhost:3000

## UI Tests

The frontend application uses Pytest with Playwright for end-to-end testing.

Test location:
tests/
├── pages/
│ └── login_page.py
| └── lookuop_page.py
├── test_ui/
| ├── test_login.py
└── conftest.py


Run tests:

```bash
pytest tests -vv

## Author
Gabriel Swack