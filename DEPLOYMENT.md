# Deployment Guide for LinkedIn Profile Roaster

This guide will walk you through deploying your application to Vercel, the recommended hosting platform for Next.js apps.

## 1. Prerequisites

- **GitHub Account**: To host your code.
- **Vercel Account**: To deploy your app (sign up at [vercel.com](https://vercel.com)).
- **Groq API Key**: From [console.groq.com](https://console.groq.com).

## 2. Push Code to GitHub

If you haven't already, push your local code to a new GitHub repository:

1. Create a new repository on GitHub.
2. Run these commands in your terminal:
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## 3. Deploy to Vercel

1. Log in to your Vercel dashboard.
2. Click **"Add New..."** -> **"Project"**.
3. Import the GitHub repository you just created.
4. **Configure Environment Variables**:
   In the "Environment Variables" section, add the following:

   | Key              | Value                                       |
   | ---------------- | ------------------------------------------- |
   | `GROQ_API_KEY`   | Your actual Groq API key                    |
   | `ADMIN_PASSWORD` | A secure password for your admin dashboard  |
   | `OPENAI_API_KEY` | (Optional) Only if you want OpenAI fallback |

5. Click **"Deploy"**.

## 4. Set Up Database (Upstash Redis)

This is **critical** for saving your funding amount and visitor stats.

1. Once deployed, go to your **Project Dashboard** on Vercel.
2. Click the **"Storage"** tab.
3. Click **"Create Database"**.
4. Select **"Upstash"** (Serverless DB) from the Marketplace list.
5. Click **"Connect"** or **"Create"**.
6. Accept the terms and wait for it to provision.
7. **Environment Variables**: It will automatically add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` to your project. My code is updated to detect these automatically!

## 5. Final Redeploy

After adding the database, you must redeploy for the new database variables to take effect:

1. Go to the **"Deployments"** tab.
2. Click the three dots (`...`) next to your latest deployment.
3. Select **"Redeploy"**.
4. Click **"Redeploy"** again to confirm.

## 6. Verification

1. Open your live URL (e.g., `https://your-project.vercel.app`).
2. Go to `/admin` and log in with your password.
3. Try updating the "Funding Amount".
4. Go to `/support` and verify the progress bar updated.

**🎉 You are live!**
