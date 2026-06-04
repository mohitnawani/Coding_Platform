# Vercel Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository with your project pushed

### Step 1: Connect GitHub Repository
1. Go to vercel.com and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Select the `Frontend` folder as the root directory

### Step 2: Set Environment Variables in Vercel
In your Vercel project settings, add these variables:

```
VITE_BACKEND_API=<your-backend-api-url>
VITE_GOOGLE_CLIENT_ID=168617852790-nvculvjee5o1rpfsv55l0b7esd7pb7ic.apps.googleusercontent.com
```

**Example Backend URL:**
- For local testing: `http://localhost:3000`
- For production: `https://your-backend-domain.com` or `https://your-backend.vercel.app`

### Step 3: Deploy
Click "Deploy" - Vercel will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Deploy to `https://your-project-name.vercel.app`

---

## Backend Deployment (Optional - Render/Railway/Heroku/Vercel)

### If using Vercel for Backend:

1. Create a new Vercel project for the `Backend` folder
2. Set these environment variables:

```
PORT=3000
DB_CONNECT_STRING=<your-mongodb-url>
JWT_KEY=<your-jwt-key>
REDIS_PASS=<your-redis-password>
GOOGLE_API_KEY=<your-google-api-key>
ClOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
CLIENT_ID=168617852790-nvculvjee5o1rpfsv55l0b7esd7pb7ic.apps.googleusercontent.com
CLIENT_SECRET=<your-client-secret>
FRONTEND_URL=<your-vercel-frontend-url>
```

3. Create `vercel.json` in Backend folder:

```json
{
  "buildCommand": "npm install",
  "outputDirectory": ".",
  "functions": {
    "src/index.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

---

## After Deployment Checklist

✅ Update Google OAuth callback URLs to include new Vercel domain
✅ Test login functionality on production
✅ Test API calls from frontend to backend
✅ Enable HTTPS (Vercel does this automatically)
✅ Set up database backups
✅ Monitor logs for any errors

---

## Troubleshooting

### CORS Errors?
- Update `Backend/.env` with `FRONTEND_URL=<your-vercel-url>`
- Restart the backend

### Environment Variables Not Loading?
- Verify all variables are set in Vercel dashboard
- Redeploy after adding variables

### Build Fails?
- Check `npm run build` works locally
- Ensure all dependencies in `package.json`
