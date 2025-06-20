# Testing Playground Web Application with E2E Test Automation

## Project Structure

```text
├── backend/             # Backend application (Node.js + MySQL)
├── frontend/            # Frontend application (React)
└── tests/               # E2E test suites
    ├── cypress-pom/     # Cypress E2E tests (Custom Commands)
    └── playwright-pom/  # Playwright E2E tests (Page Object Model)
```

## Prerequisites

- **Node.js** v18 or later
- **npm** (or **yarn**)
- **MySQL** up & running with your database credentials configured

---

## Environment & Hosts

By default, your services will run on localhost:

- **Backend**: http://localhost:8081
- **Frontend**: http://localhost:3000/#/login

```dotenv
# backend

# MySQL connection settings
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=crud
DB_PORT=3306

# frontend

REACT_APP_BACKEND_URL=http://localhost:8081
```
