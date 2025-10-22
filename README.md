# 🧩 Environment Configuration Guide

This document explains the purpose and usage of each environment file in the project.

---

## 📁 Environment Files Overview

| File | Purpose |
|------|----------|
| **.env** | Used for local development (connecting to local Postgres instance). |
| **.env.docker** | Used when running the application inside Docker containers. |
| **.example.env** | Template file for reference — should mirror `.env` but without sensitive data. |

---

## ⚙️ .env (Local Development)

```env
# ===========================
# App Configuration
# ===========================
PORT=3535
API_HOST=0.0.0.0
NODE_ENV=development
API_VERSION=1
SWAGGER_DOCS=api-docs
JWT_SECRET=key_name
SESSION_SECRET=key_name
LOG_LEVEL=debug
PUBLIC_KEY=isPublic
SENTRY_DSN=https://yourPublicKey@o123456.ingest.sentry.io/1234567

# ===========================
# Database Config (connect to Docker Postgres)
# ===========================
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432                   #(host:container = 6666:5432)
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=nestjs_boilerplate_db
```

### 🧠 Notes
- Used when running **NestJS locally** (not inside Docker).
- Connects to Postgres via **localhost**.
- Logs at `debug` level by default.

---

## 🐳 .env.docker (Docker Environment)

```env
# ===========================
# PostgreSQL Configuration (for Docker internal network)
# ===========================
POSTGRES_PORT=5432                 # INTERNAL container port (DO NOT USE HOST PORT INSIDE Docker)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nestjs_boilerplate_db

# ===========================
# pgAdmin Configuration
# ===========================
PGADMIN_PORT=5051                   # Host port mapped to pgAdmin
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=postgres
```

### 🧠 Notes
- Used when the app runs **inside Docker**.
- Connects to the Postgres **Docker service**, not localhost.
- Uses different port `3536` to avoid conflict with local `.env` app.

---

## 🧾 .example.env

```env
# Copy contents from .env as a template for new environments.
# Replace sensitive values (like JWT_SECRET, passwords, etc.) with placeholders.
```

---

## 🧰 Usage Instructions

1. Copy `.example.env` → `.env` for local setup.
2. For Docker-based development, use `.env.docker` automatically via `docker-compose`.
3. Never commit secrets in `.env` or `.env.docker`.
4. Keep `.example.env` updated whenever environment variables change.

---

✅ **Tip:** Use `dotenv-flow` or `@nestjs/config` to automatically load the correct `.env` file based on `NODE_ENV`.
