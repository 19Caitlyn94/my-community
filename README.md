# MyCommunity

Welcome to MyCommunity, a platform where individuals from all walks of life come together to support, uplift, and connect with one another. Our mission is to foster a sense of belonging, promote meaningful relationships, and celebrate the power of community.

Join us in creating a supportive and inclusive space where everyone can thrive, share, and grow together.

## 🛠️ Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- DaisyUI

### Backend

- Django
- Django REST Framework
- PostgreSQL
- Simple JWT for authentication

## 📋 Prerequisites

[![Node.js](https://img.shields.io/badge/Node-20.11.1-green?logo=node.js)](https://nodejs.org/) [![npm](https://img.shields.io/badge/npm-10.2.4-red?logo=npm)](https://www.npmjs.com/)

[![Python](https://img.shields.io/badge/Python-3.10.5-blue?logo=python)](https://www.python.org/) [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.15-blue?logo=postgresql)](https://www.postgresql.org/) [![Poetry](https://img.shields.io/badge/Poetry-1.8.3-blue?logo=poetry)](https://python-poetry.org/)

## 🔧 Installation

### Backend Setup

```bash
# Clone the repository
git clone https://github.com/19Caitlyn94/my-community.git

# Install Python dependencies
cd my-community/backend
poetry install

# Set up environment variables
echo .env
# Edit .env with the database credentials and secret key

# Run migrations
poetry run python manage.py migrate

# Create a superuser
poetry run python manage.py createsuperuser

# Start the development server
export DEBUG=True
poetry run python manage.py runserver 8000
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd my-community/frontend

# Install dependencies
npm install

# Set up environment variables
echo .env.local
# Edit .env.local with the API URL

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.
This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🧪 Running Tests

### Backend Tests

```bash
cd backend
poetry run python manage.py test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📝 API Documentation

The API documentation is available at `/api/docs/` when running the backend server.

Key endpoints:

- `/api/auth/` - Authentication endpoints
- `/api/users/` - User management
- `/api/communities/` - Community operations
- `/api/posts/` - Post operations

## 🔐 Environment Variables

### Backend (.env)

```
DJANGO_SECRET_KEY=your-secret-key
DB_NAME=your-db-name
DB_USER=your-db-user
DB_SECRET=your-db-password
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 📝 Development Guidelines

### Git Workflow

#### Commit Messages

[Conventional Commits](https://www.conventionalcommits.org/en/) specification for commit messages.

Format: `<type>[optional scope]: <description>`

Example: `feat(auth): implement email verification flow`

| Type       | Description                                         |
| ---------- | --------------------------------------------------- |
| `feat`     | New features or significant changes                 |
| `fix`      | Bug fixes                                           |
| `chore`    | Regular maintenance tasks                           |
| `docs`     | Documentation updates                               |
| `style`    | Code style changes (formatting, semicolons, etc.)   |
| `refactor` | Code changes that neither fix bugs nor add features |
| `test`     | Adding or modifying tests                           |
| `build`    | Changes affecting build system or dependencies      |
| `ci`       | Changes to CI configuration and scripts             |
| `perf`     | Performance improvements                            |

#### Branch Naming

Format: `{type}/{description}[/{ticket-id}]`

Example: `feature/email-verification/MC-244`

| Type         | Description                 |
| ------------ | --------------------------- |
| `feature/*`  | New features                |
| `bugfix/*`   | Bug fixes                   |
| `hotfix/*`   | Urgent fixes for production |
| `release/*`  | Release preparation         |
| `refactor/*` | Code refactoring            |

#### Versioning

[Semantic Versioning](https://semver.org/) for version numbers:

Format: `MAJOR.MINOR.PATCH`

Example: `1.2.3`

- **MAJOR**: Breaking changes
- **MINOR**: New features (backwards-compatible)
- **PATCH**: Bug fixes (backwards-compatible)

## 🎨 Design System

#### UI Principles

1. **Mobile-First Approach**

   - Design and develop for mobile devices first
   - Progressive enhancement for larger screens

2. **Layout Structure**
   - CSS Grid for main layout
   - Flexbox for component-level layouts

<!--
## 🚀 Deploy

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. -->
