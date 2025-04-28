# Deployment Guide

## Gunicorn Setup with Render

Gunicorn is used as the WSGI HTTP server for Python web applications. Here's why:

- **Performance**: Gunicorn efficiently handles multiple worker processes, making it ideal for production environments
- **Scalability**: Worker processes can be easily scaled based on traffic demands
- **Reliability**: Built-in process management and automatic worker recovery
- **Compatibility**: Works seamlessly with Render's Python environment

### Render Integration

- Installs dependencies from `pyproject.toml`
- Runs Gunicorn with the specified configuration `poetry run gunicorn backend.wsgi:application`
