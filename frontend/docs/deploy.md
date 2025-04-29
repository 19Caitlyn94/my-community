# Frontend Deployment Guide

## Automated Deployments

The frontend is automatically deployed through Vercel when changes are pushed to the `main` branch. No manual deployment steps are required.

- Every commit to `main` triggers a new deployment
- Preview deployments are created for all pull requests
- Deployment status can be monitored in the Vercel dashboard
- Production URL: [https://mycommunityapp.vercel.app/](https://mycommunityapp.vercel.app/)

## Environment Variables

The following environment variables must be configured in the Vercel dashboard:

```env
# API Configuration
NEXT_PUBLIC_API_URL     # Backend API endpoint
AUTH_SECRET             # Required for Auth.js authentication
AUTH_BACKEND_URL        # Backend API endpoint for authentication

# Social Auth (If socials are set up)
AUTH_GOOGLE_ID         # Google OAuth client ID from Google Cloud Console
AUTH_GOOGLE_SECRET     # Google OAuth client secret from Google Cloud Console
```
