# Deployment Guide

This guide covers deploying the Document Extraction Tool frontend to production using Vercel. Vercel is optimized for modern frontend frameworks like Angular and offers a simple, fast deployment workflow.

## Recommended: Vercel for Frontend

Vercel is ideal for Angular projects due to its:

- Fast, zero-config builds for frontend frameworks
- Easy integration with GitHub and automatic deployments from the main branch
- Built-in CDN and HTTPS

### Steps to Deploy on Vercel

1. **Sign Up & Connect Repository**

   - Go to [vercel.com](https://vercel.com/) and sign up (GitHub recommended).
   - Click "Add New Project" and select your frontend repository.

2. **Configure Build Settings**

   - Vercel auto-detects Angular and sets defaults:
     - **Build Command:** `npm run build` or `ng build`
     - **Output Directory:** `dist/`
   - No custom settings needed for standard Angular CLI projects.

3. **Set Branch for Production**

   - Use the `main` branch for production deployments.
   - Vercel will auto-deploy on every push to `main`.

4. **Environment Switching**

   - Angular uses `fileReplacements` in `angular.json` to swap environment files for production.
   - By default, `environment.prod.ts` is used for production builds.

5. **Access Your Live Site**
   - After build completes, Vercel provides a live URL (e.g., `https://your-app.vercel.app`).

### Example Vercel Settings

- **Framework Preset:** Angular
- **Build Command:** `npm run build` or `ng build`
- **Output Directory:** `dist/doc-extractor-tool-frontend`
- **Production Branch:** `main`

## Alternative: Render for Fullstack

Render can deploy both backend and frontend in one place, which is useful for fullstack projects. However, Vercel is generally faster and more optimized for Angular frontend-only deployments.

## Notes

- No custom configuration is required for Angular deployment on Vercel.
- For backend deployment, see the backend repository’s deployment guide.
