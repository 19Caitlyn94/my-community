# Backend Deployment Guide

## Automated Deployments

The backend is automatically deployed through Render when changes are pushed to the `main` branch. No manual deployment steps are required.

- Every commit to `main` triggers a new deployment
- Deployment status can be monitored in the Render dashboard
- Production URL: [https://mycommunity-api.onrender.com/](https://mycommunity-api.onrender.com/)
- Django Admin URL: [https://mycommunity-api.onrender.com/admin/](https://mycommunity-api.onrender.com/admin/)

## Database Setup

Render provides a managed PostgreSQL database that is connected using the environment variables

## Environment Variables

The following environment variables must be configured in the Render dashboard:

- `DEBUG`: Set to `False` in production
- `SECRET_KEY`: Django secret key for cryptographic signing
- `DB_HOST`: PostgreSQL database host address
- `DB_USER`: PostgreSQL database username
- `DB_PASSWORD`: PostgreSQL database password
- `DB_PORT`: PostgreSQL database port number
- `DJANGO_SUPERUSER_EMAIL`: Superuser email for django admin login
- `DJANGO_SUPERUSER_PASSWORD`: Superuser password for django admin login

### Render Integration

Each deployment:

- Installs dependencies from `pyproject.toml`
- Runs `poetry run ./manage.py migrate`
- Creates a superuser from environment variables using the createsu command `poetry run ./manage.py createsu`
- Runs Gunicorn with the specified configuration `poetry run gunicorn backend.wsgi:application`

### Gunicorn Setup with Render

Gunicorn is used as the WSGI HTTP server for Python web applications for:

- **Performance**: Gunicorn efficiently handles multiple worker processes, making it ideal for production environments
- **Scalability**: Worker processes can be easily scaled based on traffic demands
- **Reliability**: Built-in process management and automatic worker recovery
- **Compatibility**: Works seamlessly with Render's Python environment
