# Deployment Guide - Vercel

## Prerequisites
- GitHub repository connected to Vercel
- Environment variables configured

## Environment Variables to Set in Vercel Dashboard

Go to **Project Settings → Environment Variables** and add:

### Production
```
VITE_GOOGLE_CLIENT_ID=168617852790-nvculvjee5o1rpfsv55l0b7esd7pb7ic.apps.googleusercontent.com
VITE_BACKEND_API=https://your-production-backend-api.com
```

### Development/Preview
```
VITE_GOOGLE_CLIENT_ID=168617852790-nvculvjee5o1rpfsv55l0b7esd7pb7ic.apps.googleusercontent.com
VITE_BACKEND_API=http://localhost:3000
```

## Build Settings

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm ci` (recommended) or `npm install`

## Notes

1. The `vite.config.js` is configured with React and Tailwind CSS plugins
2. The app uses React Router v7 for client-side routing
3. Environment variables must start with `VITE_` to be accessible in the browser
4. Replace `https://your-production-backend-api.com` with your actual backend URL

## Troubleshooting

### Build Fails
- Check that all imports resolve correctly
- Ensure no `console` errors during build: `npm run build` locally first
- Verify environment variables are set in Vercel dashboard

### Runtime 404 Errors
- Vercel.json is configured to rewrite all routes to `/index.html` for SPA routing
- This should already be handled by the current configuration

### Backend Connection Issues
- Verify `VITE_BACKEND_API` points to correct production backend URL
- Ensure backend API accepts requests from your Vercel domain
- Check CORS settings on backend if needed
